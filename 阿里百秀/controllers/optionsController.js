//引入设置功能数据模型
const optionsModel = require('../models/optionsModel');

//导航菜单新增控制器方法
module.exports.getAllMenu = (req, res) => {
  //调用数据模型的新增菜单方法
  optionsModel.getAllMenu((err, data) => {
    if (err) {
      // console.log(err);
      //有报错返回服务器错误
      res.json({
        code: 400,
        msg: '服务器异常'
      });
    } else {
      //无报错返回查询数据成功
      res.json({
        code: 200,
        msg: '查询数据成功',
        data
      });
    }
  });
}

//导航菜单新增控制器方法
module.exports.getAddMenu = (req, res) => {
  //获取请求参数的对象
  let obj = req.body;
  //调用数据模型的新增菜单方法
  optionsModel.getAddMenu(obj, (err) => {
    if (err) {
      // console.log(err);
      //有报错返回服务器错误
      res.json({
        code: 400,
        msg: '服务器异常'
      });
    } else {
      //无报错返回查询数据成功
      res.json({
        code: 200,
        msg: '新增导航成功'
      });
    }
  });
}

//导航菜单删除控制器方法
module.exports.delMenuByIndex = (req, res) => {
  //获取请求参数的对象
  let obj = req.query.arr;
  // console.log(obj);
  //数组字符串转为对象
  // obj = JSON.parse(obj);
  //调用数据模型的新增菜单方法
  optionsModel.delMenuByIndex(obj, (err) => {
    if (err) {
      // console.log(err);
      //有报错返回服务器错误
      res.json({
        code: 400,
        msg: '服务器异常'
      });
    } else {
      //无报错返回查询数据成功
      res.json({
        code: 200,
        msg: '删除导航成功'
      });
    }
  });
}