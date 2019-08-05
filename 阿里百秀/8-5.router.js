//引入模块
const express = require('express'); //需要下载

//创建路由模块
const router = express.Router();
//引入页面控制器和用户控制器
const pagesController = require('./8-5.pageController');
const usersController = require('./8-5.usersController');

//前台页面请求
router.get('/index', pagesController.getIndex)
  .get('/list', pagesController.getList)
  .get('/detail', pagesController.getDetail);

//后台页面请求
router.get('/admin/index', pagesController.getAdminIndex)
  .get('/admin/categories', pagesController.getAdminCategories)
  .get('/admin/comments', pagesController.getAdminComments)
  .get('/admin/login', pagesController.getAdminLogin)
  .get('/admin/nav-menus', pagesController.getAdminNavMenus)
  .get('/admin/password-reset', pagesController.getAdminPasswprdReset)
  .get('/admin/post-add', pagesController.getAdminPostAdd)
  .get('/admin/posts', pagesController.getAdminPosts)
  .get('/admin/profile', pagesController.getAdminProfile)
  .get('/admin/settings', pagesController.getAdminSettings)
  .get('/admin/slides', pagesController.getAdminSlides)
  .get('/admin/users', pagesController.getAdminUsers);

//登录帐号验证请求
router.post('/goLogin', usersController.goLogin);

//暴露路由层
module.exports = router;