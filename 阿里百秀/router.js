//引入express模块
const express = require('express');
//引入页面返回控制器
const pagesController = require('./controllers/pagesController');
//引入登录控制器
const usersController = require('./controllers/usersController');
//引入文章列表控制器
const postsController = require('./controllers/postsController');
//引入文章列表分类控制器
const cateController = require('./controllers/cateController');
//引入文件上传控制器
const uploadController = require('./controllers/uploadController');
//引入设置模块控制器
const optionsController = require('./controllers/optionsController');
//创建路由对象
const router = express.Router();

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
router.post('/verifyLogin', usersController.verifyLogin);

//文章列表页数据请求
router.get('/getAllPost', postsController.getAllPost);

//文章分类数据请求
router.get('/getAllCate', cateController.getAllCate);

//图片文件上传请求
router.post('/uploadFiles', uploadController.uploadFiles);

//文章新增请求
router.post('/addPost', postsController.addPost)

  //根据id获取文章数据请求
  .get('/getPostById', postsController.getPostById)

  //根据id编辑文章数据请求
  .post('/editPostById', postsController.editPostById)

  //根据id删除文章数据请求
  .get('/delPostById', postsController.delPostById)

//新增分类数据请求
router.get('/getAddCate', cateController.getAddCate)

  //修改分类数据请求
  .get('/editCateById', cateController.editCateById)

  //新增分类数据请求
  .get('/delCateById', cateController.delCateById);

//查询导航菜单请求
router.get('/getAllMenu', optionsController.getAllMenu)

  //新增导航菜单请求
  .post('/getAddMenu', optionsController.getAddMenu)

  //删除导航菜单请求
  .get('/delMenuByIndex', optionsController.delMenuByIndex);

//暴露路由层
module.exports = router;