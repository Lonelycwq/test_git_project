//引入数据库模块
const mysql = require('mysql');
//创建数据库连接
let conn = mysql.createConnection({
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: 'root',
  database: 'baixiu',
  dateStrings: true
});
//连接数据库
conn.connect();
//暴露数据库连接
module.exports = conn;