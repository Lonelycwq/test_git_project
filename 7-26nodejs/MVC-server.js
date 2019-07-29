//引入模块
const http = require('http');
//引入路由层
const router = require('./MVC-router');
//创建服务器
const server = http.createServer();
//设置端口号、ip和回调函数
server.listen(8080, '127.0.0.1', () => {
  console.log('服务器已开启，通过http://127.0.0.1:8080 访问');
});
//给服务器注册监听事件
server.on('request', (req, res) => {
  console.log('请求已进入');
  //调用路由层方法
  router(req, res);
})