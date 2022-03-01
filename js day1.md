一直想系统的去学习梳理一边js的基础，最近选择了JavaScript权威指南，俗称“犀牛书”，从今天开始从头开始阅读一边，对了js的基础进行查缺补漏，每天阅读后对于新的知识点进行一个小总结，方便复习

---
## 原始类型与对象类型
 - **Js中的类型分为原始类型与对象类型，原始类型是不可修改的（immutable），对象类型是可修改的（mutable）。原始类型包括数值，布尔值，符号，null和undefined。字符串可以看成字符数组，但是他也是不可修改的，所有看起来修改了字符串的操作，其实都是返回了一个新的字符串。**

```javascript
let s = "hello"
s.toUpperCase() // 返回HELLO，但不会修改s
s // => "hello"，并未被修改
```
 - **原始值是按值比较的，而对象是按照引用比较的，只有引用了同一个底层对象才会相等（地址）。**
## BigInt表示任意精度整数
 - **ES2020新增了一个基础类型，BigInt字面量写作一串数字后跟小写n，例如1234n。
 要注意的是，BigInt类型不可以与常规类型进行混用，但可以比较，同时Math对象不支持BigInt**
 ## 二进制浮点数与舍入错误
 - **Js中的浮点格式只能保存有限个实数，所以对于小数来说，无法精确的保存小数或者分数。以前看题目的时候看到过为什么0.1+0.2=0.300...004，0.1+0.2!=0.3，因为这两个数的二进制都是无限循环小数，最后一位会进行舍入处理。最简单的处理，通过toFixed方法
 console.log(parseFloat(0.1+0.2).toFixed(1));//输出0.3**
 ## Symbol符号的运用
 - **符号（Symbol）是ES6新增的数据类型，用作非字符串的属性名。JavaScript中的Object是一个属性的无序集合，每个属性都有一个名字和一个值，属性名通常是（在ES6前一直是）字符串。**
 

```javascript
let strname = "string name"
let symname = Symbol("propname")
let o = {}
o[strname] = 1
o[symname] = 2
```
 - **符号（Symbol）的获取需要调用Symbol()函数，即使传入的参数相同，每次也会返回不同的结果。这意味着可以调用Symbol()安全的给对象加上属性，无须担心重写已有的属性。ES6中加入的for/of循环和可迭代对象，但选择任何特定的字符串作为迭代器的方法都有可能破坏原有的代码，所以Symbol应运而生。**
  - **为了定义一些可以与其他代码共享的Symbol值，js定义了全局符号注册表，用以共享。**

```javascript
let s = Symbol.for("key")
let t = Symbol.for("key")
s === t //true
Symbol.keyFor(s) // "key"
```
## 先定义(??)
 - **??是对 || 一个有用的替代，如果表达式的左侧不是null或者undefined，就返回该值，否则会返回右侧的值，同样也具有短路效应。**

```javascript
let max = maxWidth || pre.maxWidth || 500
let max = maxWidth ?? pre.maxWidth ?? 500
```
 - **第一种写法的缺陷是，0、空字符串、false都是假值，但这些值某些情况下是有用的。
 将 || 改为 ?? ，那么0也会成为有效的值**