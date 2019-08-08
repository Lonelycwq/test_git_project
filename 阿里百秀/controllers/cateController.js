//引入文章列表分类数据模型
const cateModel = require('../models/cateModel');

//暴露获取分类数据的方法
module.exports.getAllCate = (req, res) => {
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