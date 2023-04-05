function Promise(executor) {
  this.PromiseStatus = "pending";
  this.PromiseResult = null;
  this.callbacks = [];
  const _self = this;
  function resolve(PromiseResult) {
    // 判断结果是否是pending状态，如果是就执行以下代码
    if(_self.PromiseStatus !== "pending") return;
    _self.PromiseStatus = "fulfilled";
    _self.PromiseResult = PromiseResult;
    // 当异步操作时主动调then方法内的回调函数,避免异步操作时无法执行
    //then函数内部参数的回调函数
    if(_self.callbacks && _self.callbacks.length) {
      _self.callbacks.forEach(item => {
        item.result(PromiseResult);
      });
    }
  }
  function reject(PromiseResult) {
    // 判断结果是否是pending状态，如果是就执行以下代码
    if(_self.PromiseStatus !== "pending") return;
    _self.PromiseStatus = "rejected";
    _self.PromiseResult = PromiseResult;
    // 当异步操作时主动调then方法内的回调函数,避免异步操作时无法执行
    //then函数内部参数的回调函数
    if(_self.callbacks && _self.callbacks.length) {
      _self.callbacks.forEach(item => {
        item.error(PromiseResult);
      });
    }
  }
  // 抛出异常触发reject
  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

Promise.prototype.then = function (result, error) {
  if(typeof result !== "function") {
    result = (result) => result;
  }
  if(typeof error !== "function") {
    error = (error) => { throw error };
  }
  const _self = this;
  return new Promise((resolve, reject) => {
    function callback(type) {
      try {
        const res = type(_self.PromiseResult);
        if(res instanceof Promise) {
          res.then(v => resolve(v), e => reject(e));
        } else {
          return resolve(res);
        }
      } catch (error) {
        reject(error);
      }
    }
    if(this.PromiseStatus === "fulfilled") {
      callback(result);
    }
    if(this.PromiseStatus === "rejected") {
      callback(error);
    }
    if(this.PromiseStatus === "pending") {
      this.callbacks.push({
        result: () => {
          callback(result);
        },
        error: () => {
          callback(error);
        }
      });
    }
  });
}

// 实现catch方法
Promise.prototype.catch = function (error) {
  return this.then(undefined, error);
}

// 实现Promise.resolve()方法
Promise.resolve = function (value) {
  return new Promise((resolve, reject) => {
    if(value instanceof Promise) {
      value.then(v => resolve(v), e => reject(e));
    } else {
      resolve(value);
    }
  })
}

// 实现Promise.reject()方法
Promise.reject = function (value) {
  return new Promise((resolve, reject) => {
    reject(value);
  })
}

// 实现Promise.all()方法
// 全部成功或有一个失败就会执行成功或失败的回调
Promise.all = function (value) {
  return new Promise((resolve, reject) => {
    let count = 0;
    let arr = [];
    for(let i=0; i < value.length; i++) {
      value[i].then(v => {
        count++;
        arr[i] = v;
        if(count === value.length) {
          resolve(arr);
        }
      }, e => {
        reject(e);
      })
    }
  })
}
// 实现Promise.race()方法
// 谁先谁决定结果
Promise.race = function (value) {
  return new Promise((resolve, reject) => {
    for(let i=0; i < value.length; i++) {
      value[i].then(v => {
          resolve(v);
      }, e => {
        reject(e);
      })
    }
  })
}