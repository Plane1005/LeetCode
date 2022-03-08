function jetAjax(obj){
  // 首先将传入的数据接过来
  let data = obj.data 
  let url = obj.url
  let methed  =  obj.methed || 'get'  // 不传默认发送get请求
  
  // 定义query变量存储query字符串，主要用于get请求
  let query = ''
  if (data) {
    for (var i in data) {
      query += i + '=' + data[i] + '&'
    }
    query = query.slice(0, -1) // query结果 username=xxx&password=111111
  }
  let xhr = new XMLHttpRequest()
  // 最后返回一个promise对象
  return new Promise((resolve, reject) => {
    // 调用open, 用了个三元表达，如果methed是post请求就用url，否则用url和query字符串拼接
    xhr.open(methed, methed === 'post' ? url : url + '?' +  query, true)
    // 监听事件
    xhr.onreadystatechange = function() {
      // 判断xhr的状态码
      if (xhr.readyState === 4 ) {
        if (xhr.status === 200) {
          // 成功时 接收返回的内容
          resolve(xhr.responseText)
        } else {
          // 失败时 接收返回的内容
          reject(xhr.responseText)
        }
      }
    }
  })
}
