//引入模块
const express = require('express'); //需要下载
//引入用户数据模型层
const usersModel = require('./8-5.usersModel');
//暴露登录请求
module.exports.goLogin = function (req, res) {
  //获取登录请求参数的邮箱
  let email = req.body.email;
  //调用数据层登录请求方法
  usersModel.goLogin(email, (err, data) => {
    //判断是否返回err
    if (err) {
      //有报错则返回服务器异常
      res.json({
        code: 500,
        msg: '服务器异常'
      });
    } else {
      //判断如果有返回数据
      if (data) {
        //有数据则判断秘密是否一致，一致则登录成功能保存登录状态
        if (req.body.password == data.password) {
          //将登录状态保存到session中
          req.session.goLogin = 'true';
          //将返回用户数据保存在session中
          req.session.currentUser = data;
          res.json({
            code: 200,
            msg: '登录成功'
          });
        } else {
          res.json({
            code: 400,
            msg: '密码错误'
          });
        }
      } else {
        //没有报错没有返回数据则说明没有查询到数据
        res.json({
          code: 400,
          msg: '邮箱错误'
        });
      }
    }
  })

}