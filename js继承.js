


Promise.myAll = function (list) {
  let count = 0
  let res = []
  return new Promise((resolve, reject) => {
    list.forEach((item, index) => {
      Promise.resolve(item).then(value => {
        res[index] = value
        count++
        if (count === list.length) {
          resolve(res)
        }
      }).catch(err => {
        reject(err)
      })
    })
  })
}
let p = new Promise(resolve => {
  setTimeout(resolve, 3000, 1)
})
Promise.myAll([p, 2, Promise.reject(3)]).then(value => {
  console.log(value);
}).catch(err => console.log(err))