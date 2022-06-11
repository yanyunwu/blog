/*
let result = Number.MAX_VALUE + Number.MAX_VALUE;
console.log(isFinite(result)); // false
*/

// console.log(0o1 === 1);

// console.log('\u03a3');
let date = new Date();

// console.log(date.__proto__.constructor === Date);

// console.log(Object.prototype.toString.toString());

function aa() {
  return 'a'
}

function* test() {

  let n = yield aa();
  console.log(n);
  yield n;
  // console.log(n);
}

let i = test();
console.log(i.next(2));
// console.log(i.next(5));
// console.log(i.next(5));
// console.log(i.next());


// function testMb(strings, ...list) {
//   console.log(strings);
//   console.log(list);
// }
// let a = 1;
// console.log(testMb`1${a}`);