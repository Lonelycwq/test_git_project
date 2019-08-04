// 这个控制器完成所有与用户相关的业务操作
const userModel = require('../models/userModel.js')
exports.login = (req,res) => {
    // 接收参数
    // 业务处理--调用数据模块
    userModel.login(参数,回调函数)
    // 返回结果
}