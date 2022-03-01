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
