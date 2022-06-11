const isFunction = variable => typeof variable === 'function';
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED'

class MyPromise {
  constructor(callback) {
    // console.log("创建了一个promise");
    //参数验证
    if (!isFunction(callback)) {
      throw new Error('Promise must accept a function as a paramter');
    }
    //添加状态
    this._status = PENDING;
    this._value = undefined;
    //初始化成功与失败回调的队列
    this._fulfilledQueues = [];
    this._rejectedQueues = [];
    //执行handle
    try {
      callback(this._resolve.bind(this), this._reject.bind(this));
    } catch (err) {
      this._reject(err);
    }
  }
  //resolve时执行的函数
  _resolve(val) {
    const run = () => {
      if (this._status !== PENDING) return;
      this._status = FULFILLED;
      // 依次执行成功队列中的函数，并清空队列
      const runFulfilled = (value) => {
        let callback;
        while (callback = this._fulfilledQueues.shift()) {
          callback(value);
        }
      }
      // 依次执行失败队列中的函数，并清空队列
      const runRejected = (error) => {
        let callback;
        while (callback = this._rejectedQueues.shift()) {
          callback(error);
        }
      }
      /* 如果resolve的参数为Promise对象，则必须等待该Promise对象状态改变后,
      当前Promsie的状态才会改变，且状态取决于参数Promsie对象的状态
      */
      if (val instanceof MyPromise) {
        val.then(value => {
          this._value = value;
          runFulfilled(value);
        }, error => {
          this._value = error;
          runRejected(error);
        })
      } else {
        this._value = val;
        runFulfilled(val)
      }
    }
    // 为了支持同步的Promise，这里采用异步调用
    setTimeout(() => run(), 0);
    // run();
  }
  //reject时执行的函数
  _reject(err) {
    if (this._status !== PENDING) return;
    // 依次执行失败队列中的函数，并清空队列
    const run = () => {
      this._status = REJECTED;
      this._value = err;
      let callback;
      while (callback = this._rejectedQueues.shift()) {
        callback(err);
      }
    }
    // 为了支持同步的Promise，这里采用异步调用
    setTimeout(() => run(), 0);
  }
  //then方法
  then(onFulfilled, onRejected) {
    const { _value, _status } = this;
    // var a = this;
    return new MyPromise((onFulfilledNext, onRejectedNext) => {
      //成功时执行
      let fulfilled = value => {
        try {
          if (!isFunction(onFulfilled)) {
            onFulfilledNext(value);
          } else {
            let res = onFulfilled(value);
            // console.log(value + ' ' + res);
            if (res instanceof MyPromise) {
              // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
              res.then(onFulfilledNext, onRejectedNext);

              // res.then(v => {
              // 	onFulfilledNext(v);
              // }, r => {
              // 	onRejectedNext(r);
              // });

            } else {
              //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
              onFulfilledNext(res);
            }
          }
        } catch (err) {
          // 如果函数执行出错，新的Promise对象的状态为失败
          onRejectedNext(err);
        }
      }
      //失败时执行
      let rejected = error => {
        try {
          if (!isFunction(onRejected)) {
            onRejectedNext(error);
          } else {
            let res = onRejected(error);
            if (res instanceof MyPromise) {
              // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
              res.then(onFulfilledNext, onRejectedNext);
            } else {
              //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
              onRejectedNext(res);
            }
          }
        } catch (err) {
          // 如果函数执行出错，新的Promise对象的状态为失败
          onRejectedNext(err);
        }
      }

      switch (_status) {
        // 当状态为pending时，将then方法回调函数加入执行队列等待执行
        case PENDING:
          // console.log(a === this);
          this._fulfilledQueues.push(fulfilled);
          this._rejectedQueues.push(rejected);
          break;
        // 当状态已经改变时，立即执行对应的回调函数
        case FULFILLED:
          fulfilled(_value);
          break;
        case REJECTED:
          rejected(_value);
          break;
      }
    });
  }
  //catch方法
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }
  //静态resolve方法
  static resolve(value) {
    // 如果参数是MyPromise实例，直接返回这个实例
    if (value instanceof MyPromise) {
      return value;
    }
    return new MyPromise(resolve => resolve(value));
  }
  //静态reject方法
  static reject(error) {
    return new MyPromise((resolve, reject) => reject(error));
  }
  //静态all方法
  static all(list) {
    return new MyPromise((reslove, reject) => {
      /**
       * 返回list中所有promise返回值的集合
       */
      let values = [];
      let count = 0;
      for (let [i, p] of list.entries()) {
        // 数组参数如果不是MyPromise实例，先调用MyPromise.resolve
        this.resolve(p).then(res => {
          values[i] = res;
          count++;
          if (count === list.lenght) {
            resolve(values);
          }
        }, err => {
          // 有一个被rejected时返回的MyPromise状态就变成rejected
          reject(err);
        })
      }
    })
  }
  //静态race方法
  static race(list) {
    return new MyPromise((resolve, reject) => {
      for (let p of list) {
        // 只要有一个实例率先改变状态，新的MyPromise的状态就跟着改变
        this.resolve(p).then(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
      }
    })
  }
  //finally方法
  finally(callback) {
    return this.then(
      value => MyPromise.resolve(callback()).then(() => value),
      reason => MyPromise.resolve(callback()).then(() => { throw reason })
    );
  }
}

// new MyPromise(resolve => {
// 	resolve(1);
// }).finally(value => {
// 	console.log(value);
// }).then(value => {
// 	console.log(value);
// });

// let p = MyPromise.resolve(1)

// setTimeout(() => {
// 	p.then(value => {
// 		console.log(value);
// 	})
// })