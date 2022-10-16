

Function.prototype.bindV2 = function (obj, ...args) {
    const fn = this;

    const bound = function (...argsNext) {

        if (this instanceof bound) {
            let self = Object.create(fn.prototype)
            let result = fn.apply(self, args.concat(argsNext))

            if (typeof result === 'object') {
                return result
            } else {
                return self
            }
        } else {
            return fn.apply(obj, args.concat(argsNext))
        }

    }

    return bound;
}



const obj = { name: '小明' };
function fun() {
    // console.log(this);
    this.name = "哈哈"
}

fun.prototype.say = function () {
    console.log(11);
}

let bound = fun.bindV2(obj);
let v = new bound();


console.log(v.__proto__ === fun.prototype);
console.log(v);

// ES6版

// Function.prototype.mybind = function (context, ...args) {
//     if (typeof this !== 'function') throw new TypeError(this, 'is not a function');
//     let _this = this;
//     return function fun(...a) {
//         return this instanceof fun ? new _this(...args, ...a) : _this.apply(context || window, [...args, ...a]);
//     }
// }


// function fun2() {

// }
// const bound2 = fun2.mybind(obj);

// const v2 = new bound2();

// console.log(v2.__proto__ === fun2.prototype);

