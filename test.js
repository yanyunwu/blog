/*
let obj = Object.create({ a: 1 })
obj.b = 2
obj[Symbol('aaa')] = 5
Object.defineProperty(obj, 'c', {
  enumerable: false,
  value: 3,
})

for (let i in obj) {
  console.log(i);
}

console.log(Object.getOwnPropertyNames(obj));
console.log(obj[Reflect.ownKeys(obj)[2]]);
function Fun() {

}
class Child extends Fun {

}

console.log(Child instanceof Function);
console.log(Fun.__proto__ === Function.prototype); */

// var a = { n: 1 };
// var b = a;
// a.x = a = { n: 2 };
// console.log(a.x)
// console.log(b.x)

// let arr = new Proxy([1, 2], {
//   get(t, p, r) {
//     console.log(1);
//     return t[p]
//   }
// })

// console.log(arr[1]);


let arr = new Proxy({
  name1: 'aaa'
}, {
  get(t, p, r) {
    console.log(1);
    return t[p]
  }
})

let { name1 } = arr
name1 = 2
// console.log(arr['name']);