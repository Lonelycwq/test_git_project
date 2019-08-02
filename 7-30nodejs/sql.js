//引入MySQL
const mysql = require('mysql');
//创建一个连接对象
let connection = mysql.createConnection({
  // host: 'localhost',
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'root',
  //数据库名
  database: 'ajax35'
});
//连接数据库
connection.connect();
//创建一个sql语句
// let sql = `select * from heros`;
// let sql = `INSERT INTO heros SET name='欧米伽',gender='男'`

let sql = `INSERT INTO heros SET ` + `name` + `='666',gender='男'`
// let sql = `INSERT INTO heros SET ` + `name` + `='测试',gender='男',select=66`

//执行sql语句
connection.query(sql, (err, result, fields) => {
  /**
   * err - 如果有错，是一个错误对象，后面的两个参数就是undefined
   * result - sql语句被执行的结果
   * fields - 如果是查询才有，查询出来之后是所有的字段
   */
  if (err) console.log(err);
  console.log(result);
  console.log(fields);
})