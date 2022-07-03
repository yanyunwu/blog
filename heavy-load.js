class FuncOverload {
  constructor(args, targetThis) {
    this.args = Array.from(args)
    this.taskQueen = []
    this.targetFun = null
    this.targetThis = targetThis
  }

  fun(argsType) {
    let args = this.args;
    let funargs = Object.keys(argsType);
    if (funargs.length !== args.length) return this
    for (let i = 0; i < funargs.length; i++) {
      if (!(typeof args[i] === argsType[funargs[i]])) return this
    }

    this.taskQueen.push({
      type: 'fun',
      status: true
    })

    return this
  }

  run(fun) {
    if (!this.taskQueen.length) return this
    let task = this.taskQueen.shift()
    if (task.type === 'fun' && task.status) this.targetFun = fun
    return this
  }

  result() {
    if (this.targetFun) {
      return this.targetFun.call(this.targetThis, ...this.args)
    } else {
      return undefined
    }
  }

  static create(args, targetThis) {
    return new FuncOverload(args, targetThis)
  }

}


function fun(a, b) {
  return FuncOverload.create(arguments, this)
    .fun({ a: 'string', b: 'number' }).run(
      function (a, b) {
        return parseInt(a) + b
      }
    )
    .fun({ a: 'number', b: 'number' }).run(
      function (a, b) {
        return a + b
      }
    )
    .fun({ b: 'number' }).run(
      function (b) {
        return this.a + b
      }
    )
    .result()
}

console.log(fun('1', 2));
console.log(fun(1, 2));