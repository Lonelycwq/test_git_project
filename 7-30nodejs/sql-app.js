 //引入模块
 const express = require('express');
 const bodyParser = require('body-parser');
 const router = require('./sql-router');
 //创建服务器
 const app = express();

 //静态数据访问
 app.use('/assets', express.static('assets'));

 //设置默认模版引擎
 app.set('view engine', 'ejs');

 //设置bodyparser模块
 app.use(bodyParser.urlencoded({
   extended: false
 }));

 //设置服务器配置
 app.listen(8080, () => {
   console.log('http://127.0.0.1:8080');
 });

 //引入路由中间件
 app.use(router);