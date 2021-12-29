// 手写new
function New(Fun, ...args) {
    let obj = {};
    obj.__proto__ = Fun.prototype;
    // Object.setPrototypeOf(obj, Fun.prototype); // ES6写法 推荐
    let res = Fun.call(obj, ...args);
    return typeof res === 'object' ? res : obj;
}

function Fun(num) {
    this.a = num;
}

Fun.prototype.say = function () {
    console.log(this.a);
}

const v = New(Fun, 111);
v.say();