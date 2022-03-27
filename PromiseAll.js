function jetPromiseAll (iterators) {
  let res = []
  return new Promise((resolve, reject) => {
    for (let i in iterators) {
      Promise.resolve(iterators[i])
        .then((data) => {
          res[i++] = data
          if (i === iterators.length - 1) {
            resolve(res)
          }
        }).catch((err) => {
        reject(err)
      })
    }
  })
}

var promise1 = Promise.resolve(3);
var promise2 = new Promise(function(resolve, reject) {
  setTimeout(resolve, 100, 'foo');
});
var promise3 = 42;

jetPromiseAll([promise1, promise2, promise3]).then(function(values) {
  console.log(values);
});
