Array.prototype.myFlat = function (deep = 1) {
  if (deep <= 0) return this.slice()
  return this.reduce((pre, cur) => {
    if (deep > 1 && cur instanceof Array) {
      return pre.concat(cur.myFlat(deep - 1))
    } else {
      return pre.concat(cur)
    }
  }, [])
}

function flat(arr, deep = 1) {
  let res = []
  let innerFlat = (arr, deep) => {
    arr.forEach(element => {
      if (deep > 0 && Array.isArray(element)) innerFlat(element, deep - 1)
      else res.push(element)
    });
  }

  innerFlat(arr, deep)
  return res
}

let arr = [1, [2, [3]], 4]
console.log(flat(arr, 3));


let arr2 = [2, 1]
arr2.sort((a, b) => a - b)

console.log(arr2);