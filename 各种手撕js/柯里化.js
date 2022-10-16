function sum() {
  let list = [...arguments]
  return function fn(...arg) {
    if (arg.length) {
      list.push(...arg)
      return fn
    }

    return list.reduce((pre, num) => pre + num, 0)
  }
}


console.log(sum(0)(1, 2)(8)());

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