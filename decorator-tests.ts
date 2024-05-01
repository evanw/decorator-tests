const tests: Record<string, () => Promise<void> | void> = {
  // Class decorators
  'Class decorators: Basic statement': () => {
    let old: { new(): Foo }
    const dec = (cls: { new(): Foo }, ctx: ClassDecoratorContext) => {
      assertEq(() => typeof cls, 'function')
      assertEq(() => cls.name, 'Foo')
      assertEq(() => ctx.kind, 'class')
      assertEq(() => ctx.name, 'Foo')
      old = cls
    }
    @dec class Foo { }
    assertEq(() => Foo, old!)
  },
  'Class decorators: Basic expression: Anonymous': () => {
    let old: { new(): unknown }
    const dec = (cls: { new(): unknown }, ctx: ClassDecoratorContext) => {
      assertEq(() => typeof cls, 'function')
      assertEq(() => cls.name, '')
      assertEq(() => ctx.kind, 'class')
      assertEq(() => ctx.name, '')
      old = cls
    }
    const Foo = (x => x)(@dec class { })
    assertEq(() => Foo, old!)
  },
  'Class decorators: Basic expression: Property value': () => {
    let old: { new(): unknown }
    const dec = (cls: { new(): unknown }, ctx: ClassDecoratorContext) => {
      assertEq(() => typeof cls, 'function')
      assertEq(() => cls.name, 'Foo')
      assertEq(() => ctx.kind, 'class')
      assertEq(() => ctx.name, 'Foo')
      old = cls
    }
    const obj = {
      Foo: @dec class { },
    }
    assertEq(() => obj.Foo, old!)
  },
  'Class decorators: Basic expression: Variable initializer': () => {
    let old: { new(): unknown }
    const dec = (cls: { new(): unknown }, ctx: ClassDecoratorContext) => {
      assertEq(() => typeof cls, 'function')
      assertEq(() => cls.name, 'Foo')
      assertEq(() => ctx.kind, 'class')
      assertEq(() => ctx.name, 'Foo')
      old = cls
    }
    const Foo = @dec class { }
    assertEq(() => Foo, old!)
  },
  'Class decorators: Basic expression: Array binding': () => {
    let old: { new(): unknown }
    const dec = (cls: { new(): unknown }, ctx: ClassDecoratorContext) => {
      assertEq(() => typeof cls, 'function')
      assertEq(() => cls.name, 'Foo')
      assertEq(() => ctx.kind, 'class')
      assertEq(() => ctx.name, 'Foo')
      old = cls
    }
    const [Foo = @dec class { }] = []
    assertEq(() => Foo, old!)
  },
  'Class decorators: Basic expression: Object binding': () => {
    let old: { new(): unknown }
    const dec = (cls: { new(): unknown }, ctx: ClassDecoratorContext) => {
      assertEq(() => typeof cls, 'function')
      assertEq(() => cls.name, 'Foo')
      assertEq(() => ctx.kind, 'class')
      assertEq(() => ctx.name, 'Foo')
      old = cls
    }
    const { Foo = @dec class { } } = {}
    assertEq(() => Foo, old!)
  },
  'Class decorators: Basic expression: Assignment initializer': () => {
    let old: { new(): unknown }
    const dec = (cls: { new(): unknown }, ctx: ClassDecoratorContext) => {
      assertEq(() => typeof cls, 'function')
      assertEq(() => cls.name, 'Foo')
      assertEq(() => ctx.kind, 'class')
      assertEq(() => ctx.name, 'Foo')
      old = cls
    }
    let Foo: { new(): unknown }
    Foo = @dec class { }
    assertEq(() => Foo, old!)
  },
  'Class decorators: Basic expression: Assignment array binding': () => {
    let old: { new(): unknown }
    const dec = (cls: { new(): unknown }, ctx: ClassDecoratorContext) => {
      assertEq(() => typeof cls, 'function')
      assertEq(() => cls.name, 'Foo')
      assertEq(() => ctx.kind, 'class')
      assertEq(() => ctx.name, 'Foo')
      old = cls
    }
    let Foo: { new(): unknown };
    [Foo = @dec class { }] = []
    assertEq(() => Foo, old!)
  },
  'Class decorators: Basic expression: Assignment object binding': () => {
    let old: { new(): unknown }
    const dec = (cls: { new(): unknown }, ctx: ClassDecoratorContext) => {
      assertEq(() => typeof cls, 'function')
      assertEq(() => cls.name, 'Foo')
      assertEq(() => ctx.kind, 'class')
      assertEq(() => ctx.name, 'Foo')
      old = cls
    }
    let Foo: { new(): unknown };
    ({ Foo = @dec class { } } = {})
    assertEq(() => Foo, old!)
  },
  'Class decorators: Basic expression: Instance field initializer': () => {
    let old: { new(): unknown }
    const dec = (cls: { new(): unknown }, ctx: ClassDecoratorContext) => {
      assertEq(() => typeof cls, 'function')
      assertEq(() => cls.name, 'Foo')
      assertEq(() => ctx.kind, 'class')
      assertEq(() => ctx.name, 'Foo')
      old = cls
    }
    class Class {
      Foo = @dec class { }
    }
    const Foo = new Class().Foo
    assertEq(() => Foo, old!)
  },
  'Class decorators: Basic expression: Static field initializer': () => {
    let old: { new(): unknown }
    const dec = (cls: { new(): unknown }, ctx: ClassDecoratorContext) => {
      assertEq(() => typeof cls, 'function')
      assertEq(() => cls.name, 'Foo')
      assertEq(() => ctx.kind, 'class')
      assertEq(() => ctx.name, 'Foo')
      old = cls
    }
    class Class {
      static Foo = @dec class { }
    }
    assertEq(() => Class.Foo, old!)
  },
  'Class decorators: Basic expression: Instance auto-accessor initializer': () => {
    let old: { new(): unknown }
    const dec = (cls: { new(): unknown }, ctx: ClassDecoratorContext) => {
      assertEq(() => typeof cls, 'function')
      assertEq(() => cls.name, 'Foo')
      assertEq(() => ctx.kind, 'class')
      assertEq(() => ctx.name, 'Foo')
      old = cls
    }
    class Class {
      accessor Foo = @dec class { }
    }
    const Foo = new Class().Foo
    assertEq(() => Foo, old!)
  },
  'Class decorators: Basic expression: Static auto-accessor initializer': () => {
    let old: { new(): unknown }
    const dec = (cls: { new(): unknown }, ctx: ClassDecoratorContext) => {
      assertEq(() => typeof cls, 'function')
      assertEq(() => cls.name, 'Foo')
      assertEq(() => ctx.kind, 'class')
      assertEq(() => ctx.name, 'Foo')
      old = cls
    }
    class Class {
      static accessor Foo = @dec class { }
    }
    assertEq(() => Class.Foo, old!)
  },
  'Class decorators: Order': () => {
    const log: number[] = []
    let Bar: { new(): Foo }
    let Baz: { new(): Foo }
    const dec1 = (cls: { new(): Foo }, ctx: ClassDecoratorContext) => {
      log.push(2)
      Bar = function () {
        log.push(4)
        return new cls
      } as any
      return Bar
    }
    const dec2 = (cls: { new(): Foo }, ctx: ClassDecoratorContext) => {
      log.push(1)
      Baz = function () {
        log.push(5)
        return new cls
      } as any
      return Baz
    }
    log.push(0)
    @dec1 @dec2 class Foo {
      constructor() { log.push(6) }
    }
    log.push(3)
    new Foo
    log.push(7)
    assertEq(() => Foo, Bar!)
    assertEq(() => log + '', '0,1,2,3,4,5,6,7')
  },
  'Class decorators: Return null': () => {
    let error: unknown
    try {
      const dec = (cls: { new(): Foo }, ctx: ClassDecoratorContext): any => {
        return null
      }
      @dec class Foo { }
    } catch (err) {
      error = err
    }
    assertEq(() => error instanceof TypeError, true)
  },
  'Class decorators: Return object': () => {
    let error: unknown
    try {
      const dec = (cls: { new(): Foo }, ctx: ClassDecoratorContext): any => {
        return {}
      }
      @dec class Foo { }
    } catch (err) {
      error = err
    }
    assertEq(() => error instanceof TypeError, true)
  },
  'Class decorators: Extra initializer': () => {
    let got: { this: any, args: any[] }
    const dec = (cls: { new(): Foo }, ctx: ClassDecoratorContext): any => {
      ctx.addInitializer(function (...args) {
        got = { this: this, args }
      })
    }
    @dec class Foo { }
    assertEq(() => got.this, Foo)
    assertEq(() => got.args.length, 0)
  },

  // Method decorators
  'Method decorators: Basic (instance method)': () => {
    let old: (this: Foo) => void
    const dec = (fn: (this: Foo) => void, ctx: ClassMethodDecoratorContext) => {
      assertEq(() => typeof fn, 'function')
      assertEq(() => fn.name, 'foo')
      assertEq(() => ctx.kind, 'method')
      assertEq(() => ctx.name, 'foo')
      assertEq(() => ctx.static, false)
      assertEq(() => ctx.private, false)
      assertEq(() => ctx.access.has({ foo: false }), true)
      assertEq(() => ctx.access.has({ bar: true }), false)
      assertEq(() => (ctx.access.get as any)({ foo: 123 }), 123)
      assertEq(() => 'set' in ctx.access, false)
      old = fn
    }
    class Foo {
      @dec foo() { }
    }
    assertEq(() => Foo.prototype.foo, old!)
  },
  'Method decorators: Basic (static method)': () => {
    let old: (this: typeof Foo) => void
    const dec = (fn: (this: typeof Foo) => void, ctx: ClassMethodDecoratorContext) => {
      assertEq(() => typeof fn, 'function')
      assertEq(() => fn.name, 'foo')
      assertEq(() => ctx.kind, 'method')
      assertEq(() => ctx.name, 'foo')
      assertEq(() => ctx.static, true)
      assertEq(() => ctx.private, false)
      assertEq(() => ctx.access.has({ foo: false }), true)
      assertEq(() => ctx.access.has({ bar: true }), false)
      assertEq(() => (ctx.access.get as any)({ foo: 123 }), 123)
      assertEq(() => 'set' in ctx.access, false)
      old = fn
    }
    class Foo {
      @dec static foo() { }
    }
    assertEq(() => Foo.foo, old!)
  },
  'Method decorators: Basic (private instance method)': () => {
    let old: (this: Foo) => void
    let lateAsserts: () => void
    const dec = (fn: (this: Foo) => void, ctx: ClassMethodDecoratorContext) => {
      assertEq(() => typeof fn, 'function')
      assertEq(() => fn.name, '#foo')
      assertEq(() => ctx.kind, 'method')
      assertEq(() => ctx.name, '#foo')
      assertEq(() => ctx.static, false)
      assertEq(() => ctx.private, true)
      lateAsserts = () => {
        assertEq(() => ctx.access.has(new Foo), true)
        assertEq(() => ctx.access.has({}), false)
        assertEq(() => ctx.access.get(new Foo), $foo)
        assertEq(() => 'set' in ctx.access, false)
      }
      old = fn
    }
    let $foo: Function
    class Foo {
      @dec #foo() { }
      static { $foo = new Foo().#foo }
    }
    assertEq(() => $foo, old!)
    lateAsserts!()
  },
  'Method decorators: Basic (private static method)': () => {
    let old: (this: typeof Foo) => void
    let lateAsserts: () => void
    const dec = (fn: (this: typeof Foo) => void, ctx: ClassMethodDecoratorContext) => {
      assertEq(() => typeof fn, 'function')
      assertEq(() => fn.name, '#foo')
      assertEq(() => ctx.kind, 'method')
      assertEq(() => ctx.name, '#foo')
      assertEq(() => ctx.static, true)
      assertEq(() => ctx.private, true)
      lateAsserts = () => {
        assertEq(() => ctx.access.has(Foo), true)
        assertEq(() => ctx.access.has({}), false)
        assertEq(() => ctx.access.get(Foo), $foo)
        assertEq(() => 'set' in ctx.access, false)
      }
      old = fn
    }
    let $foo: Function
    class Foo {
      @dec static #foo() { }
      static { $foo = this.#foo }
    }
    assertEq(() => $foo, old!)
    lateAsserts!()
  },
  'Method decorators: Shim (instance method)': () => {
    let bar: (this: Foo) => number
    const dec = (fn: (this: Foo) => number, ctx: ClassMethodDecoratorContext) => {
      bar = function () { return fn.call(this) + 1 }
      return bar
    }
    class Foo {
      bar = 123
      @dec foo() { return this.bar }
    }
    assertEq(() => Foo.prototype.foo, bar!)
    assertEq(() => new Foo().foo(), 124)
  },
  'Method decorators: Shim (static method)': () => {
    let bar: (this: typeof Foo) => number
    const dec = (fn: (this: typeof Foo) => number, ctx: ClassMethodDecoratorContext) => {
      bar = function () { return fn.call(this) + 1 }
      return bar
    }
    class Foo {
      static bar = 123
      @dec static foo() { return this.bar }
    }
    assertEq(() => Foo.foo, bar!)
    assertEq(() => Foo.foo(), 124)
  },
  'Method decorators: Shim (private instance method)': () => {
    let bar: (this: Foo) => number
    const dec = (fn: (this: Foo) => number, ctx: ClassMethodDecoratorContext) => {
      bar = function () { return fn.call(this) + 1 }
      return bar
    }
    let $foo: (this: Foo) => number
    class Foo {
      bar = 123
      @dec #foo() { return this.bar }
      static { $foo = new Foo().#foo }
    }
    assertEq(() => $foo, bar!)
    assertEq(() => bar.call(new Foo), 124)
  },
  'Method decorators: Shim (private static method)': () => {
    let bar: (this: typeof Foo) => number
    const dec = (fn: (this: typeof Foo) => number, ctx: ClassMethodDecoratorContext) => {
      bar = function () { return fn.call(this) + 1 }
      return bar
    }
    let $foo: (this: Foo) => number
    class Foo {
      static bar = 123
      @dec static #foo() { return this.bar }
      static { $foo = this.#foo }
    }
    assertEq(() => $foo, bar!)
    assertEq(() => bar.call(Foo), 124)
  },
  'Method decorators: Order (instance method)': () => {
    const log: number[] = []
    let bar: (this: Foo) => number
    let baz: (this: Foo) => number
    const dec1 = (fn: (this: Foo) => number, ctx: ClassMethodDecoratorContext) => {
      log.push(2)
      bar = function () {
        log.push(4)
        return fn.call(this)
      }
      return bar
    }
    const dec2 = (fn: (this: Foo) => number, ctx: ClassMethodDecoratorContext) => {
      log.push(1)
      baz = function () {
        log.push(5)
        return fn.call(this)
      }
      return baz
    }
    log.push(0)
    class Foo {
      @dec1 @dec2 foo() { return log.push(6) }
    }
    log.push(3)
    new Foo().foo()
    log.push(7)
    assertEq(() => Foo.prototype.foo, bar!)
    assertEq(() => log + '', '0,1,2,3,4,5,6,7')
  },
  'Method decorators: Order (static method)': () => {
    const log: number[] = []
    let bar: (this: typeof Foo) => number
    let baz: (this: typeof Foo) => number
    const dec1 = (fn: (this: typeof Foo) => number, ctx: ClassMethodDecoratorContext) => {
      log.push(2)
      bar = function () {
        log.push(4)
        return fn.call(this)
      }
      return bar
    }
    const dec2 = (fn: (this: typeof Foo) => number, ctx: ClassMethodDecoratorContext) => {
      log.push(1)
      baz = function () {
        log.push(5)
        return fn.call(this)
      }
      return baz
    }
    log.push(0)
    class Foo {
      @dec1 @dec2 static foo() { return log.push(6) }
    }
    log.push(3)
    Foo.foo()
    log.push(7)
    assertEq(() => Foo.foo, bar!)
    assertEq(() => log + '', '0,1,2,3,4,5,6,7')
  },
  'Method decorators: Order (private instance method)': () => {
    const log: number[] = []
    let bar: (this: Foo) => number
    let baz: (this: Foo) => number
    const dec1 = (fn: (this: Foo) => number, ctx: ClassMethodDecoratorContext) => {
      log.push(2)
      bar = function () {
        log.push(4)
        return fn.call(this)
      }
      return bar
    }
    const dec2 = (fn: (this: Foo) => number, ctx: ClassMethodDecoratorContext) => {
      log.push(1)
      baz = function () {
        log.push(5)
        return fn.call(this)
      }
      return baz
    }
    log.push(0)
    let $foo: Function
    class Foo {
      @dec1 @dec2 #foo() { return log.push(6) }
      static { $foo = new Foo().#foo }
    }
    log.push(3)
    $foo.call(new Foo)
    log.push(7)
    assertEq(() => $foo, bar!)
    assertEq(() => log + '', '0,1,2,3,4,5,6,7')
  },
  'Method decorators: Order (private static method)': () => {
    const log: number[] = []
    let bar: (this: typeof Foo) => number
    let baz: (this: typeof Foo) => number
    const dec1 = (fn: (this: typeof Foo) => number, ctx: ClassMethodDecoratorContext) => {
      log.push(2)
      bar = function () {
        log.push(4)
        return fn.call(this)
      }
      return bar
    }
    const dec2 = (fn: (this: typeof Foo) => number, ctx: ClassMethodDecoratorContext) => {
      log.push(1)
      baz = function () {
        log.push(5)
        return fn.call(this)
      }
      return baz
    }
    log.push(0)
    let $foo: (this: Foo) => number
    class Foo {
      @dec1 @dec2 static #foo() { return log.push(6) }
      static { $foo = Foo.#foo }
    }
    log.push(3)
    $foo.call(Foo)
    log.push(7)
    assertEq(() => $foo, bar!)
    assertEq(() => log + '', '0,1,2,3,4,5,6,7')
  },
  'Method decorators: Return null (instance method)': () => {
    let error: unknown
    try {
      const dec = (fn: (this: Foo) => void, ctx: ClassMethodDecoratorContext): any => {
        return null
      }
      class Foo { @dec foo() { } }
    } catch (err) {
      error = err
    }
    assertEq(() => error instanceof TypeError, true)
  },
  'Method decorators: Return null (static method)': () => {
    let error: unknown
    try {
      const dec = (fn: (this: typeof Foo) => void, ctx: ClassMethodDecoratorContext): any => {
        return null
      }
      class Foo { @dec static foo() { } }
    } catch (err) {
      error = err
    }
    assertEq(() => error instanceof TypeError, true)
  },
  'Method decorators: Return null (private instance method)': () => {
    let error: unknown
    try {
      const dec = (fn: (this: Foo) => void, ctx: ClassMethodDecoratorContext): any => {
        return null
      }
      class Foo { @dec #foo() { } }
    } catch (err) {
      error = err
    }
    assertEq(() => error instanceof TypeError, true)
  },
  'Method decorators: Return null (private static method)': () => {
    let error: unknown
    try {
      const dec = (fn: (this: typeof Foo) => void, ctx: ClassMethodDecoratorContext): any => {
        return null
      }
      class Foo { @dec static #foo() { } }
    } catch (err) {
      error = err
    }
    assertEq(() => error instanceof TypeError, true)
  },
  'Method decorators: Return object (instance method)': () => {
    let error: unknown
    try {
      const dec = (fn: (this: Foo) => void, ctx: ClassMethodDecoratorContext): any => {
        return {}
      }
      class Foo { @dec foo() { } }
    } catch (err) {
      error = err
    }
    assertEq(() => error instanceof TypeError, true)
  },
  'Method decorators: Return object (static method)': () => {
    let error: unknown
    try {
      const dec = (fn: (this: typeof Foo) => void, ctx: ClassMethodDecoratorContext): any => {
        return {}
      }
      class Foo { @dec static foo() { } }
    } catch (err) {
      error = err
    }
    assertEq(() => error instanceof TypeError, true)
  },
  'Method decorators: Return object (private instance method)': () => {
    let error: unknown
    try {
      const dec = (fn: (this: Foo) => void, ctx: ClassMethodDecoratorContext): any => {
        return {}
      }
      class Foo { @dec #foo() { } }
    } catch (err) {
      error = err
    }
    assertEq(() => error instanceof TypeError, true)
  },
  'Method decorators: Return object (private static method)': () => {
    let error: unknown
    try {
      const dec = (fn: (this: typeof Foo) => void, ctx: ClassMethodDecoratorContext): any => {
        return {}
      }
      class Foo { @dec static #foo() { } }
    } catch (err) {
      error = err
    }
    assertEq(() => error instanceof TypeError, true)
  },
  'Method decorators: Extra initializer (instance method)': () => {
    let got: { this: any, args: any[] }
    const dec = (fn: (this: Foo) => void, ctx: ClassMethodDecoratorContext): any => {
      ctx.addInitializer(function (...args) {
        got = { this: this, args }
      })
    }
    class Foo { @dec foo() { } }
    assertEq(() => got, undefined)
    const instance = new Foo
    assertEq(() => got.this, instance)
    assertEq(() => got.args.length, 0)
  },
  'Method decorators: Extra initializer (static method)': () => {
    let got: { this: any, args: any[] }
    const dec = (fn: (this: typeof Foo) => void, ctx: ClassMethodDecoratorContext): any => {
      ctx.addInitializer(function (...args) {
        got = { this: this, args }
      })
    }
    class Foo { @dec static foo() { } }
    assertEq(() => got.this, Foo)
    assertEq(() => got.args.length, 0)
  },
  'Method decorators: Extra initializer (private instance method)': () => {
    let got: { this: any, args: any[] }
    const dec = (fn: (this: Foo) => void, ctx: ClassMethodDecoratorContext): any => {
      ctx.addInitializer(function (...args) {
        got = { this: this, args }
      })
    }
    class Foo { @dec #foo() { } }
    assertEq(() => got, undefined)
    const instance = new Foo
    assertEq(() => got.this, instance)
    assertEq(() => got.args.length, 0)
  },
  'Method decorators: Extra initializer (private static method)': () => {
    let got: { this: any, args: any[] }
    const dec = (fn: (this: typeof Foo) => void, ctx: ClassMethodDecoratorContext): any => {
      ctx.addInitializer(function (...args) {
        got = { this: this, args }
      })
    }
    class Foo { @dec static #foo() { } }
    assertEq(() => got.this, Foo)
    assertEq(() => got.args.length, 0)
  },

  // Field decorators
  'Field decorators: Basic (instance field)': () => {
    const dec = (value: undefined, ctx: ClassFieldDecoratorContext) => {
      assertEq(() => value, undefined)
      assertEq(() => ctx.kind, 'field')
      assertEq(() => ctx.name, 'foo')
      assertEq(() => ctx.static, false)
      assertEq(() => ctx.private, false)
      assertEq(() => ctx.access.has({ foo: false }), true)
      assertEq(() => ctx.access.has({ bar: true }), false)
      assertEq(() => ctx.access.get({ foo: 123 }), 123)
      assertEq(() => {
        const obj: any = {}
        ctx.access.set(obj, 321)
        return obj.foo
      }, 321)
    }
    class Foo {
      @dec foo = 123
    }
    assertEq(() => new Foo().foo, 123)
  },
  'Field decorators: Basic (static field)': () => {
    const dec = (value: undefined, ctx: ClassFieldDecoratorContext) => {
      assertEq(() => value, undefined)
      assertEq(() => ctx.kind, 'field')
      assertEq(() => ctx.name, 'foo')
      assertEq(() => ctx.static, true)
      assertEq(() => ctx.private, false)
      assertEq(() => ctx.access.has({ foo: false }), true)
      assertEq(() => ctx.access.has({ bar: true }), false)
      assertEq(() => ctx.access.get({ foo: 123 }), 123)
      assertEq(() => {
        const obj: any = {}
        ctx.access.set(obj, 321)
        return obj.foo
      }, 321)
    }
    class Foo {
      @dec static foo = 123
    }
    assertEq(() => Foo.foo, 123)
  },
  'Field decorators: Basic (private instance field)': () => {
    let lateAsserts: () => void
    const dec = (value: undefined, ctx: ClassFieldDecoratorContext) => {
      assertEq(() => value, undefined)
      assertEq(() => ctx.kind, 'field')
      assertEq(() => ctx.name, '#foo')
      assertEq(() => ctx.static, false)
      assertEq(() => ctx.private, true)
      lateAsserts = () => {
        assertEq(() => ctx.access.has(new Foo), true)
        assertEq(() => ctx.access.has({}), false)
        assertEq(() => ctx.access.get(new Foo), 123)
        assertEq(() => {
          const obj = new Foo
          ctx.access.set(obj, 321)
          return get$foo(obj)
        }, 321)
      }
    }
    let get$foo: (x: Foo) => number
    class Foo {
      @dec #foo = 123
      static { get$foo = x => x.#foo }
    }
    assertEq(() => get$foo(new Foo()), 123)
    lateAsserts!()
  },
  'Field decorators: Basic (private static field)': () => {
    let lateAsserts: () => void
    const dec = (value: undefined, ctx: ClassFieldDecoratorContext) => {
      assertEq(() => value, undefined)
      assertEq(() => ctx.kind, 'field')
      assertEq(() => ctx.name, '#foo')
      assertEq(() => ctx.static, true)
      assertEq(() => ctx.private, true)
      lateAsserts = () => {
        assertEq(() => ctx.access.has(Foo), true)
        assertEq(() => ctx.access.has({}), false)
        assertEq(() => ctx.access.get(Foo), 123)
        assertEq(() => {
          ctx.access.set(Foo, 321)
          return get$foo(Foo)
        }, 321)
      }
    }
    let get$foo: (x: typeof Foo) => number
    class Foo {
      @dec static #foo = 123
      static { get$foo = x => x.#foo }
    }
    assertEq(() => get$foo(Foo), 123)
    lateAsserts!()
  },
  'Field decorators: Shim (instance field)': () => {
    let log: number[] = []
    const dec = (value: undefined, ctx: ClassFieldDecoratorContext) => {
      return (x: number) => log.push(x)
    }
    class Foo {
      @dec foo = 123
      @dec bar!: number
    }
    assertEq(() => log + '', '')
    var obj = new Foo
    assertEq(() => obj.foo, 1)
    assertEq(() => obj.bar, 2)
    assertEq(() => log + '', '123,')
    var obj = new Foo
    assertEq(() => obj.foo, 3)
    assertEq(() => obj.bar, 4)
    assertEq(() => log + '', '123,,123,')
  },
  'Field decorators: Shim (static field)': () => {
    let log: number[] = []
    const dec = (value: undefined, ctx: ClassFieldDecoratorContext) => {
      return (x: number) => log.push(x)
    }
    const fn = (foo: number, bar: number) => {
      class Foo {
        @dec static foo = 123
        @dec static bar: number
      }
      assertEq(() => Foo.foo, foo)
      assertEq(() => Foo.bar, bar)
    }
    assertEq(() => log + '', '')
    fn(1, 2)
    assertEq(() => log + '', '123,')
    fn(3, 4)
    assertEq(() => log + '', '123,,123,')
  },
  'Field decorators: Shim (private instance field)': () => {
    let log: number[] = []
    const dec = (value: undefined, ctx: ClassFieldDecoratorContext) => {
      return (x: number) => log.push(x)
    }
    let get$foo: (x: Foo) => number
    let get$bar: (x: Foo) => number
    class Foo {
      @dec #foo = 123
      @dec #bar!: number
      static {
        get$foo = x => x.#foo
        get$bar = x => x.#bar
      }
    }
    assertEq(() => log + '', '')
    var obj = new Foo
    assertEq(() => get$foo(obj), 1)
    assertEq(() => get$bar(obj), 2)
    assertEq(() => log + '', '123,')
    var obj = new Foo
    assertEq(() => get$foo(obj), 3)
    assertEq(() => get$bar(obj), 4)
    assertEq(() => log + '', '123,,123,')
  },
  'Field decorators: Shim (private static field)': () => {
    let log: number[] = []
    const dec = (value: undefined, ctx: ClassFieldDecoratorContext) => {
      return (x: number) => log.push(x)
    }
    const fn = (foo: number, bar: number) => {
      let get$foo: (x: typeof Foo) => number
      let get$bar: (x: typeof Foo) => number
      class Foo {
        @dec static #foo = 123
        @dec static #bar: number
        static {
          get$foo = x => x.#foo
          get$bar = x => x.#bar
        }
      }
      assertEq(() => get$foo(Foo), foo)
      assertEq(() => get$bar(Foo), bar)
    }
    assertEq(() => log + '', '')
    fn(1, 2)
    assertEq(() => log + '', '123,')
    fn(3, 4)
    assertEq(() => log + '', '123,,123,')
  },
  'Field decorators: Order (instance field)': () => {
    const log: number[] = []
    const dec1 = (value: undefined, ctx: ClassFieldDecoratorContext) => {
      log.push(2)
      return () => log.push(4)
    }
    const dec2 = (value: undefined, ctx: ClassFieldDecoratorContext) => {
      log.push(1)
      return () => log.push(5)
    }
    log.push(0)
    class Foo {
      @dec1 @dec2 foo = 123
    }
    log.push(3)
    var obj = new Foo()
    log.push(6)
    assertEq(() => obj.foo, 6)
    assertEq(() => log + '', '0,1,2,3,4,5,6')
  },
  'Field decorators: Order (static field)': () => {
    const log: number[] = []
    const dec1 = (value: undefined, ctx: ClassFieldDecoratorContext) => {
      log.push(2)
      return () => log.push(3)
    }
    const dec2 = (value: undefined, ctx: ClassFieldDecoratorContext) => {
      log.push(1)
      return () => log.push(4)
    }
    log.push(0)
    class Foo {
      @dec1 @dec2 static foo = 123
    }
    log.push(5)
    assertEq(() => Foo.foo, 5)
    assertEq(() => log + '', '0,1,2,3,4,5')
  },
  'Field decorators: Order (private instance field)': () => {
    const log: number[] = []
    const dec1 = (value: undefined, ctx: ClassFieldDecoratorContext) => {
      log.push(2)
      return () => log.push(4)
    }
    const dec2 = (value: undefined, ctx: ClassFieldDecoratorContext) => {
      log.push(1)
      return () => log.push(5)
    }
    log.push(0)
    let get$foo: (x: Foo) => number
    class Foo {
      @dec1 @dec2 #foo = 123
      static { get$foo = x => x.#foo }
    }
    log.push(3)
    var obj = new Foo()
    log.push(6)
    assertEq(() => get$foo(obj), 6)
    assertEq(() => log + '', '0,1,2,3,4,5,6')
  },
  'Field decorators: Order (private static field)': () => {
    const log: number[] = []
    const dec1 = (value: undefined, ctx: ClassFieldDecoratorContext) => {
      log.push(2)
      return () => log.push(3)
    }
    const dec2 = (value: undefined, ctx: ClassFieldDecoratorContext) => {
      log.push(1)
      return () => log.push(4)
    }
    log.push(0)
    let get$foo: (x: typeof Foo) => number
    class Foo {
      @dec1 @dec2 static #foo = 123
      static { get$foo = x => x.#foo }
    }
    log.push(5)
    assertEq(() => get$foo(Foo), 5)
    assertEq(() => log + '', '0,1,2,3,4,5')
  },
  'Field decorators: Return null (instance field)': () => {
    let error: unknown
    try {
      const dec = (value: undefined, ctx: ClassFieldDecoratorContext): any => {
        return null
      }
      class Foo { @dec foo: undefined }
    } catch (err) {
      error = err
    }
    assertEq(() => error instanceof TypeError, true)
  },
  'Field decorators: Return null (static field)': () => {
    let error: unknown
    try {
      const dec = (value: undefined, ctx: ClassFieldDecoratorContext): any => {
        return null
      }
      class Foo { @dec static foo: undefined }
    } catch (err) {
      error = err
    }
    assertEq(() => error instanceof TypeError, true)
  },
  'Field decorators: Return null (private instance field)': () => {
    let error: unknown
    try {
      const dec = (value: undefined, ctx: ClassFieldDecoratorContext): any => {
        return null
      }
      class Foo { @dec #foo: undefined }
    } catch (err) {
      error = err
    }
    assertEq(() => error instanceof TypeError, true)
  },
  'Field decorators: Return null (private static field)': () => {
    let error: unknown
    try {
      const dec = (value: undefined, ctx: ClassFieldDecoratorContext): any => {
        return null
      }
      class Foo { @dec static #foo: undefined }
    } catch (err) {
      error = err
    }
    assertEq(() => error instanceof TypeError, true)
  },
  'Field decorators: Return object (instance field)': () => {
    let error: unknown
    try {
      const dec = (value: undefined, ctx: ClassFieldDecoratorContext): any => {
        return {}
      }
      class Foo { @dec foo: undefined }
    } catch (err) {
      error = err
    }
    assertEq(() => error instanceof TypeError, true)
  },
  'Field decorators: Return object (static field)': () => {
    let error: unknown
    try {
      const dec = (value: undefined, ctx: ClassFieldDecoratorContext): any => {
        return {}
      }
      class Foo { @dec static foo: undefined }
    } catch (err) {
      error = err
    }
    assertEq(() => error instanceof TypeError, true)
  },
  'Field decorators: Return object (private instance field)': () => {
    let error: unknown
    try {
      const dec = (value: undefined, ctx: ClassFieldDecoratorContext): any => {
        return {}
      }
      class Foo { @dec #foo: undefined }
    } catch (err) {
      error = err
    }
    assertEq(() => error instanceof TypeError, true)
  },
  'Field decorators: Return object (private static field)': () => {
    let error: unknown
    try {
      const dec = (value: undefined, ctx: ClassFieldDecoratorContext): any => {
        return {}
      }
      class Foo { @dec static #foo: undefined }
    } catch (err) {
      error = err
    }
    assertEq(() => error instanceof TypeError, true)
  },
  'Field decorators: Extra initializer (instance field)': () => {
    let got: { this: any, args: any[] }
    const dec = (value: undefined, ctx: ClassFieldDecoratorContext): any => {
      ctx.addInitializer(function (...args) {
        got = { this: this, args }
      })
    }
    class Foo { @dec foo: undefined }
    assertEq(() => got, undefined)
    const instance = new Foo
    assertEq(() => got.this, instance)
    assertEq(() => got.args.length, 0)
  },
  'Field decorators: Extra initializer (static field)': () => {
    let got: { this: any, args: any[] }
    const dec = (value: undefined, ctx: ClassFieldDecoratorContext): any => {
      ctx.addInitializer(function (...args) {
        got = { this: this, args }
      })
    }
    class Foo { @dec static foo: undefined }
    assertEq(() => got.this, Foo)
    assertEq(() => got.args.length, 0)
  },
  'Field decorators: Extra initializer (private instance field)': () => {
    let got: { this: any, args: any[] }
    const dec = (value: undefined, ctx: ClassFieldDecoratorContext): any => {
      ctx.addInitializer(function (...args) {
        got = { this: this, args }
      })
    }
    class Foo { @dec #foo: undefined }
    assertEq(() => got, undefined)
    const instance = new Foo
    assertEq(() => got.this, instance)
    assertEq(() => got.args.length, 0)
  },
  'Field decorators: Extra initializer (private static field)': () => {
    let got: { this: any, args: any[] }
    const dec = (value: undefined, ctx: ClassFieldDecoratorContext): any => {
      ctx.addInitializer(function (...args) {
        got = { this: this, args }
      })
    }
    class Foo { @dec static #foo: undefined }
    assertEq(() => got.this, Foo)
    assertEq(() => got.args.length, 0)
  },

  // Getter decorators
  'Getter decorators: Basic (instance getter)': () => {
    const dec = (fn: (this: Foo) => number, ctx: ClassGetterDecoratorContext) => {
      assertEq(() => typeof fn, 'function')
      assertEq(() => fn.name, 'get foo')
      assertEq(() => ctx.kind, 'getter')
      assertEq(() => ctx.name, 'foo')
      assertEq(() => ctx.static, false)
      assertEq(() => ctx.private, false)
      assertEq(() => ctx.access.has({ foo: false }), true)
      assertEq(() => ctx.access.has({ bar: true }), false)
      assertEq(() => ctx.access.get({ foo: 123 }), 123)
      assertEq(() => 'set' in ctx.access, false)
    }
    class Foo {
      bar = 123
      @dec get foo() { return this.bar }
    }
    assertEq(() => new Foo().foo, 123)
  },
  'Getter decorators: Basic (static getter)': () => {
    const dec = (fn: (this: typeof Foo) => number, ctx: ClassGetterDecoratorContext) => {
      assertEq(() => typeof fn, 'function')
      assertEq(() => fn.name, 'get foo')
      assertEq(() => ctx.kind, 'getter')
      assertEq(() => ctx.name, 'foo')
      assertEq(() => ctx.static, true)
      assertEq(() => ctx.private, false)
      assertEq(() => ctx.access.has({ foo: false }), true)
      assertEq(() => ctx.access.has({ bar: true }), false)
      assertEq(() => ctx.access.get({ foo: 123 }), 123)
      assertEq(() => 'set' in ctx.access, false)
    }
    class Foo {
      static bar = 123
      @dec static get foo() { return this.bar }
    }
    assertEq(() => Foo.foo, 123)
  },
  'Getter decorators: Basic (private instance getter)': () => {
    let lateAsserts: () => void
    const dec = (fn: (this: Foo) => number, ctx: ClassGetterDecoratorContext) => {
      assertEq(() => typeof fn, 'function')
      assertEq(() => fn.name, 'get #foo')
      assertEq(() => ctx.kind, 'getter')
      assertEq(() => ctx.name, '#foo')
      assertEq(() => ctx.static, false)
      assertEq(() => ctx.private, true)
      lateAsserts = () => {
        assertEq(() => ctx.access.has(new Foo), true)
        assertEq(() => ctx.access.has({}), false)
        assertEq(() => ctx.access.get(new Foo), 123)
        assertEq(() => 'set' in ctx.access, false)
      }
    }
    let get$foo: (x: Foo) => number
    class Foo {
      #bar = 123
      @dec get #foo() { return this.#bar }
      static { get$foo = x => x.#foo }
    }
    assertEq(() => get$foo(new Foo), 123)
    lateAsserts!()
  },
  'Getter decorators: Basic (private static getter)': () => {
    let lateAsserts: () => void
    const dec = (fn: (this: typeof Foo) => number, ctx: ClassGetterDecoratorContext) => {
      assertEq(() => typeof fn, 'function')
      assertEq(() => fn.name, 'get #foo')
      assertEq(() => ctx.kind, 'getter')
      assertEq(() => ctx.name, '#foo')
      assertEq(() => ctx.static, true)
      assertEq(() => ctx.private, true)
      lateAsserts = () => {
        assertEq(() => ctx.access.has(Foo), true)
        assertEq(() => ctx.access.has({}), false)
        assertEq(() => ctx.access.get(Foo), 123)
        assertEq(() => 'set' in ctx.access, false)
      }
    }
    let get$foo: (x: typeof Foo) => number
    class Foo {
      static #bar = 123
      @dec static get #foo() { return this.#bar }
      static { get$foo = x => x.#foo }
    }
    assertEq(() => get$foo(Foo), 123)
    lateAsserts!()
  },
  'Getter decorators: Shim (instance getter)': () => {
    let bar: (this: Foo) => number
    const dec = (fn: (this: Foo) => number, ctx: ClassGetterDecoratorContext) => {
      bar = function () { return fn.call(this) + 1 }
      return bar
    }
    class Foo {
      bar = 123
      @dec get foo() { return this.bar }
    }
    assertEq(() => Object.getOwnPropertyDescriptor(Foo.prototype, 'foo')!.get, bar!)
    assertEq(() => new Foo().foo, 124)
  },
  'Getter decorators: Shim (static getter)': () => {
    let bar: (this: typeof Foo) => number
    const dec = (fn: (this: typeof Foo) => number, ctx: ClassGetterDecoratorContext) => {
      bar = function () { return fn.call(this) + 1 }
      return bar
    }
    class Foo {
      static bar = 123
      @dec static get foo() { return this.bar }
    }
    assertEq(() => Object.getOwnPropertyDescriptor(Foo, 'foo')!.get, bar!)
    assertEq(() => Foo.foo, 124)
  },
  'Getter decorators: Shim (private instance getter)': () => {
    let bar: (this: Foo) => number
    const dec = (fn: (this: Foo) => number, ctx: ClassGetterDecoratorContext) => {
      bar = function () { return fn.call(this) + 1 }
      return bar
    }
    let get$foo: (x: Foo) => number
    class Foo {
      #bar = 123
      @dec get #foo() { return this.#bar }
      static { get$foo = x => x.#foo }
    }
    assertEq(() => get$foo(new Foo), 124)
  },
  'Getter decorators: Shim (private static getter)': () => {
    let bar: (this: typeof Foo) => number
    const dec = (fn: (this: typeof Foo) => number, ctx: ClassGetterDecoratorContext) => {
      bar = function () { return fn.call(this) + 1 }
      return bar
    }
    let get$foo: (x: typeof Foo) => number
    class Foo {
      static #bar = 123
      @dec static get #foo() { return this.#bar }
      static { get$foo = x => x.#foo }
    }
    assertEq(() => get$foo(Foo), 124)
  },
  'Getter decorators: Order (instance getter)': () => {
    const log: number[] = []
    let bar: (this: Foo) => number
    let baz: (this: Foo) => number
    const dec1 = (fn: (this: Foo) => number, ctx: ClassGetterDecoratorContext) => {
      log.push(2)
      bar = function () {
        log.push(4)
        return fn.call(this)
      }
      return bar
    }
    const dec2 = (fn: (this: Foo) => number, ctx: ClassGetterDecoratorContext) => {
      log.push(1)
      baz = function () {
        log.push(5)
        return fn.call(this)
      }
      return baz
    }
    log.push(0)
    class Foo {
      @dec1 @dec2 get foo() { return log.push(6) }
    }
    log.push(3)
    new Foo().foo
    log.push(7)
    assertEq(() => Object.getOwnPropertyDescriptor(Foo.prototype, 'foo')!.get, bar!)
    assertEq(() => log + '', '0,1,2,3,4,5,6,7')
  },
  'Getter decorators: Order (static getter)': () => {
    const log: number[] = []
    let bar: (this: typeof Foo) => number
    let baz: (this: typeof Foo) => number
    const dec1 = (fn: (this: typeof Foo) => number, ctx: ClassGetterDecoratorContext) => {
      log.push(2)
      bar = function () {
        log.push(4)
        return fn.call(this)
      }
      return bar
    }
    const dec2 = (fn: (this: typeof Foo) => number, ctx: ClassGetterDecoratorContext) => {
      log.push(1)
      baz = function () {
        log.push(5)
        return fn.call(this)
      }
      return baz
    }
    log.push(0)
    class Foo {
      @dec1 @dec2 static get foo() { return log.push(6) }
    }
    log.push(3)
    Foo.foo
    log.push(7)
    assertEq(() => Object.getOwnPropertyDescriptor(Foo, 'foo')!.get, bar!)
    assertEq(() => log + '', '0,1,2,3,4,5,6,7')
  },
  'Getter decorators: Order (private instance getter)': () => {
    const log: number[] = []
    let bar: (this: Foo) => number
    let baz: (this: Foo) => number
    const dec1 = (fn: (this: Foo) => number, ctx: ClassGetterDecoratorContext) => {
      log.push(2)
      bar = function () {
        log.push(4)
        return fn.call(this)
      }
      return bar
    }
    const dec2 = (fn: (this: Foo) => number, ctx: ClassGetterDecoratorContext) => {
      log.push(1)
      baz = function () {
        log.push(5)
        return fn.call(this)
      }
      return baz
    }
    log.push(0)
    let get$foo: (x: Foo) => number
    class Foo {
      @dec1 @dec2 get #foo() { return log.push(6) }
      static { get$foo = x => x.#foo }
    }
    log.push(3)
    assertEq(() => get$foo(new Foo), 7)
    log.push(7)
    assertEq(() => log + '', '0,1,2,3,4,5,6,7')
  },
  'Getter decorators: Order (private static getter)': () => {
    const log: number[] = []
    let bar: (this: typeof Foo) => number
    let baz: (this: typeof Foo) => number
    const dec1 = (fn: (this: typeof Foo) => number, ctx: ClassGetterDecoratorContext) => {
      log.push(2)
      bar = function () {
        log.push(4)
        return fn.call(this)
      }
      return bar
    }
    const dec2 = (fn: (this: typeof Foo) => number, ctx: ClassGetterDecoratorContext) => {
      log.push(1)
      baz = function () {
        log.push(5)
        return fn.call(this)
      }
      return baz
    }
    log.push(0)
    let get$foo: (x: typeof Foo) => number
    class Foo {
      @dec1 @dec2 static get #foo() { return log.push(6) }
      static { get$foo = x => x.#foo }
    }
    log.push(3)
    assertEq(() => get$foo(Foo), 7)
    log.push(7)
    assertEq(() => log + '', '0,1,2,3,4,5,6,7')
  },
  'Getter decorators: Return null (instance getter)': () => {
    let error: unknown
    try {
      const dec = (fn: (this: Foo) => undefined, ctx: ClassGetterDecoratorContext): any => {
        return null
      }
      class Foo { @dec get foo(): undefined { return } }
    } catch (err) {
      error = err
    }
    assertEq(() => error instanceof TypeError, true)
  },
  'Getter decorators: Return null (static getter)': () => {
    let error: unknown
    try {
      const dec = (fn: (this: typeof Foo) => undefined, ctx: ClassGetterDecoratorContext): any => {
        return null
      }
      class Foo { @dec static get foo(): undefined { return } }
    } catch (err) {
      error = err
    }
    assertEq(() => error instanceof TypeError, true)
  },
  'Getter decorators: Return null (private instance getter)': () => {
    let error: unknown
    try {
      const dec = (fn: (this: Foo) => undefined, ctx: ClassGetterDecoratorContext): any => {
        return null
      }
      class Foo { @dec get #foo(): undefined { return } }
    } catch (err) {
      error = err
    }
    assertEq(() => error instanceof TypeError, true)
  },
  'Getter decorators: Return null (private static getter)': () => {
    let error: unknown
    try {
      const dec = (fn: (this: typeof Foo) => undefined, ctx: ClassGetterDecoratorContext): any => {
        return null
      }
      class Foo { @dec static get #foo(): undefined { return } }
    } catch (err) {
      error = err
    }
    assertEq(() => error instanceof TypeError, true)
  },
  'Getter decorators: Return object (instance getter)': () => {
    let error: unknown
    try {
      const dec = (fn: (this: Foo) => undefined, ctx: ClassGetterDecoratorContext): any => {
        return {}
      }
      class Foo { @dec get foo(): undefined { return } }
    } catch (err) {
      error = err
    }
    assertEq(() => error instanceof TypeError, true)
  },
  'Getter decorators: Return object (static getter)': () => {
    let error: unknown
    try {
      const dec = (fn: (this: typeof Foo) => undefined, ctx: ClassGetterDecoratorContext): any => {
        return {}
      }
      class Foo { @dec static get foo(): undefined { return } }
    } catch (err) {
      error = err
    }
    assertEq(() => error instanceof TypeError, true)
  },
  'Getter decorators: Return object (private instance getter)': () => {
    let error: unknown
    try {
      const dec = (fn: (this: Foo) => undefined, ctx: ClassGetterDecoratorContext): any => {
        return {}
      }
      class Foo { @dec get #foo(): undefined { return } }
    } catch (err) {
      error = err
    }
    assertEq(() => error instanceof TypeError, true)
  },
  'Getter decorators: Return object (private static getter)': () => {
    let error: unknown
    try {
      const dec = (fn: (this: typeof Foo) => undefined, ctx: ClassGetterDecoratorContext): any => {
        return {}
      }
      class Foo { @dec static get #foo(): undefined { return } }
    } catch (err) {
      error = err
    }
    assertEq(() => error instanceof TypeError, true)
  },
  'Getter decorators: Extra initializer (instance getter)': () => {
    let got: { this: any, args: any[] }
    const dec = (fn: (this: Foo) => undefined, ctx: ClassGetterDecoratorContext): any => {
      ctx.addInitializer(function (...args) {
        got = { this: this, args }
      })
    }
    class Foo { @dec get foo(): undefined { return } }
    assertEq(() => got, undefined)
    const instance = new Foo
    assertEq(() => got.this, instance)
    assertEq(() => got.args.length, 0)
  },
  'Getter decorators: Extra initializer (static getter)': () => {
    let got: { this: any, args: any[] }
    const dec = (fn: (this: typeof Foo) => undefined, ctx: ClassGetterDecoratorContext): any => {
      ctx.addInitializer(function (...args) {
        got = { this: this, args }
      })
    }
    class Foo { @dec static get foo(): undefined { return } }
    assertEq(() => got.this, Foo)
    assertEq(() => got.args.length, 0)
  },
  'Getter decorators: Extra initializer (private instance getter)': () => {
    let got: { this: any, args: any[] }
    const dec = (fn: (this: Foo) => undefined, ctx: ClassGetterDecoratorContext): any => {
      ctx.addInitializer(function (...args) {
        got = { this: this, args }
      })
    }
    class Foo { @dec get #foo(): undefined { return } }
    assertEq(() => got, undefined)
    const instance = new Foo
    assertEq(() => got.this, instance)
    assertEq(() => got.args.length, 0)
  },
  'Getter decorators: Extra initializer (private static getter)': () => {
    let got: { this: any, args: any[] }
    const dec = (fn: (this: typeof Foo) => undefined, ctx: ClassGetterDecoratorContext): any => {
      ctx.addInitializer(function (...args) {
        got = { this: this, args }
      })
    }
    class Foo { @dec static get #foo(): undefined { return } }
    assertEq(() => got.this, Foo)
    assertEq(() => got.args.length, 0)
  },

  // Setter decorators
  'Setter decorators: Basic (instance setter)': () => {
    const dec = (fn: (this: Foo, x: number) => void, ctx: ClassSetterDecoratorContext) => {
      assertEq(() => typeof fn, 'function')
      assertEq(() => fn.name, 'set foo')
      assertEq(() => ctx.kind, 'setter')
      assertEq(() => ctx.name, 'foo')
      assertEq(() => ctx.static, false)
      assertEq(() => ctx.private, false)
      assertEq(() => ctx.access.has({ foo: false }), true)
      assertEq(() => ctx.access.has({ bar: true }), false)
      assertEq(() => 'get' in ctx.access, false)
      const obj: any = {}
      ctx.access.set(obj, 123)
      assertEq(() => obj.foo, 123)
      assertEq(() => 'bar' in obj, false)
    }
    class Foo {
      bar = 0
      @dec set foo(x: number) { this.bar = x }
    }
    var obj = new Foo
    obj.foo = 321
    assertEq(() => obj.bar, 321)
  },
  'Setter decorators: Basic (static setter)': () => {
    const dec = (fn: (this: typeof Foo, x: number) => void, ctx: ClassSetterDecoratorContext) => {
      assertEq(() => typeof fn, 'function')
      assertEq(() => fn.name, 'set foo')
      assertEq(() => ctx.kind, 'setter')
      assertEq(() => ctx.name, 'foo')
      assertEq(() => ctx.static, true)
      assertEq(() => ctx.private, false)
      assertEq(() => ctx.access.has({ foo: false }), true)
      assertEq(() => ctx.access.has({ bar: true }), false)
      assertEq(() => 'get' in ctx.access, false)
      const obj: any = {}
      ctx.access.set(obj, 123)
      assertEq(() => obj.foo, 123)
      assertEq(() => 'bar' in obj, false)
    }
    class Foo {
      static bar = 0
      @dec static set foo(x: number) { this.bar = x }
    }
    Foo.foo = 321
    assertEq(() => Foo.bar, 321)
  },
  'Setter decorators: Basic (private instance setter)': () => {
    let lateAsserts: () => void
    const dec = (fn: (this: Foo, x: number) => void, ctx: ClassSetterDecoratorContext) => {
      assertEq(() => typeof fn, 'function')
      assertEq(() => fn.name, 'set #foo')
      assertEq(() => ctx.kind, 'setter')
      assertEq(() => ctx.name, '#foo')
      assertEq(() => ctx.static, false)
      assertEq(() => ctx.private, true)
      lateAsserts = () => {
        assertEq(() => ctx.access.has(new Foo), true)
        assertEq(() => ctx.access.has({}), false)
        assertEq(() => 'get' in ctx.access, false)
        assertEq(() => {
          const obj = new Foo
          ctx.access.set(obj, 123)
          return obj.bar
        }, 123)
      }
    }
    let set$foo: (x: Foo, y: number) => void
    class Foo {
      bar = 0
      @dec set #foo(x: number) { this.bar = x }
      static { set$foo = (x, y) => { x.#foo = y } }
    }
    lateAsserts!()
    var obj = new Foo
    assertEq(() => set$foo(obj, 321), undefined)
    assertEq(() => obj.bar, 321)
  },
  'Setter decorators: Basic (private static setter)': () => {
    let lateAsserts: () => void
    const dec = (fn: (this: typeof Foo, x: number) => void, ctx: ClassSetterDecoratorContext) => {
      assertEq(() => typeof fn, 'function')
      assertEq(() => fn.name, 'set #foo')
      assertEq(() => ctx.kind, 'setter')
      assertEq(() => ctx.name, '#foo')
      assertEq(() => ctx.static, true)
      assertEq(() => ctx.private, true)
      lateAsserts = () => {
        assertEq(() => ctx.access.has(Foo), true)
        assertEq(() => ctx.access.has({}), false)
        assertEq(() => 'get' in ctx.access, false)
        assertEq(() => {
          ctx.access.set(Foo, 123)
          return Foo.bar
        }, 123)
      }
    }
    let set$foo: (x: typeof Foo, y: number) => void
    class Foo {
      static bar = 0
      @dec static set #foo(x: number) { this.bar = x }
      static { set$foo = (x, y) => { x.#foo = y } }
    }
    lateAsserts!()
    assertEq(() => set$foo(Foo, 321), undefined)
    assertEq(() => Foo.bar, 321)
  },
  'Setter decorators: Shim (instance setter)': () => {
    let bar: (this: Foo, x: number) => void
    const dec = (fn: (this: Foo, x: number) => void, ctx: ClassSetterDecoratorContext) => {
      bar = function (x) { fn.call(this, x + 1) }
      return bar
    }
    class Foo {
      bar = 123
      @dec set foo(x: number) { this.bar = x }
    }
    assertEq(() => Object.getOwnPropertyDescriptor(Foo.prototype, 'foo')!.set, bar!)
    var obj = new Foo
    obj.foo = 321
    assertEq(() => obj.bar, 322)
  },
  'Setter decorators: Shim (static setter)': () => {
    let bar: (this: typeof Foo, x: number) => void
    const dec = (fn: (this: typeof Foo, x: number) => void, ctx: ClassSetterDecoratorContext) => {
      bar = function (x) { fn.call(this, x + 1) }
      return bar
    }
    class Foo {
      static bar = 123
      @dec static set foo(x: number) { this.bar = x }
    }
    assertEq(() => Object.getOwnPropertyDescriptor(Foo, 'foo')!.set, bar!)
    Foo.foo = 321
    assertEq(() => Foo.bar, 322)
  },
  'Setter decorators: Shim (private instance setter)': () => {
    let bar: (this: Foo, x: number) => void
    const dec = (fn: (this: Foo, x: number) => void, ctx: ClassSetterDecoratorContext) => {
      bar = function (x) { fn.call(this, x + 1) }
      return bar
    }
    let set$foo: (x: Foo, y: number) => void
    class Foo {
      bar = 123
      @dec set #foo(x: number) { this.bar = x }
      static { set$foo = (x, y) => { x.#foo = y } }
    }
    var obj = new Foo
    assertEq(() => set$foo(obj, 321), undefined)
    assertEq(() => obj.bar, 322)
  },
  'Setter decorators: Shim (private static setter)': () => {
    let bar: (this: typeof Foo, x: number) => void
    const dec = (fn: (this: typeof Foo, x: number) => void, ctx: ClassSetterDecoratorContext) => {
      bar = function (x) { fn.call(this, x + 1) }
      return bar
    }
    let set$foo: (x: typeof Foo, y: number) => void
    class Foo {
      static bar = 123
      @dec static set #foo(x: number) { this.bar = x }
      static { set$foo = (x, y) => { x.#foo = y } }
    }
    assertEq(() => set$foo(Foo, 321), undefined)
    assertEq(() => Foo.bar, 322)
  },
  'Setter decorators: Order (instance setter)': () => {
    const log: number[] = []
    let bar: (this: Foo, x: number) => void
    let baz: (this: Foo, x: number) => void
    const dec1 = (fn: (this: Foo, x: number) => void, ctx: ClassSetterDecoratorContext) => {
      log.push(2)
      bar = function (x) {
        log.push(4)
        fn.call(this, x)
      }
      return bar
    }
    const dec2 = (fn: (this: Foo, x: number) => void, ctx: ClassSetterDecoratorContext) => {
      log.push(1)
      baz = function (x) {
        log.push(5)
        fn.call(this, x)
      }
      return baz
    }
    log.push(0)
    class Foo {
      @dec1 @dec2 set foo(x: number) { log.push(6) }
    }
    log.push(3)
    new Foo().foo = 123
    log.push(7)
    assertEq(() => Object.getOwnPropertyDescriptor(Foo.prototype, 'foo')!.set, bar!)
    assertEq(() => log + '', '0,1,2,3,4,5,6,7')
  },
  'Setter decorators: Order (static setter)': () => {
    const log: number[] = []
    let bar: (this: typeof Foo, x: number) => void
    let baz: (this: typeof Foo, x: number) => void
    const dec1 = (fn: (this: typeof Foo, x: number) => void, ctx: ClassSetterDecoratorContext) => {
      log.push(2)
      bar = function (x) {
        log.push(4)
        fn.call(this, x)
      }
      return bar
    }
    const dec2 = (fn: (this: typeof Foo, x: number) => void, ctx: ClassSetterDecoratorContext) => {
      log.push(1)
      baz = function (x) {
        log.push(5)
        fn.call(this, x)
      }
      return baz
    }
    log.push(0)
    class Foo {
      @dec1 @dec2 static set foo(x: number) { log.push(6) }
    }
    log.push(3)
    Foo.foo = 123
    log.push(7)
    assertEq(() => Object.getOwnPropertyDescriptor(Foo, 'foo')!.set, bar!)
    assertEq(() => log + '', '0,1,2,3,4,5,6,7')
  },
  'Setter decorators: Order (private instance setter)': () => {
    const log: number[] = []
    let bar: (this: Foo, x: number) => void
    let baz: (this: Foo, x: number) => void
    const dec1 = (fn: (this: Foo, x: number) => void, ctx: ClassSetterDecoratorContext) => {
      log.push(2)
      bar = function (x) {
        log.push(4)
        fn.call(this, x)
      }
      return bar
    }
    const dec2 = (fn: (this: Foo, x: number) => void, ctx: ClassSetterDecoratorContext) => {
      log.push(1)
      baz = function (x) {
        log.push(5)
        fn.call(this, x)
      }
      return baz
    }
    log.push(0)
    let set$foo: (x: Foo, y: number) => void
    class Foo {
      @dec1 @dec2 set #foo(x: number) { log.push(6) }
      static { set$foo = (x, y) => { x.#foo = y } }
    }
    log.push(3)
    assertEq(() => set$foo(new Foo, 123), undefined)
    log.push(7)
    assertEq(() => log + '', '0,1,2,3,4,5,6,7')
  },
  'Setter decorators: Order (private static setter)': () => {
    const log: number[] = []
    let bar: (this: typeof Foo, x: number) => void
    let baz: (this: typeof Foo, x: number) => void
    const dec1 = (fn: (this: typeof Foo, x: number) => void, ctx: ClassSetterDecoratorContext) => {
      log.push(2)
      bar = function (x) {
        log.push(4)
        fn.call(this, x)
      }
      return bar
    }
    const dec2 = (fn: (this: typeof Foo, x: number) => void, ctx: ClassSetterDecoratorContext) => {
      log.push(1)
      baz = function (x) {
        log.push(5)
        fn.call(this, x)
      }
      return baz
    }
    log.push(0)
    let set$foo: (x: typeof Foo, y: number) => void
    class Foo {
      @dec1 @dec2 static set #foo(x: number) { log.push(6) }
      static { set$foo = (x, y) => { x.#foo = y } }
    }
    log.push(3)
    assertEq(() => set$foo(Foo, 123), undefined)
    log.push(7)
    assertEq(() => log + '', '0,1,2,3,4,5,6,7')
  },
  'Setter decorators: Return null (instance setter)': () => {
    let error: unknown
    try {
      const dec = (fn: (this: Foo, x: undefined) => void, ctx: ClassSetterDecoratorContext): any => {
        return null
      }
      class Foo { @dec set foo(x: undefined) { } }
    } catch (err) {
      error = err
    }
    assertEq(() => error instanceof TypeError, true)
  },
  'Setter decorators: Return null (static setter)': () => {
    let error: unknown
    try {
      const dec = (fn: (this: typeof Foo, x: undefined) => void, ctx: ClassSetterDecoratorContext): any => {
        return null
      }
      class Foo { @dec static set foo(x: undefined) { } }
    } catch (err) {
      error = err
    }
    assertEq(() => error instanceof TypeError, true)
  },
  'Setter decorators: Return null (private instance setter)': () => {
    let error: unknown
    try {
      const dec = (fn: (this: Foo, x: undefined) => void, ctx: ClassSetterDecoratorContext): any => {
        return null
      }
      class Foo { @dec set #foo(x: undefined) { } }
    } catch (err) {
      error = err
    }
    assertEq(() => error instanceof TypeError, true)
  },
  'Setter decorators: Return null (private static setter)': () => {
    let error: unknown
    try {
      const dec = (fn: (this: typeof Foo, x: undefined) => void, ctx: ClassSetterDecoratorContext): any => {
        return null
      }
      class Foo { @dec static set #foo(x: undefined) { } }
    } catch (err) {
      error = err
    }
    assertEq(() => error instanceof TypeError, true)
  },
  'Setter decorators: Return object (instance setter)': () => {
    let error: unknown
    try {
      const dec = (fn: (this: Foo, x: undefined) => void, ctx: ClassSetterDecoratorContext): any => {
        return {}
      }
      class Foo { @dec set foo(x: undefined) { } }
    } catch (err) {
      error = err
    }
    assertEq(() => error instanceof TypeError, true)
  },
  'Setter decorators: Return object (static setter)': () => {
    let error: unknown
    try {
      const dec = (fn: (this: typeof Foo, x: undefined) => void, ctx: ClassSetterDecoratorContext): any => {
        return {}
      }
      class Foo { @dec static set foo(x: undefined) { } }
    } catch (err) {
      error = err
    }
    assertEq(() => error instanceof TypeError, true)
  },
  'Setter decorators: Return object (private instance setter)': () => {
    let error: unknown
    try {
      const dec = (fn: (this: Foo, x: undefined) => void, ctx: ClassSetterDecoratorContext): any => {
        return {}
      }
      class Foo { @dec set #foo(x: undefined) { } }
    } catch (err) {
      error = err
    }
    assertEq(() => error instanceof TypeError, true)
  },
  'Setter decorators: Return object (private static setter)': () => {
    let error: unknown
    try {
      const dec = (fn: (this: typeof Foo, x: undefined) => void, ctx: ClassSetterDecoratorContext): any => {
        return {}
      }
      class Foo { @dec static set #foo(x: undefined) { } }
    } catch (err) {
      error = err
    }
    assertEq(() => error instanceof TypeError, true)
  },
  'Setter decorators: Extra initializer (instance setter)': () => {
    let got: { this: any, args: any[] }
    const dec = (fn: (this: Foo, x: undefined) => void, ctx: ClassSetterDecoratorContext): any => {
      ctx.addInitializer(function (...args) {
        got = { this: this, args }
      })
    }
    class Foo { @dec set foo(x: undefined) { } }
    assertEq(() => got, undefined)
    const instance = new Foo
    assertEq(() => got.this, instance)
    assertEq(() => got.args.length, 0)
  },
  'Setter decorators: Extra initializer (static setter)': () => {
    let got: { this: any, args: any[] }
    const dec = (fn: (this: typeof Foo, x: undefined) => void, ctx: ClassSetterDecoratorContext): any => {
      ctx.addInitializer(function (...args) {
        got = { this: this, args }
      })
    }
    class Foo { @dec static set foo(x: undefined) { } }
    assertEq(() => got.this, Foo)
    assertEq(() => got.args.length, 0)
  },
  'Setter decorators: Extra initializer (private instance setter)': () => {
    let got: { this: any, args: any[] }
    const dec = (fn: (this: Foo, x: undefined) => void, ctx: ClassSetterDecoratorContext): any => {
      ctx.addInitializer(function (...args) {
        got = { this: this, args }
      })
    }
    class Foo { @dec set #foo(x: undefined) { } }
    assertEq(() => got, undefined)
    const instance = new Foo
    assertEq(() => got.this, instance)
    assertEq(() => got.args.length, 0)
  },
  'Setter decorators: Extra initializer (private static setter)': () => {
    let got: { this: any, args: any[] }
    const dec = (fn: (this: typeof Foo, x: undefined) => void, ctx: ClassSetterDecoratorContext): any => {
      ctx.addInitializer(function (...args) {
        got = { this: this, args }
      })
    }
    class Foo { @dec static set #foo(x: undefined) { } }
    assertEq(() => got.this, Foo)
    assertEq(() => got.args.length, 0)
  },

  // Auto-accessor decorators
  'Auto-accessor decorators: Basic (instance auto-accessor)': () => {
    const dec = (target: ClassAccessorDecoratorTarget<Foo, number>, ctx: ClassAccessorDecoratorContext) => {
      assertEq(() => typeof target.get, 'function')
      assertEq(() => typeof target.set, 'function')
      assertEq(() => target.get.name, 'get foo')
      assertEq(() => target.set.name, 'set foo')
      assertEq(() => ctx.kind, 'accessor')
      assertEq(() => ctx.name, 'foo')
      assertEq(() => ctx.static, false)
      assertEq(() => ctx.private, false)
      assertEq(() => ctx.access.has({ foo: false }), true)
      assertEq(() => ctx.access.has({ bar: true }), false)
      assertEq(() => ctx.access.get({ foo: 123 }), 123)
      assertEq(() => {
        const obj: any = {}
        ctx.access.set(obj, 123)
        return obj.foo
      }, 123)
    }
    class Foo {
      @dec accessor foo = 0
    }
    var obj = new Foo
    obj.foo = 321
    assertEq(() => obj.foo, 321)
  },
  'Auto-accessor decorators: Basic (static auto-accessor)': () => {
    const dec = (target: ClassAccessorDecoratorTarget<typeof Foo, number>, ctx: ClassAccessorDecoratorContext) => {
      assertEq(() => typeof target.get, 'function')
      assertEq(() => typeof target.set, 'function')
      assertEq(() => target.get.name, 'get foo')
      assertEq(() => target.set.name, 'set foo')
      assertEq(() => ctx.kind, 'accessor')
      assertEq(() => ctx.name, 'foo')
      assertEq(() => ctx.static, true)
      assertEq(() => ctx.private, false)
      assertEq(() => ctx.access.has({ foo: false }), true)
      assertEq(() => ctx.access.has({ bar: true }), false)
      assertEq(() => ctx.access.get({ foo: 123 }), 123)
      assertEq(() => {
        const obj: any = {}
        ctx.access.set(obj, 123)
        return obj.foo
      }, 123)
    }
    class Foo {
      @dec static accessor foo = 0
    }
    Foo.foo = 321
    assertEq(() => Foo.foo, 321)
  },
  'Auto-accessor decorators: Basic (private instance auto-accessor)': () => {
    let lateAsserts: () => void
    const dec = (target: ClassAccessorDecoratorTarget<Foo, number>, ctx: ClassAccessorDecoratorContext) => {
      assertEq(() => typeof target.get, 'function')
      assertEq(() => typeof target.set, 'function')
      assertEq(() => target.get.name, 'get #foo')
      assertEq(() => target.set.name, 'set #foo')
      assertEq(() => ctx.kind, 'accessor')
      assertEq(() => ctx.name, '#foo')
      assertEq(() => ctx.static, false)
      assertEq(() => ctx.private, true)
      lateAsserts = () => {
        assertEq(() => ctx.access.has(new Foo), true)
        assertEq(() => ctx.access.has({}), false)
        assertEq(() => ctx.access.get(new Foo), 0)
        assertEq(() => {
          const obj = new Foo
          ctx.access.set(obj, 123)
          return get$foo(obj)
        }, 123)
      }
    }
    let get$foo: (x: Foo) => number
    let set$foo: (x: Foo, y: number) => void
    class Foo {
      @dec accessor #foo = 0
      static {
        get$foo = x => x.#foo
        set$foo = (x, y) => { x.#foo = y }
      }
    }
    lateAsserts!()
    var obj = new Foo
    assertEq(() => set$foo(obj, 321), undefined)
    assertEq(() => get$foo(obj), 321)
  },
  'Auto-accessor decorators: Basic (private static auto-accessor)': () => {
    let lateAsserts: () => void
    const dec = (target: ClassAccessorDecoratorTarget<typeof Foo, number>, ctx: ClassAccessorDecoratorContext) => {
      assertEq(() => typeof target.get, 'function')
      assertEq(() => typeof target.set, 'function')
      assertEq(() => target.get.name, 'get #foo')
      assertEq(() => target.set.name, 'set #foo')
      assertEq(() => ctx.kind, 'accessor')
      assertEq(() => ctx.name, '#foo')
      assertEq(() => ctx.static, true)
      assertEq(() => ctx.private, true)
      lateAsserts = () => {
        assertEq(() => ctx.access.has(Foo), true)
        assertEq(() => ctx.access.has({}), false)
        assertEq(() => ctx.access.get(Foo), 0)
        assertEq(() => {
          ctx.access.set(Foo, 123)
          return get$foo(Foo)
        }, 123)
      }
    }
    let get$foo: (x: typeof Foo) => number
    let set$foo: (x: typeof Foo, y: number) => void
    class Foo {
      @dec static accessor #foo = 0
      static {
        get$foo = x => x.#foo
        set$foo = (x, y) => { x.#foo = y }
      }
    }
    lateAsserts!()
    assertEq(() => set$foo(Foo, 321), undefined)
    assertEq(() => get$foo(Foo), 321)
  },
  'Auto-accessor decorators: Shim (instance auto-accessor)': () => {
    let get: (this: Foo) => number
    let set: (this: Foo, x: number) => void
    const dec = (target: ClassAccessorDecoratorTarget<Foo, number>, ctx: ClassAccessorDecoratorContext): ClassAccessorDecoratorResult<Foo, number> => {
      const init = (x: number) => x + 1
      get = function () { return target.get.call(this) * 10 }
      set = function (x) { target.set.call(this, x * 2) }
      return { get, set, init }
    }
    class Foo {
      @dec accessor foo = 123
    }
    assertEq(() => Object.getOwnPropertyDescriptor(Foo.prototype, 'foo')!.get, get!)
    assertEq(() => Object.getOwnPropertyDescriptor(Foo.prototype, 'foo')!.set, set!)
    var obj = new Foo
    assertEq(() => obj.foo, (123 + 1) * 10)
    obj.foo = 321
    assertEq(() => obj.foo, (321 * 2) * 10)
  },
  'Auto-accessor decorators: Shim (static auto-accessor)': () => {
    let get: (this: typeof Foo) => number
    let set: (this: typeof Foo, x: number) => void
    const dec = (target: ClassAccessorDecoratorTarget<typeof Foo, number>, ctx: ClassAccessorDecoratorContext): ClassAccessorDecoratorResult<typeof Foo, number> => {
      const init = (x: number) => x + 1
      get = function () { return target.get.call(this) * 10 }
      set = function (x) { target.set.call(this, x * 2) }
      return { get, set, init }
    }
    class Foo {
      @dec static accessor foo = 123
    }
    assertEq(() => Object.getOwnPropertyDescriptor(Foo, 'foo')!.get, get!)
    assertEq(() => Object.getOwnPropertyDescriptor(Foo, 'foo')!.set, set!)
    assertEq(() => Foo.foo, (123 + 1) * 10)
    Foo.foo = 321
    assertEq(() => Foo.foo, (321 * 2) * 10)
  },
  'Auto-accessor decorators: Shim (private instance auto-accessor)': () => {
    let get: (this: Foo) => number
    let set: (this: Foo, x: number) => void
    const dec = (target: ClassAccessorDecoratorTarget<Foo, number>, ctx: ClassAccessorDecoratorContext): ClassAccessorDecoratorResult<Foo, number> => {
      const init = (x: number) => x + 1
      get = function () { return target.get.call(this) * 10 }
      set = function (x) { target.set.call(this, x * 2) }
      return { get, set, init }
    }
    let get$foo: (x: Foo) => number
    let set$foo: (x: Foo, y: number) => void
    class Foo {
      @dec accessor #foo = 123
      static {
        get$foo = x => x.#foo
        set$foo = (x, y) => { x.#foo = y }
      }
    }
    var obj = new Foo
    assertEq(() => get$foo(obj), (123 + 1) * 10)
    assertEq(() => set$foo(obj, 321), undefined)
    assertEq(() => get$foo(obj), (321 * 2) * 10)
  },
  'Auto-accessor decorators: Shim (private static auto-accessor)': () => {
    let get: (this: typeof Foo) => number
    let set: (this: typeof Foo, x: number) => void
    const dec = (target: ClassAccessorDecoratorTarget<typeof Foo, number>, ctx: ClassAccessorDecoratorContext): ClassAccessorDecoratorResult<typeof Foo, number> => {
      const init = (x: number) => x + 1
      get = function () { return target.get.call(this) * 10 }
      set = function (x) { target.set.call(this, x * 2) }
      return { get, set, init }
    }
    let get$foo: (x: typeof Foo) => number
    let set$foo: (x: typeof Foo, y: number) => void
    class Foo {
      @dec static accessor #foo = 123
      static {
        get$foo = x => x.#foo
        set$foo = (x, y) => { x.#foo = y }
      }
    }
    assertEq(() => get$foo(Foo), (123 + 1) * 10)
    assertEq(() => set$foo(Foo, 321), undefined)
    assertEq(() => get$foo(Foo), (321 * 2) * 10)
  },
  'Auto-accessor decorators: Return null (instance auto-accessor)': () => {
    let error: unknown
    try {
      const dec = (target: ClassAccessorDecoratorTarget<Foo, undefined>, ctx: ClassAccessorDecoratorContext): any => {
        return null
      }
      class Foo { @dec accessor foo: undefined }
    } catch (err) {
      error = err
    }
    assertEq(() => error instanceof TypeError, true)
  },
  'Auto-accessor decorators: Return null (static auto-accessor)': () => {
    let error: unknown
    try {
      const dec = (target: ClassAccessorDecoratorTarget<typeof Foo, undefined>, ctx: ClassAccessorDecoratorContext): any => {
        return null
      }
      class Foo { @dec static accessor foo: undefined }
    } catch (err) {
      error = err
    }
    assertEq(() => error instanceof TypeError, true)
  },
  'Auto-accessor decorators: Return null (private instance auto-accessor)': () => {
    let error: unknown
    try {
      const dec = (target: ClassAccessorDecoratorTarget<Foo, undefined>, ctx: ClassAccessorDecoratorContext): any => {
        return null
      }
      class Foo { @dec accessor #foo: undefined }
    } catch (err) {
      error = err
    }
    assertEq(() => error instanceof TypeError, true)
  },
  'Auto-accessor decorators: Return null (private static auto-accessor)': () => {
    let error: unknown
    try {
      const dec = (target: ClassAccessorDecoratorTarget<typeof Foo, undefined>, ctx: ClassAccessorDecoratorContext): any => {
        return null
      }
      class Foo { @dec static accessor #foo: undefined }
    } catch (err) {
      error = err
    }
    assertEq(() => error instanceof TypeError, true)
  },
  'Auto-accessor decorators: Extra initializer (instance auto-accessor)': () => {
    let got: { this: any, args: any[] }
    const dec = (target: ClassAccessorDecoratorTarget<Foo, undefined>, ctx: ClassAccessorDecoratorContext): any => {
      ctx.addInitializer(function (...args) {
        got = { this: this, args }
      })
    }
    class Foo { @dec accessor foo: undefined }
    assertEq(() => got, undefined)
    const instance = new Foo
    assertEq(() => got.this, instance)
    assertEq(() => got.args.length, 0)
  },
  'Auto-accessor decorators: Extra initializer (static auto-accessor)': () => {
    let got: { this: any, args: any[] }
    const dec = (target: ClassAccessorDecoratorTarget<typeof Foo, undefined>, ctx: ClassAccessorDecoratorContext): any => {
      ctx.addInitializer(function (...args) {
        got = { this: this, args }
      })
    }
    class Foo { @dec static accessor foo: undefined }
    assertEq(() => got.this, Foo)
    assertEq(() => got.args.length, 0)
  },
  'Auto-accessor decorators: Extra initializer (private instance auto-accessor)': () => {
    let got: { this: any, args: any[] }
    const dec = (target: ClassAccessorDecoratorTarget<Foo, undefined>, ctx: ClassAccessorDecoratorContext): any => {
      ctx.addInitializer(function (...args) {
        got = { this: this, args }
      })
    }
    class Foo { @dec accessor #foo: undefined }
    assertEq(() => got, undefined)
    const instance = new Foo
    assertEq(() => got.this, instance)
    assertEq(() => got.args.length, 0)
  },
  'Auto-accessor decorators: Extra initializer (private static auto-accessor)': () => {
    let got: { this: any, args: any[] }
    const dec = (target: ClassAccessorDecoratorTarget<typeof Foo, undefined>, ctx: ClassAccessorDecoratorContext): any => {
      ctx.addInitializer(function (...args) {
        got = { this: this, args }
      })
    }
    class Foo { @dec static accessor #foo: undefined }
    assertEq(() => got.this, Foo)
    assertEq(() => got.args.length, 0)
  },

  // Decorator list evaluation
  'Decorator list evaluation: Computed names': () => {
    const log: number[] = []
    const foo = (n: number): Function => {
      log.push(n)
      return () => { }
    }

    const computed: {
      readonly method: unique symbol,
      readonly field: unique symbol,
      readonly getter: unique symbol,
      readonly setter: unique symbol,
      readonly accessor: unique symbol,
    } = {
      get method() { log.push(log.length); return Symbol('method') },
      get field() { log.push(log.length); return Symbol('field') },
      get getter() { log.push(log.length); return Symbol('getter') },
      get setter() { log.push(log.length); return Symbol('setter') },
      get accessor() { log.push(log.length); return Symbol('accessor') },
    } as any

    @foo(0) class Foo {
      @foo(1) [computed.method]() { }
      @foo(3) static [computed.method]() { }

      @foo(5) [computed.field]: undefined
      @foo(7) static [computed.field]: undefined

      @foo(9) get [computed.getter](): undefined { return }
      @foo(11) static get [computed.getter](): undefined { return }

      @foo(13) set [computed.setter](x: undefined) { }
      @foo(15) static set [computed.setter](x: undefined) { }

      @foo(17) accessor [computed.accessor]: undefined
      @foo(19) static accessor [computed.accessor]: undefined
    }

    assertEq(() => '' + log, '0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20')
  },
  'Decorator list evaluation: "this"': () => {
    const log: number[] = []
    const dummy: Function = () => { }
    const ctx = {
      foo(n: number) {
        log.push(n)
      }
    }

    function wrapper(this: typeof ctx) {
      @(assertEq(() => this.foo(0), undefined), dummy) class Foo {
        @(assertEq(() => this.foo(1), undefined), dummy) method() { }
        @(assertEq(() => this.foo(2), undefined), dummy) static method() { }

        @(assertEq(() => this.foo(3), undefined), dummy) field: undefined
        @(assertEq(() => this.foo(4), undefined), dummy) static field: undefined

        @(assertEq(() => this.foo(5), undefined), dummy) get getter(): undefined { return }
        @(assertEq(() => this.foo(6), undefined), dummy) static get getter(): undefined { return }

        @(assertEq(() => this.foo(7), undefined), dummy) set setter(x: undefined) { }
        @(assertEq(() => this.foo(8), undefined), dummy) static set setter(x: undefined) { }

        @(assertEq(() => this.foo(9), undefined), dummy) accessor accessor: undefined
        @(assertEq(() => this.foo(10), undefined), dummy) static accessor accessor: undefined
      }
    }

    wrapper.call(ctx)
    assertEq(() => '' + log, '0,1,2,3,4,5,6,7,8,9,10')
  },
  'Decorator list evaluation: "await"': async () => {
    const log: number[] = []
    const dummy: Function = () => { }

    async function wrapper() {
      @(log.push(await Promise.resolve(0)), dummy) class Foo {
        @(log.push(await Promise.resolve(1)), dummy) method() { }
        @(log.push(await Promise.resolve(2)), dummy) static method() { }

        @(log.push(await Promise.resolve(3)), dummy) field: undefined
        @(log.push(await Promise.resolve(4)), dummy) static field: undefined

        @(log.push(await Promise.resolve(5)), dummy) get getter(): undefined { return }
        @(log.push(await Promise.resolve(6)), dummy) static get getter(): undefined { return }

        @(log.push(await Promise.resolve(7)), dummy) set setter(x: undefined) { }
        @(log.push(await Promise.resolve(8)), dummy) static set setter(x: undefined) { }

        @(log.push(await Promise.resolve(9)), dummy) accessor accessor: undefined
        @(log.push(await Promise.resolve(10)), dummy) static accessor accessor: undefined
      }
    }

    await wrapper()
    assertEq(() => '' + log, '0,1,2,3,4,5,6,7,8,9,10')
  },
  'Decorator list evaluation: Outer private name': () => {
    const log: number[] = []

    class Dummy {
      static #foo(n: number): Function {
        log.push(n)
        return () => { }
      }

      static {
        const dummy = this
        @(dummy.#foo(0)) class Foo {
          @(dummy.#foo(1)) method() { }
          @(dummy.#foo(2)) static method() { }

          @(dummy.#foo(3)) field: undefined
          @(dummy.#foo(4)) static field: undefined

          @(dummy.#foo(5)) get getter(): undefined { return }
          @(dummy.#foo(6)) static get getter(): undefined { return }

          @(dummy.#foo(7)) set setter(x: undefined) { }
          @(dummy.#foo(8)) static set setter(x: undefined) { }

          @(dummy.#foo(9)) accessor accessor: undefined
          @(dummy.#foo(10)) static accessor accessor: undefined
        }
      }
    }

    assertEq(() => '' + log, '0,1,2,3,4,5,6,7,8,9,10')
  },
  'Decorator list evaluation: Inner private name': () => {
    const fns: (() => number)[] = []
    const capture = (fn: () => number): Function => {
      fns.push(fn)
      return () => { }
    }

    class Dummy {
      static #foo = NaN

      static {
        @(capture(() => (new Foo() as any).#foo + 0))
        class Foo {
          #foo = 10

          @(capture(() => new Foo().#foo + 1)) method() { }
          @(capture(() => new Foo().#foo + 2)) static method() { }

          @(capture(() => new Foo().#foo + 3)) field: undefined
          @(capture(() => new Foo().#foo + 4)) static field: undefined

          @(capture(() => new Foo().#foo + 5)) get getter(): undefined { return }
          @(capture(() => new Foo().#foo + 6)) static get getter(): undefined { return }

          @(capture(() => new Foo().#foo + 7)) set setter(x: undefined) { }
          @(capture(() => new Foo().#foo + 8)) static set setter(x: undefined) { }

          @(capture(() => new Foo().#foo + 9)) accessor accessor: undefined
          @(capture(() => new Foo().#foo + 10)) static accessor accessor: undefined
        }
      }
    }

    // Accessing "#foo" in the class decorator should fail. The "#foo" should
    // refer to the outer "#foo", not the inner "#foo".
    const firstFn = fns.shift()!
    assertEq(() => {
      try {
        firstFn()
        throw new Error('Expected a TypeError to be thrown')
      } catch (err) {
        if (err instanceof TypeError) return true
        throw err
      }
    }, true)

    // Accessing "#foo" from any of the class element decorators should succeed.
    // Each "#foo" should refer to the inner "#foo", not the outer "#foo".
    const log: number[] = []
    for (const fn of fns) log.push(fn())
    assertEq(() => '' + log, '11,12,13,14,15,16,17,18,19,20')
  },
  'Decorator list evaluation: Class binding': () => {
    const fns: (() => typeof Foo)[] = []

    const capture = (fn: () => typeof Foo): Function => {
      fns.push(fn)
      let error: unknown
      try {
        fn()
      } catch (err) {
        error = err
      }

      // Note: As far as I can tell, early reference to the class name should
      // throw a reference error because:
      //
      // 1. Class decorators run first in the top-level scope before entering
      //    BindingClassDeclarationEvaluation.
      //
      // 2. Class element decorators run in ClassDefinitionEvaluation, which
      //    runs ClassElementEvaluation for each class element before eventually
      //    running classEnv.InitializeBinding(classBinding, F).
      //
      assertEq(() => error instanceof ReferenceError, true)
      return () => { }
    }

    @(capture(() => Foo)) class Foo {
      @(capture(() => Foo)) method() { }
      @(capture(() => Foo)) static method() { }

      @(capture(() => Foo)) field: undefined
      @(capture(() => Foo)) static field: undefined

      @(capture(() => Foo)) get getter(): undefined { return }
      @(capture(() => Foo)) static get getter(): undefined { return }

      @(capture(() => Foo)) set setter(x: undefined) { }
      @(capture(() => Foo)) static set setter(x: undefined) { }

      @(capture(() => Foo)) accessor accessor: undefined
      @(capture(() => Foo)) static accessor accessor: undefined
    }

    const originalFoo = Foo

    // Once we get here, these should all reference the now-initialized class,
    // either through classBinding (for class element decorators) or through
    // className (for decorators on the class itself).
    for (const fn of fns) {
      assertEq(() => fn(), originalFoo)
    }

    // Mutating a class binding is allowed in JavaScript. Let's test what
    // happens when we do this.
    (Foo as any) = null as any

    // As far as I can tell, class decorators should observe this change because
    // they are evaluated in the top-level scope.
    const firstFn = fns.shift()!
    assertEq(() => firstFn(), null)

    // But I believe class element decorators should not observe this change
    // because they are evaluated in the environment that exists for the
    // duration of ClassDefinitionEvaluation (i.e. classEnv, not env).
    for (const fn of fns) {
      assertEq(() => fn(), originalFoo)
    }
  },

  // Initializer order
  'Initializer order (public members)': () => {
    const log: string[] = []

    // Class decorators
    const classDec1 = (cls: { new(): Foo }, ctxClass: ClassDecoratorContext) => {
      log.push('c2')
      if (!assertEq(() => typeof ctxClass.addInitializer, 'function')) return
      ctxClass.addInitializer(() => log.push('c5'))
      ctxClass.addInitializer(() => log.push('c6'))
    }
    const classDec2 = (cls: { new(): Foo }, ctxClass: ClassDecoratorContext) => {
      log.push('c1')
      if (!assertEq(() => typeof ctxClass.addInitializer, 'function')) return
      ctxClass.addInitializer(() => log.push('c3'))
      ctxClass.addInitializer(() => log.push('c4'))
    }

    // Method decorators
    const methodDec1 = (fn: (this: Foo) => void, ctxMethod: ClassMethodDecoratorContext) => {
      log.push('m2')
      if (!assertEq(() => typeof ctxMethod.addInitializer, 'function')) return
      ctxMethod.addInitializer(() => log.push('m5'))
      ctxMethod.addInitializer(() => log.push('m6'))
    }
    const methodDec2 = (fn: (this: Foo) => void, ctxMethod: ClassMethodDecoratorContext) => {
      log.push('m1')
      if (!assertEq(() => typeof ctxMethod.addInitializer, 'function')) return
      ctxMethod.addInitializer(() => log.push('m3'))
      ctxMethod.addInitializer(() => log.push('m4'))
    }
    const staticMethodDec1 = (fn: (this: Foo) => void, ctxStaticMethod: ClassMethodDecoratorContext) => {
      log.push('M2')
      if (!assertEq(() => typeof ctxStaticMethod.addInitializer, 'function')) return
      ctxStaticMethod.addInitializer(() => log.push('M5'))
      ctxStaticMethod.addInitializer(() => log.push('M6'))
    }
    const staticMethodDec2 = (fn: (this: Foo) => void, ctxStaticMethod: ClassMethodDecoratorContext) => {
      log.push('M1')
      if (!assertEq(() => typeof ctxStaticMethod.addInitializer, 'function')) return
      ctxStaticMethod.addInitializer(() => log.push('M3'))
      ctxStaticMethod.addInitializer(() => log.push('M4'))
    }

    // Field decorators
    const fieldDec1 = (
      value: undefined,
      ctxField: ClassFieldDecoratorContext,
    ): ((this: Foo, value: undefined) => undefined) | undefined => {
      log.push('f2')
      if (!assertEq(() => typeof ctxField.addInitializer, 'function')) return
      ctxField.addInitializer(() => log.push('f5'))
      ctxField.addInitializer(() => log.push('f6'))
      return () => { log.push('f7') }
    }
    const fieldDec2 = (
      value: undefined,
      ctxField: ClassFieldDecoratorContext,
    ): ((this: Foo, value: undefined) => undefined) | undefined => {
      log.push('f1')
      if (!assertEq(() => typeof ctxField.addInitializer, 'function')) return
      ctxField.addInitializer(() => log.push('f3'))
      ctxField.addInitializer(() => log.push('f4'))
      return () => { log.push('f8') }
    }
    const staticFieldDec1 = (
      value: undefined,
      ctxStaticField: ClassFieldDecoratorContext,
    ): ((this: typeof Foo, value: undefined) => undefined) | undefined => {
      log.push('F2')
      if (!assertEq(() => typeof ctxStaticField.addInitializer, 'function')) return
      ctxStaticField.addInitializer(() => log.push('F5'))
      ctxStaticField.addInitializer(() => log.push('F6'))
      return () => { log.push('F7') }
    }
    const staticFieldDec2 = (
      value: undefined,
      ctxStaticField: ClassFieldDecoratorContext,
    ): ((this: typeof Foo, value: undefined) => undefined) | undefined => {
      log.push('F1')
      if (!assertEq(() => typeof ctxStaticField.addInitializer, 'function')) return
      ctxStaticField.addInitializer(() => log.push('F3'))
      ctxStaticField.addInitializer(() => log.push('F4'))
      return () => { log.push('F8') }
    }

    // Getter decorators
    const getterDec1 = (fn: (this: Foo) => undefined, ctxGetter: ClassGetterDecoratorContext) => {
      log.push('g2')
      if (!assertEq(() => typeof ctxGetter.addInitializer, 'function')) return
      ctxGetter.addInitializer(() => log.push('g5'))
      ctxGetter.addInitializer(() => log.push('g6'))
    }
    const getterDec2 = (fn: (this: Foo) => undefined, ctxGetter: ClassGetterDecoratorContext) => {
      log.push('g1')
      if (!assertEq(() => typeof ctxGetter.addInitializer, 'function')) return
      ctxGetter.addInitializer(() => log.push('g3'))
      ctxGetter.addInitializer(() => log.push('g4'))
    }
    const staticGetterDec1 = (fn: (this: Foo) => undefined, ctxStaticGetter: ClassGetterDecoratorContext) => {
      log.push('G2')
      if (!assertEq(() => typeof ctxStaticGetter.addInitializer, 'function')) return
      ctxStaticGetter.addInitializer(() => log.push('G5'))
      ctxStaticGetter.addInitializer(() => log.push('G6'))
    }
    const staticGetterDec2 = (fn: (this: Foo) => undefined, ctxStaticGetter: ClassGetterDecoratorContext) => {
      log.push('G1')
      if (!assertEq(() => typeof ctxStaticGetter.addInitializer, 'function')) return
      ctxStaticGetter.addInitializer(() => log.push('G3'))
      ctxStaticGetter.addInitializer(() => log.push('G4'))
    }

    // Setter decorators
    const setterDec1 = (fn: (this: Foo, x: undefined) => void, ctxSetter: ClassSetterDecoratorContext) => {
      log.push('s2')
      if (!assertEq(() => typeof ctxSetter.addInitializer, 'function')) return
      ctxSetter.addInitializer(() => log.push('s5'))
      ctxSetter.addInitializer(() => log.push('s6'))
    }
    const setterDec2 = (fn: (this: Foo, x: undefined) => void, ctxSetter: ClassSetterDecoratorContext) => {
      log.push('s1')
      if (!assertEq(() => typeof ctxSetter.addInitializer, 'function')) return
      ctxSetter.addInitializer(() => log.push('s3'))
      ctxSetter.addInitializer(() => log.push('s4'))
    }
    const staticSetterDec1 = (fn: (this: Foo, x: undefined) => void, ctxStaticSetter: ClassSetterDecoratorContext) => {
      log.push('S2')
      if (!assertEq(() => typeof ctxStaticSetter.addInitializer, 'function')) return
      ctxStaticSetter.addInitializer(() => log.push('S5'))
      ctxStaticSetter.addInitializer(() => log.push('S6'))
    }
    const staticSetterDec2 = (fn: (this: Foo, x: undefined) => void, ctxStaticSetter: ClassSetterDecoratorContext) => {
      log.push('S1')
      if (!assertEq(() => typeof ctxStaticSetter.addInitializer, 'function')) return
      ctxStaticSetter.addInitializer(() => log.push('S3'))
      ctxStaticSetter.addInitializer(() => log.push('S4'))
    }

    // Auto-accessor decorators
    const accessorDec1 = (
      target: ClassAccessorDecoratorTarget<Foo, undefined>,
      ctxAccessor: ClassAccessorDecoratorContext,
    ): ClassAccessorDecoratorResult<Foo, undefined> | undefined => {
      log.push('a2')
      if (!assertEq(() => typeof ctxAccessor.addInitializer, 'function')) return
      ctxAccessor.addInitializer(() => log.push('a5'))
      ctxAccessor.addInitializer(() => log.push('a6'))
      return { init() { log.push('a7') } }
    }
    const accessorDec2 = (
      target: ClassAccessorDecoratorTarget<Foo, undefined>,
      ctxAccessor: ClassAccessorDecoratorContext,
    ): ClassAccessorDecoratorResult<Foo, undefined> | undefined => {
      log.push('a1')
      if (!assertEq(() => typeof ctxAccessor.addInitializer, 'function')) return
      ctxAccessor.addInitializer(() => log.push('a3'))
      ctxAccessor.addInitializer(() => log.push('a4'))
      return { init() { log.push('a8') } }
    }
    const staticAccessorDec1 = (
      target: ClassAccessorDecoratorTarget<typeof Foo, undefined>,
      ctxStaticAccessor: ClassAccessorDecoratorContext,
    ): ClassAccessorDecoratorResult<typeof Foo, undefined> | undefined => {
      log.push('A2')
      if (!assertEq(() => typeof ctxStaticAccessor.addInitializer, 'function')) return
      ctxStaticAccessor.addInitializer(() => log.push('A5'))
      ctxStaticAccessor.addInitializer(() => log.push('A6'))
      return { init() { log.push('A7') } }
    }
    const staticAccessorDec2 = (
      target: ClassAccessorDecoratorTarget<typeof Foo, undefined>,
      ctxStaticAccessor: ClassAccessorDecoratorContext,
    ): ClassAccessorDecoratorResult<typeof Foo, undefined> | undefined => {
      log.push('A1')
      if (!assertEq(() => typeof ctxStaticAccessor.addInitializer, 'function')) return
      ctxStaticAccessor.addInitializer(() => log.push('A3'))
      ctxStaticAccessor.addInitializer(() => log.push('A4'))
      return { init() { log.push('A8') } }
    }

    log.push('start')
    @classDec1 @classDec2 class Foo extends (log.push('extends'), Object) {
      static { log.push('static:start') }

      constructor() {
        log.push('ctor:start')
        super()
        log.push('ctor:end')
      }

      @methodDec1 @methodDec2 method() { }
      @staticMethodDec1 @staticMethodDec2 static method() { }

      @fieldDec1 @fieldDec2 field: undefined
      @staticFieldDec1 @staticFieldDec2 static field: undefined

      @getterDec1 @getterDec2 get getter(): undefined { return }
      @staticGetterDec1 @staticGetterDec2 static get getter(): undefined { return }

      @setterDec1 @setterDec2 set setter(x: undefined) { }
      @staticSetterDec1 @staticSetterDec2 static set setter(x: undefined) { }

      @accessorDec1 @accessorDec2 accessor accessor: undefined
      @staticAccessorDec1 @staticAccessorDec2 static accessor accessor: undefined

      static { log.push('static:end') }
    }
    log.push('after')
    new Foo
    log.push('end')
    assertEq(() => log + '', 'start,extends,' +
      'M1,M2,G1,G2,S1,S2,A1,A2,' + // For each element e of staticElements if e.[[Kind]] is not field
      'm1,m2,g1,g2,s1,s2,a1,a2,' + // For each element e of instanceElements if e.[[Kind]] is not field
      'F1,F2,' + // For each element e of staticElements if e.[[Kind]] is field
      'f1,f2,' + // For each element e of instanceElements if e.[[Kind]] is field
      'c1,c2,' + // ApplyDecoratorsToClassDefinition
      'M3,M4,M5,M6,G3,G4,G5,G6,S3,S4,S5,S6,' + // For each element initializer of staticMethodExtraInitializers
      'static:start,' + // For each element elementRecord of staticElements
      'F7,F8,F3,F4,F5,F6,' + // InitializeFieldOrAccessor + For each element initializer of elementRecord.[[ExtraInitializers]]
      'A7,A8,A3,A4,A5,A6,' + // InitializeFieldOrAccessor + For each element initializer of elementRecord.[[ExtraInitializers]]
      'static:end,' + // For each element elementRecord of staticElements
      'c3,c4,c5,c6,' + // For each element initializer of classExtraInitializers
      'after,' +
      'ctor:start,' +
      'm3,m4,m5,m6,g3,g4,g5,g6,s3,s4,s5,s6,' + // For each element initializer of constructor.[[Initializers]] (a.k.a. instanceMethodExtraInitializers)
      'f7,f8,f3,f4,f5,f6,' + // InitializeFieldOrAccessor + For each element initializer of elementRecord.[[ExtraInitializers]]
      'a7,a8,a3,a4,a5,a6,' + // InitializeFieldOrAccessor + For each element initializer of elementRecord.[[ExtraInitializers]]
      'ctor:end,' +
      'end')
  },
  'Initializer order (private members)': () => {
    const log: string[] = []

    // Class decorators
    const classDec1 = (cls: { new(): Foo }, ctxClass: ClassDecoratorContext) => {
      log.push('c2')
      if (!assertEq(() => typeof ctxClass.addInitializer, 'function')) return
      ctxClass.addInitializer(() => log.push('c5'))
      ctxClass.addInitializer(() => log.push('c6'))
    }
    const classDec2 = (cls: { new(): Foo }, ctxClass: ClassDecoratorContext) => {
      log.push('c1')
      if (!assertEq(() => typeof ctxClass.addInitializer, 'function')) return
      ctxClass.addInitializer(() => log.push('c3'))
      ctxClass.addInitializer(() => log.push('c4'))
    }

    // Method decorators
    const methodDec1 = (fn: (this: Foo) => void, ctxMethod: ClassMethodDecoratorContext) => {
      log.push('m2')
      if (!assertEq(() => typeof ctxMethod.addInitializer, 'function')) return
      ctxMethod.addInitializer(() => log.push('m5'))
      ctxMethod.addInitializer(() => log.push('m6'))
    }
    const methodDec2 = (fn: (this: Foo) => void, ctxMethod: ClassMethodDecoratorContext) => {
      log.push('m1')
      if (!assertEq(() => typeof ctxMethod.addInitializer, 'function')) return
      ctxMethod.addInitializer(() => log.push('m3'))
      ctxMethod.addInitializer(() => log.push('m4'))
    }
    const staticMethodDec1 = (fn: (this: Foo) => void, ctxStaticMethod: ClassMethodDecoratorContext) => {
      log.push('M2')
      if (!assertEq(() => typeof ctxStaticMethod.addInitializer, 'function')) return
      ctxStaticMethod.addInitializer(() => log.push('M5'))
      ctxStaticMethod.addInitializer(() => log.push('M6'))
    }
    const staticMethodDec2 = (fn: (this: Foo) => void, ctxStaticMethod: ClassMethodDecoratorContext) => {
      log.push('M1')
      if (!assertEq(() => typeof ctxStaticMethod.addInitializer, 'function')) return
      ctxStaticMethod.addInitializer(() => log.push('M3'))
      ctxStaticMethod.addInitializer(() => log.push('M4'))
    }

    // Field decorators
    const fieldDec1 = (
      value: undefined,
      ctxField: ClassFieldDecoratorContext,
    ): ((this: Foo, value: undefined) => undefined) | undefined => {
      log.push('f2')
      if (!assertEq(() => typeof ctxField.addInitializer, 'function')) return
      ctxField.addInitializer(() => log.push('f5'))
      ctxField.addInitializer(() => log.push('f6'))
      return () => { log.push('f7') }
    }
    const fieldDec2 = (
      value: undefined,
      ctxField: ClassFieldDecoratorContext,
    ): ((this: Foo, value: undefined) => undefined) | undefined => {
      log.push('f1')
      if (!assertEq(() => typeof ctxField.addInitializer, 'function')) return
      ctxField.addInitializer(() => log.push('f3'))
      ctxField.addInitializer(() => log.push('f4'))
      return () => { log.push('f8') }
    }
    const staticFieldDec1 = (
      value: undefined,
      ctxStaticField: ClassFieldDecoratorContext,
    ): ((this: typeof Foo, value: undefined) => undefined) | undefined => {
      log.push('F2')
      if (!assertEq(() => typeof ctxStaticField.addInitializer, 'function')) return
      ctxStaticField.addInitializer(() => log.push('F5'))
      ctxStaticField.addInitializer(() => log.push('F6'))
      return () => { log.push('F7') }
    }
    const staticFieldDec2 = (
      value: undefined,
      ctxStaticField: ClassFieldDecoratorContext,
    ): ((this: typeof Foo, value: undefined) => undefined) | undefined => {
      log.push('F1')
      if (!assertEq(() => typeof ctxStaticField.addInitializer, 'function')) return
      ctxStaticField.addInitializer(() => log.push('F3'))
      ctxStaticField.addInitializer(() => log.push('F4'))
      return () => { log.push('F8') }
    }

    // Getter decorators
    const getterDec1 = (fn: (this: Foo) => undefined, ctxGetter: ClassGetterDecoratorContext) => {
      log.push('g2')
      if (!assertEq(() => typeof ctxGetter.addInitializer, 'function')) return
      ctxGetter.addInitializer(() => log.push('g5'))
      ctxGetter.addInitializer(() => log.push('g6'))
    }
    const getterDec2 = (fn: (this: Foo) => undefined, ctxGetter: ClassGetterDecoratorContext) => {
      log.push('g1')
      if (!assertEq(() => typeof ctxGetter.addInitializer, 'function')) return
      ctxGetter.addInitializer(() => log.push('g3'))
      ctxGetter.addInitializer(() => log.push('g4'))
    }
    const staticGetterDec1 = (fn: (this: Foo) => undefined, ctxStaticGetter: ClassGetterDecoratorContext) => {
      log.push('G2')
      if (!assertEq(() => typeof ctxStaticGetter.addInitializer, 'function')) return
      ctxStaticGetter.addInitializer(() => log.push('G5'))
      ctxStaticGetter.addInitializer(() => log.push('G6'))
    }
    const staticGetterDec2 = (fn: (this: Foo) => undefined, ctxStaticGetter: ClassGetterDecoratorContext) => {
      log.push('G1')
      if (!assertEq(() => typeof ctxStaticGetter.addInitializer, 'function')) return
      ctxStaticGetter.addInitializer(() => log.push('G3'))
      ctxStaticGetter.addInitializer(() => log.push('G4'))
    }

    // Setter decorators
    const setterDec1 = (fn: (this: Foo, x: undefined) => void, ctxSetter: ClassSetterDecoratorContext) => {
      log.push('s2')
      if (!assertEq(() => typeof ctxSetter.addInitializer, 'function')) return
      ctxSetter.addInitializer(() => log.push('s5'))
      ctxSetter.addInitializer(() => log.push('s6'))
    }
    const setterDec2 = (fn: (this: Foo, x: undefined) => void, ctxSetter: ClassSetterDecoratorContext) => {
      log.push('s1')
      if (!assertEq(() => typeof ctxSetter.addInitializer, 'function')) return
      ctxSetter.addInitializer(() => log.push('s3'))
      ctxSetter.addInitializer(() => log.push('s4'))
    }
    const staticSetterDec1 = (fn: (this: Foo, x: undefined) => void, ctxStaticSetter: ClassSetterDecoratorContext) => {
      log.push('S2')
      if (!assertEq(() => typeof ctxStaticSetter.addInitializer, 'function')) return
      ctxStaticSetter.addInitializer(() => log.push('S5'))
      ctxStaticSetter.addInitializer(() => log.push('S6'))
    }
    const staticSetterDec2 = (fn: (this: Foo, x: undefined) => void, ctxStaticSetter: ClassSetterDecoratorContext) => {
      log.push('S1')
      if (!assertEq(() => typeof ctxStaticSetter.addInitializer, 'function')) return
      ctxStaticSetter.addInitializer(() => log.push('S3'))
      ctxStaticSetter.addInitializer(() => log.push('S4'))
    }

    // Auto-accessor decorators
    const accessorDec1 = (
      target: ClassAccessorDecoratorTarget<Foo, undefined>,
      ctxAccessor: ClassAccessorDecoratorContext,
    ): ClassAccessorDecoratorResult<Foo, undefined> | undefined => {
      log.push('a2')
      if (!assertEq(() => typeof ctxAccessor.addInitializer, 'function')) return
      ctxAccessor.addInitializer(() => log.push('a5'))
      ctxAccessor.addInitializer(() => log.push('a6'))
      return { init() { log.push('a7') } }
    }
    const accessorDec2 = (
      target: ClassAccessorDecoratorTarget<Foo, undefined>,
      ctxAccessor: ClassAccessorDecoratorContext,
    ): ClassAccessorDecoratorResult<Foo, undefined> | undefined => {
      log.push('a1')
      if (!assertEq(() => typeof ctxAccessor.addInitializer, 'function')) return
      ctxAccessor.addInitializer(() => log.push('a3'))
      ctxAccessor.addInitializer(() => log.push('a4'))
      return { init() { log.push('a8') } }
    }
    const staticAccessorDec1 = (
      target: ClassAccessorDecoratorTarget<typeof Foo, undefined>,
      ctxStaticAccessor: ClassAccessorDecoratorContext,
    ): ClassAccessorDecoratorResult<typeof Foo, undefined> | undefined => {
      log.push('A2')
      if (!assertEq(() => typeof ctxStaticAccessor.addInitializer, 'function')) return
      ctxStaticAccessor.addInitializer(() => log.push('A5'))
      ctxStaticAccessor.addInitializer(() => log.push('A6'))
      return { init() { log.push('A7') } }
    }
    const staticAccessorDec2 = (
      target: ClassAccessorDecoratorTarget<typeof Foo, undefined>,
      ctxStaticAccessor: ClassAccessorDecoratorContext,
    ): ClassAccessorDecoratorResult<typeof Foo, undefined> | undefined => {
      log.push('A1')
      if (!assertEq(() => typeof ctxStaticAccessor.addInitializer, 'function')) return
      ctxStaticAccessor.addInitializer(() => log.push('A3'))
      ctxStaticAccessor.addInitializer(() => log.push('A4'))
      return { init() { log.push('A8') } }
    }

    log.push('start')
    @classDec1 @classDec2 class Foo extends (log.push('extends'), Object) {
      static { log.push('static:start') }

      constructor() {
        log.push('ctor:start')
        super()
        log.push('ctor:end')
      }

      @methodDec1 @methodDec2 #method() { }
      @staticMethodDec1 @staticMethodDec2 static #staticMethod() { }

      @fieldDec1 @fieldDec2 #field: undefined
      @staticFieldDec1 @staticFieldDec2 static #staticField: undefined

      @getterDec1 @getterDec2 get #getter(): undefined { return }
      @staticGetterDec1 @staticGetterDec2 static get #staticGetter(): undefined { return }

      @setterDec1 @setterDec2 set #setter(x: undefined) { }
      @staticSetterDec1 @staticSetterDec2 static set #staticSetter(x: undefined) { }

      @accessorDec1 @accessorDec2 accessor #accessor: undefined
      @staticAccessorDec1 @staticAccessorDec2 static accessor #staticAccessor: undefined

      static { log.push('static:end') }
    }
    log.push('after')
    new Foo
    log.push('end')
    assertEq(() => log + '', 'start,extends,' +
      'M1,M2,G1,G2,S1,S2,A1,A2,' + // For each element e of staticElements if e.[[Kind]] is not field
      'm1,m2,g1,g2,s1,s2,a1,a2,' + // For each element e of instanceElements if e.[[Kind]] is not field
      'F1,F2,' + // For each element e of staticElements if e.[[Kind]] is field
      'f1,f2,' + // For each element e of instanceElements if e.[[Kind]] is field
      'c1,c2,' + // ApplyDecoratorsToClassDefinition
      'M3,M4,M5,M6,G3,G4,G5,G6,S3,S4,S5,S6,' + // For each element initializer of staticMethodExtraInitializers
      'static:start,' + // For each element elementRecord of staticElements
      'F7,F8,F3,F4,F5,F6,' + // InitializeFieldOrAccessor + For each element initializer of elementRecord.[[ExtraInitializers]]
      'A7,A8,A3,A4,A5,A6,' + // InitializeFieldOrAccessor + For each element initializer of elementRecord.[[ExtraInitializers]]
      'static:end,' + // For each element elementRecord of staticElements
      'c3,c4,c5,c6,' + // For each element initializer of classExtraInitializers
      'after,' +
      'ctor:start,' +
      'm3,m4,m5,m6,g3,g4,g5,g6,s3,s4,s5,s6,' + // For each element initializer of constructor.[[Initializers]] (a.k.a. instanceMethodExtraInitializers)
      'f7,f8,f3,f4,f5,f6,' + // InitializeFieldOrAccessor + For each element initializer of elementRecord.[[ExtraInitializers]]
      'a7,a8,a3,a4,a5,a6,' + // InitializeFieldOrAccessor + For each element initializer of elementRecord.[[ExtraInitializers]]
      'ctor:end,' +
      'end')
  },
}

function prettyPrint(x: any): any {
  if (x && x.prototype && x.prototype.constructor === x) return 'class'
  if (typeof x === 'string') return JSON.stringify(x)
  return x
}

function assertEq<T>(callback: () => T, expected: T): boolean {
  let details: string
  try {
    let x: any = callback()
    if (x === expected) return true
    details = `  Expected: ${prettyPrint(expected)}\n  Observed: ${prettyPrint(x)}`
  } catch (error) {
    details = `  Throws: ${error}`
  }

  const code = callback.toString().replace(/^\(\) => /, '').replace(/\s+/g, ' ')
  console.log(`❌ ${testName}\n  Code: ${code}\n${details}\n`)
  failures++
  return false
}

let testName: string
let failures = 0

async function run() {
  for (const [name, test] of Object.entries(tests)) {
    testName = name
    try {
      await test()
    } catch (err) {
      console.log(`❌ ${name}\n  Throws: ${err}\n`)
      failures++
    }
  }

  if (failures > 0) {
    console.log(`❌ ${failures} checks failed`)
  } else {
    console.log(`✅ all checks passed`)
  }
}

const promise = run()
