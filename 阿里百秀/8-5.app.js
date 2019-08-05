//引入模块
const express = require('express'); //需要下载
const session = require('express-session') //需要下载
const bodyParser = require('body-parser'); //需要下载
//引入路由层
const router = require('./8-5.router');

//创建服务器
const app = express();
//设置服务器端口
app.listen(9090, () => {
  console.log('http://127.0.0.1:9090');
});
//托管静态资源 alias
app.use('/assets', express.static('assets'));
app.use('/uploads', express.static('uploads'));
//配置模版引擎为ejs，并设置访问文件默认目录
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
//设置body-parser中间件
app.use(bodyParser.urlencoded({
  extended: false
}));
//设置session中间件
app.use(session({
  //数据加密设置一个任意字符串
  secret: 'my_albx',
  //强制session保存到session store中，不管session有没有更新，都强制保存
  resave: false,
  //强制没有‘初始化’的session保存到storage中
  saveUninitialized: false
}))
//登录状态判断
app.use(function (req, res, next) {
  //所有发送请求前判断是否是登录页面，是否是前台页面和是否已经登录
  if (req.url == '/admin/login' || req.url.indexOf('/admin') == -1 || req.session.goLogin && req.session.goLogin == 'true') {
    //是则继续执行
    next();
  } else {
    //否则则重定向
    res.redirect('/admin/login');
  }
});
//设置路由中间件
app.use(router);