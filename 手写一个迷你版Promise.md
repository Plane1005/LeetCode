## 手写一个迷你版的Promise
- **JavaScript** 中的 **Promise** 诞生于 **ES2015（ES6）**，是当下前端开发中特别流行的一种异步操作解决方案，简单实现一个迷你版本帮助深入理解 **Promise** 的运行原理
---
芝士点
- 微任务
- static
- 发布-订阅模式
### Promise 的声明

``` javaScript
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class JetPromise {
	status = PENDING
	value = undefined
	reason = undefined
	fulfilledCbs = []
	rejectedCbs = []

    constructor(executor) {
		try {
			executor(this.resolve, this.reject)
		} catch (error) {
			this.reject(error)
		}
	}

    resolve = (value) => {
		queueMicrotask(() => {
			if (this.status === PENDING) {
				this.status = FULFILLED
				this.value = value
				this.fulfilledCbs.forEach((fn) => fn())
			}
		})
	}

	reject = (reason) => {
		queueMicrotask(() => {
			if (this.status === PENDING) {
				this.status = REJECTED
				this.reason = reason
				this.rejectedCbs.forEach((fn) => fn())
			}
		})
	}
}
```
- 构造一个 **JetPromise**类，需要传入一个函数作为执行器，在创建时执行这个函数并将 **resolve** 和 **reject** 函数传入执行器让其调用从而改变 **Promise** 实例的状态
- **Promise** 有三种状态分别为 **pending(等待态)**、**fulfilled（成功态）**、**rejected（失败态）**。**pending（等待态）** 为初始态，并可以转化为 **fulfilled（成功态）** 和**rejected（失败态）**
- 成功时，不可转为其他状态，且必须有一个不可改变的值（**value**）
- 失败时，不可转为其他状态，且必须有一个不可改变的原因（**reason**）
- **fulfilledCbs**、**rejectedCbs** 意义在于可以支持一个 **promise** 实例状态改变后， **then** 函数中可以有若干个该状态的回调函数，依次执行
- 如果用户给构造函数传的是一个同步函数，里面的 **resolve** 和 **reject** 会立即执行，比 **then** 还执行的早，那 **then** 里面注册的回调就没机会运行了，所以要给他们加个 `queueMicrotask`


### then
``` javaScript
function resolvePromise(promise2, x, reslove, reject) {
	if (promise2 === x) {
		return reject(
			new TypeError(
				'TypeError: Chaining cycle detected for promise #<Promise>'
			)
		)
	}
	let called = false
	if (x instanceof Object) {
		try {
			let then = x.then
			if (typeof then === 'function') {
				then.call(
					x,
					(y) => {
						if (called) return
						called = true
						resolvePromise(promise2, y, reslove, reject)
					},
					(r) => {
						if (called) return
						called = true
						reject(r)
					}
				)
			} else {
				reslove(x)
			}
		} catch (error) {
			if (called) return
			called = true
			reject(error)
		}
	} else {
		reslove(x)
	}
}

class JetPromise {
then(onFulfilled, onRejected) {
		onFulfilled =
			typeof onFulfilled === 'function' ? onFulfilled : (value) => value
		onRejected =
			typeof onRejected === 'function'
				? onRejected
				: (err) => {
						throw err
				  }
		let promise2 = new JetPromise((resolve, reject) => {
			if (this.status === FULFILLED) {
				queueMicrotask(() => {
					try {
						let x = onFulfilled(this.value)
						resolvePromise(promise2, x, resolve, reject)
					} catch (error) {
						reject(error)
					}
				})
			}
			if (this.status === REJECTED) {
				queueMicrotask(() => {
					try {
						let x = onRejected(this.reason)
						resolvePromise(promise2, x, resolve, reject)
					} catch (error) {
						reject(error)
					}
				})
			}
			if (this.status === PENDING) {
				this.fulfilledCbs.push(() => {
					try {
						let x = onFulfilled(this.value)
						resolvePromise(promise2, x, resolve, reject)
					} catch (error) {
						reject(error)
					}
				})
				this.rejectedCbs.push(() => {
					try {
						let x = onRejected(this.reason)
						resolvePromise(promise2, x, resolve, reject)
					} catch (error) {
						reject(error)
					}
				})
			}
		})
		return promise2
	}

	catch(errorCb) {
		return this.then(null, errorCb)
	}

	finally(fn) {
		return this.then(fn, fn)
	}
}
```
- 当状态 **state** 为 **fulfilled**，则执行 **onFulfilled**，传入 **this.value**。当状态 **state** 为 **rejected**，则执行 **onRejected**，传入 **this.reason**，**value** 或 **reason** 依次作为他们的第一个参数
- 如果传入的 **onFulfilled** 非函数类型或者是没有传该参数，那么就给予一个默认向下传递 **value** 的函数，将 **value** 交给下一个 **then** 去处理。如果 **onRejected** 非函数类型或者是没有传该参数，那我们将 **reason** 直接抛出，交给下一个 **then** 去处理
- 解决异步实现。当 **resolve** 在异步任务内执行，**then** 时 **state** 还是 **pending** 等待状态 我们就需要在 **then** 调用的时候，将成功和失败存到各自的数组，一旦 **reject** 或者 **resolve**，就调用它们（又是发布-订阅模式）
- 解决链式调用。我们常常用到 `new Promise().then().then()`，可以在 **then** 函数后再次向下 **then**，为了达成链式我们可以在再 **then** 中返回一个 **promise** 实例
- **onFulfilled** 或 **onRejected** 中也有可能返回一个 **promise** 对象，所以我们需要保存 **onFulfilled** 和 **onRejected** 的返回值暂存为 **x**，传入 **resolvePromise** 进行判断
- **resolvePromise** 首先判断 **onFulfilled** 或 **onRejected** 返回的值是不是 **then** 中返回的 **promise** 实例，如果是，那么就是自己等待自己完成，造成了循环引用，对标原版 **promise** 报错 `'TypeError: Chaining cycle detected for promise #<Promise>'` 
- 尝试判断 **x** 是否为 **promise** 对象，如果不是，代表 **x** 直接 **resolve(x)** ，如果是，就递归获得该 **promise** 实例的结果（因为可能会多重嵌套 **promise**），并始终保证调用的是将 **then** 函数的 **resolve** 与 **reject**，使用 **called** 保证 **resolve** 与 **reject** 只会调用一个
- **promisesA+** 规范规定 **onFulfilled** 或 **onRejected** 不能同步被调用，必须异步调用。而且我们在 **then** 方法中是否循环等待时，也需要返回的 **promsie** 先创建才能判断。所以我们就用 **queueMicrotask** 添加一个微任务，解决异步问题
- **catch** 和 **finally** 本质上还是 **then**。**catch** 是一个只有处理错误回调的 **api**，所以我们直接 `return this.then(null, errorCb)`。**finally** 是无论 **promise** 成功还是失败总会执行的回调，一般在最后使用，关闭一些流事件，直接 `return this.then(fn, fn)`

### 使用 promises-aplus-tests 测试手写promise过程
```javascript
JetPromise.defer = JetPromise.deferred = function () {
	let dfd = {}
	dfd.promise = new JetPromise((resolve, reject) => {
		dfd.resolve = resolve
		dfd.reject = reject
	})
	return dfd
}

module.exports = JetPromise
```

**872个测试用例全部通过**
![在这里插入图片描述](https://wx1.sinaimg.cn/mw2000/0074cNT9ly1h0z2os99pyj308c01rjrd.jpg)

### 其他Promise's Api
#### Promise.resolve
- 模仿 **Promise** 实现了两个静态方法，兼容非 **Promise** 数据，处理为 **Promise** 对象
```javascript
static resolve = (param) => {
	if (param instanceof JetPromise) {
		return param
	}
	return new JetPromise((resolve) => {
		resolve(param)
	})
}

static reject = (param) => {
	return new JetPromise((resolve, reject) => {
		reject(param)
	})
}
```
#### Promise.all
- 所有的 **promise** 被 **resolve**时，返回的 **promise** 会 **resolve** 一个数组，结果是顺序的所有 **promise** **resolve** 的结果
- 如果任意一个 **promise** 被 **reject**，由 **Promise.all** 返回的 **promise** 就会立即 **reject**，并且带有的就是这个 **error**

```javascript
static all(PromiseArr) {
	return new JetPromise((resolve, reject) => {
		if (!PromiseArr instanceof Array) {
			reject(new TypeError('param`s type must be Array'))
		}
		let cnt = 0
		let res = []
		for (let i = 0; i < PromiseArr.length; i++) {
			JetPromise.resolve(PromiseArr[i])
				.then(
					(value) => {
						res[i] = value
						cnt++
						if (cnt === PromiseArr.length) {
							return resolve(res)
						}
					},
					(reason) => {
						return reject(reason)
					}
				)
				.catch((e) => {
					return reject(e)
				})
		}
	})
}
```

#### Promise.allSettled
- **Promise.allSettled** 等待所有的 **promise** 都被 **settle**，无论结果如何。结果数组具有：
- **{status:"fulfilled", value:result}** 对于成功的响应
- **{status:"rejected", reason:error}** 对于 error

```javascript
static allSettled(PromiseArr) {
	return new JetPromise((resolve, reject) => {
		if (!PromiseArr instanceof Array) {
			reject(new TypeError('param`s type must be Array'))
		}
		let cnt = 0
		let res = []
		for (let i = 0; i < PromiseArr.length; i++) {
			JetPromise.resolve(PromiseArr[i]).then(
				(value) => {
					res[i] = {
						status: 'fulfilled',
						value: value,
					}
					cnt++
					if (cnt === PromiseArr.length) {
						return resolve(res)
					}
				},
				(reason) => {
					res[i] = {
						status: 'rejected',
						reason: reason,
					}
					cnt++
					if (cnt === PromiseArr.length) {
						return resolve(res)
					}
				}
			)
		}
	})
}
```

#### Promise.race
- 只等待第一个 settled 的 promise 并获取其结果（或 error）

```javascript
static race(PromiseArr) {
	return new JetPromise((resolve, reject) => {
		if (!PromiseArr.length) return resolve()
		PromiseArr.forEach((promise) => {
			JetPromise.resolve(promise)
				.then(
					(value) => {
						return resolve(value)
					},
					(reason) => {
						return reject(reason)
					}
				)
				.catch((e) => {
					return reject(e)
				})
		})
	})
}
```

#### Promise.any
- 只等待第一个 fulfilled 的 promise，并将这个 fulfilled 的 promise 返回
- 如果给出的 promise 都 rejected，那么则返回 rejected 的 promise 和       AggregateError 错误类型的 error 实例——一个特殊的 error 对象，在其 errors 属性中存储着所有 promise error

```javascript
static any(PromiseArr) {
	return new JetPromise((resolve, reject) => {
		if (!PromiseArr.length)
			return reject(new AggregateError('All promises were rejected'))
		let errs = []
		let cnt = 0
		for (let i = 0; i < PromiseArr.length; i++) {
			JetPromise.resolve(PromiseArr[i]).then(
				(value) => {
					return resolve(value)
				},
				(reason) => {
					errs[i] = reason
					cnt++
					if (cnt === PromiseArr.length) {
						return reject(new AggregateError(errs))
					}
				}
			)
		}
	})
}
```
