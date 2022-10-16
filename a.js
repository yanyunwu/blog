

class Queen {
  constructor() {
    this.queenList = []
  }

  task(timeout, fn) {
    this.queenList.push({ timeout, fn })
    return this
  }

  start() {
    let p = Promise.resolve()
    let curTask = null
    while (curTask = this.queenList.shift()) {
      let task = curTask
      p = p.then(() => {
        return new Promise(resolve => {
          setTimeout(() => {
            task.fn()
            resolve()
          }, task.timeout)
        })
      })
    }
  }
}

new Queen().task(3000, () => {
  console.log(1);
}).task(1000, () => {
  console.log(2);
}).start()