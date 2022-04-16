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
