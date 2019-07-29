//引入模块
const http = require('http');
//引入路由层
const router = require('./MVC路由层');
//创建服务器
const server = http.createServer();
//设置ip端口
server.listen(8080, '127.0.0.1', () => {
  console.log('服务器开启成功，通过 http://127.0.0.1:8080 访问');
});
//注册事件
server.on('request', (req, res) => {
  router(req, res);
})