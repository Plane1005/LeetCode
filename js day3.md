# 函数
 - **函数声明语句会提升到包含脚本、函数或代码块的顶部，在一个JavaScript代码块中的声明的所有函数在该块的任何地方都有定义，而且会在JavaScript解释器开始执行前被定义**
 ## 箭头函数与function式的函数区别
 - **箭头函数从定义自己的环境继承this的值，而不是像其他方式定义得函数那样定义自己的调用上下文。**
 - **箭头函数arguments指向其父级函数作用域的arguments**
 - **箭头函数没有prototype属性，故而箭头函数不可以用作构造函数**
 - **箭头函数是匿名函数，依赖于变量或者参数，而let和const没有变量提升的属性，所以箭头函数的定义要在调用之前**
 ## 闭包
  - **JavaScript使用词法作用域，这意味着函数执行时使用的是定义函数时生效的变量作用域，而不是调用时生效的变量作用域。所以函数对象的内部状态不仅要包括函数代码，还要包括对函数定义所在作用域的引用。函数对象与作用域组合起来解析函数变量的机制，叫做闭包**
  - **闭包可以用在许多地方。它的最大用处有两个，一个是前面提到的可以读取函数内部的变量，另一个就是让这些变量的值始终保持在内存中。由于JavaScript的垃圾回收机制，一般函数调用完后，函数内部的变量没有被人引用，所以会被销毁掉，释放内存。而在闭包中，内部函数保持着对于外部函数的引用，所以可以使变量不会销毁。所以使用闭包时，也要注意内存性能问题。**
  - **闭包应用：防抖与节流**
  - **防抖：在第一次触发事件时，不立即执行函数，而是给出一个期限值比如200ms，然后：
如果在200ms内没有再次触发滚动事件，那么就执行函数
如果在200ms内再次触发滚动事件，那么当前的计时取消，重新开始计时
或者是立即执行函数，过2秒才能再次执行
效果：如果短时间内大量触发同一事件，只会执行一次函数。**

```javascript
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
```
  - **节流：可以设计一种类似控制阀门一样定期开放的函数，也就是让函数执行一次后，在某个时间段内暂时失效，过了这段时间后再重新激活（类似于技能冷却时间）。
效果：如果短时间内大量触发同一事件，那么在函数执行一次之后，该函数在指定的时间期限内不再工作，直至过了这段时间才重新生效。**
```javascript
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
```
