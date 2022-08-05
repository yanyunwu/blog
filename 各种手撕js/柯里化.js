function add(a, b) {
  return function (c) {
    return a + b + c
  }
}

console.log(add(2, 3)(4));

Promise.myall = function (list) {
  let count = 0
  let res = []
  return new Promise((resolve, reject) => {
    for (let item of list) {
      Promise.resolve(item).then(value => {
        count++
        res.push(value)
        if (count === list.length) {
          resolve(res)
        }
      }).catch(err => {
        reject(err)
      })
    }
  })
}

Promise.myall(
  [
    1,
    new Promise(resolve => setTimeout(resolve, 3000, 3)),
    new Promise((resolve, reject) => setTimeout(reject, 3000, 6))
  ])
  .then(value => {
    console.log(value);
  }).catch(err => {
    console.log(err);
  })