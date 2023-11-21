const esbuild = require('esbuild')
const typescript = require('typescript')
const babel = require('@babel/core')
const fs = require('fs')

const ts = fs.readFileSync('./decorator-tests.ts', 'utf8')
const testResults = []

// Convert TypeScript to JavaScript for testing JavaScript VMs
console.log('Converting TypeScript to JavaScript...')
const js = `// Note: Edit "decorator-tests.ts" instead of this file\n${esbuild.transformSync(ts, { loader: 'ts' }).code}`
fs.writeFileSync('./decorator-tests.js', js)

// Check TypeScript
checkBehavior('TypeScript', `typescript@${require('typescript/package.json').version}`,
  typescript.transpileModule(ts, { compilerOptions: { target: typescript.ScriptTarget.ES2022, } }).outputText, [
  '* In decorators of static fields and static accessors, the value of `this` appears to be incorrect.',
  '* References to the class name within a decorator return `undefined` instead of throwing a `ReferenceError`.',
])

// Check Babel
checkBehavior('Babel', `@babel/plugin-proposal-decorators@${require('@babel/plugin-proposal-decorators/package.json').version}`,
  babel.transformSync(js, { plugins: [['@babel/plugin-proposal-decorators', { version: '2023-05' }]] }).code, [
  '* Decorators on class expressions do not yet use the correct name: [https://github.com/babel/babel/pull/15122](https://github.com/babel/babel/pull/15122).',
  '* The name provided to decorators on private methods (both static and non-static) is empty.',
  '* The context object property `access` exposes the underlying getter and setter instead of the `Get` and `Set` abstract operations.',
  '* The context object for fields (both static and non-static) is missing the `addInitializer` method.',
  '* References to the class name within a decorator return `undefined` instead of throwing a `ReferenceError`.',
])

// Update README.md
const readme = fs.readFileSync('./README.md', 'utf8')
fs.writeFileSync('./README.md', readme.replace(/^## Test Results\n[^]*/m, '## Test Results\n\n' + testResults.join('\n')))
console.log('Done')

function checkBehavior(name, package, code, knownIssues) {
  console.log(`Checking the behavior of ${name}...`)
  const logs = []
  new Function('console', code)({ log: text => logs.push(text) })
  const summary = logs[logs.length - 1]
  const notes = knownIssues.length ? `\nKnown issues:\n\n${knownIssues.join('\n')}\n` : ''
  testResults.push(`### ${name} (\`${package}\`)\n${notes}\n<details>\n` +
    `<summary>${summary} (click for details)</summary>\n\n` +
    `\`\`\`\n${logs.join('\n')}\n\`\`\`\n\n</details>\n`)
}
