// console.log('hello,world');
// alert('hello world');
// const http = require('http');
// const server = http.createServer();
// //192.168.70.34
// server.listen(8080, '192.168.70.34', () => {
//   console.log('服务器已启动,通过http://192.168.70.34:8080请求');
// });
// //req---request  res---response
// server.on('request', (req, res) => {
//   console.log('有请求进入');
//   res.setHeader('Content-Type', 'text/html;charset=utf-8');
//   res.end('傻嘉，你怕是个傻子吧');
// });
// const http = require('http');
// const server = http.createServer();
// server.listen(8888, '127.0.0.1', () => {
//   console.log('服务器已启动，通过http://127.0.0.1:8888请求');
// });
// server.on('request', (req, res) => {
//   console.log('有请求进入');
//   res.setHeader('Content-Type', 'text/html;charset=utf-8');
//   res.end('你在干什么');
// });
//
// 搭建服务器的第一步： 引入http模块
const http = require('http');
// 创建一个服务器
const server = http.createServer();
// 给服务器绑定ip、端口和回调函数
server.listen(8080, '127.0.0.1', () => {
  console.log('服务器已启动，通过 http://127.0.0.1:8080 访问');
});
// 告诉服务器，要接收用户发送过来的请求
// 给server注册一个浏览器请求服务器事件
// server.on(事件类型,回调函数)
server.on('request', (req, res) => {
  console.log('有请求进入');
  // 设定响应头可以解决中文乱码的问题，但是一定要在返回之前设定
  res.setHeader('Content-Type', 'text/html;charset=utf-8');
  if (req.url === '/index.html') {
    // 我们要给浏览器返回一点数据
    res.end('<h1>主页</h1>');
  } else if (req.url === '/list.html') {
    let html = `<h1>列表页</h1>`;
    res.end(html);
  } else if (req.url === '/detail.html') {
    res.end('<h1>详情页</h1>');
  } else {
    res.end('404');
  }
});

//引入fs模块
const fs = require('fs');
//调用fs模块的方法读取文件的内容
fs.readFile('./content.json', 'utf-8', (err, data) => {
  if (err) throw err;
  console.log(data);
})