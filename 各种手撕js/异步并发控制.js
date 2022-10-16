/**
 * 题目: JS实现一个带并发限制的异步调度器Scheduler，保证同时运行的任务最多有两个。完善代码中Scheduler类，使得以下程序能正确输出
 * 条件: 只能修改Sheduler
 **/
/* class Scheduler {
  constructor() {
    this.cache = [] // 缓存任务数据
    this.task = [] // 当前执行任务队列
    this._max = 2 // 最大并发任务
  }
  add(promiseCreator) {
    return new Promise(resolve => {
      promiseCreator.resolve = resolve; // 保存当前promise的状态
      if (this.task.length < this._max) { // 最大并发任务处理
        this.runWork(promiseCreator)
      } else {
        this.cache.push(promiseCreator)
      }
    })
  }
  runWork(promiseCreator) {
    this.task.push(promiseCreator)
    promiseCreator().then(() => {
      promiseCreator.resolve()
      this.task.splice(this.task.indexOf(promiseCreator), 1) // 当前任务执行完成 清除task中的数据
      if (this.cache.length) {
        this.runWork(this.cache.shift()) // 根据执行的缓存顺序执行，保证执行的有序性
      }
    })
  }
}
const timeout = (time) => new Promise(resolve => {
  setTimeout(resolve, time)
})
const scheduler = new Scheduler()
const addTask = (time, order) => {
  const result = scheduler.add(() => timeout(time))
  result.then(() => console.log(order + 'order'))
}

addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')// output: 2 3 1 4 */
// 一开始，1、2两个任务进入队列
// 500ms时，2完成，输出2，任务3进队
// 800ms时，3完成，输出3，任务4进队
// 1000ms时，1完成，输出1
// 1200ms时，4完成，输出4


/* class Scheduler {
  constructor() {
    this.task = []
    this.cache = []
    this.max = 2
  }


  addTask(promiser) {
    return new Promise(resolve => {
      promiser.resolve = resolve
      if (this.task.length < this.max) {
        this.runTask(promiser)
      } else {
        this.cache.push(promiser)
      }
    })
  }


  runTask(promiser) {
    this.task.push(promiser)
    promiser().then(value => {
      promiser.resolve(value)
      this.task.splice(this.task.indexOf(promiser), 1)
      if (this.cache.length) this.runTask(this.cache.shift())
    })
  }
}

const p = new Scheduler()
function add(time, num) {
  p.addTask(
    () => new Promise(resolve => setTimeout(resolve, time, num))
  ).then(value => console.log(value))
}

add(1000, 1)
add(1000, 2)
add(1000, 3)
add(15000, 4)
add(3000, 5)
add(1000, 6) */



class Scheduler {
  constructor(max) {
    this.task = []
    this.catch = []
    this.max = max
  }

  addTask(fn) {
    return new Promise(resolve => {
      fn.resolve = resolve
      if (this.task.length < this.max) {
        this.runTask(fn)
      } else {
        this.catch.push(fn)
      }
    })
  }

  runTask(fn) {
    this.task.push(fn)
    fn().then(value => {
      fn.resolve(value)
      this.removeTask(fn)
      if (this.catch.length) {
        this.runTask(this.catch.shift())
      }
    })
  }

  removeTask(fn) {
    this.task = this.task.filter(item => item != fn)
  }
}

let tasks = new Scheduler(3)
function add(num, time) {
  tasks.addTask(
    () => new Promise(resolve => {
      setTimeout(resolve, time, num)
    })
  ).then(console.log)
}

add(1, 1000)
add(2, 10000)
add(3, 1000)
add(4, 1000)
add(3, 1000)
add(4, 1000)
add(3, 1000)
add(4, 1000)
