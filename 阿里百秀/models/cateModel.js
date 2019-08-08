//引入数据库连接模块
const conn = require('../utils/myconn');

//暴露获取分类数据的方法
module.exports.getAllCate = (callback) => {
  //创建查询分类数据的sql语句
  // let fenleiSql = `SELECT categories.\`name\` FROM posts JOIN categories ON posts.category_id = categories.id `;
  let fenleiSql = `SELECT * FROM categories`;
  //执行sql语句
  conn.query(fenleiSql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      // console.log(result);
      callback(null, result);
    }
  })
}