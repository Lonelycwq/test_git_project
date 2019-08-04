//引入模块
const controller = require('./sql-controller');
const express = require('express');
//创建路由对象
const router = express.Router;

//创建主页请求
router.get('/index', (req, res) => {
  controller.getIndexHtml(req, res);
});

//创建新增页请求
router.get('/add', (req, res) => {
  controller.getAddHtml(req, res);
});

//创建新增英雄请求
router.post('/addNewHero', (req, res) => {
  controller.addNewHero(req, res);
});

//创建修改页请求
router.get('/edit', (req, res) => {
  controller.getEditHtml(req, res);
});

//创建根据id获取英雄数据请求
router.get('/getHeroById', (req, res) => {
  controller.getHeroById(req, res);
});

//创建修改数据请求请求
router.post('/editHero', (req, res) => {
  controller.editHero(req, res);
});

//创建删除数据请求请求
router.get('/delHero', (req, res) => {
  controller.delHero(req, res);
});



//暴露路由层
module.exports = router;