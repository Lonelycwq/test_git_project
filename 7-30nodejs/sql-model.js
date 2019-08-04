//引入fs模块
const fs = require('fs');
//引入MySQL
const mysql = require('mysql');
//创建一个连接对象
let connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'root',
  //数据库名
  database: 'ajax35'
});
//连接数据库
connection.connect();
//获取所有英雄的方法
function getAllHero(callback) {
  //创建一个sql语句
  let getAllSql = `select * from heros WHERE isDelete=0`;
  //执行sql语句
  connection.query(getAllSql, (err, result, fields) => {
    if (err) console.log(err);
    callback(result);
  });
}
//新增英雄数据的方法
function AddHero(obj) {
  //创建新增语句
  let getAddSql = `INSERT INTO heros SET name='${obj.name}',gender='${obj.gender}',img='${obj.img}'`
  //执行sql语句
  connection.query(getAddSql, (err, result, fields) => {
    if (err) console.log(err);
    console.log(result);
  });
}
//编辑英雄数据的方法
function editHero(obj) {
  //创建编辑语句
  let getEditSql = `UPDATE heros SET name='${obj.name}',gender='${obj.gender}',img='${obj.img}' WHERE id=${obj.id}`;
  //执行sql语句
  connection.query(getEditSql, (err, result, fields) => {
    if (err) console.log(err);
  });
}
//通过id获取对应数据的方法
function getHeroById(obj, callback) {
  //创建一个sql语句
  let getIdSql = `SELECT * FROM heros WHERE id=${obj.id}`;
  //执行sql语句
  connection.query(getIdSql, (err, result, fields) => {
    if (err) console.log(err);
    callback(result[0]);
  });
}
//删除对应数据的方法
function delHero(obj) {
  //创建修改语句
  let getDelSql = `UPDATE heros SET isDelete=1 WHERE id=${obj.id}`
  //执行sql语句
  connection.query(getDelSql, (err, result, fields) => {
    if (err) console.log(err);
  });
}

let model = {
  getAllHero,
  AddHero,
  editHero,
  getHeroById,
  delHero
}

//暴露数据层model对象
module.exports = model;