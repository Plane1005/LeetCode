const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

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
		if (this.status === PENDING) {
			this.status = FULFILLED
			this.value = value
			this.fulfilledCbs.forEach((fn) => fn())
		}
	}

	reject = (reason) => {
		if (this.status === PENDING) {
			this.status = REJECTED
			this.reason = reason
			this.rejectedCbs.forEach((fn) => fn())
		}
	}

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

	then(onFulfilled, onRejected) {
		onFulfilled =
			typeof onFulfilled === 'function' ? onFulfilled : (value) => value
		onRejected =
			typeof onRejected === 'function'
				? onRejected
				: (reason) => {
						if (reason instanceof Error) return reason
						throw new Error(reason)
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

	// 所有的 promise 被 resolve，返回的 promise 会 resolve 一个数组，结果是顺序的所有 promise resolve 的结果
	// 如果任意一个 promise 被 reject，由 Promise.all 返回的 promise 就会立即 reject，并且带有的就是这个 error
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

	// 只等待第一个 settled 的 promise 并获取其结果（或 error）
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

	// Promise.allSettled 等待所有的 promise 都被 settle，无论结果如何。结果数组具有：
	// {status:"fulfilled", value:result} 对于成功的响应，
	// {status:"rejected", reason:error} 对于 error。
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

	// 只等待第一个 fulfilled 的 promise，并将这个 fulfilled 的 promise 返回
	// 如果给出的 promise 都 rejected，那么则返回 rejected 的 promise 和 AggregateError 错误类型的 error 实例——
	// 一个特殊的 error 对象，在其 errors 属性中存储着所有 promise error
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
}

module.exports = JetPromise
