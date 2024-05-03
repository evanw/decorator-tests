# JavaScript Decorator Tests

This repo contains a single file with many behavioral tests for the upcoming [decorators feature](https://github.com/tc39/proposal-decorators) in JavaScript. It's intended to be easy to use for testing a given JavaScript implementation: just run the file [`decorator-tests.js`](./decorator-tests.js) and see what `console.log` prints (although you may need to comment out some of the tests if your implementation emits code containing syntax errors, which TypeScript currently does). The source code for that file is in TypeScript (see [`decorator-tests.ts`](./decorator-tests.ts)) to make authoring the tests easier (e.g. to catch typos). I'm planning to use these tests to help me implement JavaScript decorators for [esbuild](https://github.com/evanw/esbuild).

Some caveats:

* The specification is still a work in progress, and may be outdated
* I'm not the author of the specification and I may have misinterpreted it
* Deviations from the specification by the tools below may be intentional
* The specification itself doesn't yet have good test coverage (see [this](https://github.com/tc39/test262/issues/3997) and [this](https://github.com/tc39/test262/issues/4042))

You can use `node run.mjs` after `npm install` to run and update the tests below.

## Test Results

### TypeScript (`typescript@5.4.5`)

Known issues:

* In decorators of static fields and static accessors, the value of `this` appears to be incorrect.
* Using `await` within a decorator can cause TypeScript to emit invalid code containing a syntax error.
* References to the uninitialized class name within a decorator return `undefined` instead of throwing a `ReferenceError`.

<details>
<summary>❌ 16 checks failed (click for details)</summary>

```
❌ Decorator list evaluation: "this"
  Code: _classThis_1.foo(5)
  Throws: TypeError: _classThis_1.foo is not a function

❌ Decorator list evaluation: "this"
  Code: _classThis_1.foo(11)
  Throws: TypeError: _classThis_1.foo is not a function

❌ Decorator list evaluation: "this"
  Code: '' + log
  Expected: "0,1,2,3,4,5,6,7,8,9,10,11"
  Observed: "0,1,2,3,4,6,7,8,9,10"

❌ Decorator list evaluation: "await"
  Throws: SyntaxError: "await" can only be used inside an "async" function

❌ Decorator list evaluation: Class binding
  Code: error instanceof ReferenceError
  Expected: true
  Observed: false

❌ Decorator list evaluation: Class binding
  Code: error instanceof ReferenceError
  Expected: true
  Observed: false

❌ Decorator list evaluation: Class binding
  Code: error instanceof ReferenceError
  Expected: true
  Observed: false

❌ Decorator list evaluation: Class binding
  Code: error instanceof ReferenceError
  Expected: true
  Observed: false

❌ Decorator list evaluation: Class binding
  Code: error instanceof ReferenceError
  Expected: true
  Observed: false

❌ Decorator list evaluation: Class binding
  Code: error instanceof ReferenceError
  Expected: true
  Observed: false

❌ Decorator list evaluation: Class binding
  Code: error instanceof ReferenceError
  Expected: true
  Observed: false

❌ Decorator list evaluation: Class binding
  Code: error instanceof ReferenceError
  Expected: true
  Observed: false

❌ Decorator list evaluation: Class binding
  Code: error instanceof ReferenceError
  Expected: true
  Observed: false

❌ Decorator list evaluation: Class binding
  Code: error instanceof ReferenceError
  Expected: true
  Observed: false

❌ Decorator list evaluation: Class binding
  Code: error instanceof ReferenceError
  Expected: true
  Observed: false

❌ Decorator list evaluation: Class binding
  Code: firstFn()
  Expected: null
  Observed: class

❌ 16 checks failed
```

</details>

### Babel (`@babel/plugin-proposal-decorators@7.24.1`)

Known issues:

* References to the uninitialized class name within a decorator return `undefined` instead of throwing a `ReferenceError`.

<details>
<summary>❌ 10 checks failed (click for details)</summary>

```
❌ Decorator list evaluation: Class binding
  Code: error instanceof ReferenceError
  Expected: true
  Observed: false

❌ Decorator list evaluation: Class binding
  Code: error instanceof ReferenceError
  Expected: true
  Observed: false

❌ Decorator list evaluation: Class binding
  Code: error instanceof ReferenceError
  Expected: true
  Observed: false

❌ Decorator list evaluation: Class binding
  Code: error instanceof ReferenceError
  Expected: true
  Observed: false

❌ Decorator list evaluation: Class binding
  Code: error instanceof ReferenceError
  Expected: true
  Observed: false

❌ Decorator list evaluation: Class binding
  Code: error instanceof ReferenceError
  Expected: true
  Observed: false

❌ Decorator list evaluation: Class binding
  Code: error instanceof ReferenceError
  Expected: true
  Observed: false

❌ Decorator list evaluation: Class binding
  Code: error instanceof ReferenceError
  Expected: true
  Observed: false

❌ Decorator list evaluation: Class binding
  Code: error instanceof ReferenceError
  Expected: true
  Observed: false

❌ Decorator list evaluation: Class binding
  Code: error instanceof ReferenceError
  Expected: true
  Observed: false

❌ 10 checks failed
```

</details>
