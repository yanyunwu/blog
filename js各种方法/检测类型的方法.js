
/**
 * 1.typeof
 * 2.instanceof
 * 3.Object.prototype.toString.call
 * 4.实例.__proto__.constructor
*/

/**
 * typeof
 * null也会被检测为object
 * function检测为function
*/
console.log(typeof 1); // number
console.log(typeof "1"); // string
console.log(typeof true); // boolean
console.log(typeof (() => { })); // function
console.log(typeof {}); // object
console.log(typeof null); // object
console.log(typeof undefined); // undefined
console.log(typeof 1n); // bigint
console.log(typeof Symbol()); // symbol

/**
 * instanceof
 * 根据原型链进行查找
 * 只要符合原型链任意一个构造函数则返回true
 * 不能准确查找是否属于某个构造函数
 * 
*/

let date = new Date();
console.log(date instanceof Date); // true
console.log(date instanceof Object); // true


/**
 * Object.prototype.toString.call
 * 比较完美的检测方法
*/

console.log(Object.prototype.toString.call(date)); // [object Date]
console.log(Object.prototype.toString.call(Date)); // [object Function]
console.log(Object.prototype.toString.call(null)); // [object Null]
console.log(Object.prototype.toString.call(undefined)); // [object Undefined]

console.log(Object.prototype.toString.call(1)); // [object Number]
console.log(Object.prototype.toString.call('1')); // [object String]
console.log(Object.prototype.toString.call(Symbol())); // [object Symbol]

/**
 * 实例.__proto__.constructor
 * 主要用于解决instanceof不能精确检测是否属于某个构造函数
*/

console.log(date.__proto__.constructor === Date); // true
console.log(date.__proto__.constructor === Object); // false

console.log(Object.getPrototypeOf(date).constructor === Date); // true