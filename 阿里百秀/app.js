//使用express模块快速搭建服务器
//引入expres模块
const express = require('express');
//引入body-parser模块
const bodyParser = require('body-parser')
//引入express-session模块
const session = require('express-session');
//引入路由层
const router = require('./router');
//创建服务器
const app = express();
//设置服务器
app.listen(8080, () => {
  console.log('http://127.0.0.1:8080');
});
//注册body-parser中间件，作用是解析post请求
app.use(bodyParser.urlencoded({
  extended: false
}));
// 在express中使用session中间件,因为默认情况下，express并不会开启sesison的使用
app.use(session({
  //加盐，加一个加密秘钥，值为任意字符串
  secret: 'my_albx',
  //强制session保存到session store中，不管session有没有更新，都强制保存
  resave: false,
  //强制没有‘初始化’的session保存到storage中
  saveUninitialized: false
}))
//托管静态资源
app.use('/assets', express.static('assets'));
app.use('/uploads', express.static('uploads'));
//添加全局的中间件，每次请求都会通过这个中间件
app.use(function (req, res, next) {
  //判断三种情况下直接跳过此中间件使用下一个中间件
  //1.请求登录页面；2.请求前台三个页面3.已登录
  if (req.url == '/admin/login' || req.url.indexOf('/admin') == -1 || req.session.isLogin && req.session.isLogin == 'true') {
    next();
  } else {
    res.redirect('/admin/login');
  }
})
//设置默认模版引擎
app.set('view engine', 'ejs');
//进行ejs模板文件查询的默认目录配置
app.set('views', __dirname + '/views');
//使用路由中间件
app.use(router);