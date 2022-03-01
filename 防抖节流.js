// 防抖
// 函数触发后不立即执行，过delay秒后执行
// 如果delay时再次触发，则重新计时
function debounce(fn, delay) {
	let timer = null
	return function () {
		if (timer) {
			clearTimeout(timer)
		}
		timer = setTimeout(fn, delay)
	}
}

// 防抖
// 函数触发后立即执行，过delay秒后才能再次执行
// 如果delay时再次触发，则重新计时
function debounce2(fn, delay) {
	let timer = null
	return function () {
		if (timer) {
			clearTimeout(timer)
		}
		let callNow = !timer
		timer = setTimeout(() => {
			timer = null
		}, delay)
		if (callNow) {
			fn()
		}
	}
}

//节流
//函数触发后不立即执行，过delay秒后执行
//如果delay时再次触发，无动作
//连续发生的事件在delay秒内只执行一次函数
function throttle(fn, delay) {
	let timer = null
	return function () {
		if (!timer) {
			timer = setTimeout(() => {
				timer = null
				fn()
			}, delay)
		}
	}
}

let btn = document.getElementById('test')
btn.onclick = throttle(() => {
	console.log('被点击')
}, 1000)
