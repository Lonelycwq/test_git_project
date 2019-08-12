//引入数据库连接模块
const conn = require('../utils/myconn');

//获取分类数据的数据模型方法
module.exports.getAllCate = (callback) => {
  //创建查询分类数据的sql语句
  // let fenleiSql = `SELECT categories.\`name\` FROM posts JOIN categories ON posts.category_id = categories.id `;
  let fenleiSql = `SELECT * FROM categories WHERE isDelete = 0`;
  //执行sql语句
  conn.query(fenleiSql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      // console.log(result);
      callback(null, result);
    }
  });
}

//新增分类数据的数据模型方法
module.exports.getAddCate = (obj, callback) => {
  //创建sql语句,新增数据使用占位符，?会根据对象中的属性名创建字段
  let addSql = `insert into categories set ?`;
  //执行sql语句，传入一个对象
  conn.query(addSql, obj, (err, reslut) => {
    // console.log(err);
    if (err) {
      callback(err);
    } else {
      // console.log(reslut);
      callback(null);
    }
  });
}

//编辑分类数据的数据模型方法
module.exports.editCateById = (obj, callback) => {
  //创建sql语句,新增数据使用占位符，?会根据对象中的属性名创建字段
  let editSql = `UPDATE categories SET ? WHERE id = ?`;
  //执行sql语句，传入一个对象
  conn.query(editSql, [obj, obj.id], (err, reslut) => {
    // console.log(reslut);
    if (err) {
      callback(err);
    } else {
      // console.log(reslut);
      callback(null);
    }
  });
}
//编辑分类数据的数据模型方法
module.exports.delCateById = (id, callback) => {
  //创建sql语句,新增数据使用占位符，?会根据对象中的属性名创建字段
  let editSql = `UPDATE categories SET isDelete= 1 WHERE id in (${id})`;
  //执行sql语句，传入一个对象
  conn.query(editSql, (err, reslut) => {
    // console.log(reslut);
    if (err) {
      callback(err);
    } else {
      // console.log(reslut);
      callback(null);
    }
  });
}