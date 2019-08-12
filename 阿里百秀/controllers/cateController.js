//引入文章列表分类数据模型
const cateModel = require('../models/cateModel');

//获取分类数据的控制器方法
module.exports.getAllCate = (req, res) => {
  //调用获取分类数据模块方法
  cateModel.getAllCate((err, data) => {
    //判断是否返回报错
    if (err) {
      //有报错返回服务器异常
      res.json({
        code: 400,
        msg: '服务器异常'
      });
    } else {
      if (data) {
        //有数据则返回文章列表的分类数据
        res.json({
          code: 200,
          data,
          msg: '查询分类数据成功'
        });
      }
    }
  });
}

//新增分类的控制器方法
module.exports.getAddCate = (req, res) => {
  //获取所有请求的参数
  let obj = req.query;
  obj.id = null;
  // console.log(obj);
  //调用新增分类的数据模型方法
  cateModel.getAddCate(obj, (err, data) => {
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
        msg: '新增分类成功'
      });
    }
  })
}

//根据id编辑分类的控制器方法
module.exports.editCateById = (req, res) => {
  //获取所有请求的参数
  let obj = req.query;
  // console.log(obj);
  //调用新增分类的数据模型方法
  cateModel.editCateById(obj, (err, data) => {
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
        msg: '编辑分类成功'
      });
    }
  })
}

//根据id编辑分类的控制器方法
module.exports.delCateById = (req, res) => {
  //获取所有请求的参数
  let id = req.query.id;
  // console.log(req.query);
  //调用新增分类的数据模型方法
  cateModel.delCateById(id, (err, data) => {
    if (err) {
      console.log(err);
      //有报错返回服务器错误
      res.json({
        code: 400,
        msg: '服务器异常'
      });
    } else {
      //无报错返回查询数据成功
      res.json({
        code: 200,
        msg: '删除分类成功'
      });
    }
  });
}