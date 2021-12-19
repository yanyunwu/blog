// 数据属性
let obj = {};
// 显示调用该方法，内部属性默认值都为false
Object.defineProperty(obj, 'name', {
    configurable: true,
    enumerable: true,
    writable: true,
    value: '小明'
});

// 访问器属性
obj._age = undefined;
Object.defineProperty(obj, "age", {
    configurable: true,
    enumerable: true,
    get() {
        return this._age;
    },
    set(value) {
        this._age = value;
    }
})
// obj.age = 1;
// console.log(obj);

// for (let i in obj) {
//     console.log(i);
// }

var aaa = Object.getOwnPropertyDescriptor(obj, "_age");
console.log(aaa);