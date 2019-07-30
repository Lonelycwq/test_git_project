// //引入express
// const experss = require('express');
// //调用逻辑层
// const controller = require('./controller');
// //创建一个路由对象
// const router = experss.Router(); //express的路由是一个对象的方法
// //使用router对象，实现所有请求监听
// //监听index请求
// router.get('/index', (req, res) => {
//   //调用请求index方法
//   controller.getIndexHtml(req, res);
// });
// //监听删除请求
// router.get('/delHero', (req, res) => {
//   //调用请求删除英雄方法
//   controller.delHero(req, res);
// });
// //将路由层暴露
// module.exports = router;


//引入express模块
const express = require('express');
//创建一个路由对象
const router = express.Router();
//引入逻辑层
const controller = require('./controller');


//监听index页面请求
router.get('/index', (req, res) => {
  controller.getIndexHtml(req, res);
});

//监听add页面请求
router.get('/add', (req, res) => {
  controller.getAddHtml(req, res);
});

//监听删除英雄的请求
router.get('/delHero', (req, res) => {
  controller.delHero(req, res);
});

//监听请求新增数据的方法
router.post('/addNewHero', (req, res) => {
  controller.addNewHero(req, res);
});


//暴露路由层router对象
module.exports = router;