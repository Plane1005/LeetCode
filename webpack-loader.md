# 完成一个转换template的webpack-loader：JetLoader

---

## 目标

传递一个对象，根据 **key** 注入将其转换为对应的 **html**，并且支持实时 **log** 转换的 **template** 的文件名、可配置的首字母大写转换

``` javascript
import tpl from "./info.tpl";

const info = tpl({
  name: "jet",
  age: 34,
  career: "前端实习生",
  hobby: "game/篮球",
}); 

const root = document.querySelector("#root");
root.innerHTML = info;
```

``` template
<div>
    <h1> {{ name }} </h1>
    <p> {{ age }} </p>
    <p> {{ career }} </p>
    <p> {{ hobby }} </p>
</div>
```

## webpack-config配置tpl文件的loader

``` webpack
module: {
    rules: [
      {
        test: /\.tpl$/,
        use: [
          {
            loader: "./loaders/jet-tpl",
            options: {
              log: true,
              Uppercase: true,
            },
          },
        ],
      },
    ],
  },
```

- 匹配 **tpl** 后缀的文件，使用本地目录下的 **loader** 文件进行处理
- 配置 **log** 实时输出处理文件信息， **Uppercase** 自动转换首字母大写

## 编写loader

``` javascript
// 通用函数
function tplReplace(template, replaceObject) {
  return template.replace(/\{\{(.*?)\}\}/g, (_, key) => {
    return replaceObject[key];
  });
}

function UppercaseObject(obj) {
  for (const key in obj) {
    if (typeof obj[key] === "string") {
      let str = obj[key].toString();
      obj[key] = str.slice(0, 1).toUpperCase() + str.slice(1);
    }
  }
}

function ReturnOld(obj) {
  return obj;
}
```

- **tplReplace** ：接收 **template** 字符串，正则匹配 **{{}}** 将其替换为 **replaceObject** 中对应 **key** 的值

- 关于字符串的 **replace** 函数，其第二个参数可以为一个函数，参数含义分别是 匹配到的字符串、括号内匹配到的字符串、匹配字符串的对应索引位置、原始字符串

- **UppercaseObject** 遍历对象，修改字符串类型的数据的首字母为大写

``` javascript
const { getOptions } = require("loader-utils");

function JetLoader(source) {
  source = source.replace(/\s+/g, "");
  const { log, Uppercase } = getOptions(this);
  const _log = log
    ? `console.log('JetLoader is compiled ${this.resourcePath}')`
    : "";
  const _Uppercase = Uppercase ? `${UppercaseObject.toString()};UppercaseObject(options)` : `${ReturnOld.toString()};ReturnOld(options)`
  return `
        export default (options) => {
            ${tplReplace.toString()}
            ${_log.toString()}
            ${_Uppercase}
            return tplReplace('${source}', options);
        }
    `;
}

module.exports = JetLoader;
```

- 创建并导出处理函数 **JetLoader** ，它可以接收到 **tpl** 文件中的内容，首行对其进行了去空格操作

- 通过 **webpack** 官方的 **loader-utils** 插件，我们可以传入 **this** 从而读取到 **webpack.config** 中对于插件的配置 **options**

- **webpack** 的 **loader** 可以访问到 **this** 访问到上下文一些属性，详情可见 [loader上下文](https://www.webpackjs.com/api/loaders/#loader-%E4%B8%8A%E4%B8%8B%E6%96%87)

- 返回一个字符串并默认暴露一个函数，供 **webpack** 引入到 **bundle.js** 使用 **eval** 调用，接收参数为项目代码中实际调用时传入的对象

- 使用 **toString** 方法将函数转为字符串，使其在字符串中有声明，让代码可以正常执行，最后返回被处理后的 **html**

## 实际效果

![loader上下文](https://wx3.sinaimg.cn/orj360/0074cNT9gy1h1d2zcghflj313g0dddhk.jpg)
