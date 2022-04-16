# async/await 实现原理探析

---
`ES2017` 提供的 `Async/Await` 是标准的异步编程语法，作为异步编程终极解决方案，可以使开发者使用书写同步代码的方式处理异步编程，本文尝试将 `Async/Await` 编译成为 `ES5` 的代码后，去理解其内部实现。

## 代码

``` javascript
const getData = (num) => new Promise(resolve => setTimeout(() => resolve("data"), num))

async function test() {
  const data = await getData(1000)
  console.log('data: ', data);
  const data2 = await getData(2000)
  console.log('data2: ', data2);
  return 'success'
}

// 1秒后打印data 再过2秒打印data2 最后打印success
test().then(res => console.log(res))
```

经过 `Babel` 编译成为 `ES5` 的代码后，结果为

[在线编译ES5代码](https://es6console.com/)

``` javascript
let test = (() => {
  var ref = _asyncToGenerator(function* () {
    const data = yield getData(1000);
    console.log("data: ", data);
    const data2 = yield getData(2000);
    console.log("data2: ", data2);
    return "success";
  });

  return function test() {
    return ref.apply(this, arguments);
  };
})();

// 1秒后打印data 再过2秒打印data2 最后打印success

function _asyncToGenerator(fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
            console.log(info);
          resolve(value);
        } else {
          return Promise.resolve(value).then(
            function (value) {
              return step("next", value);
            },
            function (err) {
              return step("throw", err);
            }
          );
        }
      }
      return step("next");
    });
  };
}

const getData = (num) =>
  new Promise((resolve) => setTimeout((num) => resolve("data"), num));

test().then((res) => console.log(res));
```

## 探析

- 我们可以看到 **test** 函数从标注 **async** 关键字的形式被编译为了 **Generator** 函数形式的表达，而 **await** 变成了 **yield** 关键字。但是我们知道，**Generator** 函数是不会像普通函数那样执行到结束，虽然功能上确实可以实现停止在某个我们指定的异步操作上，但是是无法自动进行执行的函数，需要某种机制实现自动向下执行。
- 所以可以继续观察到函数 **asyncToGenerator** 完成了 **Generator** 函数的自动执行。 **asyncToGenerator** 接受一个函数，使用 `apply` 向目标函数传参数，并且获得 **Generator** 函数的 **Iterator** 。
- 我们知道经过 **async** 包裹的函数返回的结果是一个 **promise** ，所以 **asyncToGenerator** 接下来就返回一个 **promise**。
- **promise** 中有一个 **step** 函数，接受需要 **Iterator** 执行的函数的名称 **key** ，和传递的参数 **arg** 。题主一开始很不理解 **arg** 的作用，尝试删去后得知，当我们 **下一次调用next的时候，传的参数会被作为上一个yield前面接受的值**，也就是说我们的 **arg** 传给了 **data** 和 **data2** 。
- 接下来 **step** 函数会尝试去用 **Iterator** 的形式去执行，如果发现传入的 **fn** 并不返回迭代器 **Iterator** ，那么直接 **reject** 。
- 获取到 **Iterator** 的迭代器对象后，进行判断。我们知道迭代器对象包含两个值，一个 **value** 为迭代器对象的结果，一个 **done** 用来标记此迭代器是否已经迭代完成。
- 如果此迭代器，也就是我们 **async** 转换后的 **Generator** 函数完成，即 `done：true`，说明所有的 **yield** 已被迭代完成，即我们 **async** 中所有的 **await** 已经完成，那么我们就可以返回一个 **resolve** 出结果。
- （题主在这里有一个疑惑，为什么最后 **resolve** 出去的是 **return** 中 **success** 信息呢，而不是 **data2** 呢，毕竟他才是最后一次 **yield** 的结果？答案是：在 **generator** 中，如果有 **n** 个 **yield** ，我们就需要手动调用 **n+1** 次 **next（）** 才能得到 `done：true` 的结果，但是最后一次的返回对象中的 **value：undefined** 。我们可以使用 **return** 关键字告知 **generator** 迭代结束，并将 **return** 返回的值给最后一个 **next（）** 返回对象的 **value** 属性。）
- 如果此迭代器还没有结束，那我们利用 **Promise.resolve(value)** 将其转换为 **promise** 对象并注册 **then** 函数，对 **yield** 返回的对象进行处理，如果结果正常那么我们就继续迭代，同时也通过 **promise** 的内部机制对异步操作进行了处理，并将结果传递给下一个 **yield** 接收的值。
- 自此我们就可以真正理解  `Async/Await` 其实还是 **promise** 的语法糖这句话的含义啦
- 附上一个 **promise** 的实现机制

[手写promise实现](https://blog.csdn.net/m0_48474585/article/details/123975637?spm=1001.2014.3001.5501)
