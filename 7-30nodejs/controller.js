//引入数据层model模块
const model = require('./model');

//请求主页的方法
function getIndexHtml(req, res) {
  //引用数据层获取所有英雄的方法
  model.getAllHero((arr) => {
    //引入模版引擎将数据传入
    res.render('index', {
      arr
    });
  });
}
//请求新增页的方法
function getAddHtml(req, res) {
  //使用模版引擎直接读取返回页面
  res.render('add');
}
//请求修改页的方法
function getEditHtml(req, res) {
  //使用模版引擎直接读取返回页面
  res.render('edit');
}
//新增英雄数据的方法
function addNewHero(req, res) {
  //将新的总数据写入json文件中
  model.writeFile(req.body);
  //返回提示对象
  res.send({
    code: 200,
    msg: '新增成功'
  });
}
//通过id获取数据的方法
function getHeroById(req, res) {
  //查询对应id数据的方法
  model.getHeroById(req.query, (target) => {
    //声明一个空对象
    let response = {};
    //判断是否有对应的数据,传回浏览器对应的对象
    if (target) {
      response.code = 200;
      response.msg = '获取数据成功';
      response.data = target;
    } else {
      response.code = 503;
      response.msg = '没有找到对应的数据，请确认id是否正确';
    }
    console.log(target);
    res.send(response);
  })
}
//修改英雄数据的方法
function editHero(req, res) {
  //根据id修改数据库方法
  model.editHero(req.body);
  //修改成功返回提示
  res.send({
    code: 200,
    msg: '修改成功'
  });
}
//请求删除英雄的方法
function delHero(req, res) {
  //改变数据库软删除字段
  model.delHero(req.query);
  //返回提示给浏览器
  res.send({
    code: 200,
    msg: '删除成功'
  });
}

let controller = {
  getIndexHtml,
  getAddHtml,
  getEditHtml,
  addNewHero,
  getHeroById,
  editHero,
  delHero
}

//暴露逻辑层model对象
module.exports = controller;