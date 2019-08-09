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

//暴露新增文章控制器
module.exports.addPost = (req, res) => {
  //获取请求带的参数对象
  let obj = req.body;
  //设置数据库其他三个字段数据
  // obj.id = null;
  obj.views = 0;
  obj.likes = 0;
  obj.user_id = req.session.currentUser.id;
  // console.log(obj);
  //引用新增文章数据模型
  postsModel.addPost(obj, (err, data) => {
    if (err) {
      console.log(err);
      //有报错返回服务器错误
      res.json({
        code: 400,
        msg: '服务器异常'
      });
    } else {
      //无报错返回新增成功
      res.json({
        code: 200,
        msg: '新增文章成功'
      });
    }
  })
}