

/**
 * 手写flat
*/
function flat(arr, layer = 1) {
  if (layer <= 0) return arr

  return arr.reduce((pre, cur) => {
    Array.isArray(cur) ? pre.push(...flat(cur, layer - 1)) : pre.push(cur)
    return pre
  }, [])
}

// console.log(flat([1, 2, 3, [4, 5, [6]]], 2))

function simulateInterval(fn, time) {
  let timer = null

  let inner = () => {
    timer = setTimeout(() => {
      fn()
      inner()
    }, time)
  }

  inner()

  return () => clearTimeout(timer)
}

/**
 * 模拟实现new
*/
function _New(Fun, ...args) {
  if (typeof Fun !== 'function') {
    throw '需要传入一个构造函数'
  }

  let obj = Object.create(Fun.prototype)

  /**
   * let TempFun = function() {}
   * TempFun.prototype = Fun.prototype
   * TempFun.prototype.constructor = Fun
   * let obj = new TempFun
  */

  let result = Fun.call(obj, ...args)

  if (typeof result === 'object') {
    return result
  } else {
    return obj
  }
}

/**
 * 深拷贝
*/
function deepClone(obj, cache = new Map()) {
  const isObject = (value) => typeof value === 'object'

  if (!isObject(obj)) return obj

  let cacheTarget = cache.get(obj)

  if (cacheTarget) return cacheTarget

  let newObj = Array.isArray(obj) ? [] : {}

  for (let i in obj) {
    newObj[i] = isObject(obj[i]) ? deepClone(obj[i], cache) : obj[i]
  }

  cache.set(obj, newObj)

  return newObj
}


// 金额转千分位
const formatPrice = (number) => {
  number = '' + number

  const [integer, decimal = ''] = number.split('.')

  return integer.replace(/\B(?=(\d{3})+$)/g, ',') + (decimal ? '.' + decimal : '')
}


function create(protoObj, props) {
  if (!['function', 'object'].includes(typeof protoObj)) {
    throw "需要一个对象参数"
  }

  let TempFun = function () { }
  TempFun.prototype = protoObj

  let obj = new TempFun()

  if (props) {
    Object.defineProperties(obj, props)
  }

  return obj
}


function jsonStringify(obj) {

}

const getType = (s) => {
  const r = Object.prototype.toString.call(s)

  return r.replace(/\[object (.*?)\]/, '$1').toLowerCase()
}

// console.log(getType())
// console.log(getType(null))
// console.log(getType(1))
// console.log(getType('前端胖头鱼'))
// console.log(getType(true))
// console.log(getType(Symbol('前端胖头鱼')))
// console.log(getType({}))
// console.log(getType([]))

function debounce(fn, delay) {
  let timer = null
  return function (...args) {
    clearTimeout(timer)

    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

function throttle(fn, delay) {
  let timer = null
  return function (...args) {
    if (timer) return

    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }
}

function throttle2(fn, delay) {
  let start = Date.now()
  return function (...args) {
    let last = Date.now()
    if (last - start > delay) {
      fn.apply(this, args)
      start = Date.now()
    }
  }
}



// const curry = (func, ...args) => {
//   const fnLen = func.length

//   return function (...innerArgs) {
//     innerArgs = args.concat(innerArgs)

//     if (innerArgs.length < fnLen) {
//       return curry(func, ...innerArgs)
//     } else {
//       func.apply(this, innerArgs)
//     }
//   }
// }

// const curry2 = (fn, arr = []) => (...args) => (
//   arg => arg.length === fn.length
//     ? fn(...arg)
//     : curry(fn, arg)
// )([...arr, ...args])



const add = curry((num1, num2, num3) => {
  console.log(num1, num2, num3, num1 + num2 + num3)
})

// add(1)(2)(3)
// add(1, 2)(3)
// add(1, 2, 3)
// add(1)(2, 3)

function curry(fn, ...args) {
  let fnLen = fn.length

  return function (...innerArgs) {
    innerArgs = args.concat(innerArgs)

    if (innerArgs.length < fnLen) {
      return curry(fn, ...innerArgs)
    } else {
      return fn.apply(this, innerArgs)
    }

  }
}


function arrayToTree(arr) {
  let map = new Map()
  let result = []

  arr.forEach(item => {
    const { id, pid } = item

    let node = map.get(id)
    if (!node) map.set(id, node = { children: [] })

    map.set(id, node = { ...item, ...node })

    if (pid === 0) {
      result.push(node)
    } else {
      let pNode = map.get(pid)
      if (!pNode) map.set(pid, pNode = { children: [] })
      pNode.children.push(node)
    }
  })

  return result
}

// let arr = [
//   { id: 1, name: '部门1', pid: 0 },
//   { id: 2, name: '部门2', pid: 1 },
//   { id: 3, name: '部门3', pid: 1 },
//   { id: 4, name: '部门4', pid: 3 },
//   { id: 5, name: '部门5', pid: 4 },
// ]

// console.log(arrayToTree(arr))


function treeToList(tree) {
  let list = []
  let queen = [...tree]

  while (queen.length) {
    let node = queen.shift()
    queen.push(...node.children)
    delete node.children
    list.push(node)
  }

  return list
}

// console.log(treeToList(arrayToTree(arr)))


function sum(...args) {
  let numList = [...args]
  let add = (...args) => {
    numList.push(...args)
    return add
  }
  add.valueOf = () => numList.reduce((pre, cur) => pre + cur, 0);
  return add
}

// console.log(sum(1, 2, 3).valueOf())
// console.log(sum(2, 3)(2).valueOf())
// console.log(sum(1)(2)(3)(4).valueOf())
// console.log(sum(2)(4, 1)(2).valueOf())

// 封装一个带有时间限制的localstorage
class storage {
  constructor() {
    this.prefix = 'store'
    this.timeSign = '|storeTime|'
  }

  setItem(key, value, time) {
    key = this.prefix + key
    time = time ? Date.now() + time : 0;
    localStorage.setItem(key, `${time}${this.timeSign}${JSON.stringify(value)}`)
  }

  getItem(key) {
    key = this.prefix + key
    let rawValue = localStorage.getItem(key)
    if (!rawValue) return rawValue

    let index = rawValue.indexOf(this.timeSign)
    let time = +rawValue.slice(0, index);
    let value = rawValue.slice(index + this.timeSign.length)

    if (!time) return JSON.parse(value)

    if (time > Date.now()) {
      return JSON.parse(value)
    } else {
      localStorage.removeItem(key)
      return null
    }
  }
}

Array.prototype.map2 = function (callback, ctx = null) {
  if (typeof callback !== 'function') {
    throw ('callback must be a function')
  }

  return this.reduce((pre, cur, index, array) => {
    return pre.concat(callback.call(ctx, cur, index, array))
  }, [])
}

let arr = [1, 2]
let arr2 = arr.map2(function (it, i, array) {
  // console.log(it, i, array, this)
  return it * 2
}, { name: 'fatfish' })

// console.log(arr2)



let count = 1;
let promiseFunction = () =>
  new Promise(rs =>
    setTimeout(() => {
      rs(count++);
    })
  );
let firstFn = onePromise(promiseFunction)
// firstFn().then(console.log); // 1
// firstFn().then(console.log); // 1
// firstFn().then(console.log); // 1


function onePromise(fn) {
  let p = null;
  return function (...args) {
    return p ? p : (p = fn.call(this, ...args).finally(() => p = null))
  }
}

console.log(4 >> 1);

