// node环境下手动创建window对象
window = {
	jet: 'jet',
}

// call
Function.prototype.jetCall = function (context, ...rest) {
  context = context || window
	context.fn = this
	let res = context.fn(...rest)
	delete context.fn
	return res
}

// apply
Function.prototype.jetApply = function (context, arr) {
	context = context || window
	context.fn = this
	let res = context.fn(...arr)
	delete context.fn
	return res
}

//bind
Function.prototype.jetBind = function (context, ...rest) {
	context = context || window
	const that = this
	return function F() {
		// console.log('bind -->', this) //当没有发生new过程时，this指向调用它的对象  发生new过程时，构造函数绑定this指向自身实例化对象，而实例化对象原型链上含有构造函数的原型  以此判断是否执行new过程
		if (this instanceof F) {
			return new that(...rest, ...arguments)
		}
		return that.jetApply(context, [...rest.concat(...arguments)])
	}
}

function person(x, y) {
	console.log(this.name)
}

function Person(x, y) {
	this.x = x
	this.y = y
	console.log('Person -->', this)
}

const obj = {
	name: 'jet',
}

person.jetCall(obj)

// 非new情况
// const p = person.jetBind(obj, 1)(2)

// new的情况
const newTest = () => {
	const p = Person.jetBind()
	let per = new p(1, 2)
	console.log('end -->', per)
}
// newTest()

