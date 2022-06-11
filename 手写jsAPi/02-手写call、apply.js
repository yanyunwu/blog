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


// 第二版
Function.prototype.call2 = function (context) {
    context.fn = this;
    var args = [];
    for (var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }
    eval('context.fn(' + args + ')');
    console.log('context.fn(' + args + ')');
    delete context.fn;
}

// 测试一下
var foo = {
    value: 1
};

function bar(name, age) {
    console.log(name)
    console.log(age)
    console.log(this.value);
}

bar.call2(foo, 'kevin', 18);
// kevin
// 18
// 1