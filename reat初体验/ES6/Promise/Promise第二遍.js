function Promise(executor) {
  // 初始化实例对象状态(PromiseStatus)
  this.PromiseStatus = "pending";
  // 初始化实例对象结果(PromiseResult)
  this.PromiseResult = null;
  // 异步执行回调onResolved/onRejected函数存储到数组callbacks中
  this.callbacks = [];
  // 保存this指向_self;
  const _self = this;
  // 定义resolve函数
  function  resolve(data) {
    // 只执行一次状态修改(要么执行resolve要么执行reject或者执行throw异常)
    if(_self.PromiseStatus !== "pending") return;
    // 改变实例对象状态:
    _self.PromiseStatus = "fulfilled";
    // 改变实例对象结果(当resolve被调用时传的值就是data)
    _self.PromiseResult = data;
    // 异步时需要在成功调用resolve后来处理then函数内部的回调
    _self.callbacks.forEach(item => {
      if(item.onResolved) {
        item.onResolved(data);
      }
    });
  }
  // 定义reject函数
  function reject(error) {
    // 只执行一次状态修改(要么执行resolve要么执行reject或者执行throw异常)
    if(_self.PromiseStatus !== "pending") return;
    // 改变实例对象状态:
    _self.PromiseStatus = "rejected";
    // 改变实例对象结果(当rejected被调用时传的值就是error)
    _self.PromiseResult = error;
    // 异步时需要在成功调用reject后来处理then函数内部的回调
    _self.callbacks.forEach(item => {
      if(item.onRejected) {
        item.onRejected(error);
      }
    });
  }
  // 同步执行(执行器函数)
  /**
   * param1: resolve改变状态为resolved/fulfilled
   * param2: reject改变状态为rejected
   */
  // 解决抛出异常调用reject();
  try {
    executor(resolve, reject); 
  } catch (error) {
    reject(error);
  }
}

// 通过prototype给Promise添加原型对象then方法
Promise.prototype.then = function (onResolved, onRejected) {
  // 由于我们不知道状态怎么改,所以要判断
  if(this.PromiseStatus === "fulfilled") {
    onResolved(this.PromiseResult);
  }
  if(this.PromiseStatus === "rejected") {
    onRejected(this.PromiseResult);
  }
  if(this.PromiseStatus === "pending") {
    this.callbacks.push({
      onResolved: onResolved,
      onRejected: onRejected
    });
  }
}