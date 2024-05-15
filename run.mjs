import esbuild from 'esbuild'
import typescript from 'typescript'
import babel from '@babel/core'
import swc from '@swc/core'
import fs from 'fs'
import module from 'module'

const require = module.createRequire(import.meta.url)
const ts = fs.readFileSync('./decorator-tests.ts', 'utf8')
const testResults = []

// Convert TypeScript to JavaScript for testing JavaScript VMs
console.log('Converting TypeScript to JavaScript...')
const js = typescript.transpileModule(ts, { compilerOptions: { target: typescript.ScriptTarget.ESNext } }).outputText
fs.writeFileSync('./decorator-tests.js', `// Note: Edit "decorator-tests.ts" instead of this file\n${js}`)

// Check esbuild
await checkBehavior('esbuild', `esbuild@${require('esbuild/package.json').version}`,
  () => esbuild.transformSync(js, { target: 'es2022' }).code, [
])

// Check Babel
await checkBehavior('Babel', `@babel/plugin-proposal-decorators@${require('@babel/plugin-proposal-decorators/package.json').version}`,
  () => babel.transformSync(hackToFixBabelBugs(js), { plugins: [['@babel/plugin-proposal-decorators', { version: '2023-11' }]] }).code, [
  '* Decorators on anonymous classes can cause Babel to crash due to [a compiler bug](https://github.com/babel/babel/issues/16473).',
  '* References to the uninitialized class name within a decorator return `undefined` instead of throwing a `ReferenceError`.',
  `* Babel throws \`Error\` instead of \`TypeError\` when \`addInitializer\` is used after \`decorationState.[[Finished]]\` is true.`,
])

// Check TypeScript
await checkBehavior('TypeScript', `typescript@${require('typescript/package.json').version}`,
  () => typescript.transpileModule(ts, { compilerOptions: { target: typescript.ScriptTarget.ES2022 } }).outputText, [
  '* In decorators of static fields and static accessors, the value of `this` appears to be incorrect.',
  '* Using `await` within a decorator can cause TypeScript to emit invalid code containing a syntax error.',
  '* References to the uninitialized class name within a decorator return `undefined` instead of throwing a `ReferenceError`.',
  '* Class expressions incorrectly run some initializers multiple times due to [a compiler bug](https://github.com/microsoft/TypeScript/issues/58436).',
  `* TypeScript doesn't prevent \`addInitializer\` from adding more initializers after \`decorationState.[[Finished]]\` is true.`,
])

// Check SWC
await checkBehavior('SWC', `@swc/core@${require('@swc/core/package.json').version}`,
  () => swc.transformSync(js, {
    jsc: {
      target: 'es2022',
      parser: { syntax: 'typescript', decorators: true },
      transform: { decoratorVersion: '2022-03' },
    }
  }).code, [
  '* SWC implements an older version of the specification from 2022 with outdated behavior.',
  '* Generated code sometimes has syntax errors because SWC fails to transform certain decorators.',
  '* Generated code sometimes has syntax errors caused by duplicate private names in the same class.',
])

// Update README.md
const readme = fs.readFileSync('./README.md', 'utf8')
fs.writeFileSync('./README.md', readme.replace(/^## Test Results\n[^]*/m, '## Test Results\n\n' + testResults.join('\n')))
console.log('Done')

async function checkBehavior(name, packageAndVersion, code, knownIssues) {
  console.log(`Checking the behavior of ${name}...`)
  const logs = []
  code = hackToFixInvalidCode(code())
  const fn = new Function('console', code + '\nreturn promise;')
  await fn({ log: text => logs.push(text) })
  const summary = logs[logs.length - 1]
  const notes = knownIssues.length ? `\nKnown issues:\n\n${knownIssues.join('\n')}\n` : ''
  testResults.push(`### ${name} (\`${packageAndVersion}\`)\n${notes}\n` +
    (summary.includes('✅') ? summary :
      `<details>\n<summary>${summary} (click for details)</summary>\n\n` +
      `\`\`\`\n${logs.join('\n')}\n\`\`\`\n\n</details>`) +
    '\n')
}

// TypeScript, Babel, and SWC currently all generate code with syntax errors
// in certain cases. Attempt to work around them so we can at least run some
// of the tests instead of none of the tests.
function hackToFixInvalidCode(code) {
  outer: while (true) {
    try {
      esbuild.transformSync(code)
      new Function(code)
      return code
    }

    catch (err) {
      if (err && err.errors && err.errors.length > 0) {
        for (const { text, location } of err.errors) {
          if (!location) continue
          const { line, column, length, lineText } = location
          const lines = code.split('\n')

          if ((
            /^Expected identifier but found "#\w+"$/.test(text) ||
            /^Private name "#\w+" must be declared in an enclosing class$/.test(text)
          ) && lineText === lines[line - 1] && lineText.slice(column - 1, column + 1) === '.#') {
            lines[line - 1] =
              lineText.slice(0, column - 1) +
              `[(() => { throw new SyntaxError(${JSON.stringify(text)}) })()]` +
              lineText.slice(column + length)
            code = lines.join('\n')
            console.log(`Fixing syntax error: ${text}`)
            continue outer
          }

          if ((
            /^The symbol "#\w+" has already been declared$/.test(text)
          ) && lineText === lines[line - 1] && lineText.slice(column, column + 1) === '#') {
            lines[line - 1] =
              lineText.slice(0, column) +
              `[(() => { throw new SyntaxError(${JSON.stringify(text)}) })()]` +
              lineText.slice(column + length)
            code = lines.join('\n')
            console.log(`Fixing syntax error: ${text}`)
            continue outer
          }

          if ((
            text === '"await" can only be used inside an "async" function' ||
            text === 'The keyword "await" cannot be used here:'
          ) && lineText === lines[line - 1] && lineText.slice(column, column + length) === 'await') {
            lines[line - 1] =
              lineText.slice(0, column) +
              `(() => { throw new SyntaxError(${JSON.stringify(text)}) })(),` +
              lineText.slice(column + length)
            code = lines.join('\n')
            console.log(`Fixing syntax error: ${text}`)
            continue outer
          }
        }
      }

      // SWC has a bug where it sometimes doesn't transform certain decorators
      if (err instanceof SyntaxError) {
        const decorator = /@\w+(?:\([^)]*\))?/.exec(code)
        if (decorator) {
          code = code.slice(0, decorator.index) +
            `[(() => { throw new SyntaxError(${JSON.stringify(err.message)}) })()]._ =` +
            code.slice(decorator.index + decorator[0].length)
          console.log(`Fixing syntax error: ${err.message}`)
          continue outer
        }
      }

      fs.writeFileSync('code.js', code)
      esbuild.transformSync(code, { logLevel: 'warning' })
      throw err
    }
  }
}

function hackToFixBabelBugs(js) {
  const eachTest = /^    ("[^"]*"|'[^']*'): (?:async )?\(\) => \{([^]*?)\n    \}/gm
  const parts = []
  let old = 0

  // Disable the test(s) that cause Babel to crash
  for (let match; match = eachTest.exec(js);) {
    try {
      babel.transformSync(match[2], { plugins: [['@babel/plugin-proposal-decorators', { version: '2023-11' }]] })
    } catch (err) {
      const message = err && err.message || err
      console.log(`Warning: Babel crashes on this test: ${match[1]}`)
      parts.push(
        js.slice(old, match.index),
        match[0].slice(0, match[0].indexOf(match[2]))
        + `\n        throw ${JSON.stringify(message)}`
        + '\n    }',
      )
      old = match.index + match[0].length
    }
  }

  parts.push(js.slice(old))
  return parts.join('')
}
