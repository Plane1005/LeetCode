const JetPromise = require('./JetPromise')

const alert = (ans) => {
  console.log(ans);
}

const PromiseTest = () => {
  let jet = new JetPromise((resolve, reject) => {
    // setTimeout(() => { resolve(12) }, 2000)
    resolve(12)
    // reject(23)
    // return new Jet((resolve, reject) => {
    //   throw new Error('34')
    // })
  })
  
  let jet2 = jet.then((value) => {
    return new JetPromise((resolve, reject) => {
      resolve(new JetPromise((resolve, reject) => {
        resolve(new JetPromise((resolve, reject) => {
          resolve(value)
        }))
      }))
    })
  }, (reason) => {
    console.log(reason);
    return reason
  })
    
  jet2.then().then().then().then().then().then().then().then().then().then().then((res) => {
    console.log(res);
  }, (reason) => {
    console.log(reason);
  }).catch((err) => {
    console.log(err);
  })
}

// 基本功能测试
// PromiseTest()

// all测试
// JetPromise.all([
//   new JetPromise(resolve => setTimeout(() => resolve(1), 3000)), // 1
//   new JetPromise(resolve => setTimeout(() => resolve(2), 2000)), // 2
//   new JetPromise(resolve => setTimeout(() => resolve(3), 1000))  // 3
// ]).then(alert); // [ 1, 2, 3 ]

// JetPromise.all([
//   new JetPromise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
//   new JetPromise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
//   new JetPromise((resolve, reject) => setTimeout(() => resolve(3), 3000))
// ]).catch(alert); // Error: Whoops!

// // // allSettled测试
// JetPromise.allSettled([
//   new JetPromise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
//   new JetPromise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
//   new JetPromise((resolve, reject) => setTimeout(() => resolve(3), 3000))
// ]).then(alert); // Error: Whoops!

// race测试
// JetPromise.race([
//   new JetPromise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
//   new JetPromise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
//   new JetPromise((resolve, reject) => setTimeout(() => resolve(3), 3000))
// ]).then(alert); // 1

// JetPromise.race([
//   new JetPromise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 1000)),
//   new JetPromise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
//   new JetPromise((resolve, reject) => setTimeout(() => resolve(3), 3000))
// ]).catch(alert); // 1

// // any测试
// JetPromise.any([
//   new JetPromise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 1000)),
//   new JetPromise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
//   new JetPromise((resolve, reject) => setTimeout(() => resolve(3), 3000))
// ]).then(alert); // 1
