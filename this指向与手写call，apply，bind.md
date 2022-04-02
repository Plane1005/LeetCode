## js中的this指向总结
---
#### 默认绑定
在普通函数中打印调用 **this**，默认指向 **window** 
在开启了严格模式后，结果为 **undefined**
``` javaScript
function fn() {
    console.log(this);
}
fn(); // window

'use strict'
function fn() {
    console.log(this);
}
fn(); // undefined
```

#### 隐式绑定
简单来说口诀就是，谁最后调用，**this** 就指向谁

``` javaScript
function getName () {
  let name = 'function'
  console.log(this.name); // obj2
}
let obj = {
  name: 'obj',
  obj2: {
    name: 'obj2',
    getName: getName
  }
}
obj.obj2.getName(); // obj2

let a = obj.obj2.getName
a() //undefined 相当于调用a的对象是window，但是并没有name属性，所以是undefined
```

### 箭头函数
箭头函数中的 **this** 指向外层函数（非箭头函数）的作用域中的 **this** 指向。
``` javaScript
function A () {
  let r = {
    a: 'b',
    b: {
      say: () => {
        console.log(this) 
      }
    },
    says: function () {
      console.log(this)
    },
  }
  r.b.say() 
  r.says()
}

A()
// window
// r

A.call(obj)
// obj
// r
```

### new绑定
**new** 关键字来执行函数，相当于构造函数来实例化对象，则 **this** 指向当前实例化的对象
``` javaScript
function Fn() {
    console.log(this); // Fn{}
}
var fn = new Fn();
```

### 显示绑定
**call**、**apply**用来显示更改调用函数时 **this**的值
``` javaScript
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

function person() {
	console.log(this.name)
}

const obj = {
	name: 'jet',
}

person.jetCall(obj) // jet
```
- 改变 **this** 指向的原理是，将目标函数手动挂载到想要的 **this** 环境上，用例中的 **obj** 就相当于变成了
`const obj = {
	name: 'jet',
    fn: function () {
	console.log(this.name)
}
}`
- 因为函数调用形式为 **fn.call()**，根据隐式绑定原则我们可以从 **this** 拿到调用 **call**的函数
- **apply**和 **call**函数差别在于传递参数上，所以稍加修改就可以

**bind**与前两者不同在于改变this指向后不会立即执行，而是返回一个永久改变this指向的函数，且新函数也能当做构造函数（new）调用
``` javaScript
Function.prototype.jetBind = function (context, ...rest) {
	context = context || window
	const that = this
	return function F() {
		if (this instanceof F) {
			return new that(...rest, ...arguments)
		}
		return that.jetApply(context, [...rest.concat(...arguments)])
	}
}
```
- 因为返回的函数内的 **this** 与闭包内的 **this** 不同，所以我们需要用 **that** 保存闭包内的 **this**
- 当没有发生new过程时，this指向调用它的对象。我们直接调用 **apply**，返回绑定好的函数
- 发生new过程时，构造函数绑定this指向自身实例化对象，而实例化对象原型链上含有构造函数的原型，以此判断是否执行new过程，返回实例化对象
