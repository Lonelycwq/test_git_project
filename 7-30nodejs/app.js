// //引入模块
// const express = require('express');
// //创建服务器
// const app = express();
// //绑定端口和ip
// app.listen(8080, () => {
//   console.log('服务器已开启，通过http://127.0.0.1:8080 访问');
// });
// //请求静态资源
// // app.use('/views', express.static('views'));
// app.use('/assets', express.static('assets'));
// // //设置pug为express的默认模版引擎
// // app.set('view engine', 'pug');

// // app.get('/test.pug', (req, res) => {
// //   //将模版文件导入数据
// //   res.render('test', {
// //     title: '主页',
// //     mag: 'hello world!'
// //   });
// // })

// //使用ejs模版引擎
// app.set('view engine', 'ejs');
// //将模版文件导入数据
// app.get('/ejs', (req, res) => {
//   res.render('test2', {
//     name: '张三',
//     age: 11,
//     gender: '男',
//     id: 1
//   })
// })
// //请求监听
// app.get('/', (req, res) => {
//   res.send('请求进入');
// })
// //引入模块
// const express = require('express');
// //引入路由层
// const router = require('./router');
// //创建服务器
// const app = express();
// //设置端口号，ip
// app.listen(8080, () => {
//   console.log('请求成功，通过http://127.0.0.1:8080 访问');
// });
// //请求静态数据文件
// app.use('/assets', express.static('assets'));
// //设置默认模版引擎
// app.set('view engine', 'ejs');
// //注册路由中间件
// app.use(router);


// //引入express模块
// const express = require('express');
// const fs = require('fs');
// //创建一个服务器
// let app = express();
// //设置端口号ip
// app.listen(8080, () => {
//   console.log('http://127.0.0.1:8080');
// });
// //请求静态资源,以/assets开头的请求
// app.use('/assets', express.static('assets'));
// //设置默认模版引擎
// app.set('view engine', 'ejs');
// //监听浏览器
// app.get('/index', (req, res) => {
//   //读取文件
//   fs.readFile('./data/heros.json', 'utf-8', (err, data) => {
//     if (err) console.log(err);
//     //转化字符串为对象
//     let arr = JSON.parse(data);
//     //引入模版引擎
//     res.render('index', {
//       arr
//     });
//   });
// });


//引入express模块
const express = require('express');
//引入路由层
// const router = require('./router');
const router = require('./routerOld');
//引入body-parser中间件
const bodyParser = require('body-parser')
//创建一个服务器
let app = express();
//设置端口号ip
app.listen(8080, () => {
  console.log('http://127.0.0.1:8080');
});
// let allow = function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   next();
// }
// app.use(allow)
//请求静态资源,以/assets开头的请求的数据
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use('/assets', express.static('assets'));
//设置默认模版引擎
app.set('view engine', 'ejs');
//注册body-parser中间件，作用是解析post请求
//调用路由层方法
app.use(router);