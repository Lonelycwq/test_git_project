//引入模块
const express = require('express'); //需要下载

//引入数据库模块
const mysql = require('mysql');
//创建数据库连接
let con = mysql.createConnection({
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: 'root',
  database: 'baixiu'
});

//登录请求查询数据库方法
module.exports.goLogin = function (email, callback) {
  //创建sql语句
  let loginSql = `SELECT * FROM users WHERE email='${email}'`;
  //执行sql语句
  con.query(loginSql, (err, result) => {
    //判断有报错则返回报错
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, result[0]);
    }
  })

}