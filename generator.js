function* gener () {
  yield 1
  yield 3
  yield 5
  yield 7
}

let arr = [...gener()]
console.log(arr); // [ 1, 3, 5, 7 ]

