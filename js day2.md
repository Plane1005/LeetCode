# 对象
## new与Object.create()

 - **对于new来说，整个过程分为四步**
 1. 创建一个空的对象
 2. 把新对象的原型绑定到构造函数的原型上
 3. 构造函数被执行，将新对象绑定到函数中的this上
 4. 返回对象，返回构造函数的返回值，如果不是对象，则返回创建的对象

```javascript
function Person (name,age) {
  this.name = name
  this.age = age
}

function jetNew () {
  // 1、创建一个空对象
  const obj = {}
  // 2、把新对象的原型绑定到构造函数的原型上
  let constructor = [].shift.call(arguments)
  Object.setPrototypeOf(obj,constructor.prototype)
  // 3、构造函数被执行，将新对象绑定到函数中的this上
  let res = constructor.apply(obj,arguments)
  // 返回对象
  return res instanceof Object ? res : obj
}

const person1 = jetNew(Person,'jet',23)
console.log(person1); // Person { name: 'jet', age: 23 }
```
 - **Object.create()用于创建一个新的对象，并使用第一个参数作为新对象的原型，一个用途是防止对象被第三方库修改，传入一个继承于他的对象，修改就不会影响到原对象**

```javascript
let obj = {
	name: 1
}
let p = Object.create(obj)
console.log(p.name);
console.log(p);
```
输出结果
![在这里插入图片描述](https://img-blog.csdnimg.cn/1d2b39be443343639150dbac6e192661.png)
 - **detele可以用来从对象中移除属性，delete并不操作值，而是移除属性本身。
 但是不可以移除继承的值（要删除继承属性，必须从定义属性的原型对象上删除。这样做会影响到该原型的所有对象。）
 delete 可以删除globalThis下的值**
# 数组
 - **forEach()与map()
 两个方法的参数都一致，第一个参数为元素，第二个为索引，第三个是数组本身
 区别在于map应该有返回值，而forEach没有**
  - **every()与some()
两个方法都为数组断言方法，会接受参数为断言函数，用于检验数组的每一个元素是否符合条件，都会return布尔值
 every()与数学上的“全称”相似，只有数组的每一个元素断言为真才会返回true，否则返回false
 some()与数学上的“存在”相似，只要数组有一个元素断言为真就会返回true，但必须所有值断言为false**
