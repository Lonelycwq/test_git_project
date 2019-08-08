//引入数据库连接
const conn = require('../utils/myconn');

module.exports.verifyLogin = (obj, callback) => {
  let loginSql = `SELECT * FROM users WHERE email='${obj.email}'`;
  conn.query(loginSql, (err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, result[0]);
    }
  })
}