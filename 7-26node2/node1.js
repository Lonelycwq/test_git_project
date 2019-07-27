// //引入服务器模块
// const http = require('http');
// //引入读取文件模块
// const fs = require('fs');
// //创建一个服务器
// const server = http.createServer();
// //给服务器设置端口和ip
// server.listen(8080, '127.0.0.1', () => {
//   console.log('服务器已开启，可以通过http://127.0.0.1:8080 访问');
// })
// //注册一个浏览器访问服务器事件
// server.on('request', (req, res) => {
//   console.log('是谁在敲我的窗');
//   //设置响应头编码格式
//   res.setHeader('Content-Type', 'text/html;charset=utf-8');
//   //返回值
//   console.log(req.url);
//   res.end('是谁在敲我的窗')
// })

//引入HTTP模版和fs模版和template模版
const http = require('http');
const fs = require('fs');
const template = require('art-template');
//创建一个服务器
const server = http.createServer();
//给服务器设置端口和ip
server.listen(8080, () => {
  console.log('服务器已开启，通过 http://127.0.0.1:8080');
});
//给服务器注册事件
server.on('request', (req, res) => {
  //打印有请求进入
  console.log('有请求进入');
  //判断请求的文件是不是以特定文件夹名称开头
  if (req.url.startsWith('/assets')) {
    //判断请求的文件是不是css结尾
    if (req.url.endsWith('.css')) {
      //文件是css的时候改变响应头
      res.setHeader('Content-Type', 'text/css');
    }
    //读取文件
    fs.readFile('.' + req.url, (err, data) => {
      //判断是否有报错，有则打印
      if (err) console.log(err);
      //将读取到的文件返回浏览器
      res.end(data);
    });
  } else {
    // //判断请求的地址是否是要求的
    // if (req.url === '/getAllHeros') {
    //   //读取文件
    //   fs.readFile('./data/heros.json', (err, data) => {
    //     //将读取到的文件返回浏览器
    //     res.end(data);
    //   });
    //判断请求的文件是否一致
    if (req.url === '/views/index.html') {
      //读取文件
      fs.readFile('./data/heros.json', 'utf-8', (err, data) => {
        if (err) console.log(err);
        //将读取的字符串转化为数组
        let arr = JSON.parse(data);
        //引入模版
        let html = template(__dirname + '/views/index.html', {
          arr
        });
        //返回数据给浏览器
        res.end(html);
      });
    }
  }
});
//npm install - s art-template