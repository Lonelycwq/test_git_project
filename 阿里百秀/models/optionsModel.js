//引入数据库连接
const conn = require('../utils/myconn');

//新增导航的数据模型方法
module.exports.getAllMenu = (callback) => {
  //查询所有菜单的sql语句
  let allSql = `select \`value\` from \`options\` where id = 9`;
  //执行sql语句
  conn.query(allSql, (err, result) => {
    // console.log(err);
    if (err) {
      callback(err);
    } else {
      //将查询到的数据转化为对象
      let data = JSON.parse(result[0].value);
      //返回查询得到的数据给浏览器
      callback(null, data)
    }
  })
}

//新增导航的数据模型方法
module.exports.getAddMenu = (obj, callback) => {
  //查询所有菜单的sql语句
  let allSql = `select \`value\` from \`options\` where id = 9`;
  //执行sql语句
  conn.query(allSql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      //将查询到的数据转化为对象
      let arr = JSON.parse(result[0].value);
      //将新增的数据push进数组中
      arr.push(obj);
      //将数据转为json格式字符串
      let jsonStr = JSON.stringify(arr);
      //编辑所有菜单的sql语句
      let editSql = `update \`options\` set \`value\`='${jsonStr}' where id = 9`;
      //执行sql语句
      conn.query(editSql, (err2, result2) => {
        console.log(err2);
        if (err2) {
          callback(err2);
        } else {
          callback(null)
        }
      })
    }
  })
}

//删除导航的数据模型方法
module.exports.delMenuByIndex = (obj, callback) => {
  // console.log(obj);
  //查询所有菜单的sql语句
  let allSql = `select \`value\` from \`options\` where id = 9`;
  //执行sql语句
  conn.query(allSql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      // console.log(result);
      //将查询到的数据转化为对象
      let arr = JSON.parse(result[0].value);
      //循环索引数组，删除数据
      for (let i = 0; i < obj.length; i++) {
        // console.log(obj[i]);
        //将新增的数据push进数组中
        arr.splice(obj[i], 1);
        console.log(arr);
        //索引自减1
        i--;
        if (i < 1) {
          i = 0;
        }
      }
      //将数据转为json格式字符串
      let jsonStr = JSON.stringify(arr);
      console.log(jsonStr);
      //编辑所有菜单的sql语句
      let editSql = `update \`options\` set \`value\`='${jsonStr}' where id = 9`;
      //执行sql语句
      conn.query(editSql, (err2, result2) => {
        console.log(err2);
        if (err2) {
          callback(err2);
        } else {
          callback(null)
        }
      })
    }
  })
}