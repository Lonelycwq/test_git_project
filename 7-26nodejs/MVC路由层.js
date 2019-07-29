//引入逻辑层模块
const controller = require('./MVC逻辑层');

let router = function (req, res) {
  //先请求静态资源
  if (req.url.startsWith('/assets')) {
    controller.staticResource(req, res);
  }
  if (req.url === '/views/index.html') {
    controller.getIndexHtml(req, res);
  }
  //请求新增页面文件
  if (req.url === '/views/add.html') {
    controller.getAddHtml(req, res);
  }
  if (req.url === '/addNewHero' && req.method === 'POST') {
    controller.addNewHero(req, res);
  }

}
module.exports = router;