// js控制台输入输出
/* const { stdout, stdin } = require('process')

function input(str, callback) {
    stdout.write(str);
    stdin.on('data', (data) => {
        let value = data.toString().slice(0, -2);
        stdin.pause();
        callback(value)
    });
}

input('请输入', (value) => {
    console.log(value);
});

console.log(123);
console.log(234); */


// 如何让 a==1&&a==2成立
/* let a = {
    num: 1,
    valueOf: function () {
        return this.num++;
    }
}

console.log(!!(a == 1 && a == 2)); */


// es6类的继承
/* class FunA {
    constructor(name) {
        this.name = name;
    }
}

class FunB extends FunA {
    constructor(name, age) {
        super(name);
        this.age = age;
    }
}

const fun = new FunB('小明', 16);
console.log(fun.name, fun.age); */


