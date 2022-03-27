function repeat (fn,times,delay) {
  return function (content) {
    for (let i = 1; i <= times; i++){
      setTimeout(fn, delay * i,content)
    }
  }
}

const repeatFunc = repeat(console.log, 4, 1000)
repeatFunc("hellworld")
