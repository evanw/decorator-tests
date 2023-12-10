// Note: Edit "decorator-tests.ts" instead of this file
const tests = {
  // Class decorators
  "Class decorators: Basic statement": () => {
    let old;
    const dec = (cls, ctx) => {
      assertEq(() => typeof cls, "function");
      assertEq(() => cls.name, "Foo");
      assertEq(() => ctx.kind, "class");
      assertEq(() => ctx.name, "Foo");
      old = cls;
    };
    @dec class Foo {
    }
    assertEq(() => Foo, old);
  },
  "Class decorators: Basic expression: Anonymous": () => {
    let old;
    const dec = (cls, ctx) => {
      assertEq(() => typeof cls, "function");
      assertEq(() => cls.name, "");
      assertEq(() => ctx.kind, "class");
      assertEq(() => ctx.name, "");
      old = cls;
    };
    const Foo = /* @__PURE__ */ ((x) => x)(@dec class {
    });
    assertEq(() => Foo, old);
  },
  "Class decorators: Basic expression: Property value": () => {
    let old;
    const dec = (cls, ctx) => {
      assertEq(() => typeof cls, "function");
      assertEq(() => cls.name, "Foo");
      assertEq(() => ctx.kind, "class");
      assertEq(() => ctx.name, "Foo");
      old = cls;
    };
    const obj = {
      Foo: @dec class {
      }
    };
    assertEq(() => obj.Foo, old);
  },
  "Class decorators: Basic expression: Variable initializer": () => {
    let old;
    const dec = (cls, ctx) => {
      assertEq(() => typeof cls, "function");
      assertEq(() => cls.name, "Foo");
      assertEq(() => ctx.kind, "class");
      assertEq(() => ctx.name, "Foo");
      old = cls;
    };
    const Foo = @dec class {
    };
    assertEq(() => Foo, old);
  },
  "Class decorators: Basic expression: Array binding": () => {
    let old;
    const dec = (cls, ctx) => {
      assertEq(() => typeof cls, "function");
      assertEq(() => cls.name, "Foo");
      assertEq(() => ctx.kind, "class");
      assertEq(() => ctx.name, "Foo");
      old = cls;
    };
    const [Foo = @dec class {
    }] = [];
    assertEq(() => Foo, old);
  },
  "Class decorators: Basic expression: Object binding": () => {
    let old;
    const dec = (cls, ctx) => {
      assertEq(() => typeof cls, "function");
      assertEq(() => cls.name, "Foo");
      assertEq(() => ctx.kind, "class");
      assertEq(() => ctx.name, "Foo");
      old = cls;
    };
    const { Foo = @dec class {
    } } = {};
    assertEq(() => Foo, old);
  },
  "Class decorators: Basic expression: Assignment initializer": () => {
    let old;
    const dec = (cls, ctx) => {
      assertEq(() => typeof cls, "function");
      assertEq(() => cls.name, "Foo");
      assertEq(() => ctx.kind, "class");
      assertEq(() => ctx.name, "Foo");
      old = cls;
    };
    let Foo;
    Foo = @dec class {
    };
    assertEq(() => Foo, old);
  },
  "Class decorators: Basic expression: Assignment array binding": () => {
    let old;
    const dec = (cls, ctx) => {
      assertEq(() => typeof cls, "function");
      assertEq(() => cls.name, "Foo");
      assertEq(() => ctx.kind, "class");
      assertEq(() => ctx.name, "Foo");
      old = cls;
    };
    let Foo;
    [Foo = @dec class {
    }] = [];
    assertEq(() => Foo, old);
  },
  "Class decorators: Basic expression: Assignment object binding": () => {
    let old;
    const dec = (cls, ctx) => {
      assertEq(() => typeof cls, "function");
      assertEq(() => cls.name, "Foo");
      assertEq(() => ctx.kind, "class");
      assertEq(() => ctx.name, "Foo");
      old = cls;
    };
    let Foo;
    ({ Foo = @dec class {
    } } = {});
    assertEq(() => Foo, old);
  },
  "Class decorators: Basic expression: Instance field initializer": () => {
    let old;
    const dec = (cls, ctx) => {
      assertEq(() => typeof cls, "function");
      assertEq(() => cls.name, "Foo");
      assertEq(() => ctx.kind, "class");
      assertEq(() => ctx.name, "Foo");
      old = cls;
    };
    class Class {
      Foo = @dec class {
      };
    }
    const Foo = new Class().Foo;
    assertEq(() => Foo, old);
  },
  "Class decorators: Basic expression: Static field initializer": () => {
    let old;
    const dec = (cls, ctx) => {
      assertEq(() => typeof cls, "function");
      assertEq(() => cls.name, "Foo");
      assertEq(() => ctx.kind, "class");
      assertEq(() => ctx.name, "Foo");
      old = cls;
    };
    class Class {
      static Foo = @dec class {
      };
    }
    assertEq(() => Class.Foo, old);
  },
  "Class decorators: Basic expression: Instance auto-accessor initializer": () => {
    let old;
    const dec = (cls, ctx) => {
      assertEq(() => typeof cls, "function");
      assertEq(() => cls.name, "Foo");
      assertEq(() => ctx.kind, "class");
      assertEq(() => ctx.name, "Foo");
      old = cls;
    };
    class Class {
      accessor Foo = @dec class {
      };
    }
    const Foo = new Class().Foo;
    assertEq(() => Foo, old);
  },
  "Class decorators: Basic expression: Static auto-accessor initializer": () => {
    let old;
    const dec = (cls, ctx) => {
      assertEq(() => typeof cls, "function");
      assertEq(() => cls.name, "Foo");
      assertEq(() => ctx.kind, "class");
      assertEq(() => ctx.name, "Foo");
      old = cls;
    };
    class Class {
      static accessor Foo = @dec class {
      };
    }
    assertEq(() => Class.Foo, old);
  },
  "Class decorators: Order": () => {
    const log = [];
    let Bar;
    let Baz;
    const dec1 = (cls, ctx) => {
      log.push(2);
      Bar = function() {
        log.push(4);
        return new cls();
      };
      return Bar;
    };
    const dec2 = (cls, ctx) => {
      log.push(1);
      Baz = function() {
        log.push(5);
        return new cls();
      };
      return Baz;
    };
    log.push(0);
    @dec1 @dec2 class Foo {
      constructor() {
        log.push(6);
      }
    }
    log.push(3);
    new Foo();
    log.push(7);
    assertEq(() => Foo, Bar);
    assertEq(() => log + "", "0,1,2,3,4,5,6,7");
  },
  "Class decorators: Return null": () => {
    let error;
    try {
      const dec = (cls, ctx) => {
        return null;
      };
      @dec class Foo {
      }
    } catch (err) {
      error = err;
    }
    assertEq(() => error instanceof TypeError, true);
  },
  "Class decorators: Return object": () => {
    let error;
    try {
      const dec = (cls, ctx) => {
        return {};
      };
      @dec class Foo {
      }
    } catch (err) {
      error = err;
    }
    assertEq(() => error instanceof TypeError, true);
  },
  // Method decorators
  "Method decorators: Basic (instance method)": () => {
    let old;
    const dec = (fn, ctx) => {
      assertEq(() => typeof fn, "function");
      assertEq(() => fn.name, "foo");
      assertEq(() => ctx.kind, "method");
      assertEq(() => ctx.name, "foo");
      assertEq(() => ctx.static, false);
      assertEq(() => ctx.private, false);
      assertEq(() => ctx.access.has({ foo: false }), true);
      assertEq(() => ctx.access.has({ bar: true }), false);
      assertEq(() => ctx.access.get({ foo: 123 }), 123);
      assertEq(() => "set" in ctx.access, false);
      old = fn;
    };
    class Foo {
      @dec foo() {
      }
    }
    assertEq(() => Foo.prototype.foo, old);
  },
  "Method decorators: Basic (static method)": () => {
    let old;
    const dec = (fn, ctx) => {
      assertEq(() => typeof fn, "function");
      assertEq(() => fn.name, "foo");
      assertEq(() => ctx.kind, "method");
      assertEq(() => ctx.name, "foo");
      assertEq(() => ctx.static, true);
      assertEq(() => ctx.private, false);
      assertEq(() => ctx.access.has({ foo: false }), true);
      assertEq(() => ctx.access.has({ bar: true }), false);
      assertEq(() => ctx.access.get({ foo: 123 }), 123);
      assertEq(() => "set" in ctx.access, false);
      old = fn;
    };
    class Foo {
      @dec static foo() {
      }
    }
    assertEq(() => Foo.foo, old);
  },
  "Method decorators: Basic (private instance method)": () => {
    let old;
    let lateAsserts;
    const dec = (fn, ctx) => {
      assertEq(() => typeof fn, "function");
      assertEq(() => fn.name, "#foo");
      assertEq(() => ctx.kind, "method");
      assertEq(() => ctx.name, "#foo");
      assertEq(() => ctx.static, false);
      assertEq(() => ctx.private, true);
      lateAsserts = () => {
        assertEq(() => ctx.access.has(new Foo()), true);
        assertEq(() => ctx.access.has({}), false);
        assertEq(() => ctx.access.get(new Foo()), $foo);
        assertEq(() => "set" in ctx.access, false);
      };
      old = fn;
    };
    let $foo;
    class Foo {
      @dec #foo() {
      }
      static {
        $foo = new Foo().#foo;
      }
    }
    assertEq(() => $foo, old);
    lateAsserts();
  },
  "Method decorators: Basic (private static method)": () => {
    let old;
    let lateAsserts;
    const dec = (fn, ctx) => {
      assertEq(() => typeof fn, "function");
      assertEq(() => fn.name, "#foo");
      assertEq(() => ctx.kind, "method");
      assertEq(() => ctx.name, "#foo");
      assertEq(() => ctx.static, true);
      assertEq(() => ctx.private, true);
      lateAsserts = () => {
        assertEq(() => ctx.access.has(Foo), true);
        assertEq(() => ctx.access.has({}), false);
        assertEq(() => ctx.access.get(Foo), $foo);
        assertEq(() => "set" in ctx.access, false);
      };
      old = fn;
    };
    let $foo;
    class Foo {
      @dec static #foo() {
      }
      static {
        $foo = this.#foo;
      }
    }
    assertEq(() => $foo, old);
    lateAsserts();
  },
  "Method decorators: Shim (instance method)": () => {
    let bar;
    const dec = (fn, ctx) => {
      bar = function() {
        return fn.call(this) + 1;
      };
      return bar;
    };
    class Foo {
      bar = 123;
      @dec foo() {
        return this.bar;
      }
    }
    assertEq(() => Foo.prototype.foo, bar);
    assertEq(() => new Foo().foo(), 124);
  },
  "Method decorators: Shim (static method)": () => {
    let bar;
    const dec = (fn, ctx) => {
      bar = function() {
        return fn.call(this) + 1;
      };
      return bar;
    };
    class Foo {
      static bar = 123;
      @dec static foo() {
        return this.bar;
      }
    }
    assertEq(() => Foo.foo, bar);
    assertEq(() => Foo.foo(), 124);
  },
  "Method decorators: Shim (private instance method)": () => {
    let bar;
    const dec = (fn, ctx) => {
      bar = function() {
        return fn.call(this) + 1;
      };
      return bar;
    };
    let $foo;
    class Foo {
      bar = 123;
      @dec #foo() {
        return this.bar;
      }
      static {
        $foo = new Foo().#foo;
      }
    }
    assertEq(() => $foo, bar);
    assertEq(() => bar.call(new Foo()), 124);
  },
  "Method decorators: Shim (private static method)": () => {
    let bar;
    const dec = (fn, ctx) => {
      bar = function() {
        return fn.call(this) + 1;
      };
      return bar;
    };
    let $foo;
    class Foo {
      static bar = 123;
      @dec static #foo() {
        return this.bar;
      }
      static {
        $foo = this.#foo;
      }
    }
    assertEq(() => $foo, bar);
    assertEq(() => bar.call(Foo), 124);
  },
  "Method decorators: Order (instance method)": () => {
    const log = [];
    let bar;
    let baz;
    const dec1 = (fn, ctx) => {
      log.push(2);
      bar = function() {
        log.push(4);
        return fn.call(this);
      };
      return bar;
    };
    const dec2 = (fn, ctx) => {
      log.push(1);
      baz = function() {
        log.push(5);
        return fn.call(this);
      };
      return baz;
    };
    log.push(0);
    class Foo {
      @dec1 @dec2 foo() {
        return log.push(6);
      }
    }
    log.push(3);
    new Foo().foo();
    log.push(7);
    assertEq(() => Foo.prototype.foo, bar);
    assertEq(() => log + "", "0,1,2,3,4,5,6,7");
  },
  "Method decorators: Order (static method)": () => {
    const log = [];
    let bar;
    let baz;
    const dec1 = (fn, ctx) => {
      log.push(2);
      bar = function() {
        log.push(4);
        return fn.call(this);
      };
      return bar;
    };
    const dec2 = (fn, ctx) => {
      log.push(1);
      baz = function() {
        log.push(5);
        return fn.call(this);
      };
      return baz;
    };
    log.push(0);
    class Foo {
      @dec1 @dec2 static foo() {
        return log.push(6);
      }
    }
    log.push(3);
    Foo.foo();
    log.push(7);
    assertEq(() => Foo.foo, bar);
    assertEq(() => log + "", "0,1,2,3,4,5,6,7");
  },
  "Method decorators: Order (private instance method)": () => {
    const log = [];
    let bar;
    let baz;
    const dec1 = (fn, ctx) => {
      log.push(2);
      bar = function() {
        log.push(4);
        return fn.call(this);
      };
      return bar;
    };
    const dec2 = (fn, ctx) => {
      log.push(1);
      baz = function() {
        log.push(5);
        return fn.call(this);
      };
      return baz;
    };
    log.push(0);
    let $foo;
    class Foo {
      @dec1 @dec2 #foo() {
        return log.push(6);
      }
      static {
        $foo = new Foo().#foo;
      }
    }
    log.push(3);
    $foo.call(new Foo());
    log.push(7);
    assertEq(() => $foo, bar);
    assertEq(() => log + "", "0,1,2,3,4,5,6,7");
  },
  "Method decorators: Order (private static method)": () => {
    const log = [];
    let bar;
    let baz;
    const dec1 = (fn, ctx) => {
      log.push(2);
      bar = function() {
        log.push(4);
        return fn.call(this);
      };
      return bar;
    };
    const dec2 = (fn, ctx) => {
      log.push(1);
      baz = function() {
        log.push(5);
        return fn.call(this);
      };
      return baz;
    };
    log.push(0);
    let $foo;
    class Foo {
      @dec1 @dec2 static #foo() {
        return log.push(6);
      }
      static {
        $foo = Foo.#foo;
      }
    }
    log.push(3);
    $foo.call(Foo);
    log.push(7);
    assertEq(() => $foo, bar);
    assertEq(() => log + "", "0,1,2,3,4,5,6,7");
  },
  "Method decorators: Return null (instance method)": () => {
    let error;
    try {
      const dec = (fn, ctx) => {
        return null;
      };
      class Foo {
        @dec foo() {
        }
      }
    } catch (err) {
      error = err;
    }
    assertEq(() => error instanceof TypeError, true);
  },
  "Method decorators: Return null (static method)": () => {
    let error;
    try {
      const dec = (fn, ctx) => {
        return null;
      };
      class Foo {
        @dec static foo() {
        }
      }
    } catch (err) {
      error = err;
    }
    assertEq(() => error instanceof TypeError, true);
  },
  "Method decorators: Return null (private instance method)": () => {
    let error;
    try {
      const dec = (fn, ctx) => {
        return null;
      };
      class Foo {
        @dec #foo() {
        }
      }
    } catch (err) {
      error = err;
    }
    assertEq(() => error instanceof TypeError, true);
  },
  "Method decorators: Return null (private static method)": () => {
    let error;
    try {
      const dec = (fn, ctx) => {
        return null;
      };
      class Foo {
        @dec static #foo() {
        }
      }
    } catch (err) {
      error = err;
    }
    assertEq(() => error instanceof TypeError, true);
  },
  "Method decorators: Return object (instance method)": () => {
    let error;
    try {
      const dec = (fn, ctx) => {
        return {};
      };
      class Foo {
        @dec foo() {
        }
      }
    } catch (err) {
      error = err;
    }
    assertEq(() => error instanceof TypeError, true);
  },
  "Method decorators: Return object (static method)": () => {
    let error;
    try {
      const dec = (fn, ctx) => {
        return {};
      };
      class Foo {
        @dec static foo() {
        }
      }
    } catch (err) {
      error = err;
    }
    assertEq(() => error instanceof TypeError, true);
  },
  "Method decorators: Return object (private instance method)": () => {
    let error;
    try {
      const dec = (fn, ctx) => {
        return {};
      };
      class Foo {
        @dec #foo() {
        }
      }
    } catch (err) {
      error = err;
    }
    assertEq(() => error instanceof TypeError, true);
  },
  "Method decorators: Return object (private static method)": () => {
    let error;
    try {
      const dec = (fn, ctx) => {
        return {};
      };
      class Foo {
        @dec static #foo() {
        }
      }
    } catch (err) {
      error = err;
    }
    assertEq(() => error instanceof TypeError, true);
  },
  // Field decorators
  "Field decorators: Basic (instance field)": () => {
    const dec = (value, ctx) => {
      assertEq(() => value, void 0);
      assertEq(() => ctx.kind, "field");
      assertEq(() => ctx.name, "foo");
      assertEq(() => ctx.static, false);
      assertEq(() => ctx.private, false);
      assertEq(() => ctx.access.has({ foo: false }), true);
      assertEq(() => ctx.access.has({ bar: true }), false);
      assertEq(() => ctx.access.get({ foo: 123 }), 123);
      assertEq(() => {
        const obj = {};
        ctx.access.set(obj, 321);
        return obj.foo;
      }, 321);
    };
    class Foo {
      @dec foo = 123;
    }
    assertEq(() => new Foo().foo, 123);
  },
  "Field decorators: Basic (static field)": () => {
    const dec = (value, ctx) => {
      assertEq(() => value, void 0);
      assertEq(() => ctx.kind, "field");
      assertEq(() => ctx.name, "foo");
      assertEq(() => ctx.static, true);
      assertEq(() => ctx.private, false);
      assertEq(() => ctx.access.has({ foo: false }), true);
      assertEq(() => ctx.access.has({ bar: true }), false);
      assertEq(() => ctx.access.get({ foo: 123 }), 123);
      assertEq(() => {
        const obj = {};
        ctx.access.set(obj, 321);
        return obj.foo;
      }, 321);
    };
    class Foo {
      @dec static foo = 123;
    }
    assertEq(() => Foo.foo, 123);
  },
  "Field decorators: Basic (private instance field)": () => {
    let lateAsserts;
    const dec = (value, ctx) => {
      assertEq(() => value, void 0);
      assertEq(() => ctx.kind, "field");
      assertEq(() => ctx.name, "#foo");
      assertEq(() => ctx.static, false);
      assertEq(() => ctx.private, true);
      lateAsserts = () => {
        assertEq(() => ctx.access.has(new Foo()), true);
        assertEq(() => ctx.access.has({}), false);
        assertEq(() => ctx.access.get(new Foo()), 123);
        assertEq(() => {
          const obj = new Foo();
          ctx.access.set(obj, 321);
          return get$foo(obj);
        }, 321);
      };
    };
    let get$foo;
    class Foo {
      @dec #foo = 123;
      static {
        get$foo = (x) => x.#foo;
      }
    }
    assertEq(() => get$foo(new Foo()), 123);
    lateAsserts();
  },
  "Field decorators: Basic (private static field)": () => {
    let lateAsserts;
    const dec = (value, ctx) => {
      assertEq(() => value, void 0);
      assertEq(() => ctx.kind, "field");
      assertEq(() => ctx.name, "#foo");
      assertEq(() => ctx.static, true);
      assertEq(() => ctx.private, true);
      lateAsserts = () => {
        assertEq(() => ctx.access.has(Foo), true);
        assertEq(() => ctx.access.has({}), false);
        assertEq(() => ctx.access.get(Foo), 123);
        assertEq(() => {
          ctx.access.set(Foo, 321);
          return get$foo(Foo);
        }, 321);
      };
    };
    let get$foo;
    class Foo {
      @dec static #foo = 123;
      static {
        get$foo = (x) => x.#foo;
      }
    }
    assertEq(() => get$foo(Foo), 123);
    lateAsserts();
  },
  "Field decorators: Shim (instance field)": () => {
    let log = [];
    const dec = (value, ctx) => {
      return (x) => log.push(x);
    };
    class Foo {
      @dec foo = 123;
      @dec bar;
    }
    assertEq(() => log + "", "");
    var obj = new Foo();
    assertEq(() => obj.foo, 1);
    assertEq(() => obj.bar, 2);
    assertEq(() => log + "", "123,");
    var obj = new Foo();
    assertEq(() => obj.foo, 3);
    assertEq(() => obj.bar, 4);
    assertEq(() => log + "", "123,,123,");
  },
  "Field decorators: Shim (static field)": () => {
    let log = [];
    const dec = (value, ctx) => {
      return (x) => log.push(x);
    };
    const fn = (foo, bar) => {
      class Foo {
        @dec static foo = 123;
        @dec static bar;
      }
      assertEq(() => Foo.foo, foo);
      assertEq(() => Foo.bar, bar);
    };
    assertEq(() => log + "", "");
    fn(1, 2);
    assertEq(() => log + "", "123,");
    fn(3, 4);
    assertEq(() => log + "", "123,,123,");
  },
  "Field decorators: Shim (private instance field)": () => {
    let log = [];
    const dec = (value, ctx) => {
      return (x) => log.push(x);
    };
    let get$foo;
    let get$bar;
    class Foo {
      @dec #foo = 123;
      @dec #bar;
      static {
        get$foo = (x) => x.#foo;
        get$bar = (x) => x.#bar;
      }
    }
    assertEq(() => log + "", "");
    var obj = new Foo();
    assertEq(() => get$foo(obj), 1);
    assertEq(() => get$bar(obj), 2);
    assertEq(() => log + "", "123,");
    var obj = new Foo();
    assertEq(() => get$foo(obj), 3);
    assertEq(() => get$bar(obj), 4);
    assertEq(() => log + "", "123,,123,");
  },
  "Field decorators: Shim (private static field)": () => {
    let log = [];
    const dec = (value, ctx) => {
      return (x) => log.push(x);
    };
    const fn = (foo, bar) => {
      let get$foo;
      let get$bar;
      class Foo {
        @dec static #foo = 123;
        @dec static #bar;
        static {
          get$foo = (x) => x.#foo;
          get$bar = (x) => x.#bar;
        }
      }
      assertEq(() => get$foo(Foo), foo);
      assertEq(() => get$bar(Foo), bar);
    };
    assertEq(() => log + "", "");
    fn(1, 2);
    assertEq(() => log + "", "123,");
    fn(3, 4);
    assertEq(() => log + "", "123,,123,");
  },
  "Field decorators: Order (instance field)": () => {
    const log = [];
    const dec1 = (value, ctx) => {
      log.push(2);
      return () => log.push(4);
    };
    const dec2 = (value, ctx) => {
      log.push(1);
      return () => log.push(5);
    };
    log.push(0);
    class Foo {
      @dec1 @dec2 foo = 123;
    }
    log.push(3);
    var obj = new Foo();
    log.push(6);
    assertEq(() => obj.foo, 6);
    assertEq(() => log + "", "0,1,2,3,4,5,6");
  },
  "Field decorators: Order (static field)": () => {
    const log = [];
    const dec1 = (value, ctx) => {
      log.push(2);
      return () => log.push(3);
    };
    const dec2 = (value, ctx) => {
      log.push(1);
      return () => log.push(4);
    };
    log.push(0);
    class Foo {
      @dec1 @dec2 static foo = 123;
    }
    log.push(5);
    assertEq(() => Foo.foo, 5);
    assertEq(() => log + "", "0,1,2,3,4,5");
  },
  "Field decorators: Order (private instance field)": () => {
    const log = [];
    const dec1 = (value, ctx) => {
      log.push(2);
      return () => log.push(4);
    };
    const dec2 = (value, ctx) => {
      log.push(1);
      return () => log.push(5);
    };
    log.push(0);
    let get$foo;
    class Foo {
      @dec1 @dec2 #foo = 123;
      static {
        get$foo = (x) => x.#foo;
      }
    }
    log.push(3);
    var obj = new Foo();
    log.push(6);
    assertEq(() => get$foo(obj), 6);
    assertEq(() => log + "", "0,1,2,3,4,5,6");
  },
  "Field decorators: Order (private static field)": () => {
    const log = [];
    const dec1 = (value, ctx) => {
      log.push(2);
      return () => log.push(3);
    };
    const dec2 = (value, ctx) => {
      log.push(1);
      return () => log.push(4);
    };
    log.push(0);
    let get$foo;
    class Foo {
      @dec1 @dec2 static #foo = 123;
      static {
        get$foo = (x) => x.#foo;
      }
    }
    log.push(5);
    assertEq(() => get$foo(Foo), 5);
    assertEq(() => log + "", "0,1,2,3,4,5");
  },
  "Field decorators: Return null (instance field)": () => {
    let error;
    try {
      const dec = (value, ctx) => {
        return null;
      };
      class Foo {
        @dec foo;
      }
    } catch (err) {
      error = err;
    }
    assertEq(() => error instanceof TypeError, true);
  },
  "Field decorators: Return null (static field)": () => {
    let error;
    try {
      const dec = (value, ctx) => {
        return null;
      };
      class Foo {
        @dec static foo;
      }
    } catch (err) {
      error = err;
    }
    assertEq(() => error instanceof TypeError, true);
  },
  "Field decorators: Return null (private instance field)": () => {
    let error;
    try {
      const dec = (value, ctx) => {
        return null;
      };
      class Foo {
        @dec #foo;
      }
    } catch (err) {
      error = err;
    }
    assertEq(() => error instanceof TypeError, true);
  },
  "Field decorators: Return null (private static field)": () => {
    let error;
    try {
      const dec = (value, ctx) => {
        return null;
      };
      class Foo {
        @dec static #foo;
      }
    } catch (err) {
      error = err;
    }
    assertEq(() => error instanceof TypeError, true);
  },
  "Field decorators: Return object (instance field)": () => {
    let error;
    try {
      const dec = (value, ctx) => {
        return {};
      };
      class Foo {
        @dec foo;
      }
    } catch (err) {
      error = err;
    }
    assertEq(() => error instanceof TypeError, true);
  },
  "Field decorators: Return object (static field)": () => {
    let error;
    try {
      const dec = (value, ctx) => {
        return {};
      };
      class Foo {
        @dec static foo;
      }
    } catch (err) {
      error = err;
    }
    assertEq(() => error instanceof TypeError, true);
  },
  "Field decorators: Return object (private instance field)": () => {
    let error;
    try {
      const dec = (value, ctx) => {
        return {};
      };
      class Foo {
        @dec #foo;
      }
    } catch (err) {
      error = err;
    }
    assertEq(() => error instanceof TypeError, true);
  },
  "Field decorators: Return object (private static field)": () => {
    let error;
    try {
      const dec = (value, ctx) => {
        return {};
      };
      class Foo {
        @dec static #foo;
      }
    } catch (err) {
      error = err;
    }
    assertEq(() => error instanceof TypeError, true);
  },
  // Getter decorators
  "Getter decorators: Basic (instance getter)": () => {
    const dec = (fn, ctx) => {
      assertEq(() => typeof fn, "function");
      assertEq(() => ctx.kind, "getter");
      assertEq(() => ctx.name, "foo");
      assertEq(() => ctx.static, false);
      assertEq(() => ctx.private, false);
      assertEq(() => ctx.access.has({ foo: false }), true);
      assertEq(() => ctx.access.has({ bar: true }), false);
      assertEq(() => ctx.access.get({ foo: 123 }), 123);
      assertEq(() => "set" in ctx.access, false);
    };
    class Foo {
      bar = 123;
      @dec get foo() {
        return this.bar;
      }
    }
    assertEq(() => new Foo().foo, 123);
  },
  "Getter decorators: Basic (static getter)": () => {
    const dec = (fn, ctx) => {
      assertEq(() => typeof fn, "function");
      assertEq(() => ctx.kind, "getter");
      assertEq(() => ctx.name, "foo");
      assertEq(() => ctx.static, true);
      assertEq(() => ctx.private, false);
      assertEq(() => ctx.access.has({ foo: false }), true);
      assertEq(() => ctx.access.has({ bar: true }), false);
      assertEq(() => ctx.access.get({ foo: 123 }), 123);
      assertEq(() => "set" in ctx.access, false);
    };
    class Foo {
      static bar = 123;
      @dec static get foo() {
        return this.bar;
      }
    }
    assertEq(() => Foo.foo, 123);
  },
  "Getter decorators: Basic (private instance getter)": () => {
    let lateAsserts;
    const dec = (fn, ctx) => {
      assertEq(() => typeof fn, "function");
      assertEq(() => ctx.kind, "getter");
      assertEq(() => ctx.name, "#foo");
      assertEq(() => ctx.static, false);
      assertEq(() => ctx.private, true);
      lateAsserts = () => {
        assertEq(() => ctx.access.has(new Foo()), true);
        assertEq(() => ctx.access.has({}), false);
        assertEq(() => ctx.access.get(new Foo()), 123);
        assertEq(() => "set" in ctx.access, false);
      };
    };
    let get$foo;
    class Foo {
      #bar = 123;
      @dec get #foo() {
        return this.#bar;
      }
      static {
        get$foo = (x) => x.#foo;
      }
    }
    assertEq(() => get$foo(new Foo()), 123);
    lateAsserts();
  },
  "Getter decorators: Basic (private static getter)": () => {
    let lateAsserts;
    const dec = (fn, ctx) => {
      assertEq(() => typeof fn, "function");
      assertEq(() => ctx.kind, "getter");
      assertEq(() => ctx.name, "#foo");
      assertEq(() => ctx.static, true);
      assertEq(() => ctx.private, true);
      lateAsserts = () => {
        assertEq(() => ctx.access.has(Foo), true);
        assertEq(() => ctx.access.has({}), false);
        assertEq(() => ctx.access.get(Foo), 123);
        assertEq(() => "set" in ctx.access, false);
      };
    };
    let get$foo;
    class Foo {
      static #bar = 123;
      @dec static get #foo() {
        return this.#bar;
      }
      static {
        get$foo = (x) => x.#foo;
      }
    }
    assertEq(() => get$foo(Foo), 123);
    lateAsserts();
  },
  "Getter decorators: Shim (instance getter)": () => {
    let bar;
    const dec = (fn, ctx) => {
      bar = function() {
        return fn.call(this) + 1;
      };
      return bar;
    };
    class Foo {
      bar = 123;
      @dec get foo() {
        return this.bar;
      }
    }
    assertEq(() => Object.getOwnPropertyDescriptor(Foo.prototype, "foo").get, bar);
    assertEq(() => new Foo().foo, 124);
  },
  "Getter decorators: Shim (static getter)": () => {
    let bar;
    const dec = (fn, ctx) => {
      bar = function() {
        return fn.call(this) + 1;
      };
      return bar;
    };
    class Foo {
      static bar = 123;
      @dec static get foo() {
        return this.bar;
      }
    }
    assertEq(() => Object.getOwnPropertyDescriptor(Foo, "foo").get, bar);
    assertEq(() => Foo.foo, 124);
  },
  "Getter decorators: Shim (private instance getter)": () => {
    let bar;
    const dec = (fn, ctx) => {
      bar = function() {
        return fn.call(this) + 1;
      };
      return bar;
    };
    let get$foo;
    class Foo {
      #bar = 123;
      @dec get #foo() {
        return this.#bar;
      }
      static {
        get$foo = (x) => x.#foo;
      }
    }
    assertEq(() => get$foo(new Foo()), 124);
  },
  "Getter decorators: Shim (private static getter)": () => {
    let bar;
    const dec = (fn, ctx) => {
      bar = function() {
        return fn.call(this) + 1;
      };
      return bar;
    };
    let get$foo;
    class Foo {
      static #bar = 123;
      @dec static get #foo() {
        return this.#bar;
      }
      static {
        get$foo = (x) => x.#foo;
      }
    }
    assertEq(() => get$foo(Foo), 124);
  },
  "Getter decorators: Order (instance getter)": () => {
    const log = [];
    let bar;
    let baz;
    const dec1 = (fn, ctx) => {
      log.push(2);
      bar = function() {
        log.push(4);
        return fn.call(this);
      };
      return bar;
    };
    const dec2 = (fn, ctx) => {
      log.push(1);
      baz = function() {
        log.push(5);
        return fn.call(this);
      };
      return baz;
    };
    log.push(0);
    class Foo {
      @dec1 @dec2 get foo() {
        return log.push(6);
      }
    }
    log.push(3);
    new Foo().foo;
    log.push(7);
    assertEq(() => Object.getOwnPropertyDescriptor(Foo.prototype, "foo").get, bar);
    assertEq(() => log + "", "0,1,2,3,4,5,6,7");
  },
  "Getter decorators: Order (static getter)": () => {
    const log = [];
    let bar;
    let baz;
    const dec1 = (fn, ctx) => {
      log.push(2);
      bar = function() {
        log.push(4);
        return fn.call(this);
      };
      return bar;
    };
    const dec2 = (fn, ctx) => {
      log.push(1);
      baz = function() {
        log.push(5);
        return fn.call(this);
      };
      return baz;
    };
    log.push(0);
    class Foo {
      @dec1 @dec2 static get foo() {
        return log.push(6);
      }
    }
    log.push(3);
    Foo.foo;
    log.push(7);
    assertEq(() => Object.getOwnPropertyDescriptor(Foo, "foo").get, bar);
    assertEq(() => log + "", "0,1,2,3,4,5,6,7");
  },
  "Getter decorators: Order (private instance getter)": () => {
    const log = [];
    let bar;
    let baz;
    const dec1 = (fn, ctx) => {
      log.push(2);
      bar = function() {
        log.push(4);
        return fn.call(this);
      };
      return bar;
    };
    const dec2 = (fn, ctx) => {
      log.push(1);
      baz = function() {
        log.push(5);
        return fn.call(this);
      };
      return baz;
    };
    log.push(0);
    let get$foo;
    class Foo {
      @dec1 @dec2 get #foo() {
        return log.push(6);
      }
      static {
        get$foo = (x) => x.#foo;
      }
    }
    log.push(3);
    assertEq(() => get$foo(new Foo()), 7);
    log.push(7);
    assertEq(() => log + "", "0,1,2,3,4,5,6,7");
  },
  "Getter decorators: Order (private static getter)": () => {
    const log = [];
    let bar;
    let baz;
    const dec1 = (fn, ctx) => {
      log.push(2);
      bar = function() {
        log.push(4);
        return fn.call(this);
      };
      return bar;
    };
    const dec2 = (fn, ctx) => {
      log.push(1);
      baz = function() {
        log.push(5);
        return fn.call(this);
      };
      return baz;
    };
    log.push(0);
    let get$foo;
    class Foo {
      @dec1 @dec2 static get #foo() {
        return log.push(6);
      }
      static {
        get$foo = (x) => x.#foo;
      }
    }
    log.push(3);
    assertEq(() => get$foo(Foo), 7);
    log.push(7);
    assertEq(() => log + "", "0,1,2,3,4,5,6,7");
  },
  "Getter decorators: Return null (instance getter)": () => {
    let error;
    try {
      const dec = (fn, ctx) => {
        return null;
      };
      class Foo {
        @dec get foo() {
          return;
        }
      }
    } catch (err) {
      error = err;
    }
    assertEq(() => error instanceof TypeError, true);
  },
  "Getter decorators: Return null (static getter)": () => {
    let error;
    try {
      const dec = (fn, ctx) => {
        return null;
      };
      class Foo {
        @dec static get foo() {
          return;
        }
      }
    } catch (err) {
      error = err;
    }
    assertEq(() => error instanceof TypeError, true);
  },
  "Getter decorators: Return null (private instance getter)": () => {
    let error;
    try {
      const dec = (fn, ctx) => {
        return null;
      };
      class Foo {
        @dec get #foo() {
          return;
        }
      }
    } catch (err) {
      error = err;
    }
    assertEq(() => error instanceof TypeError, true);
  },
  "Getter decorators: Return null (private static getter)": () => {
    let error;
    try {
      const dec = (fn, ctx) => {
        return null;
      };
      class Foo {
        @dec static get #foo() {
          return;
        }
      }
    } catch (err) {
      error = err;
    }
    assertEq(() => error instanceof TypeError, true);
  },
  "Getter decorators: Return object (instance getter)": () => {
    let error;
    try {
      const dec = (fn, ctx) => {
        return {};
      };
      class Foo {
        @dec get foo() {
          return;
        }
      }
    } catch (err) {
      error = err;
    }
    assertEq(() => error instanceof TypeError, true);
  },
  "Getter decorators: Return object (static getter)": () => {
    let error;
    try {
      const dec = (fn, ctx) => {
        return {};
      };
      class Foo {
        @dec static get foo() {
          return;
        }
      }
    } catch (err) {
      error = err;
    }
    assertEq(() => error instanceof TypeError, true);
  },
  "Getter decorators: Return object (private instance getter)": () => {
    let error;
    try {
      const dec = (fn, ctx) => {
        return {};
      };
      class Foo {
        @dec get #foo() {
          return;
        }
      }
    } catch (err) {
      error = err;
    }
    assertEq(() => error instanceof TypeError, true);
  },
  "Getter decorators: Return object (private static getter)": () => {
    let error;
    try {
      const dec = (fn, ctx) => {
        return {};
      };
      class Foo {
        @dec static get #foo() {
          return;
        }
      }
    } catch (err) {
      error = err;
    }
    assertEq(() => error instanceof TypeError, true);
  },
  // Setter decorators
  "Setter decorators: Basic (instance setter)": () => {
    const dec = (fn, ctx) => {
      assertEq(() => typeof fn, "function");
      assertEq(() => ctx.kind, "setter");
      assertEq(() => ctx.name, "foo");
      assertEq(() => ctx.static, false);
      assertEq(() => ctx.private, false);
      assertEq(() => ctx.access.has({ foo: false }), true);
      assertEq(() => ctx.access.has({ bar: true }), false);
      assertEq(() => "get" in ctx.access, false);
      const obj2 = {};
      ctx.access.set(obj2, 123);
      assertEq(() => obj2.foo, 123);
      assertEq(() => "bar" in obj2, false);
    };
    class Foo {
      bar = 0;
      @dec set foo(x) {
        this.bar = x;
      }
    }
    var obj = new Foo();
    obj.foo = 321;
    assertEq(() => obj.bar, 321);
  },
  "Setter decorators: Basic (static setter)": () => {
    const dec = (fn, ctx) => {
      assertEq(() => typeof fn, "function");
      assertEq(() => ctx.kind, "setter");
      assertEq(() => ctx.name, "foo");
      assertEq(() => ctx.static, true);
      assertEq(() => ctx.private, false);
      assertEq(() => ctx.access.has({ foo: false }), true);
      assertEq(() => ctx.access.has({ bar: true }), false);
      assertEq(() => "get" in ctx.access, false);
      const obj = {};
      ctx.access.set(obj, 123);
      assertEq(() => obj.foo, 123);
      assertEq(() => "bar" in obj, false);
    };
    class Foo {
      static bar = 0;
      @dec static set foo(x) {
        this.bar = x;
      }
    }
    Foo.foo = 321;
    assertEq(() => Foo.bar, 321);
  },
  "Setter decorators: Basic (private instance setter)": () => {
    let lateAsserts;
    const dec = (fn, ctx) => {
      assertEq(() => typeof fn, "function");
      assertEq(() => ctx.kind, "setter");
      assertEq(() => ctx.name, "#foo");
      assertEq(() => ctx.static, false);
      assertEq(() => ctx.private, true);
      lateAsserts = () => {
        assertEq(() => ctx.access.has(new Foo()), true);
        assertEq(() => ctx.access.has({}), false);
        assertEq(() => "get" in ctx.access, false);
        assertEq(() => {
          const obj2 = new Foo();
          ctx.access.set(obj2, 123);
          return obj2.bar;
        }, 123);
      };
    };
    let set$foo;
    class Foo {
      bar = 0;
      @dec set #foo(x) {
        this.bar = x;
      }
      static {
        set$foo = (x, y) => {
          x.#foo = y;
        };
      }
    }
    lateAsserts();
    var obj = new Foo();
    assertEq(() => set$foo(obj, 321), void 0);
    assertEq(() => obj.bar, 321);
  },
  "Setter decorators: Basic (private static setter)": () => {
    let lateAsserts;
    const dec = (fn, ctx) => {
      assertEq(() => typeof fn, "function");
      assertEq(() => ctx.kind, "setter");
      assertEq(() => ctx.name, "#foo");
      assertEq(() => ctx.static, true);
      assertEq(() => ctx.private, true);
      lateAsserts = () => {
        assertEq(() => ctx.access.has(Foo), true);
        assertEq(() => ctx.access.has({}), false);
        assertEq(() => "get" in ctx.access, false);
        assertEq(() => {
          ctx.access.set(Foo, 123);
          return Foo.bar;
        }, 123);
      };
    };
    let set$foo;
    class Foo {
      static bar = 0;
      @dec static set #foo(x) {
        this.bar = x;
      }
      static {
        set$foo = (x, y) => {
          x.#foo = y;
        };
      }
    }
    lateAsserts();
    assertEq(() => set$foo(Foo, 321), void 0);
    assertEq(() => Foo.bar, 321);
  },
  "Setter decorators: Shim (instance setter)": () => {
    let bar;
    const dec = (fn, ctx) => {
      bar = function(x) {
        fn.call(this, x + 1);
      };
      return bar;
    };
    class Foo {
      bar = 123;
      @dec set foo(x) {
        this.bar = x;
      }
    }
    assertEq(() => Object.getOwnPropertyDescriptor(Foo.prototype, "foo").set, bar);
    var obj = new Foo();
    obj.foo = 321;
    assertEq(() => obj.bar, 322);
  },
  "Setter decorators: Shim (static setter)": () => {
    let bar;
    const dec = (fn, ctx) => {
      bar = function(x) {
        fn.call(this, x + 1);
      };
      return bar;
    };
    class Foo {
      static bar = 123;
      @dec static set foo(x) {
        this.bar = x;
      }
    }
    assertEq(() => Object.getOwnPropertyDescriptor(Foo, "foo").set, bar);
    Foo.foo = 321;
    assertEq(() => Foo.bar, 322);
  },
  "Setter decorators: Shim (private instance setter)": () => {
    let bar;
    const dec = (fn, ctx) => {
      bar = function(x) {
        fn.call(this, x + 1);
      };
      return bar;
    };
    let set$foo;
    class Foo {
      bar = 123;
      @dec set #foo(x) {
        this.bar = x;
      }
      static {
        set$foo = (x, y) => {
          x.#foo = y;
        };
      }
    }
    var obj = new Foo();
    assertEq(() => set$foo(obj, 321), void 0);
    assertEq(() => obj.bar, 322);
  },
  "Setter decorators: Shim (private static setter)": () => {
    let bar;
    const dec = (fn, ctx) => {
      bar = function(x) {
        fn.call(this, x + 1);
      };
      return bar;
    };
    let set$foo;
    class Foo {
      static bar = 123;
      @dec static set #foo(x) {
        this.bar = x;
      }
      static {
        set$foo = (x, y) => {
          x.#foo = y;
        };
      }
    }
    assertEq(() => set$foo(Foo, 321), void 0);
    assertEq(() => Foo.bar, 322);
  },
  "Setter decorators: Order (instance setter)": () => {
    const log = [];
    let bar;
    let baz;
    const dec1 = (fn, ctx) => {
      log.push(2);
      bar = function(x) {
        log.push(4);
        fn.call(this, x);
      };
      return bar;
    };
    const dec2 = (fn, ctx) => {
      log.push(1);
      baz = function(x) {
        log.push(5);
        fn.call(this, x);
      };
      return baz;
    };
    log.push(0);
    class Foo {
      @dec1 @dec2 set foo(x) {
        log.push(6);
      }
    }
    log.push(3);
    new Foo().foo = 123;
    log.push(7);
    assertEq(() => Object.getOwnPropertyDescriptor(Foo.prototype, "foo").set, bar);
    assertEq(() => log + "", "0,1,2,3,4,5,6,7");
  },
  "Setter decorators: Order (static setter)": () => {
    const log = [];
    let bar;
    let baz;
    const dec1 = (fn, ctx) => {
      log.push(2);
      bar = function(x) {
        log.push(4);
        fn.call(this, x);
      };
      return bar;
    };
    const dec2 = (fn, ctx) => {
      log.push(1);
      baz = function(x) {
        log.push(5);
        fn.call(this, x);
      };
      return baz;
    };
    log.push(0);
    class Foo {
      @dec1 @dec2 static set foo(x) {
        log.push(6);
      }
    }
    log.push(3);
    Foo.foo = 123;
    log.push(7);
    assertEq(() => Object.getOwnPropertyDescriptor(Foo, "foo").set, bar);
    assertEq(() => log + "", "0,1,2,3,4,5,6,7");
  },
  "Setter decorators: Order (private instance setter)": () => {
    const log = [];
    let bar;
    let baz;
    const dec1 = (fn, ctx) => {
      log.push(2);
      bar = function(x) {
        log.push(4);
        fn.call(this, x);
      };
      return bar;
    };
    const dec2 = (fn, ctx) => {
      log.push(1);
      baz = function(x) {
        log.push(5);
        fn.call(this, x);
      };
      return baz;
    };
    log.push(0);
    let set$foo;
    class Foo {
      @dec1 @dec2 set #foo(x) {
        log.push(6);
      }
      static {
        set$foo = (x, y) => {
          x.#foo = y;
        };
      }
    }
    log.push(3);
    assertEq(() => set$foo(new Foo(), 123), void 0);
    log.push(7);
    assertEq(() => log + "", "0,1,2,3,4,5,6,7");
  },
  "Setter decorators: Order (private static setter)": () => {
    const log = [];
    let bar;
    let baz;
    const dec1 = (fn, ctx) => {
      log.push(2);
      bar = function(x) {
        log.push(4);
        fn.call(this, x);
      };
      return bar;
    };
    const dec2 = (fn, ctx) => {
      log.push(1);
      baz = function(x) {
        log.push(5);
        fn.call(this, x);
      };
      return baz;
    };
    log.push(0);
    let set$foo;
    class Foo {
      @dec1 @dec2 static set #foo(x) {
        log.push(6);
      }
      static {
        set$foo = (x, y) => {
          x.#foo = y;
        };
      }
    }
    log.push(3);
    assertEq(() => set$foo(Foo, 123), void 0);
    log.push(7);
    assertEq(() => log + "", "0,1,2,3,4,5,6,7");
  },
  "Setter decorators: Return null (instance setter)": () => {
    let error;
    try {
      const dec = (fn, ctx) => {
        return null;
      };
      class Foo {
        @dec set foo(x) {
        }
      }
    } catch (err) {
      error = err;
    }
    assertEq(() => error instanceof TypeError, true);
  },
  "Setter decorators: Return null (static setter)": () => {
    let error;
    try {
      const dec = (fn, ctx) => {
        return null;
      };
      class Foo {
        @dec static set foo(x) {
        }
      }
    } catch (err) {
      error = err;
    }
    assertEq(() => error instanceof TypeError, true);
  },
  "Setter decorators: Return null (private instance setter)": () => {
    let error;
    try {
      const dec = (fn, ctx) => {
        return null;
      };
      class Foo {
        @dec set #foo(x) {
        }
      }
    } catch (err) {
      error = err;
    }
    assertEq(() => error instanceof TypeError, true);
  },
  "Setter decorators: Return null (private static setter)": () => {
    let error;
    try {
      const dec = (fn, ctx) => {
        return null;
      };
      class Foo {
        @dec static set #foo(x) {
        }
      }
    } catch (err) {
      error = err;
    }
    assertEq(() => error instanceof TypeError, true);
  },
  "Setter decorators: Return object (instance setter)": () => {
    let error;
    try {
      const dec = (fn, ctx) => {
        return {};
      };
      class Foo {
        @dec set foo(x) {
        }
      }
    } catch (err) {
      error = err;
    }
    assertEq(() => error instanceof TypeError, true);
  },
  "Setter decorators: Return object (static setter)": () => {
    let error;
    try {
      const dec = (fn, ctx) => {
        return {};
      };
      class Foo {
        @dec static set foo(x) {
        }
      }
    } catch (err) {
      error = err;
    }
    assertEq(() => error instanceof TypeError, true);
  },
  "Setter decorators: Return object (private instance setter)": () => {
    let error;
    try {
      const dec = (fn, ctx) => {
        return {};
      };
      class Foo {
        @dec set #foo(x) {
        }
      }
    } catch (err) {
      error = err;
    }
    assertEq(() => error instanceof TypeError, true);
  },
  "Setter decorators: Return object (private static setter)": () => {
    let error;
    try {
      const dec = (fn, ctx) => {
        return {};
      };
      class Foo {
        @dec static set #foo(x) {
        }
      }
    } catch (err) {
      error = err;
    }
    assertEq(() => error instanceof TypeError, true);
  },
  // Auto-accessor decorators
  "Auto-accessor decorators: Basic (instance auto-accessor)": () => {
    const dec = (target, ctx) => {
      assertEq(() => typeof target.get, "function");
      assertEq(() => typeof target.set, "function");
      assertEq(() => ctx.kind, "accessor");
      assertEq(() => ctx.name, "foo");
      assertEq(() => ctx.static, false);
      assertEq(() => ctx.private, false);
      assertEq(() => ctx.access.has({ foo: false }), true);
      assertEq(() => ctx.access.has({ bar: true }), false);
      assertEq(() => ctx.access.get({ foo: 123 }), 123);
      assertEq(() => {
        const obj2 = {};
        ctx.access.set(obj2, 123);
        return obj2.foo;
      }, 123);
    };
    class Foo {
      @dec accessor foo = 0;
    }
    var obj = new Foo();
    obj.foo = 321;
    assertEq(() => obj.foo, 321);
  },
  "Auto-accessor decorators: Basic (static auto-accessor)": () => {
    const dec = (target, ctx) => {
      assertEq(() => typeof target.get, "function");
      assertEq(() => typeof target.set, "function");
      assertEq(() => ctx.kind, "accessor");
      assertEq(() => ctx.name, "foo");
      assertEq(() => ctx.static, true);
      assertEq(() => ctx.private, false);
      assertEq(() => ctx.access.has({ foo: false }), true);
      assertEq(() => ctx.access.has({ bar: true }), false);
      assertEq(() => ctx.access.get({ foo: 123 }), 123);
      assertEq(() => {
        const obj = {};
        ctx.access.set(obj, 123);
        return obj.foo;
      }, 123);
    };
    class Foo {
      @dec static accessor foo = 0;
    }
    Foo.foo = 321;
    assertEq(() => Foo.foo, 321);
  },
  "Auto-accessor decorators: Basic (private instance auto-accessor)": () => {
    let lateAsserts;
    const dec = (target, ctx) => {
      assertEq(() => typeof target.get, "function");
      assertEq(() => typeof target.set, "function");
      assertEq(() => ctx.kind, "accessor");
      assertEq(() => ctx.name, "#foo");
      assertEq(() => ctx.static, false);
      assertEq(() => ctx.private, true);
      lateAsserts = () => {
        assertEq(() => ctx.access.has(new Foo()), true);
        assertEq(() => ctx.access.has({}), false);
        assertEq(() => ctx.access.get(new Foo()), 0);
        assertEq(() => {
          const obj2 = new Foo();
          ctx.access.set(obj2, 123);
          return get$foo(obj2);
        }, 123);
      };
    };
    let get$foo;
    let set$foo;
    class Foo {
      @dec accessor #foo = 0;
      static {
        get$foo = (x) => x.#foo;
        set$foo = (x, y) => {
          x.#foo = y;
        };
      }
    }
    lateAsserts();
    var obj = new Foo();
    assertEq(() => set$foo(obj, 321), void 0);
    assertEq(() => get$foo(obj), 321);
  },
  "Auto-accessor decorators: Basic (private static auto-accessor)": () => {
    let lateAsserts;
    const dec = (target, ctx) => {
      assertEq(() => typeof target.get, "function");
      assertEq(() => typeof target.set, "function");
      assertEq(() => ctx.kind, "accessor");
      assertEq(() => ctx.name, "#foo");
      assertEq(() => ctx.static, true);
      assertEq(() => ctx.private, true);
      lateAsserts = () => {
        assertEq(() => ctx.access.has(Foo), true);
        assertEq(() => ctx.access.has({}), false);
        assertEq(() => ctx.access.get(Foo), 0);
        assertEq(() => {
          ctx.access.set(Foo, 123);
          return get$foo(Foo);
        }, 123);
      };
    };
    let get$foo;
    let set$foo;
    class Foo {
      @dec static accessor #foo = 0;
      static {
        get$foo = (x) => x.#foo;
        set$foo = (x, y) => {
          x.#foo = y;
        };
      }
    }
    lateAsserts();
    assertEq(() => set$foo(Foo, 321), void 0);
    assertEq(() => get$foo(Foo), 321);
  },
  "Auto-accessor decorators: Shim (instance auto-accessor)": () => {
    let get;
    let set;
    const dec = (target, ctx) => {
      const init = (x) => x + 1;
      get = function() {
        return target.get.call(this) * 10;
      };
      set = function(x) {
        target.set.call(this, x * 2);
      };
      return { get, set, init };
    };
    class Foo {
      @dec accessor foo = 123;
    }
    assertEq(() => Object.getOwnPropertyDescriptor(Foo.prototype, "foo").get, get);
    assertEq(() => Object.getOwnPropertyDescriptor(Foo.prototype, "foo").set, set);
    var obj = new Foo();
    assertEq(() => obj.foo, (123 + 1) * 10);
    obj.foo = 321;
    assertEq(() => obj.foo, 321 * 2 * 10);
  },
  "Auto-accessor decorators: Shim (static auto-accessor)": () => {
    let get;
    let set;
    const dec = (target, ctx) => {
      const init = (x) => x + 1;
      get = function() {
        return target.get.call(this) * 10;
      };
      set = function(x) {
        target.set.call(this, x * 2);
      };
      return { get, set, init };
    };
    class Foo {
      @dec static accessor foo = 123;
    }
    assertEq(() => Object.getOwnPropertyDescriptor(Foo, "foo").get, get);
    assertEq(() => Object.getOwnPropertyDescriptor(Foo, "foo").set, set);
    assertEq(() => Foo.foo, (123 + 1) * 10);
    Foo.foo = 321;
    assertEq(() => Foo.foo, 321 * 2 * 10);
  },
  "Auto-accessor decorators: Shim (private instance auto-accessor)": () => {
    let get;
    let set;
    const dec = (target, ctx) => {
      const init = (x) => x + 1;
      get = function() {
        return target.get.call(this) * 10;
      };
      set = function(x) {
        target.set.call(this, x * 2);
      };
      return { get, set, init };
    };
    let get$foo;
    let set$foo;
    class Foo {
      @dec accessor #foo = 123;
      static {
        get$foo = (x) => x.#foo;
        set$foo = (x, y) => {
          x.#foo = y;
        };
      }
    }
    var obj = new Foo();
    assertEq(() => get$foo(obj), (123 + 1) * 10);
    assertEq(() => set$foo(obj, 321), void 0);
    assertEq(() => get$foo(obj), 321 * 2 * 10);
  },
  "Auto-accessor decorators: Shim (private static auto-accessor)": () => {
    let get;
    let set;
    const dec = (target, ctx) => {
      const init = (x) => x + 1;
      get = function() {
        return target.get.call(this) * 10;
      };
      set = function(x) {
        target.set.call(this, x * 2);
      };
      return { get, set, init };
    };
    let get$foo;
    let set$foo;
    class Foo {
      @dec static accessor #foo = 123;
      static {
        get$foo = (x) => x.#foo;
        set$foo = (x, y) => {
          x.#foo = y;
        };
      }
    }
    assertEq(() => get$foo(Foo), (123 + 1) * 10);
    assertEq(() => set$foo(Foo, 321), void 0);
    assertEq(() => get$foo(Foo), 321 * 2 * 10);
  },
  "Auto-accessor decorators: Return null (instance auto-accessor)": () => {
    let error;
    try {
      const dec = (target, ctx) => {
        return null;
      };
      class Foo {
        @dec accessor foo;
      }
    } catch (err) {
      error = err;
    }
    assertEq(() => error instanceof TypeError, true);
  },
  "Auto-accessor decorators: Return null (static auto-accessor)": () => {
    let error;
    try {
      const dec = (target, ctx) => {
        return null;
      };
      class Foo {
        @dec static accessor foo;
      }
    } catch (err) {
      error = err;
    }
    assertEq(() => error instanceof TypeError, true);
  },
  "Auto-accessor decorators: Return null (private instance auto-accessor)": () => {
    let error;
    try {
      const dec = (target, ctx) => {
        return null;
      };
      class Foo {
        @dec accessor #foo;
      }
    } catch (err) {
      error = err;
    }
    assertEq(() => error instanceof TypeError, true);
  },
  "Auto-accessor decorators: Return null (private static auto-accessor)": () => {
    let error;
    try {
      const dec = (target, ctx) => {
        return null;
      };
      class Foo {
        @dec static accessor #foo;
      }
    } catch (err) {
      error = err;
    }
    assertEq(() => error instanceof TypeError, true);
  },
  // Decorator list evaluation
  "Decorator list evaluation: Computed names": () => {
    const log = [];
    const foo = (n) => {
      log.push(n);
      return () => {
      };
    };
    const computed = {
      get method() {
        log.push(log.length);
        return Symbol("method");
      },
      get field() {
        log.push(log.length);
        return Symbol("field");
      },
      get getter() {
        log.push(log.length);
        return Symbol("getter");
      },
      get setter() {
        log.push(log.length);
        return Symbol("setter");
      },
      get accessor() {
        log.push(log.length);
        return Symbol("accessor");
      }
    };
    @foo(0) class Foo {
      @foo(1) [computed.method]() {
      }
      @foo(3) static [computed.method]() {
      }
      @foo(5) [computed.field];
      @foo(7) static [computed.field];
      @foo(9) get [computed.getter]() {
        return;
      }
      @foo(11) static get [computed.getter]() {
        return;
      }
      @foo(13) set [computed.setter](x) {
      }
      @foo(15) static set [computed.setter](x) {
      }
      @foo(17) accessor [computed.accessor];
      @foo(19) static accessor [computed.accessor];
    }
    assertEq(() => "" + log, "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20");
  },
  'Decorator list evaluation: "this"': () => {
    const log = [];
    const dummy = () => {
    };
    const ctx = {
      foo(n) {
        log.push(n);
      }
    };
    function wrapper() {
      @(assertEq(() => this.foo(0), void 0), dummy) class Foo {
        @(assertEq(() => this.foo(1), void 0), dummy) method() {
        }
        @(assertEq(() => this.foo(2), void 0), dummy) static method() {
        }
        @(assertEq(() => this.foo(3), void 0), dummy) field;
        @(assertEq(() => this.foo(4), void 0), dummy) static field;
        @(assertEq(() => this.foo(5), void 0), dummy) get getter() {
          return;
        }
        @(assertEq(() => this.foo(6), void 0), dummy) static get getter() {
          return;
        }
        @(assertEq(() => this.foo(7), void 0), dummy) set setter(x) {
        }
        @(assertEq(() => this.foo(8), void 0), dummy) static set setter(x) {
        }
        @(assertEq(() => this.foo(9), void 0), dummy) accessor accessor;
        @(assertEq(() => this.foo(10), void 0), dummy) static accessor accessor;
      }
    }
    wrapper.call(ctx);
    assertEq(() => "" + log, "0,1,2,3,4,5,6,7,8,9,10");
  },
  'Decorator list evaluation: "await"': async () => {
    const log = [];
    const dummy = () => {
    };
    async function wrapper() {
      @(log.push(await Promise.resolve(0)), dummy) class Foo {
        @(log.push(await Promise.resolve(1)), dummy) method() {
        }
        @(log.push(await Promise.resolve(2)), dummy) static method() {
        }
        @(log.push(await Promise.resolve(3)), dummy) field;
        @(log.push(await Promise.resolve(4)), dummy) static field;
        @(log.push(await Promise.resolve(5)), dummy) get getter() {
          return;
        }
        @(log.push(await Promise.resolve(6)), dummy) static get getter() {
          return;
        }
        @(log.push(await Promise.resolve(7)), dummy) set setter(x) {
        }
        @(log.push(await Promise.resolve(8)), dummy) static set setter(x) {
        }
        @(log.push(await Promise.resolve(9)), dummy) accessor accessor;
        @(log.push(await Promise.resolve(10)), dummy) static accessor accessor;
      }
    }
    await wrapper();
    assertEq(() => "" + log, "0,1,2,3,4,5,6,7,8,9,10");
  },
  "Decorator list evaluation: Outer private name": () => {
    const log = [];
    class Dummy {
      static #foo(n) {
        log.push(n);
        return () => {
        };
      }
      static {
        const dummy = this;
        @dummy.#foo(0) class Foo {
          @dummy.#foo(1) method() {
          }
          @dummy.#foo(2) static method() {
          }
          @dummy.#foo(3) field;
          @dummy.#foo(4) static field;
          @dummy.#foo(5) get getter() {
            return;
          }
          @dummy.#foo(6) static get getter() {
            return;
          }
          @dummy.#foo(7) set setter(x) {
          }
          @dummy.#foo(8) static set setter(x) {
          }
          @dummy.#foo(9) accessor accessor;
          @dummy.#foo(10) static accessor accessor;
        }
      }
    }
    assertEq(() => "" + log, "0,1,2,3,4,5,6,7,8,9,10");
  },
  "Decorator list evaluation: Inner private name": () => {
    const fns = [];
    const capture = (fn) => {
      fns.push(fn);
      return () => {
      };
    };
    class Dummy {
      static #foo = NaN;
      static {
        @capture(() => new Foo().#foo + 0)
        class Foo {
          #foo2 = 10;
          @capture(() => new Foo().#foo2 + 1) method() {
          }
          @capture(() => new Foo().#foo2 + 2) static method() {
          }
          @capture(() => new Foo().#foo2 + 3) field;
          @capture(() => new Foo().#foo2 + 4) static field;
          @capture(() => new Foo().#foo2 + 5) get getter() {
            return;
          }
          @capture(() => new Foo().#foo2 + 6) static get getter() {
            return;
          }
          @capture(() => new Foo().#foo2 + 7) set setter(x) {
          }
          @capture(() => new Foo().#foo2 + 8) static set setter(x) {
          }
          @capture(() => new Foo().#foo2 + 9) accessor accessor;
          @capture(() => new Foo().#foo2 + 10) static accessor accessor;
        }
      }
    }
    const firstFn = fns.shift();
    assertEq(() => {
      try {
        firstFn();
        throw new Error("Expected a TypeError to be thrown");
      } catch (err) {
        if (err instanceof TypeError)
          return true;
        throw err;
      }
    }, true);
    const log = [];
    for (const fn of fns)
      log.push(fn());
    assertEq(() => "" + log, "11,12,13,14,15,16,17,18,19,20");
  },
  "Decorator list evaluation: Class binding": () => {
    const fns = [];
    const capture = (fn) => {
      fns.push(fn);
      let error;
      try {
        fn();
      } catch (err) {
        error = err;
      }
      assertEq(() => error instanceof ReferenceError, true);
      return () => {
      };
    };
    @capture(() => Foo) class Foo {
      @capture(() => Foo) method() {
      }
      @capture(() => Foo) static method() {
      }
      @capture(() => Foo) field;
      @capture(() => Foo) static field;
      @capture(() => Foo) get getter() {
        return;
      }
      @capture(() => Foo) static get getter() {
        return;
      }
      @capture(() => Foo) set setter(x) {
      }
      @capture(() => Foo) static set setter(x) {
      }
      @capture(() => Foo) accessor accessor;
      @capture(() => Foo) static accessor accessor;
    }
    const originalFoo = Foo;
    for (const fn of fns) {
      assertEq(() => fn(), originalFoo);
    }
    Foo = null;
    const firstFn = fns.shift();
    assertEq(() => firstFn(), null);
    for (const fn of fns) {
      assertEq(() => fn(), originalFoo);
    }
  },
  // Initializer order
  "Initializer order": () => {
    const log = [];
    const classDec1 = (cls, ctxClass) => {
      log.push("c2");
      if (!assertEq(() => typeof ctxClass.addInitializer, "function"))
        return;
      ctxClass.addInitializer(() => log.push("c5"));
      ctxClass.addInitializer(() => log.push("c6"));
    };
    const classDec2 = (cls, ctxClass) => {
      log.push("c1");
      if (!assertEq(() => typeof ctxClass.addInitializer, "function"))
        return;
      ctxClass.addInitializer(() => log.push("c3"));
      ctxClass.addInitializer(() => log.push("c4"));
    };
    const methodDec1 = (fn, ctxMethod) => {
      log.push("m2");
      if (!assertEq(() => typeof ctxMethod.addInitializer, "function"))
        return;
      ctxMethod.addInitializer(() => log.push("m5"));
      ctxMethod.addInitializer(() => log.push("m6"));
    };
    const methodDec2 = (fn, ctxMethod) => {
      log.push("m1");
      if (!assertEq(() => typeof ctxMethod.addInitializer, "function"))
        return;
      ctxMethod.addInitializer(() => log.push("m3"));
      ctxMethod.addInitializer(() => log.push("m4"));
    };
    const staticMethodDec1 = (fn, ctxStaticMethod) => {
      log.push("M2");
      if (!assertEq(() => typeof ctxStaticMethod.addInitializer, "function"))
        return;
      ctxStaticMethod.addInitializer(() => log.push("M5"));
      ctxStaticMethod.addInitializer(() => log.push("M6"));
    };
    const staticMethodDec2 = (fn, ctxStaticMethod) => {
      log.push("M1");
      if (!assertEq(() => typeof ctxStaticMethod.addInitializer, "function"))
        return;
      ctxStaticMethod.addInitializer(() => log.push("M3"));
      ctxStaticMethod.addInitializer(() => log.push("M4"));
    };
    const fieldDec1 = (value, ctxField) => {
      log.push("f2");
      if (!assertEq(() => typeof ctxField.addInitializer, "function"))
        return;
      ctxField.addInitializer(() => log.push("f5"));
      ctxField.addInitializer(() => log.push("f6"));
      return () => {
        log.push("f7");
      };
    };
    const fieldDec2 = (value, ctxField) => {
      log.push("f1");
      if (!assertEq(() => typeof ctxField.addInitializer, "function"))
        return;
      ctxField.addInitializer(() => log.push("f3"));
      ctxField.addInitializer(() => log.push("f4"));
      return () => {
        log.push("f8");
      };
    };
    const staticFieldDec1 = (value, ctxStaticField) => {
      log.push("F2");
      if (!assertEq(() => typeof ctxStaticField.addInitializer, "function"))
        return;
      ctxStaticField.addInitializer(() => log.push("F5"));
      ctxStaticField.addInitializer(() => log.push("F6"));
      return () => {
        log.push("F7");
      };
    };
    const staticFieldDec2 = (value, ctxStaticField) => {
      log.push("F1");
      if (!assertEq(() => typeof ctxStaticField.addInitializer, "function"))
        return;
      ctxStaticField.addInitializer(() => log.push("F3"));
      ctxStaticField.addInitializer(() => log.push("F4"));
      return () => {
        log.push("F8");
      };
    };
    const getterDec1 = (fn, ctxGetter) => {
      log.push("g2");
      if (!assertEq(() => typeof ctxGetter.addInitializer, "function"))
        return;
      ctxGetter.addInitializer(() => log.push("g5"));
      ctxGetter.addInitializer(() => log.push("g6"));
    };
    const getterDec2 = (fn, ctxGetter) => {
      log.push("g1");
      if (!assertEq(() => typeof ctxGetter.addInitializer, "function"))
        return;
      ctxGetter.addInitializer(() => log.push("g3"));
      ctxGetter.addInitializer(() => log.push("g4"));
    };
    const staticGetterDec1 = (fn, ctxStaticGetter) => {
      log.push("G2");
      if (!assertEq(() => typeof ctxStaticGetter.addInitializer, "function"))
        return;
      ctxStaticGetter.addInitializer(() => log.push("G5"));
      ctxStaticGetter.addInitializer(() => log.push("G6"));
    };
    const staticGetterDec2 = (fn, ctxStaticGetter) => {
      log.push("G1");
      if (!assertEq(() => typeof ctxStaticGetter.addInitializer, "function"))
        return;
      ctxStaticGetter.addInitializer(() => log.push("G3"));
      ctxStaticGetter.addInitializer(() => log.push("G4"));
    };
    const setterDec1 = (fn, ctxSetter) => {
      log.push("s2");
      if (!assertEq(() => typeof ctxSetter.addInitializer, "function"))
        return;
      ctxSetter.addInitializer(() => log.push("s5"));
      ctxSetter.addInitializer(() => log.push("s6"));
    };
    const setterDec2 = (fn, ctxSetter) => {
      log.push("s1");
      if (!assertEq(() => typeof ctxSetter.addInitializer, "function"))
        return;
      ctxSetter.addInitializer(() => log.push("s3"));
      ctxSetter.addInitializer(() => log.push("s4"));
    };
    const staticSetterDec1 = (fn, ctxStaticSetter) => {
      log.push("S2");
      if (!assertEq(() => typeof ctxStaticSetter.addInitializer, "function"))
        return;
      ctxStaticSetter.addInitializer(() => log.push("S5"));
      ctxStaticSetter.addInitializer(() => log.push("S6"));
    };
    const staticSetterDec2 = (fn, ctxStaticSetter) => {
      log.push("S1");
      if (!assertEq(() => typeof ctxStaticSetter.addInitializer, "function"))
        return;
      ctxStaticSetter.addInitializer(() => log.push("S3"));
      ctxStaticSetter.addInitializer(() => log.push("S4"));
    };
    const accessorDec1 = (target, ctxAccessor) => {
      log.push("a2");
      if (!assertEq(() => typeof ctxAccessor.addInitializer, "function"))
        return;
      ctxAccessor.addInitializer(() => log.push("a5"));
      ctxAccessor.addInitializer(() => log.push("a6"));
      return { init() {
        log.push("a7");
      } };
    };
    const accessorDec2 = (target, ctxAccessor) => {
      log.push("a1");
      if (!assertEq(() => typeof ctxAccessor.addInitializer, "function"))
        return;
      ctxAccessor.addInitializer(() => log.push("a3"));
      ctxAccessor.addInitializer(() => log.push("a4"));
      return { init() {
        log.push("a8");
      } };
    };
    const staticAccessorDec1 = (target, ctxStaticAccessor) => {
      log.push("A2");
      if (!assertEq(() => typeof ctxStaticAccessor.addInitializer, "function"))
        return;
      ctxStaticAccessor.addInitializer(() => log.push("A5"));
      ctxStaticAccessor.addInitializer(() => log.push("A6"));
      return { init() {
        log.push("A7");
      } };
    };
    const staticAccessorDec2 = (target, ctxStaticAccessor) => {
      log.push("A1");
      if (!assertEq(() => typeof ctxStaticAccessor.addInitializer, "function"))
        return;
      ctxStaticAccessor.addInitializer(() => log.push("A3"));
      ctxStaticAccessor.addInitializer(() => log.push("A4"));
      return { init() {
        log.push("A8");
      } };
    };
    log.push("start");
    @classDec1 @classDec2 class Foo extends (log.push("extends"), Object) {
      static {
        log.push("static:start");
      }
      constructor() {
        log.push("ctor:start");
        super();
        log.push("ctor:end");
      }
      @methodDec1 @methodDec2 method() {
      }
      @staticMethodDec1 @staticMethodDec2 static method() {
      }
      @fieldDec1 @fieldDec2 field;
      @staticFieldDec1 @staticFieldDec2 static field;
      @getterDec1 @getterDec2 get getter() {
        return;
      }
      @staticGetterDec1 @staticGetterDec2 static get getter() {
        return;
      }
      @setterDec1 @setterDec2 set setter(x) {
      }
      @staticSetterDec1 @staticSetterDec2 static set getter(x) {
      }
      @accessorDec1 @accessorDec2 accessor accessor;
      @staticAccessorDec1 @staticAccessorDec2 static accessor accessor;
      static {
        log.push("static:end");
      }
    }
    log.push("after");
    new Foo();
    log.push("end");
    assertEq(() => log + "", "start,extends,M1,M2,G1,G2,S1,S2,A1,A2,m1,m2,g1,g2,s1,s2,a1,a2,F1,F2,f1,f2,c1,c2,M3,M4,M5,M6,G3,G4,G5,G6,S3,S4,S5,S6,A3,A4,A5,A6,F3,F4,F5,F6,static:start,F7,F8,A7,A8,static:end,c3,c4,c5,c6,after,ctor:start,m3,m4,m5,m6,g3,g4,g5,g6,s3,s4,s5,s6,a3,a4,a5,a6,f3,f4,f5,f6,f7,f8,a7,a8,ctor:end,end");
  }
};
function prettyPrint(x) {
  if (x && x.prototype && x.prototype.constructor === x)
    return "class";
  if (typeof x === "string")
    return JSON.stringify(x);
  return x;
}
function assertEq(callback, expected) {
  let details;
  try {
    let x = callback();
    if (x === expected)
      return true;
    details = `  Expected: ${prettyPrint(expected)}
  Observed: ${prettyPrint(x)}`;
  } catch (error) {
    details = `  Throws: ${error}`;
  }
  const code = callback.toString().replace(/^\(\) => /, "").replace(/\s+/g, " ");
  console.log(`\u274C ${testName}
  Code: ${code}
${details}
`);
  failures++;
  return false;
}
let testName;
let failures = 0;
async function run() {
  for (const [name, test] of Object.entries(tests)) {
    testName = name;
    try {
      await test();
    } catch (err) {
      console.log(`\u274C ${name}
  Throws: ${err}
`);
      failures++;
    }
  }
  if (failures > 0) {
    console.log(`\u274C ${failures} checks failed`);
  } else {
    console.log(`\u2705 all checks passed`);
  }
}
const promise = run();
