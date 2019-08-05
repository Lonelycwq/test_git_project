//引入数据模型层
const model = require('../models/usersModel')

//暴露登录帐号验证请求
module.exports.verifyLogin = (req, res) => {
  // console.log(req.body);
  model.verifyLogin(req.body, (err, data) => {
    // console.log(result.password == req.body.password);
    if (err) {
      res.json({
        code: 400,
        msg: '服务器异常'
      })
    } else {
      if (data) {
        if (data.password == req.body.password) {
          // //写入cookie登录状态
          // res.writeHead(200, {
          //   'Set-Cookie': 'isLogin=true'
          // })
          //使用session写入登录状态
          req.session.isLogin = 'true';
          //将当前用户对象存储到session中
          req.session.currentUser = data;
          res.end(JSON.stringify({
            code: 200,
            msg: '登录成功'
          }));
        } else {
          res.json({
            code: 400,
            msg: '密码错误'
          });
        }
      } else {
        res.json({
          code: 400,
          msg: '邮箱输入错误'
        });
      }
    }
  });
}