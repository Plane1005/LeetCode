window = {}

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
    console.log('bind -->', this) //当没有发生new过程时，this指向全局对象  发生new过程时，this指向自身
    if (this instanceof F) {
      return new that(...rest,...arguments)
    }
		return that.jetApply(context, [...rest.concat(...arguments)])
	}
}

function person(x, y) {
	this.x = x
	this.y = y
	console.log('person -->', this)
}

const obj = {
	name: 'jet',
}

// const p = person.jetBind(obj,1)(2)

// new的情况
const p = person.jetBind()
// const p = person.bind()
let per = new p(1, 2)
console.log('end -->', per)
