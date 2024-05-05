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
* Class expressions incorrectly run some initializers multiple times due to [a compiler bug](https://github.com/microsoft/TypeScript/issues/58436).
* TypeScript doesn't prevent `addInitializer` from adding more initializers after `decorationState.[[Finished]]` is true.

<details>
<summary>❌ 44 checks failed (click for details)</summary>

```
❌ Class decorators: Extra initializer
  Code: oldAddInitializer(() => { })
  Expected: throws instanceof TypeError
  Observed: returns undefined

❌ Method decorators: Extra initializer (instance method)
  Code: oldAddInitializer(() => { })
  Expected: throws instanceof TypeError
  Observed: returns undefined

❌ Method decorators: Extra initializer (static method)
  Code: oldAddInitializer(() => { })
  Expected: throws instanceof TypeError
  Observed: returns undefined

❌ Method decorators: Extra initializer (private instance method)
  Code: oldAddInitializer(() => { })
  Expected: throws instanceof TypeError
  Observed: returns undefined

❌ Method decorators: Extra initializer (private static method)
  Code: oldAddInitializer(() => { })
  Expected: throws instanceof TypeError
  Observed: returns undefined

❌ Field decorators: Extra initializer (instance field)
  Code: oldAddInitializer(() => { })
  Expected: throws instanceof TypeError
  Observed: returns undefined

❌ Field decorators: Extra initializer (static field)
  Code: oldAddInitializer(() => { })
  Expected: throws instanceof TypeError
  Observed: returns undefined

❌ Field decorators: Extra initializer (private instance field)
  Code: oldAddInitializer(() => { })
  Expected: throws instanceof TypeError
  Observed: returns undefined

❌ Field decorators: Extra initializer (private static field)
  Code: oldAddInitializer(() => { })
  Expected: throws instanceof TypeError
  Observed: returns undefined

❌ Getter decorators: Extra initializer (instance getter)
  Code: oldAddInitializer(() => { })
  Expected: throws instanceof TypeError
  Observed: returns undefined

❌ Getter decorators: Extra initializer (static getter)
  Code: oldAddInitializer(() => { })
  Expected: throws instanceof TypeError
  Observed: returns undefined

❌ Getter decorators: Extra initializer (private instance getter)
  Code: oldAddInitializer(() => { })
  Expected: throws instanceof TypeError
  Observed: returns undefined

❌ Getter decorators: Extra initializer (private static getter)
  Code: oldAddInitializer(() => { })
  Expected: throws instanceof TypeError
  Observed: returns undefined

❌ Setter decorators: Extra initializer (instance setter)
  Code: oldAddInitializer(() => { })
  Expected: throws instanceof TypeError
  Observed: returns undefined

❌ Setter decorators: Extra initializer (static setter)
  Code: oldAddInitializer(() => { })
  Expected: throws instanceof TypeError
  Observed: returns undefined

❌ Setter decorators: Extra initializer (private instance setter)
  Code: oldAddInitializer(() => { })
  Expected: throws instanceof TypeError
  Observed: returns undefined

❌ Setter decorators: Extra initializer (private static setter)
  Code: oldAddInitializer(() => { })
  Expected: throws instanceof TypeError
  Observed: returns undefined

❌ Auto-accessor decorators: Extra initializer (instance auto-accessor)
  Code: oldAddInitializer(() => { })
  Expected: throws instanceof TypeError
  Observed: returns undefined

❌ Auto-accessor decorators: Extra initializer (static auto-accessor)
  Code: oldAddInitializer(() => { })
  Expected: throws instanceof TypeError
  Observed: returns undefined

❌ Auto-accessor decorators: Extra initializer (private instance auto-accessor)
  Code: oldAddInitializer(() => { })
  Expected: throws instanceof TypeError
  Observed: returns undefined

❌ Auto-accessor decorators: Extra initializer (private static auto-accessor)
  Code: oldAddInitializer(() => { })
  Expected: throws instanceof TypeError
  Observed: returns undefined

❌ Decorator list evaluation: "this" (class statement)
  Code: _classThis_1.foo(5)
  Throws: TypeError: _classThis_1.foo is not a function

❌ Decorator list evaluation: "this" (class statement)
  Code: _classThis_1.foo(11)
  Throws: TypeError: _classThis_1.foo is not a function

❌ Decorator list evaluation: "this" (class statement)
  Code: '' + log
  Expected: "0,1,2,3,4,5,6,7,8,9,10,11"
  Observed: "0,1,2,3,4,6,7,8,9,10"

❌ Decorator list evaluation: "this" (class expression)
  Code: _classThis_1.foo(5)
  Throws: TypeError: _classThis_1.foo is not a function

❌ Decorator list evaluation: "this" (class expression)
  Code: _classThis_1.foo(11)
  Throws: TypeError: _classThis_1.foo is not a function

❌ Decorator list evaluation: "this" (class expression)
  Code: '' + log
  Expected: "0,1,2,3,4,5,6,7,8,9,10,11"
  Observed: "0,1,2,3,4,6,7,8,9,10"

❌ Decorator list evaluation: "await" (class statement)
  Throws: SyntaxError: "await" can only be used inside an "async" function

❌ Decorator list evaluation: "await" (class expression)
  Throws: SyntaxError: "await" can only be used inside an "async" function

❌ Decorator list evaluation: Class binding (class statement)
  Code: fn()
  Expected: throws instanceof ReferenceError
  Observed: returns undefined

❌ Decorator list evaluation: Class binding (class statement)
  Code: fn()
  Expected: throws instanceof ReferenceError
  Observed: returns undefined

❌ Decorator list evaluation: Class binding (class statement)
  Code: fn()
  Expected: throws instanceof ReferenceError
  Observed: returns undefined

❌ Decorator list evaluation: Class binding (class statement)
  Code: fn()
  Expected: throws instanceof ReferenceError
  Observed: returns undefined

❌ Decorator list evaluation: Class binding (class statement)
  Code: fn()
  Expected: throws instanceof ReferenceError
  Observed: returns undefined

❌ Decorator list evaluation: Class binding (class statement)
  Code: fn()
  Expected: throws instanceof ReferenceError
  Observed: returns undefined

❌ Decorator list evaluation: Class binding (class statement)
  Code: fn()
  Expected: throws instanceof ReferenceError
  Observed: returns undefined

❌ Decorator list evaluation: Class binding (class statement)
  Code: fn()
  Expected: throws instanceof ReferenceError
  Observed: returns undefined

❌ Decorator list evaluation: Class binding (class statement)
  Code: fn()
  Expected: throws instanceof ReferenceError
  Observed: returns undefined

❌ Decorator list evaluation: Class binding (class statement)
  Code: fn()
  Expected: throws instanceof ReferenceError
  Observed: returns undefined

❌ Decorator list evaluation: Class binding (class statement)
  Code: fn()
  Expected: throws instanceof ReferenceError
  Observed: returns undefined

❌ Decorator list evaluation: Class binding (class statement)
  Code: firstFn()
  Expected: null
  Observed: class

❌ Decorator list evaluation: Class binding (class expression)
  Code: firstFn()
  Expected: throws instanceof ReferenceError
  Observed: returns class

❌ Initializer order (public members, class expression)
  Code: log + ''
  Expected: "start,extends,M1,M2,G1,G2,S1,S2,A1,A2,m1,m2,g1,g2,s1,s2,a1,a2,F1,F2,f1,f2,c1,c2,M3,M4,M5,M6,G3,G4,G5,G6,S3,S4,S5,S6,static:start,F7,F8,F3,F4,F5,F6,A7,A8,A3,A4,A5,A6,static:end,c3,c4,c5,c6,after,ctor:start,m3,m4,m5,m6,g3,g4,g5,g6,s3,s4,s5,s6,f7,f8,f3,f4,f5,f6,a7,a8,a3,a4,a5,a6,ctor:end,end"
  Observed: "start,extends,M1,M2,G1,G2,S1,S2,A1,A2,m1,m2,g1,g2,s1,s2,a1,a2,F1,F2,f1,f2,c1,c2,M3,M4,M5,M6,G3,G4,G5,G6,S3,S4,S5,S6,static:start,F7,F8,F3,F4,F5,F6,A7,A8,A3,A4,A5,A6,static:end,c3,c4,c5,c6,F7,F8,F3,F4,F5,F6,A7,A8,after,ctor:start,m3,m4,m5,m6,g3,g4,g5,g6,s3,s4,s5,s6,f7,f8,f3,f4,f5,f6,a7,a8,a3,a4,a5,a6,ctor:end,end"

❌ Initializer order (private members, class expression)
  Code: log + ''
  Expected: "start,extends,M1,M2,G1,G2,S1,S2,A1,A2,m1,m2,g1,g2,s1,s2,a1,a2,F1,F2,f1,f2,c1,c2,M3,M4,M5,M6,G3,G4,G5,G6,S3,S4,S5,S6,static:start,F7,F8,F3,F4,F5,F6,A7,A8,A3,A4,A5,A6,static:end,c3,c4,c5,c6,after,ctor:start,m3,m4,m5,m6,g3,g4,g5,g6,s3,s4,s5,s6,f7,f8,f3,f4,f5,f6,a7,a8,a3,a4,a5,a6,ctor:end,end"
  Observed: "start,extends,M1,M2,G1,G2,S1,S2,A1,A2,m1,m2,g1,g2,s1,s2,a1,a2,F1,F2,f1,f2,c1,c2,M3,M4,M5,M6,G3,G4,G5,G6,S3,S4,S5,S6,static:start,F7,F8,F3,F4,F5,F6,A7,A8,A3,A4,A5,A6,static:end,c3,c4,c5,c6,F7,F8,F3,F4,F5,F6,A7,A8,after,ctor:start,m3,m4,m5,m6,g3,g4,g5,g6,s3,s4,s5,s6,f7,f8,f3,f4,f5,f6,a7,a8,a3,a4,a5,a6,ctor:end,end"

❌ 44 checks failed
```

</details>

### Babel (`@babel/plugin-proposal-decorators@7.24.1`)

Known issues:

* Decorators on anonymous classes can cause Babel to crash due to [a compiler bug](https://github.com/babel/babel/issues/16473).
* References to the uninitialized class name within a decorator return `undefined` instead of throwing a `ReferenceError`.
* Babel throws `Error` instead of `TypeError` when `addInitializer` is used after `decorationState.[[Finished]]` is true.

<details>
<summary>❌ 36 checks failed (click for details)</summary>

```
❌ Class decorators: Extra initializer
  Code: oldAddInitializer(() => {})
  Expected: throws instanceof TypeError
  Observed: throws Error: attempted to call addInitializer after decoration was finished

❌ Method decorators: Extra initializer (instance method)
  Code: oldAddInitializer(() => {})
  Expected: throws instanceof TypeError
  Observed: throws Error: attempted to call addInitializer after decoration was finished

❌ Method decorators: Extra initializer (static method)
  Code: oldAddInitializer(() => {})
  Expected: throws instanceof TypeError
  Observed: throws Error: attempted to call addInitializer after decoration was finished

❌ Method decorators: Extra initializer (private instance method)
  Code: oldAddInitializer(() => {})
  Expected: throws instanceof TypeError
  Observed: throws Error: attempted to call addInitializer after decoration was finished

❌ Method decorators: Extra initializer (private static method)
  Code: oldAddInitializer(() => {})
  Expected: throws instanceof TypeError
  Observed: throws Error: attempted to call addInitializer after decoration was finished

❌ Field decorators: Extra initializer (instance field)
  Code: oldAddInitializer(() => {})
  Expected: throws instanceof TypeError
  Observed: throws Error: attempted to call addInitializer after decoration was finished

❌ Field decorators: Extra initializer (static field)
  Code: oldAddInitializer(() => {})
  Expected: throws instanceof TypeError
  Observed: throws Error: attempted to call addInitializer after decoration was finished

❌ Field decorators: Extra initializer (private instance field)
  Code: oldAddInitializer(() => {})
  Expected: throws instanceof TypeError
  Observed: throws Error: attempted to call addInitializer after decoration was finished

❌ Field decorators: Extra initializer (private static field)
  Code: oldAddInitializer(() => {})
  Expected: throws instanceof TypeError
  Observed: throws Error: attempted to call addInitializer after decoration was finished

❌ Getter decorators: Extra initializer (instance getter)
  Code: oldAddInitializer(() => {})
  Expected: throws instanceof TypeError
  Observed: throws Error: attempted to call addInitializer after decoration was finished

❌ Getter decorators: Extra initializer (static getter)
  Code: oldAddInitializer(() => {})
  Expected: throws instanceof TypeError
  Observed: throws Error: attempted to call addInitializer after decoration was finished

❌ Getter decorators: Extra initializer (private instance getter)
  Code: oldAddInitializer(() => {})
  Expected: throws instanceof TypeError
  Observed: throws Error: attempted to call addInitializer after decoration was finished

❌ Getter decorators: Extra initializer (private static getter)
  Code: oldAddInitializer(() => {})
  Expected: throws instanceof TypeError
  Observed: throws Error: attempted to call addInitializer after decoration was finished

❌ Setter decorators: Extra initializer (instance setter)
  Code: oldAddInitializer(() => {})
  Expected: throws instanceof TypeError
  Observed: throws Error: attempted to call addInitializer after decoration was finished

❌ Setter decorators: Extra initializer (static setter)
  Code: oldAddInitializer(() => {})
  Expected: throws instanceof TypeError
  Observed: throws Error: attempted to call addInitializer after decoration was finished

❌ Setter decorators: Extra initializer (private instance setter)
  Code: oldAddInitializer(() => {})
  Expected: throws instanceof TypeError
  Observed: throws Error: attempted to call addInitializer after decoration was finished

❌ Setter decorators: Extra initializer (private static setter)
  Code: oldAddInitializer(() => {})
  Expected: throws instanceof TypeError
  Observed: throws Error: attempted to call addInitializer after decoration was finished

❌ Auto-accessor decorators: Extra initializer (instance auto-accessor)
  Code: oldAddInitializer(() => {})
  Expected: throws instanceof TypeError
  Observed: throws Error: attempted to call addInitializer after decoration was finished

❌ Auto-accessor decorators: Extra initializer (static auto-accessor)
  Code: oldAddInitializer(() => {})
  Expected: throws instanceof TypeError
  Observed: throws Error: attempted to call addInitializer after decoration was finished

❌ Auto-accessor decorators: Extra initializer (private instance auto-accessor)
  Code: oldAddInitializer(() => {})
  Expected: throws instanceof TypeError
  Observed: throws Error: attempted to call addInitializer after decoration was finished

❌ Auto-accessor decorators: Extra initializer (private static auto-accessor)
  Code: oldAddInitializer(() => {})
  Expected: throws instanceof TypeError
  Observed: throws Error: attempted to call addInitializer after decoration was finished

❌ Decorator list evaluation: Computed names (class expression)
  Throws: unknown file: Property object of MemberExpression expected node to be of a type ["Expression","Super"] but instead got undefined

❌ Decorator list evaluation: "this" (class expression)
  Throws: unknown file: Property object of MemberExpression expected node to be of a type ["Expression","Super"] but instead got undefined

❌ Decorator list evaluation: "await" (class expression)
  Throws: unknown file: Property object of MemberExpression expected node to be of a type ["Expression","Super"] but instead got undefined

❌ Decorator list evaluation: Outer private name (class expression)
  Throws: unknown file: Property object of MemberExpression expected node to be of a type ["Expression","Super"] but instead got undefined

❌ Decorator list evaluation: Class binding (class statement)
  Code: fn()
  Expected: throws instanceof ReferenceError
  Observed: returns undefined

❌ Decorator list evaluation: Class binding (class statement)
  Code: fn()
  Expected: throws instanceof ReferenceError
  Observed: returns undefined

❌ Decorator list evaluation: Class binding (class statement)
  Code: fn()
  Expected: throws instanceof ReferenceError
  Observed: returns undefined

❌ Decorator list evaluation: Class binding (class statement)
  Code: fn()
  Expected: throws instanceof ReferenceError
  Observed: returns undefined

❌ Decorator list evaluation: Class binding (class statement)
  Code: fn()
  Expected: throws instanceof ReferenceError
  Observed: returns undefined

❌ Decorator list evaluation: Class binding (class statement)
  Code: fn()
  Expected: throws instanceof ReferenceError
  Observed: returns undefined

❌ Decorator list evaluation: Class binding (class statement)
  Code: fn()
  Expected: throws instanceof ReferenceError
  Observed: returns undefined

❌ Decorator list evaluation: Class binding (class statement)
  Code: fn()
  Expected: throws instanceof ReferenceError
  Observed: returns undefined

❌ Decorator list evaluation: Class binding (class statement)
  Code: fn()
  Expected: throws instanceof ReferenceError
  Observed: returns undefined

❌ Decorator list evaluation: Class binding (class statement)
  Code: fn()
  Expected: throws instanceof ReferenceError
  Observed: returns undefined

❌ Decorator list evaluation: Class binding (class expression)
  Code: firstFn()
  Expected: throws instanceof ReferenceError
  Observed: returns class

❌ 36 checks failed
```

</details>
