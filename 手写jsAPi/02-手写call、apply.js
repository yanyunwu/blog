// 手写call
Function.prototype.callV2 = function (context, ...args) {
    context = context || window || globalThis;
    context.fun = this;
    let res = context.fun(...args);
    delete context.fun;
    return res;
}

// 手写apply
Function.prototype.applyV2 = function (context, argArr = []) {
    context = context || window || globalThis;
    context.fun = this;
    let res = context.fun(...argArr);
    delete context.fun;
    return res;
}
