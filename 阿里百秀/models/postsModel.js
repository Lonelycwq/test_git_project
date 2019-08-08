//引入数据库连接
const conn = require('../utils/myconn');

//暴露查询文章列表数据方法
module.exports.getAllPost = (obj, callback) => {
  //创建sql语句
  let postSql = `SELECT posts.*, users.nickname,categories.\`name\` FROM posts
                JOIN users ON posts.user_id = users.id
                JOIN categories ON posts.category_id = categories.id
                WHERE 1=1 `;
  //判断请求是否传了cate的值并且不是all
  if (obj.cate && obj.cate !== 'all') {
    //通过判断则拼接字符串在sql添加条件分类栏和请求的值一致
    postSql += ` and category_id = ${obj.cate}`;
  }
  //判断请求是否传了status的值并且不是all
  if (obj.status && obj.status !== 'all') {
    //通过判断则拼接字符串在sql添加条件状态栏和请求的值一致
    postSql += ` and posts.status = '${obj.status}'`;
  }
  postSql += ` ORDER BY id DESC
               limit ${(obj.pageNum-1)*obj.pageSize},${obj.pageSize}`;
  //执行sql语句
  conn.query(postSql, (err, result) => {
    //有报错则返回报错无则返回查询到的数据
    if (err) {
      // console.log(err);
      callback(err);
    } else {
      // console.log(result);
      //创建查询所有数据的总数的sql语句
      let allNumSql = `SELECT count(*) as cou FROM posts
      JOIN users ON posts.user_id = users.id
      JOIN categories ON posts.category_id = categories.id`;
      //执行sql语句
      conn.query(allNumSql, (err2, result2) => {
        //有报错则返回报错无则返回查询到的数据
        if (err2) {
          // console.log(err);
          callback(err2);
        } else {
          callback(null, {
            data: result,
            total: result2[0].cou
          });
        }
      })
    }
  })
}