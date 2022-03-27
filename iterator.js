// 实现可迭代对象
class Range {
	constructor(from, to) {
		this.from = from
		this.to = to
	}
	[Symbol.iterator]() {
		let next = Math.ceil(this.from)
		let last = this.to
		return {
			next() {
				return next <= last
					? {
							value: next++,
							done: false,
					  }
					: {
							done: true,
					  }
			},
			[Symbol.iterator]() {
				return this
			},
		}
	}
}

let range = new Range(2, 8)
// console.log(...range); //2 3 4 5 6 7 8

// 返回一个可迭代对象，迭代的结果是调用传入的fn处理后返回的值
function jetMap(iter, fn) {
	let iterator = iter[Symbol.iterator]()
	return {
		index: 0,
		next() {
			let i = iterator.next()
			if (i.done) {
				this.index = 0
				return i
			} else {
				return {
					value: fn(i.value, this.index++, iter),
					done: false,
				}
			}
		},
		[Symbol.iterator]() {
			return this
		},
	}
}

let arr = [
	...jetMap([1, 2, 3, 4, 5], (item, index, arr) => {
		// console.log(item, index, arr); // 1 0 [1, 2, 3, 4, 5]
		return item * item
	}),
]
// console.log(arr); // [1, 4, 9, 16, 25]

// 返回一个可迭代对象，只包含符合fn条件的值
function jetFilter(iter, fn) {
	let iterator = iter[Symbol.iterator]()
	return {
		next() {
			for (;;) {
				let v = iterator.next()
				if (v.done || fn(v.value)) {
					return v
				}
			}
		},
		[Symbol.iterator]() {
			return this
		},
	}
}

let arr1 = [
	...jetFilter([1, 2, 3, 4, 5], (item) => {
		// console.log(item) // 1
		return item % 2 === 0
	}),
]

console.log(arr1) // [ 2, 4 ]

