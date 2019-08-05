//引入MySQL
const mysql = require('mysql');
//创建一个连接对象
let connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'root',
  //数据库名
  database: 'baixiu'
});
//连接数据库
// connection.connect();

module.exports.verifyLogin = (obj, callback) => {
  let loginSql = `SELECT * FROM users WHERE email='${obj.email}'`;
  connection.query(loginSql, (err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, result[0]);
    }
  })
}