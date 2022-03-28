const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class JetPromise {
	constructor(executor) {
		this.status = PENDING
		this.value = undefined
		this.reason = undefined
		this.fulfilledCbs = []
		this.rejectedCbs = []

		const resolve = (value) => {
			if (this.status === PENDING) {
				this.status = FULFILLED
				this.value = value
				this.fulfilledCbs.forEach((fn) => fn())
			}
		}

		const reject = (reason) => {
			if (this.status === PENDING) {
				this.status = REJECTED
				this.reason = reason
				this.rejectedCbs.forEach((fn) => fn())
			}
		}

		try {
			executor(resolve, reject)
		} catch (error) {
			reject(error)
		}
	}

	then(onFulfilled, onRejected) {
		if (this.status === FULFILLED) {
			onFulfilled(this.value)
		}
		if (this.status === REJECTED) {
			onRejected(this.reason)
		}
		if (this.status === PENDING) {
			this.fulfilledCbs.push(() => {
				onFulfilled(this.value)
			})
			this.rejectedCbs.push(() => {
				onRejected(this.reason)
			})
		}
	}
}

module.exports = JetPromise
