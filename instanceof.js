function Animal(name) {
  this.name = name;
}

function jetInstanceof (left,right) {
  if (right === null || right === undefined) return false
  const basicType = ['number', 'boolean', 'string', 'undefined', 'symbol']
  if (basicType.includes(typeof left)) return false
  let LT = left.__proto__
  while (true) {
    if (LT === right.prototype) {
      return true
    }
    if (LT === null) {
      return false
    }
    LT = LT.__proto__
  }
}

// const dog = new Animal("dog");
// console.log(jetInstanceof(dog, Array));
// console.log(jetInstanceof(dog, Animal));
// console.log(jetInstanceof(dog, Object));
console.log(jetInstanceof('dog', Object));
