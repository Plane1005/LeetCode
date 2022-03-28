const Jet = require('./JetPromise')

let jet = new Jet((resolve, reject) => {
  setTimeout(() => { resolve(12) }, 2000)
  // reject(23)
  // throw new Error('34')
}).then((res) => {
  console.log(res);
}, (reason) => {
  console.log(reason);
})
