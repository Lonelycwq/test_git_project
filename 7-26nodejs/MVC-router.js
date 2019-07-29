//引入逻辑层
const logic = require('./MVC-logic');


//创建对象将所有请求存入
let router = function (req, res) {
  //判断静态资源请求
  if (req.url.startsWith('/assets')) {
    //写入静态资源请求里面的逻辑处理方法
    logic.getStaticResource(req, res);
  }
  //判断index页面请求
  if (req.url === '/views/index.html') {
    //写入主页请求的逻辑处理方法
    logic.getIndexHtml(req, res);
  }
  //判断add页面请求
  if (req.url === '/views/add.html') {
    //写入新增请求的逻辑处理方法
    logic.getAddHtml(req, res);
  }
  //判断新增英雄请求
  if (req.url === '/addNewHero' && req.method === 'POST') {
    //写入新增英雄请求的逻辑处理方法
    logic.getNewHero(req, res);
  }
}

//将路由层暴露
module.exports = router;