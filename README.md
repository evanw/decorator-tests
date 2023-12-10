# JavaScript Decorator Tests

This repo contains a single file with many behavioral tests for the upcoming [decorators feature](https://github.com/tc39/proposal-decorators) in JavaScript. It's intended to be easy to use for testing a given JavaScript implementation: just run the file [`decorator-tests.js`](./decorator-tests.js) and see what `console.log` prints (although you may need to comment out some of the tests if your implementation emits code containing syntax errors, which TypeScript and Babel both currently do). The source code for that file is in TypeScript (see [`decorator-tests.ts`](./decorator-tests.ts)) to make authoring the tests easier (e.g. to catch typos). I'm planning to use these tests to help me implement JavaScript decorators for [esbuild](https://github.com/evanw/esbuild).

Some caveats:

* The specification is still a work in progress, and may be outdated
* I'm not the author of the specification and I may have misinterpreted it
* Deviations from the specification by the tools below may be intentional

You can use `node run.mjs` after `npm install` to run and update the tests below.

## Test Results

### TypeScript (`typescript@5.3.3`)

Known issues:

* In decorators of static fields and static accessors, the value of `this` appears to be incorrect.
* Using `await` within a decorator can cause TypeScript to emit invalid code containing a syntax error.
* References to the uninitialized class name within a decorator return `undefined` instead of throwing a `ReferenceError`.

<details>
<summary>❌ 16 checks failed (click for details)</summary>

```
❌ Decorator list evaluation: "this"
  Code: _classThis_1.foo(4)
  Throws: TypeError: _classThis_1.foo is not a function

❌ Decorator list evaluation: "this"
  Code: _classThis_1.foo(10)
  Throws: TypeError: _classThis_1.foo is not a function

❌ Decorator list evaluation: "this"
  Code: '' + log
  Expected: "0,1,2,3,4,5,6,7,8,9,10"
  Observed: "0,1,2,3,5,6,7,8,9"

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

### Babel (`@babel/plugin-proposal-decorators@7.23.5`)

Known issues:

* Decorators on class expressions do not yet use the correct name: [https://github.com/babel/babel/pull/15122](https://github.com/babel/babel/pull/15122).
* The name provided to decorators on private methods (both static and non-static) is empty.
* The context object property `access` exposes the underlying getter and setter instead of the `Get` and `Set` abstract operations.
* Using a private name within a decorator can cause Babel to emit invalid code containing a syntax error.

<details>
<summary>❌ 49 checks failed (click for details)</summary>

```
❌ Class decorators: Basic expression: Property value
  Code: cls.name
  Expected: "Foo"
  Observed: ""

❌ Class decorators: Basic expression: Property value
  Code: ctx.name
  Expected: "Foo"
  Observed: ""

❌ Class decorators: Basic expression: Array binding
  Code: cls.name
  Expected: "Foo"
  Observed: ""

❌ Class decorators: Basic expression: Array binding
  Code: ctx.name
  Expected: "Foo"
  Observed: ""

❌ Class decorators: Basic expression: Object binding
  Code: cls.name
  Expected: "Foo"
  Observed: ""

❌ Class decorators: Basic expression: Object binding
  Code: ctx.name
  Expected: "Foo"
  Observed: ""

❌ Class decorators: Basic expression: Assignment initializer
  Code: cls.name
  Expected: "Foo"
  Observed: ""

❌ Class decorators: Basic expression: Assignment initializer
  Code: ctx.name
  Expected: "Foo"
  Observed: ""

❌ Class decorators: Basic expression: Assignment array binding
  Code: cls.name
  Expected: "Foo"
  Observed: ""

❌ Class decorators: Basic expression: Assignment array binding
  Code: ctx.name
  Expected: "Foo"
  Observed: ""

❌ Class decorators: Basic expression: Assignment object binding
  Code: cls.name
  Expected: "Foo"
  Observed: ""

❌ Class decorators: Basic expression: Assignment object binding
  Code: ctx.name
  Expected: "Foo"
  Observed: ""

❌ Class decorators: Basic expression: Instance field initializer
  Code: cls.name
  Expected: "Foo"
  Observed: ""

❌ Class decorators: Basic expression: Instance field initializer
  Code: ctx.name
  Expected: "Foo"
  Observed: ""

❌ Class decorators: Basic expression: Static field initializer
  Code: cls.name
  Expected: "Foo"
  Observed: ""

❌ Class decorators: Basic expression: Static field initializer
  Code: ctx.name
  Expected: "Foo"
  Observed: ""

❌ Class decorators: Basic expression: Instance auto-accessor initializer
  Code: cls.name
  Expected: "Foo"
  Observed: ""

❌ Class decorators: Basic expression: Instance auto-accessor initializer
  Code: ctx.name
  Expected: "Foo"
  Observed: ""

❌ Class decorators: Basic expression: Static auto-accessor initializer
  Code: cls.name
  Expected: "Foo"
  Observed: ""

❌ Class decorators: Basic expression: Static auto-accessor initializer
  Code: ctx.name
  Expected: "Foo"
  Observed: ""

❌ Method decorators: Basic (private instance method)
  Code: fn.name
  Expected: "#foo"
  Observed: ""

❌ Method decorators: Basic (private static method)
  Code: fn.name
  Expected: "#foo"
  Observed: ""

❌ Getter decorators: Basic (instance getter)
  Code: ctx.access.get({ foo: 123 })
  Expected: 123
  Observed: undefined

❌ Getter decorators: Basic (static getter)
  Code: ctx.access.get({ foo: 123 })
  Expected: 123
  Observed: undefined

❌ Setter decorators: Basic (instance setter)
  Code: obj2.foo
  Expected: 123
  Observed: undefined

❌ Setter decorators: Basic (instance setter)
  Code: "bar" in obj2
  Expected: false
  Observed: true

❌ Setter decorators: Basic (static setter)
  Code: obj.foo
  Expected: 123
  Observed: undefined

❌ Setter decorators: Basic (static setter)
  Code: "bar" in obj
  Expected: false
  Observed: true

❌ Auto-accessor decorators: Basic (instance auto-accessor)
  Code: ctx.access.get({ foo: 123 })
  Throws: TypeError: Cannot read private member #A from an object whose class did not declare it

❌ Auto-accessor decorators: Basic (instance auto-accessor)
  Code: { const obj2 = {}; ctx.access.set(obj2, 123); return obj2.foo; }
  Throws: TypeError: Cannot write private member #A to an object whose class did not declare it

❌ Auto-accessor decorators: Basic (static auto-accessor)
  Code: ctx.access.get({ foo: 123 })
  Throws: TypeError: Cannot read private member #A from an object whose class did not declare it

❌ Auto-accessor decorators: Basic (static auto-accessor)
  Code: { const obj = {}; ctx.access.set(obj, 123); return obj.foo; }
  Throws: TypeError: Cannot write private member #A to an object whose class did not declare it

❌ Auto-accessor decorators: Basic (private static auto-accessor)
  Code: { ctx.access.set(Foo, 123); return get$foo(Foo); }
  Throws: TypeError: Receiver must be an instance of class Foo

❌ Auto-accessor decorators: Basic (private static auto-accessor)
  Code: set$foo(Foo, 321)
  Throws: TypeError: Receiver must be an instance of class Foo

❌ Auto-accessor decorators: Basic (private static auto-accessor)
  Code: get$foo(Foo)
  Throws: TypeError: Receiver must be an instance of class Foo

❌ Auto-accessor decorators: Shim (private static auto-accessor)
  Code: get$foo(Foo)
  Throws: TypeError: Receiver must be an instance of class Foo

❌ Auto-accessor decorators: Shim (private static auto-accessor)
  Code: set$foo(Foo, 321)
  Throws: TypeError: Receiver must be an instance of class Foo

❌ Auto-accessor decorators: Shim (private static auto-accessor)
  Code: get$foo(Foo)
  Throws: TypeError: Receiver must be an instance of class Foo

❌ Decorator list evaluation: Inner private name
  Throws: SyntaxError: Private name "#foo2" must be declared in an enclosing class

❌ Decorator list evaluation: Class binding
  Code: fn()
  Expected: class
  Observed: null

❌ Decorator list evaluation: Class binding
  Code: fn()
  Expected: class
  Observed: null

❌ Decorator list evaluation: Class binding
  Code: fn()
  Expected: class
  Observed: null

❌ Decorator list evaluation: Class binding
  Code: fn()
  Expected: class
  Observed: null

❌ Decorator list evaluation: Class binding
  Code: fn()
  Expected: class
  Observed: null

❌ Decorator list evaluation: Class binding
  Code: fn()
  Expected: class
  Observed: null

❌ Decorator list evaluation: Class binding
  Code: fn()
  Expected: class
  Observed: null

❌ Decorator list evaluation: Class binding
  Code: fn()
  Expected: class
  Observed: null

❌ Decorator list evaluation: Class binding
  Code: fn()
  Expected: class
  Observed: null

❌ Decorator list evaluation: Class binding
  Code: fn()
  Expected: class
  Observed: null

❌ 49 checks failed
```

</details>
