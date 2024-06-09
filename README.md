# JavaScript Decorator Tests

This repo contains a single file with many behavioral tests for the upcoming [decorators](https://github.com/tc39/proposal-decorators) and [decorator metadata](https://github.com/tc39/proposal-decorator-metadata) features in JavaScript. It's intended to be easy to use for testing a given JavaScript implementation: just run the file [`decorator-tests.js`](./decorator-tests.js) and see what `console.log` prints (although you may need to comment out some of the tests if your implementation emits code containing syntax errors, which TypeScript currently does). The source code for that file is in TypeScript (see [`decorator-tests.ts`](./decorator-tests.ts)) to make authoring the tests easier (e.g. to catch typos). I'm planning to use these tests to help me implement JavaScript decorators for [esbuild](https://github.com/evanw/esbuild).

Some caveats:

* The specifications are still a work in progress, and may be outdated
* I'm not the author of the specifications and I may have misinterpreted them
* Deviations from the specifications by the tools below may be intentional
* The specifications themselves don't yet have good test coverage (see [this](https://github.com/tc39/test262/issues/3997) and [this](https://github.com/tc39/test262/issues/4042))

You can use `node run.mjs` after `npm install` to run and update the tests below.

## Test Results

### esbuild (`esbuild@0.21.3`)

Known issues:

* Decorator metadata is only applied to classes with a class-level decorator ([bug #3781](https://github.com/evanw/esbuild/issues/3781)).
* Class binding references are incorrect if a decorator changes them ([bug #3787](https://github.com/evanw/esbuild/issues/3787)).

<details>
<summary>❌ 23 checks failed (click for details)</summary>

```
❌ Class decorators: Binding initialization (class statement)
  Code: block
  Expected: class
  Observed: class

❌ Class decorators: Binding initialization (class statement)
  Code: Foo2.field
  Expected: class
  Observed: undefined

❌ Class decorators: Binding initialization (class statement)
  Code: foo.field
  Expected: class
  Observed: class

❌ Class decorators: Binding initialization (class statement)
  Code: old.getter
  Expected: class
  Observed: class

❌ Class decorators: Binding initialization (class statement)
  Code: foo.getter
  Expected: class
  Observed: class

❌ Class decorators: Binding initialization (class statement)
  Code: (obj = { foo: null }, old.setter = obj, obj.foo)
  Expected: class
  Observed: class

❌ Class decorators: Binding initialization (class statement)
  Code: (obj = { foo: null }, foo.setter = obj, obj.foo)
  Expected: class
  Observed: class

❌ Class decorators: Binding initialization (class expression)
  Code: block
  Expected: class
  Observed: undefined

❌ Class decorators: Binding initialization (class expression)
  Code: Foo2.field
  Expected: class
  Observed: undefined

❌ Decorator metadata: class statement
  Code: order(foo)
  Throws: TypeError: Cannot read properties of null (reading 'staticAccessor')

❌ Decorator metadata: class statement
  Code: Object.getPrototypeOf(foo)
  Throws: TypeError: Cannot convert undefined or null to object

❌ Decorator metadata: class statement
  Code: order(bar)
  Throws: TypeError: Cannot read properties of null (reading 'staticAccessor')

❌ Decorator metadata: class statement
  Code: Object.getPrototypeOf(bar)
  Throws: TypeError: Cannot convert undefined or null to object

❌ Decorator metadata: class statement
  Code: JSON.stringify(FooOneDec[Symbol.metadata])
  Expected: "{\"x\":22}"
  Observed: "null"

❌ Decorator metadata: class statement
  Code: JSON.stringify(BarOneDec[Symbol.metadata])
  Expected: "{\"y\":23}"
  Observed: "null"

❌ Decorator metadata: class statement
  Code: Object.getPrototypeOf(BarOneDec[Symbol.metadata])
  Throws: TypeError: Cannot convert undefined or null to object

❌ Decorator metadata: class expression
  Code: order(foo)
  Throws: TypeError: Cannot read properties of null (reading 'staticAccessor')

❌ Decorator metadata: class expression
  Code: Object.getPrototypeOf(foo)
  Throws: TypeError: Cannot convert undefined or null to object

❌ Decorator metadata: class expression
  Code: order(bar)
  Throws: TypeError: Cannot read properties of null (reading 'staticAccessor')

❌ Decorator metadata: class expression
  Code: Object.getPrototypeOf(bar)
  Throws: TypeError: Cannot convert undefined or null to object

❌ Decorator metadata: class expression
  Code: JSON.stringify(FooOneDec[Symbol.metadata])
  Expected: "{\"x\":22}"
  Observed: "null"

❌ Decorator metadata: class expression
  Code: JSON.stringify(BarOneDec[Symbol.metadata])
  Expected: "{\"y\":23}"
  Observed: "null"

❌ Decorator metadata: class expression
  Code: Object.getPrototypeOf(BarOneDec[Symbol.metadata])
  Throws: TypeError: Cannot convert undefined or null to object

❌ 23 checks failed
```

</details>

### Babel (`@babel/plugin-proposal-decorators@7.24.6`)

Known issues:

* References to the uninitialized class name within a decorator return `undefined` instead of throwing a `ReferenceError`.

<details>
<summary>❌ 11 checks failed (click for details)</summary>

```
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

❌ 11 checks failed
```

</details>

### TypeScript (`typescript@5.5.1-rc`)

Known issues:

* In decorators of static fields and static accessors, the value of `this` appears to be incorrect.
* Using `await` within a decorator can cause TypeScript to emit invalid code containing a syntax error.
* References to the uninitialized class name within a decorator return `undefined` instead of throwing a `ReferenceError`.
* TypeScript doesn't prevent `addInitializer` from adding more initializers after `decorationState.[[Finished]]` is true.

<details>
<summary>❌ 44 checks failed (click for details)</summary>

```
❌ Class decorators: Extra initializer
  Code: oldAddInitializer(() => { })
  Expected: throws instanceof TypeError
  Observed: returns undefined

❌ Class decorators: Binding initialization (class statement)
  Code: Foo.field
  Expected: class
  Observed: undefined

❌ Class decorators: Binding initialization (class expression)
  Code: Foo.field
  Expected: class
  Observed: undefined

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

❌ 44 checks failed
```

</details>

### SWC (`@swc/core@1.5.7`)

Known issues:

* SWC implements an older version of the specification from 2022 with outdated behavior.
* Generated code sometimes has syntax errors because SWC fails to transform certain decorators.
* Generated code sometimes has syntax errors caused by duplicate private names in the same class.

<details>
<summary>❌ 242 checks failed (click for details)</summary>

```
❌ Class decorators: Basic expression: Property value
  Code: ()=>cls.name
  Expected: "Foo"
  Observed: ""

❌ Class decorators: Basic expression: Property value
  Code: ()=>ctx.name
  Expected: "Foo"
  Observed: ""

❌ Class decorators: Basic expression: Variable initializer
  Code: ()=>cls.name
  Expected: "Foo"
  Observed: ""

❌ Class decorators: Basic expression: Variable initializer
  Code: ()=>ctx.name
  Expected: "Foo"
  Observed: ""

❌ Class decorators: Basic expression: Array binding
  Code: ()=>cls.name
  Expected: "Foo"
  Observed: ""

❌ Class decorators: Basic expression: Array binding
  Code: ()=>ctx.name
  Expected: "Foo"
  Observed: ""

❌ Class decorators: Basic expression: Object binding
  Code: ()=>cls.name
  Expected: "Foo"
  Observed: ""

❌ Class decorators: Basic expression: Object binding
  Code: ()=>ctx.name
  Expected: "Foo"
  Observed: ""

❌ Class decorators: Basic expression: Assignment initializer
  Code: ()=>cls.name
  Expected: "Foo"
  Observed: ""

❌ Class decorators: Basic expression: Assignment initializer
  Code: ()=>ctx.name
  Expected: "Foo"
  Observed: ""

❌ Class decorators: Basic expression: Assignment array binding
  Code: ()=>cls.name
  Expected: "Foo"
  Observed: ""

❌ Class decorators: Basic expression: Assignment array binding
  Code: ()=>ctx.name
  Expected: "Foo"
  Observed: ""

❌ Class decorators: Basic expression: Assignment object binding
  Code: ()=>cls.name
  Expected: "Foo"
  Observed: ""

❌ Class decorators: Basic expression: Assignment object binding
  Code: ()=>ctx.name
  Expected: "Foo"
  Observed: ""

❌ Class decorators: Basic expression: Instance field initializer
  Code: ()=>cls.name
  Expected: "Foo"
  Observed: ""

❌ Class decorators: Basic expression: Instance field initializer
  Code: ()=>ctx.name
  Expected: "Foo"
  Observed: ""

❌ Class decorators: Basic expression: Static field initializer
  Code: ()=>cls.name
  Expected: "Foo"
  Observed: ""

❌ Class decorators: Basic expression: Static field initializer
  Code: ()=>ctx.name
  Expected: "Foo"
  Observed: ""

❌ Class decorators: Basic expression: Instance auto-accessor initializer
  Throws: SyntaxError: Invalid or unexpected token

❌ Class decorators: Basic expression: Static auto-accessor initializer
  Throws: SyntaxError: Invalid or unexpected token

❌ Class decorators: Extra initializer
  Code: ()=>oldAddInitializer(()=>{})
  Expected: throws instanceof TypeError
  Observed: throws Error: attempted to call addInitializer after decoration was finished

❌ Class decorators: Binding initialization (class statement)
  Throws: ReferenceError: Foo is not defined

❌ Class decorators: Binding initialization (class expression)
  Throws: SyntaxError: The symbol "#___private_accessor" has already been declared

❌ Method decorators: Basic (instance method)
  Code: ()=>ctx.access.has({ [key]: false })
  Throws: TypeError: ctx.access.has is not a function

❌ Method decorators: Basic (instance method)
  Code: ()=>ctx.access.has({ bar: true })
  Throws: TypeError: ctx.access.has is not a function

❌ Method decorators: Basic (instance method)
  Code: ()=>ctx.access.get({ [key]: 123 })
  Expected: 123
  Observed: foo() {}

❌ Method decorators: Basic (instance method)
  Code: ()=>ctx.access.has({ [key]: false })
  Throws: TypeError: ctx.access.has is not a function

❌ Method decorators: Basic (instance method)
  Code: ()=>ctx.access.has({ bar: true })
  Throws: TypeError: ctx.access.has is not a function

❌ Method decorators: Basic (instance method)
  Code: ()=>ctx.access.get({ [key]: 123 })
  Expected: 123
  Observed: [bar]() {}

❌ Method decorators: Basic (instance method)
  Code: ()=>ctx.access.has({ [key]: false })
  Throws: TypeError: ctx.access.has is not a function

❌ Method decorators: Basic (instance method)
  Code: ()=>ctx.access.has({ bar: true })
  Throws: TypeError: ctx.access.has is not a function

❌ Method decorators: Basic (instance method)
  Code: ()=>ctx.access.get({ [key]: 123 })
  Expected: 123
  Observed: [baz]() {}

❌ Method decorators: Basic (static method)
  Code: ()=>ctx.access.has({ [key]: false })
  Throws: TypeError: ctx.access.has is not a function

❌ Method decorators: Basic (static method)
  Code: ()=>ctx.access.has({ bar: true })
  Throws: TypeError: ctx.access.has is not a function

❌ Method decorators: Basic (static method)
  Code: ()=>ctx.access.get({ [key]: 123 })
  Expected: 123
  Observed: foo() {}

❌ Method decorators: Basic (static method)
  Code: ()=>ctx.access.has({ [key]: false })
  Throws: TypeError: ctx.access.has is not a function

❌ Method decorators: Basic (static method)
  Code: ()=>ctx.access.has({ bar: true })
  Throws: TypeError: ctx.access.has is not a function

❌ Method decorators: Basic (static method)
  Code: ()=>ctx.access.get({ [key]: 123 })
  Expected: 123
  Observed: [bar]() {}

❌ Method decorators: Basic (static method)
  Code: ()=>ctx.access.has({ [key]: false })
  Throws: TypeError: ctx.access.has is not a function

❌ Method decorators: Basic (static method)
  Code: ()=>ctx.access.has({ bar: true })
  Throws: TypeError: ctx.access.has is not a function

❌ Method decorators: Basic (static method)
  Code: ()=>ctx.access.get({ [key]: 123 })
  Expected: 123
  Observed: [baz]() {}

❌ Method decorators: Basic (private instance method)
  Code: ()=>fn.name
  Expected: "#foo"
  Observed: ""

❌ Method decorators: Basic (private instance method)
  Code: ()=>ctx.access.has(new Foo)
  Throws: TypeError: ctx.access.has is not a function

❌ Method decorators: Basic (private instance method)
  Code: ()=>ctx.access.has({})
  Throws: TypeError: ctx.access.has is not a function

❌ Method decorators: Basic (private static method)
  Code: ()=>fn.name
  Expected: "#foo"
  Observed: ""

❌ Method decorators: Basic (private static method)
  Code: ()=>ctx.access.has(Foo)
  Throws: TypeError: ctx.access.has is not a function

❌ Method decorators: Basic (private static method)
  Code: ()=>ctx.access.has({})
  Throws: TypeError: ctx.access.has is not a function

❌ Method decorators: Extra initializer (instance method)
  Code: ()=>oldAddInitializer(()=>{})
  Expected: throws instanceof TypeError
  Observed: throws Error: attempted to call addInitializer after decoration was finished

❌ Method decorators: Extra initializer (static method)
  Code: ()=>oldAddInitializer(()=>{})
  Expected: throws instanceof TypeError
  Observed: throws Error: attempted to call addInitializer after decoration was finished

❌ Method decorators: Extra initializer (private instance method)
  Code: ()=>oldAddInitializer(()=>{})
  Expected: throws instanceof TypeError
  Observed: throws Error: attempted to call addInitializer after decoration was finished

❌ Method decorators: Extra initializer (private static method)
  Code: ()=>oldAddInitializer(()=>{})
  Expected: throws instanceof TypeError
  Observed: throws Error: attempted to call addInitializer after decoration was finished

❌ Field decorators: Basic (instance field)
  Code: ()=>ctx.access.has({ [key]: false })
  Throws: TypeError: ctx.access.has is not a function

❌ Field decorators: Basic (instance field)
  Code: ()=>ctx.access.has({ bar: true })
  Throws: TypeError: ctx.access.has is not a function

❌ Field decorators: Basic (instance field)
  Code: ()=>ctx.access.get({ [key]: 123 })
  Expected: 123
  Observed: undefined

❌ Field decorators: Basic (instance field)
  Code: ()=>{ const obj = {}; ctx.access.set(obj, 321); return obj[key]; }
  Expected: 321
  Observed: undefined

❌ Field decorators: Basic (instance field)
  Code: ()=>ctx.access.has({ [key]: false })
  Throws: TypeError: ctx.access.has is not a function

❌ Field decorators: Basic (instance field)
  Code: ()=>ctx.access.has({ bar: true })
  Throws: TypeError: ctx.access.has is not a function

❌ Field decorators: Basic (instance field)
  Code: ()=>ctx.access.get({ [key]: 123 })
  Expected: 123
  Observed: undefined

❌ Field decorators: Basic (instance field)
  Code: ()=>{ const obj = {}; ctx.access.set(obj, 321); return obj[key]; }
  Expected: 321
  Observed: undefined

❌ Field decorators: Basic (instance field)
  Code: ()=>ctx.access.has({ [key]: false })
  Throws: TypeError: ctx.access.has is not a function

❌ Field decorators: Basic (instance field)
  Code: ()=>ctx.access.has({ bar: true })
  Throws: TypeError: ctx.access.has is not a function

❌ Field decorators: Basic (instance field)
  Code: ()=>ctx.access.get({ [key]: 123 })
  Expected: 123
  Observed: undefined

❌ Field decorators: Basic (instance field)
  Code: ()=>{ const obj = {}; ctx.access.set(obj, 321); return obj[key]; }
  Expected: 321
  Observed: undefined

❌ Field decorators: Basic (static field)
  Code: ()=>ctx.access.has({ [key]: false })
  Throws: TypeError: ctx.access.has is not a function

❌ Field decorators: Basic (static field)
  Code: ()=>ctx.access.has({ bar: true })
  Throws: TypeError: ctx.access.has is not a function

❌ Field decorators: Basic (static field)
  Code: ()=>ctx.access.get({ [key]: 123 })
  Expected: 123
  Observed: undefined

❌ Field decorators: Basic (static field)
  Code: ()=>{ const obj = {}; ctx.access.set(obj, 321); return obj[key]; }
  Expected: 321
  Observed: undefined

❌ Field decorators: Basic (static field)
  Code: ()=>ctx.access.has({ [key]: false })
  Throws: TypeError: ctx.access.has is not a function

❌ Field decorators: Basic (static field)
  Code: ()=>ctx.access.has({ bar: true })
  Throws: TypeError: ctx.access.has is not a function

❌ Field decorators: Basic (static field)
  Code: ()=>ctx.access.get({ [key]: 123 })
  Expected: 123
  Observed: undefined

❌ Field decorators: Basic (static field)
  Code: ()=>{ const obj = {}; ctx.access.set(obj, 321); return obj[key]; }
  Expected: 321
  Observed: undefined

❌ Field decorators: Basic (static field)
  Code: ()=>ctx.access.has({ [key]: false })
  Throws: TypeError: ctx.access.has is not a function

❌ Field decorators: Basic (static field)
  Code: ()=>ctx.access.has({ bar: true })
  Throws: TypeError: ctx.access.has is not a function

❌ Field decorators: Basic (static field)
  Code: ()=>ctx.access.get({ [key]: 123 })
  Expected: 123
  Observed: undefined

❌ Field decorators: Basic (static field)
  Code: ()=>{ const obj = {}; ctx.access.set(obj, 321); return obj[key]; }
  Expected: 321
  Observed: undefined

❌ Field decorators: Basic (private instance field)
  Code: ()=>ctx.access.has(new Foo)
  Throws: TypeError: ctx.access.has is not a function

❌ Field decorators: Basic (private instance field)
  Code: ()=>ctx.access.has({})
  Throws: TypeError: ctx.access.has is not a function

❌ Field decorators: Basic (private instance field)
  Code: ()=>ctx.access.get(new Foo)
  Throws: TypeError: Cannot read private member #foo from an object whose class did not declare it

❌ Field decorators: Basic (private instance field)
  Code: ()=>{ const obj = new Foo; ctx.access.set(obj, 321); return get$foo(obj); }
  Throws: TypeError: Cannot write private member #foo to an object whose class did not declare it

❌ Field decorators: Basic (private static field)
  Code: ()=>ctx.access.has(Foo)
  Throws: TypeError: ctx.access.has is not a function

❌ Field decorators: Basic (private static field)
  Code: ()=>ctx.access.has({})
  Throws: TypeError: ctx.access.has is not a function

❌ Field decorators: Basic (private static field)
  Code: ()=>ctx.access.get(Foo)
  Throws: TypeError: Cannot read private member #foo from an object whose class did not declare it

❌ Field decorators: Basic (private static field)
  Code: ()=>{ ctx.access.set(Foo, 321); return get$foo(Foo); }
  Throws: TypeError: Cannot write private member #foo to an object whose class did not declare it

❌ Field decorators: Order (instance field)
  Code: ()=>log + ''
  Expected: "0,1,2,3,4,5,6"
  Observed: "0,1,2,3,5,4,6"

❌ Field decorators: Order (static field)
  Code: ()=>log + ''
  Expected: "0,1,2,3,4,5"
  Observed: "0,1,2,4,3,5"

❌ Field decorators: Order (private instance field)
  Code: ()=>log + ''
  Expected: "0,1,2,3,4,5,6"
  Observed: "0,1,2,3,5,4,6"

❌ Field decorators: Order (private static field)
  Code: ()=>log + ''
  Expected: "0,1,2,3,4,5"
  Observed: "0,1,2,4,3,5"

❌ Field decorators: Extra initializer (instance field)
  Code: ()=>oldAddInitializer(()=>{})
  Expected: throws instanceof TypeError
  Observed: throws Error: attempted to call addInitializer after decoration was finished

❌ Field decorators: Extra initializer (instance field)
  Code: ()=>got.this
  Throws: TypeError: Cannot read properties of undefined (reading 'this')

❌ Field decorators: Extra initializer (instance field)
  Code: ()=>got.args.length
  Throws: TypeError: Cannot read properties of undefined (reading 'args')

❌ Field decorators: Extra initializer (static field)
  Code: ()=>oldAddInitializer(()=>{})
  Expected: throws instanceof TypeError
  Observed: throws Error: attempted to call addInitializer after decoration was finished

❌ Field decorators: Extra initializer (static field)
  Code: ()=>got.this
  Throws: TypeError: Cannot read properties of undefined (reading 'this')

❌ Field decorators: Extra initializer (static field)
  Code: ()=>got.args.length
  Throws: TypeError: Cannot read properties of undefined (reading 'args')

❌ Field decorators: Extra initializer (private instance field)
  Code: ()=>oldAddInitializer(()=>{})
  Expected: throws instanceof TypeError
  Observed: throws Error: attempted to call addInitializer after decoration was finished

❌ Field decorators: Extra initializer (private instance field)
  Code: ()=>got.this
  Throws: TypeError: Cannot read properties of undefined (reading 'this')

❌ Field decorators: Extra initializer (private instance field)
  Code: ()=>got.args.length
  Throws: TypeError: Cannot read properties of undefined (reading 'args')

❌ Field decorators: Extra initializer (private static field)
  Code: ()=>oldAddInitializer(()=>{})
  Expected: throws instanceof TypeError
  Observed: throws Error: attempted to call addInitializer after decoration was finished

❌ Field decorators: Extra initializer (private static field)
  Code: ()=>got.this
  Throws: TypeError: Cannot read properties of undefined (reading 'this')

❌ Field decorators: Extra initializer (private static field)
  Code: ()=>got.args.length
  Throws: TypeError: Cannot read properties of undefined (reading 'args')

❌ Getter decorators: Basic (instance getter)
  Code: ()=>ctx.access.has({ [key]: false })
  Throws: TypeError: ctx.access.has is not a function

❌ Getter decorators: Basic (instance getter)
  Code: ()=>ctx.access.has({ bar: true })
  Throws: TypeError: ctx.access.has is not a function

❌ Getter decorators: Basic (instance getter)
  Code: ()=>ctx.access.get({ [key]: 123 })
  Expected: 123
  Observed: undefined

❌ Getter decorators: Basic (instance getter)
  Code: ()=>ctx.access.has({ [key]: false })
  Throws: TypeError: ctx.access.has is not a function

❌ Getter decorators: Basic (instance getter)
  Code: ()=>ctx.access.has({ bar: true })
  Throws: TypeError: ctx.access.has is not a function

❌ Getter decorators: Basic (instance getter)
  Code: ()=>ctx.access.get({ [key]: 123 })
  Expected: 123
  Observed: undefined

❌ Getter decorators: Basic (instance getter)
  Code: ()=>ctx.access.has({ [key]: false })
  Throws: TypeError: ctx.access.has is not a function

❌ Getter decorators: Basic (instance getter)
  Code: ()=>ctx.access.has({ bar: true })
  Throws: TypeError: ctx.access.has is not a function

❌ Getter decorators: Basic (instance getter)
  Code: ()=>ctx.access.get({ [key]: 123 })
  Expected: 123
  Observed: undefined

❌ Getter decorators: Basic (static getter)
  Code: ()=>ctx.access.has({ [key]: false })
  Throws: TypeError: ctx.access.has is not a function

❌ Getter decorators: Basic (static getter)
  Code: ()=>ctx.access.has({ bar: true })
  Throws: TypeError: ctx.access.has is not a function

❌ Getter decorators: Basic (static getter)
  Code: ()=>ctx.access.get({ [key]: 123 })
  Expected: 123
  Observed: undefined

❌ Getter decorators: Basic (static getter)
  Code: ()=>ctx.access.has({ [key]: false })
  Throws: TypeError: ctx.access.has is not a function

❌ Getter decorators: Basic (static getter)
  Code: ()=>ctx.access.has({ bar: true })
  Throws: TypeError: ctx.access.has is not a function

❌ Getter decorators: Basic (static getter)
  Code: ()=>ctx.access.get({ [key]: 123 })
  Expected: 123
  Observed: undefined

❌ Getter decorators: Basic (static getter)
  Code: ()=>ctx.access.has({ [key]: false })
  Throws: TypeError: ctx.access.has is not a function

❌ Getter decorators: Basic (static getter)
  Code: ()=>ctx.access.has({ bar: true })
  Throws: TypeError: ctx.access.has is not a function

❌ Getter decorators: Basic (static getter)
  Code: ()=>ctx.access.get({ [key]: 123 })
  Expected: 123
  Observed: undefined

❌ Getter decorators: Basic (private instance getter)
  Code: ()=>fn.name
  Expected: "get #foo"
  Observed: ""

❌ Getter decorators: Basic (private instance getter)
  Code: ()=>ctx.access.has(new Foo)
  Throws: TypeError: ctx.access.has is not a function

❌ Getter decorators: Basic (private instance getter)
  Code: ()=>ctx.access.has({})
  Throws: TypeError: ctx.access.has is not a function

❌ Getter decorators: Basic (private instance getter)
  Code: ()=>ctx.access.get(new Foo)
  Throws: TypeError: Cannot read private member #bar from an object whose class did not declare it

❌ Getter decorators: Basic (private static getter)
  Code: ()=>fn.name
  Expected: "get #foo"
  Observed: ""

❌ Getter decorators: Basic (private static getter)
  Code: ()=>ctx.access.has(Foo)
  Throws: TypeError: ctx.access.has is not a function

❌ Getter decorators: Basic (private static getter)
  Code: ()=>ctx.access.has({})
  Throws: TypeError: ctx.access.has is not a function

❌ Getter decorators: Basic (private static getter)
  Code: ()=>ctx.access.get(Foo)
  Throws: TypeError: Cannot read private member #bar from an object whose class did not declare it

❌ Getter decorators: Extra initializer (instance getter)
  Code: ()=>oldAddInitializer(()=>{})
  Expected: throws instanceof TypeError
  Observed: throws Error: attempted to call addInitializer after decoration was finished

❌ Getter decorators: Extra initializer (static getter)
  Code: ()=>oldAddInitializer(()=>{})
  Expected: throws instanceof TypeError
  Observed: throws Error: attempted to call addInitializer after decoration was finished

❌ Getter decorators: Extra initializer (private instance getter)
  Code: ()=>oldAddInitializer(()=>{})
  Expected: throws instanceof TypeError
  Observed: throws Error: attempted to call addInitializer after decoration was finished

❌ Getter decorators: Extra initializer (private static getter)
  Code: ()=>oldAddInitializer(()=>{})
  Expected: throws instanceof TypeError
  Observed: throws Error: attempted to call addInitializer after decoration was finished

❌ Setter decorators: Basic (instance setter)
  Code: ()=>ctx.access.has({ [key]: false })
  Throws: TypeError: ctx.access.has is not a function

❌ Setter decorators: Basic (instance setter)
  Code: ()=>ctx.access.has({ bar: true })
  Throws: TypeError: ctx.access.has is not a function

❌ Setter decorators: Basic (instance setter)
  Code: ()=>obj[key]
  Expected: 123
  Observed: undefined

❌ Setter decorators: Basic (instance setter)
  Code: ()=>ctx.access.has({ [key]: false })
  Throws: TypeError: ctx.access.has is not a function

❌ Setter decorators: Basic (instance setter)
  Code: ()=>ctx.access.has({ bar: true })
  Throws: TypeError: ctx.access.has is not a function

❌ Setter decorators: Basic (instance setter)
  Code: ()=>obj[key]
  Expected: 123
  Observed: undefined

❌ Setter decorators: Basic (instance setter)
  Code: ()=>ctx.access.has({ [key]: false })
  Throws: TypeError: ctx.access.has is not a function

❌ Setter decorators: Basic (instance setter)
  Code: ()=>ctx.access.has({ bar: true })
  Throws: TypeError: ctx.access.has is not a function

❌ Setter decorators: Basic (instance setter)
  Code: ()=>obj[key]
  Expected: 123
  Observed: undefined

❌ Setter decorators: Basic (static setter)
  Code: ()=>ctx.access.has({ [key]: false })
  Throws: TypeError: ctx.access.has is not a function

❌ Setter decorators: Basic (static setter)
  Code: ()=>ctx.access.has({ bar: true })
  Throws: TypeError: ctx.access.has is not a function

❌ Setter decorators: Basic (static setter)
  Code: ()=>obj[key]
  Expected: 123
  Observed: undefined

❌ Setter decorators: Basic (static setter)
  Code: ()=>ctx.access.has({ [key]: false })
  Throws: TypeError: ctx.access.has is not a function

❌ Setter decorators: Basic (static setter)
  Code: ()=>ctx.access.has({ bar: true })
  Throws: TypeError: ctx.access.has is not a function

❌ Setter decorators: Basic (static setter)
  Code: ()=>obj[key]
  Expected: 123
  Observed: undefined

❌ Setter decorators: Basic (static setter)
  Code: ()=>ctx.access.has({ [key]: false })
  Throws: TypeError: ctx.access.has is not a function

❌ Setter decorators: Basic (static setter)
  Code: ()=>ctx.access.has({ bar: true })
  Throws: TypeError: ctx.access.has is not a function

❌ Setter decorators: Basic (static setter)
  Code: ()=>obj[key]
  Expected: 123
  Observed: undefined

❌ Setter decorators: Basic (private instance setter)
  Code: ()=>fn.name
  Expected: "set #foo"
  Observed: ""

❌ Setter decorators: Basic (private instance setter)
  Code: ()=>ctx.access.has(new Foo)
  Throws: TypeError: ctx.access.has is not a function

❌ Setter decorators: Basic (private instance setter)
  Code: ()=>ctx.access.has({})
  Throws: TypeError: ctx.access.has is not a function

❌ Setter decorators: Basic (private instance setter)
  Code: ()=>{ const obj = new Foo; ctx.access.set(obj, 123); return obj.bar; }
  Expected: 123
  Observed: 0

❌ Setter decorators: Basic (private static setter)
  Code: ()=>fn.name
  Expected: "set #foo"
  Observed: ""

❌ Setter decorators: Basic (private static setter)
  Code: ()=>ctx.access.has(Foo)
  Throws: TypeError: ctx.access.has is not a function

❌ Setter decorators: Basic (private static setter)
  Code: ()=>ctx.access.has({})
  Throws: TypeError: ctx.access.has is not a function

❌ Setter decorators: Basic (private static setter)
  Code: ()=>{ ctx.access.set(Foo, 123); return Foo.bar; }
  Expected: 123
  Observed: 0

❌ Setter decorators: Extra initializer (instance setter)
  Code: ()=>oldAddInitializer(()=>{})
  Expected: throws instanceof TypeError
  Observed: throws Error: attempted to call addInitializer after decoration was finished

❌ Setter decorators: Extra initializer (static setter)
  Code: ()=>oldAddInitializer(()=>{})
  Expected: throws instanceof TypeError
  Observed: throws Error: attempted to call addInitializer after decoration was finished

❌ Setter decorators: Extra initializer (private instance setter)
  Code: ()=>oldAddInitializer(()=>{})
  Expected: throws instanceof TypeError
  Observed: throws Error: attempted to call addInitializer after decoration was finished

❌ Setter decorators: Extra initializer (private static setter)
  Code: ()=>oldAddInitializer(()=>{})
  Expected: throws instanceof TypeError
  Observed: throws Error: attempted to call addInitializer after decoration was finished

❌ Auto-accessor decorators: Basic (instance auto-accessor)
  Code: ()=>ctx.access.has({ [key]: false })
  Throws: TypeError: ctx.access.has is not a function

❌ Auto-accessor decorators: Basic (instance auto-accessor)
  Code: ()=>ctx.access.has({ bar: true })
  Throws: TypeError: ctx.access.has is not a function

❌ Auto-accessor decorators: Basic (instance auto-accessor)
  Code: ()=>ctx.access.get({ [key]: 123 })
  Throws: TypeError: Cannot read private member #___private_foo from an object whose class did not declare it

❌ Auto-accessor decorators: Basic (instance auto-accessor)
  Code: ()=>{ const obj = {}; ctx.access.set(obj, 123); return obj[key]; }
  Throws: TypeError: Cannot write private member #___private_foo to an object whose class did not declare it

❌ Auto-accessor decorators: Basic (instance auto-accessor)
  Code: ()=>ctx.access.has({ [key]: false })
  Throws: TypeError: ctx.access.has is not a function

❌ Auto-accessor decorators: Basic (instance auto-accessor)
  Code: ()=>ctx.access.has({ bar: true })
  Throws: TypeError: ctx.access.has is not a function

❌ Auto-accessor decorators: Basic (instance auto-accessor)
  Code: ()=>ctx.access.get({ [key]: 123 })
  Throws: TypeError: Cannot read private member #___private_bar from an object whose class did not declare it

❌ Auto-accessor decorators: Basic (instance auto-accessor)
  Code: ()=>{ const obj = {}; ctx.access.set(obj, 123); return obj[key]; }
  Throws: TypeError: Cannot write private member #___private_bar to an object whose class did not declare it

❌ Auto-accessor decorators: Basic (instance auto-accessor)
  Code: ()=>ctx.access.has({ [key]: false })
  Throws: TypeError: ctx.access.has is not a function

❌ Auto-accessor decorators: Basic (instance auto-accessor)
  Code: ()=>ctx.access.has({ bar: true })
  Throws: TypeError: ctx.access.has is not a function

❌ Auto-accessor decorators: Basic (instance auto-accessor)
  Code: ()=>ctx.access.get({ [key]: 123 })
  Throws: TypeError: Cannot read private member #___private_baz from an object whose class did not declare it

❌ Auto-accessor decorators: Basic (instance auto-accessor)
  Code: ()=>{ const obj = {}; ctx.access.set(obj, 123); return obj[key]; }
  Throws: TypeError: Cannot write private member #___private_baz to an object whose class did not declare it

❌ Auto-accessor decorators: Basic (static auto-accessor)
  Code: ()=>ctx.access.has({ [key]: false })
  Throws: TypeError: ctx.access.has is not a function

❌ Auto-accessor decorators: Basic (static auto-accessor)
  Code: ()=>ctx.access.has({ bar: true })
  Throws: TypeError: ctx.access.has is not a function

❌ Auto-accessor decorators: Basic (static auto-accessor)
  Code: ()=>ctx.access.get({ [key]: 123 })
  Throws: TypeError: Cannot read private member #___private_foo from an object whose class did not declare it

❌ Auto-accessor decorators: Basic (static auto-accessor)
  Code: ()=>{ const obj = {}; ctx.access.set(obj, 123); return obj[key]; }
  Throws: TypeError: Cannot write private member #___private_foo to an object whose class did not declare it

❌ Auto-accessor decorators: Basic (static auto-accessor)
  Code: ()=>ctx.access.has({ [key]: false })
  Throws: TypeError: ctx.access.has is not a function

❌ Auto-accessor decorators: Basic (static auto-accessor)
  Code: ()=>ctx.access.has({ bar: true })
  Throws: TypeError: ctx.access.has is not a function

❌ Auto-accessor decorators: Basic (static auto-accessor)
  Code: ()=>ctx.access.get({ [key]: 123 })
  Throws: TypeError: Cannot read private member #___private_bar from an object whose class did not declare it

❌ Auto-accessor decorators: Basic (static auto-accessor)
  Code: ()=>{ const obj = {}; ctx.access.set(obj, 123); return obj[key]; }
  Throws: TypeError: Cannot write private member #___private_bar to an object whose class did not declare it

❌ Auto-accessor decorators: Basic (static auto-accessor)
  Code: ()=>ctx.access.has({ [key]: false })
  Throws: TypeError: ctx.access.has is not a function

❌ Auto-accessor decorators: Basic (static auto-accessor)
  Code: ()=>ctx.access.has({ bar: true })
  Throws: TypeError: ctx.access.has is not a function

❌ Auto-accessor decorators: Basic (static auto-accessor)
  Code: ()=>ctx.access.get({ [key]: 123 })
  Throws: TypeError: Cannot read private member #___private_baz from an object whose class did not declare it

❌ Auto-accessor decorators: Basic (static auto-accessor)
  Code: ()=>{ const obj = {}; ctx.access.set(obj, 123); return obj[key]; }
  Throws: TypeError: Cannot write private member #___private_baz to an object whose class did not declare it

❌ Auto-accessor decorators: Basic (private instance auto-accessor)
  Code: ()=>target.get.name
  Expected: "get #foo"
  Observed: ""

❌ Auto-accessor decorators: Basic (private instance auto-accessor)
  Code: ()=>target.set.name
  Expected: "set #foo"
  Observed: ""

❌ Auto-accessor decorators: Basic (private instance auto-accessor)
  Code: ()=>ctx.access.has(new Foo)
  Throws: TypeError: ctx.access.has is not a function

❌ Auto-accessor decorators: Basic (private instance auto-accessor)
  Code: ()=>ctx.access.has({})
  Throws: TypeError: ctx.access.has is not a function

❌ Auto-accessor decorators: Basic (private instance auto-accessor)
  Code: ()=>ctx.access.get(new Foo)
  Throws: TypeError: Cannot read private member #__foo from an object whose class did not declare it

❌ Auto-accessor decorators: Basic (private instance auto-accessor)
  Code: ()=>{ const obj = new Foo; ctx.access.set(obj, 123); return get$foo(obj); }
  Throws: TypeError: Cannot write private member #__foo to an object whose class did not declare it

❌ Auto-accessor decorators: Basic (private static auto-accessor)
  Code: ()=>target.get.name
  Expected: "get #foo"
  Observed: ""

❌ Auto-accessor decorators: Basic (private static auto-accessor)
  Code: ()=>target.set.name
  Expected: "set #foo"
  Observed: ""

❌ Auto-accessor decorators: Basic (private static auto-accessor)
  Code: ()=>ctx.access.has(Foo)
  Throws: TypeError: ctx.access.has is not a function

❌ Auto-accessor decorators: Basic (private static auto-accessor)
  Code: ()=>ctx.access.has({})
  Throws: TypeError: ctx.access.has is not a function

❌ Auto-accessor decorators: Basic (private static auto-accessor)
  Code: ()=>ctx.access.get(Foo)
  Throws: TypeError: Cannot read private member #__foo from an object whose class did not declare it

❌ Auto-accessor decorators: Basic (private static auto-accessor)
  Code: ()=>{ ctx.access.set(Foo, 123); return get$foo(Foo); }
  Throws: TypeError: Cannot write private member #__foo to an object whose class did not declare it

❌ Auto-accessor decorators: Extra initializer (instance auto-accessor)
  Code: ()=>oldAddInitializer(()=>{})
  Expected: throws instanceof TypeError
  Observed: throws Error: attempted to call addInitializer after decoration was finished

❌ Auto-accessor decorators: Extra initializer (static auto-accessor)
  Code: ()=>oldAddInitializer(()=>{})
  Expected: throws instanceof TypeError
  Observed: throws Error: attempted to call addInitializer after decoration was finished

❌ Auto-accessor decorators: Extra initializer (private instance auto-accessor)
  Code: ()=>oldAddInitializer(()=>{})
  Expected: throws instanceof TypeError
  Observed: throws Error: attempted to call addInitializer after decoration was finished

❌ Auto-accessor decorators: Extra initializer (private static auto-accessor)
  Code: ()=>oldAddInitializer(()=>{})
  Expected: throws instanceof TypeError
  Observed: throws Error: attempted to call addInitializer after decoration was finished

❌ Decorator list evaluation: Computed names (class statement)
  Code: ()=>'' + log
  Expected: "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21"
  Observed: "0,2,2,4,4,6,6,8,8,10,10,12,12,14,14,16,16,18,20,19,20,1"

❌ Decorator list evaluation: Computed names (class expression)
  Throws: SyntaxError: The symbol "#___private_computedKey" has already been declared

❌ Decorator list evaluation: "this" (class statement)
  Code: ()=>this.foo(1)
  Throws: TypeError: this.foo is not a function

❌ Decorator list evaluation: "this" (class statement)
  Code: ()=>'' + log
  Expected: "0,1,2,3,4,5,6,7,8,9,10,11"
  Observed: "0,2,3,4,5,6,7,8,9,10,11"

❌ Decorator list evaluation: "this" (class expression)
  Throws: SyntaxError: The symbol "#___private_accessor" has already been declared

❌ Decorator list evaluation: "await" (class statement)
  Throws: SyntaxError: The keyword "await" cannot be used here:

❌ Decorator list evaluation: "await" (class expression)
  Throws: SyntaxError: The symbol "#___private_accessor" has already been declared

❌ Decorator list evaluation: Outer private name (class statement)
  Code: ()=>'' + log
  Expected: "0,1,2,3,4,5,6,7,8,9,10,11"
  Observed: "0,2,3,4,5,6,7,8,9,10,11,1"

❌ Decorator list evaluation: Outer private name (class expression)
  Throws: SyntaxError: The symbol "#___private_accessor" has already been declared

❌ Decorator list evaluation: Inner private name (class statement)
  Throws: TypeError: Cannot read private member #foo from an object whose class did not declare it

❌ Decorator list evaluation: Inner private name (class expression)
  Throws: SyntaxError: The symbol "#___private_accessor" has already been declared

❌ Decorator list evaluation: Class binding (class statement)
  Code: ()=>fn()
  Expected: throws instanceof ReferenceError
  Observed: returns undefined

❌ Decorator list evaluation: Class binding (class statement)
  Code: ()=>fn()
  Expected: throws instanceof ReferenceError
  Observed: returns undefined

❌ Decorator list evaluation: Class binding (class statement)
  Code: ()=>fn()
  Expected: throws instanceof ReferenceError
  Observed: returns undefined

❌ Decorator list evaluation: Class binding (class statement)
  Code: ()=>fn()
  Expected: throws instanceof ReferenceError
  Observed: returns undefined

❌ Decorator list evaluation: Class binding (class statement)
  Code: ()=>fn()
  Expected: throws instanceof ReferenceError
  Observed: returns undefined

❌ Decorator list evaluation: Class binding (class statement)
  Code: ()=>fn()
  Expected: throws instanceof ReferenceError
  Observed: returns undefined

❌ Decorator list evaluation: Class binding (class statement)
  Code: ()=>fn()
  Expected: throws instanceof ReferenceError
  Observed: returns undefined

❌ Decorator list evaluation: Class binding (class statement)
  Code: ()=>fn()
  Expected: throws instanceof ReferenceError
  Observed: returns undefined

❌ Decorator list evaluation: Class binding (class statement)
  Code: ()=>fn()
  Expected: throws instanceof ReferenceError
  Observed: returns undefined

❌ Decorator list evaluation: Class binding (class statement)
  Code: ()=>fn()
  Expected: throws instanceof ReferenceError
  Observed: returns undefined

❌ Decorator list evaluation: Class binding (class statement)
  Code: ()=>fn()
  Expected: throws instanceof ReferenceError
  Observed: returns undefined

❌ Decorator list evaluation: Class binding (class statement)
  Code: ()=>fn()
  Expected: class
  Observed: null

❌ Decorator list evaluation: Class binding (class statement)
  Code: ()=>fn()
  Expected: class
  Observed: null

❌ Decorator list evaluation: Class binding (class statement)
  Code: ()=>fn()
  Expected: class
  Observed: null

❌ Decorator list evaluation: Class binding (class statement)
  Code: ()=>fn()
  Expected: class
  Observed: null

❌ Decorator list evaluation: Class binding (class statement)
  Code: ()=>fn()
  Expected: class
  Observed: null

❌ Decorator list evaluation: Class binding (class statement)
  Code: ()=>fn()
  Expected: class
  Observed: null

❌ Decorator list evaluation: Class binding (class statement)
  Code: ()=>fn()
  Expected: class
  Observed: null

❌ Decorator list evaluation: Class binding (class statement)
  Code: ()=>fn()
  Expected: class
  Observed: null

❌ Decorator list evaluation: Class binding (class statement)
  Code: ()=>fn()
  Expected: class
  Observed: null

❌ Decorator list evaluation: Class binding (class statement)
  Code: ()=>fn()
  Expected: class
  Observed: null

❌ Decorator list evaluation: Class binding (class expression)
  Throws: SyntaxError: The symbol "#___private_accessor" has already been declared

❌ Decorator metadata: class statement
  Code: ()=>order(foo)
  Expected: "0,1,2,3,,,,,4,5,6,7,,,,,8,,9,,10,"
  Observed: "0,1,2,3,,,,,5,6,7,8,,,,,4,,9,,10,"

❌ Decorator metadata: class statement
  Code: ()=>order(bar)
  Expected: "0,1,2,3,11,12,13,14,4,5,6,7,15,16,17,18,8,19,9,20,10,21"
  Observed: "0,1,2,3,11,12,13,14,5,6,7,8,16,17,18,19,4,15,9,20,10,21"

❌ Decorator metadata: class statement
  Code: ()=>Object.getPrototypeOf(BarOneDec[Symbol.metadata])
  Throws: TypeError: Cannot convert object to primitive value

❌ Decorator metadata: class expression
  Code: ()=>order(foo)
  Expected: "0,1,2,3,,,,,4,5,6,7,,,,,8,,9,,10,"
  Observed: "0,1,2,3,,,,,5,6,7,8,,,,,4,,9,,,"

❌ Decorator metadata: class expression
  Code: ()=>order(bar)
  Expected: "0,1,2,3,11,12,13,14,4,5,6,7,15,16,17,18,8,19,9,20,10,21"
  Observed: "0,1,2,3,11,12,13,14,5,6,7,8,16,17,18,19,4,15,9,20,,"

❌ Decorator metadata: class expression
  Code: ()=>Object.getPrototypeOf(BarOneDec[Symbol.metadata])
  Throws: TypeError: Cannot convert object to primitive value

❌ Initializer order (public members, class statement)
  Code: ()=>log + ''
  Expected: "start,extends,M1,M2,G1,G2,S1,S2,A1,A2,m1,m2,g1,g2,s1,s2,a1,a2,F1,F2,f1,f2,c1,c2,M3,M4,M5,M6,G3,G4,G5,G6,S3,S4,S5,S6,static:start,F7,F8,F3,F4,F5,F6,A7,A8,A3,A4,A5,A6,static:end,c3,c4,c5,c6,after,ctor:start,m3,m4,m5,m6,g3,g4,g5,g6,s3,s4,s5,s6,f7,f8,f3,f4,f5,f6,a7,a8,a3,a4,a5,a6,ctor:end,end"
  Observed: "start,extends,M1,M2,G1,G2,S1,S2,A1,A2,F1,F2,m1,m2,g1,g2,s1,s2,a1,a2,f1,f2,c1,c2,M3,M4,M5,M6,G3,G4,G5,G6,S3,S4,S5,S6,A3,A4,A5,A6,F3,F4,F5,F6,F8,F7,A8,A7,static:start,static:end,c3,c4,c5,c6,after,ctor:start,f8,f7,m3,m4,m5,m6,g3,g4,g5,g6,s3,s4,s5,s6,a3,a4,a5,a6,f3,f4,f5,f6,a8,a7,ctor:end,end"

❌ Initializer order (public members, class expression)
  Throws: SyntaxError: The symbol "#___private_accessor" has already been declared

❌ Initializer order (private members, class statement)
  Code: ()=>log + ''
  Expected: "start,extends,M1,M2,G1,G2,S1,S2,A1,A2,m1,m2,g1,g2,s1,s2,a1,a2,F1,F2,f1,f2,c1,c2,M3,M4,M5,M6,G3,G4,G5,G6,S3,S4,S5,S6,static:start,F7,F8,F3,F4,F5,F6,A7,A8,A3,A4,A5,A6,static:end,c3,c4,c5,c6,after,ctor:start,m3,m4,m5,m6,g3,g4,g5,g6,s3,s4,s5,s6,f7,f8,f3,f4,f5,f6,a7,a8,a3,a4,a5,a6,ctor:end,end"
  Observed: "start,extends,M1,M2,G1,G2,S1,S2,A1,A2,F1,F2,m1,m2,g1,g2,s1,s2,a1,a2,f1,f2,c1,c2,M3,M4,M5,M6,G3,G4,G5,G6,S3,S4,S5,S6,A3,A4,A5,A6,F3,F4,F5,F6,F8,F7,A8,A7,static:start,static:end,c3,c4,c5,c6,after,ctor:start,f8,f7,m3,m4,m5,m6,g3,g4,g5,g6,s3,s4,s5,s6,a3,a4,a5,a6,f3,f4,f5,f6,a8,a7,ctor:end,end"

❌ Initializer order (private members, class expression)
  Code: ()=>log + ''
  Expected: "start,extends,M1,M2,G1,G2,S1,S2,A1,A2,m1,m2,g1,g2,s1,s2,a1,a2,F1,F2,f1,f2,c1,c2,M3,M4,M5,M6,G3,G4,G5,G6,S3,S4,S5,S6,static:start,F7,F8,F3,F4,F5,F6,A7,A8,A3,A4,A5,A6,static:end,c3,c4,c5,c6,after,ctor:start,m3,m4,m5,m6,g3,g4,g5,g6,s3,s4,s5,s6,f7,f8,f3,f4,f5,f6,a7,a8,a3,a4,a5,a6,ctor:end,end"
  Observed: "start,extends,M1,M2,G1,G2,S1,S2,A1,A2,F1,F2,m1,m2,g1,g2,s1,s2,a1,a2,f1,f2,c1,c2,M3,M4,M5,M6,G3,G4,G5,G6,S3,S4,S5,S6,A3,A4,A5,A6,F3,F4,F5,F6,static:start,F8,F7,A8,A7,static:end,c3,c4,c5,c6,after,ctor:start,f8,f7,m3,m4,m5,m6,g3,g4,g5,g6,s3,s4,s5,s6,a3,a4,a5,a6,f3,f4,f5,f6,a8,a7,ctor:end,end"

❌ 242 checks failed
```

</details>
