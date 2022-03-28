# 迭代器
可迭代对象和其相关的迭代器是ES6后的一个特性，利用...扩展运算符和for...of可操作迭代对象的值，js中的迭代，分为三种类型
 - **可迭代对象：指的是具有可迭代方法，且返回迭代器对象的对象。迭代器对象是指具有next()方法且返回迭代器结果对象的对象。迭代器结果对象是指具有value和done属性的对象。可迭代对象的迭代器方法采用了特定的符号Symbol.iterator作为名字**

实现可迭代对象
```javascript
// 实现可迭代对象
class Range {
    constructor(from, to) {
        this.from = from
        this.to = to
    }
    [Symbol.iterator]() {
        let next = Math.ceil(this.from)
        let last = this.to
        return {
            next() {
                return next <= last ? {
                    value: next++,
                    done: false
                } : {
                    done: true
                }
            },
            [Symbol.iterator]() {
                return this
            }
        }
    }
}

let range = new Range(2,8)
console.log(...range); //2 3 4 5 6 7 8
```
**实现map和filter函数**
```javascript
// 返回一个可迭代对象，迭代的结果是调用传入的fn处理后返回的值
function jetMap(iter, fn) {
    let iterator = iter[Symbol.iterator]()
    return {
        index: 0,
        next() {
            let i = iterator.next()
            if (i.done) {
                this.index = 0
                return i
            } else {
                return {
                    value: fn(i.value, this.index++, iter),
                    done: false
                }
            }
        },
        [Symbol.iterator]() {
            return this
        }
    }
}

let arr1 = [1, 2, 3, 4, 5]
let arr2 = [...jetMap(arr1, (item, index, arr) => {
    console.log(item, index, arr); // 1 0 [1, 2, 3, 4, 5]
    return item * item
})]
console.log(arr2); // [1, 4, 9, 16, 25]

// 返回一个可迭代对象，只包含符合fn条件的值
function jetFilter(iter, fn) {
	let iterator = iter[Symbol.iterator]()
	return {
		next() {
			for (;;) { //为什么需要一个死循环呢？ 
				let v = iterator.next()
				if (v.done || fn(v.value)) {
					return v
				}
			}
		},
		[Symbol.iterator]() {
			return this
		},
	}
}

let arr1 = [
	...jetFilter([1, 2, 3, 4, 5], (item) => {
		// console.log(item) // 1
		return item % 2 === 0
	}),
]

console.log(arr1) // [ 2, 4 ]
```
上面的代码中，为什么filter需要有一个死循环呢？
试想，上面代码中，当我们传入1时，不符合fn的条件，那么next函数会返回undefined，我们知道next函数是需要返回迭代结果对象的，如果没有返回，那么就会报错

> TypeError: Iterator result undefined is not an object

那么如果我们加上一个else条件，不符合条件时，手动返回一个迭代器结果对象类似 **{done: false}** 呢？答案是也不行，这样的话filter就起不到筛选的效果了，上述的arr1也会变成

> [ undefined, 2, undefined, 4, undefined ]

# 生成器
生成器是ES6语法类型定义的迭代器，特别适合要迭代的不是某个数据结构的元素，而是计算结果的场景。生成器的语法是function*，在函数后面加了一个星号。调用生成器函数不会实际执行函数体，而是返回一个生成器对象。这个生成器对象是一个迭代器对象，调用其next()方法会导致生成器函数从头开始执行，直到遇到一个yield语句，其类似于return，会成为next()的返回值，范例如下

```javascript
function* gener () {
  yield 1
  yield 3
  yield 5
  yield 7
}

let arr = [...gener()]
console.log(arr); // [ 1, 3, 5, 7 ]
```
第一个范例里Range类的[Symbol.iterator]方法可以简写为

```javascript
*[Symbol.iterator](){
  for (let i = Math.ceil(this.from); i <= this.to;i++) yield i
}
```
