//引入服务器模块
const http = require('http');
//引入读取文件模块
const fs = require('fs');
//创建一个服务器
const server = http.createServer();
//给服务器设置端口和ip
server.listen(8080, '127.0.0.1', () => {
  console.log('服务器已开启，可以通过http://127.0.0.1:8080 访问');
})
//注册一个浏览器访问服务器事件
server.on('request', (req, res) => {
  console.log('是谁在敲我的窗');
  //设置响应头编码格式
  res.setHeader('Content-Type', 'text/html;charset=utf-8');
  //返回值
  console.log(req.url);
  res.end('是谁在敲我的窗')
})