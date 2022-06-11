
/**
 * 生成器函数带星号
 * yield只能在生成器函数中使用
 * 生成器返回一个迭代器
 * 每调用一次next往下走一个yield
*/

function* generator() {
  let n = yield 1;
  yield n;
  yield 3
  yield 4
  return 5
}

// 生成器返回一个迭代器
let iterator = generator();
console.log(iterator.next()); // { value: 1, done: false }
// 如果yield后面有变量则需要传参 且这个参数需要是上一个yield的结果
console.log(iterator.next(2)); // { value: 5, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: 4, done: false }
console.log(iterator.next()); // { value: 5, done: true }


/**
 * 生成器实现异步
*/
let iterator2;

function fun1() {
  setTimeout(() => {
    console.log("fun1");
    iterator2.next()
  }, 2000)
}

function fun2() {
  setTimeout(() => {
    console.log("fun2");
  }, 2000)
}

function* generator2() {
  yield fun1()
  yield fun2()
}

iterator2 = generator2();
iterator2.next()

