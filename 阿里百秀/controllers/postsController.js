//引入文章列表数据模型
const postsModel = require('../models/postsModel');

//暴露获取所有文章列表控制器方法
module.exports.getAllPost = (req, res) => {
  //获取get请求的数据
  let obj = req.query;
  //引入获取文章列表数据模型方法
  postsModel.getAllPost(obj, (err, data) => {
    //判断是否返回报错
    if (err) {
      //有报错返回服务器异常
      res.json({
        code: 400,
        msg: '服务器异常'
      });
    } else {
      if (data) {
        //有数据则返回文章列表数据
        res.json({
          code: 200,
          data,
          msg: '查询文章列表成功'
        });
      } else {
        //未查询到数据则返回无文章
        res.json({
          code: 400,
          msg: '无文章'
        });
      }
    }
  });
}