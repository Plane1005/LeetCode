// 性能优化前
function clone(target, map = new WeakMap()) {
	if (typeof target === 'object') {
		let cloneTarget = Array.isArray(target) ? [] : {}
		// 循环引用问题
		if (map.get(target)) {
			return map.get(target)
		}
		map.set(target, cloneTarget)
		for (const key in target) {
			cloneTarget[key] = clone(target[key], map)
		}
		return cloneTarget
	} else {
		return target
	}
}

// 使用while循环进行性能优化
function forEach(array, iteratee) {
	let index = -1
	const length = array.length
	while (++index < length) {
		iteratee(array[index], index)
	}
	return array
}

function jetClone(target, map = new WeakMap()) {
	if (typeof target === 'object') {
		const isArray = Array.isArray(target)
		let cloneTarget = isArray ? [] : {}

		// 循环引用问题
		if (map.get(target)) {
			return map.get(target)
		}
		map.set(target, cloneTarget)

		const keys = isArray ? undefined : Object.keys(target)
		forEach(keys || target, (value, key) => {
			if (keys) {
				key = value
			}
			console.log(keys, target, value, key)
			cloneTarget[key] = jetClone(target[key], map)
		})

		return cloneTarget
	} else {
		return target
	}
}

let obj1 = {
	a: 123,
	b: undefined,
	c: {
		d: 456,
		e: {
			f: () => {},
		},
	},
	g: [1, 2, 3, 4, 5],
}

let obj2 = jetClone(obj1)

console.log(obj2)
