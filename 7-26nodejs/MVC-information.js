//引入模块
const fs = require('fs');

//创建对象将所有方法存入
let information = {
  //请求index 页面读取文件方法
  getAllHero: function (callback) {
    //读取数据文件
    fs.readFile('./data/heros.json', 'utf-8', (err, data) => {
      if (err) console.log(err);
      //将字符串json文件转化为数组对象
      let arr = JSON.parse(data);
      //返回带arr的回调函数
      callback(arr);
    })
  },
  //获取最大id的方法
  getMaxId: function (callback) {
    this.getAllHero((arr) => {
      //声明变量假设数组第一个是最大id
      let id = arr[0].id;
      //遍历数组得到最大的id
      for (let i = 1; i < arr.length; i++) {
        //判断id下雨数组中的值就想id重新赋值为大的值
        if (id < arr[i].id) {
          id = arr[i].id;
        }
      }
      //返回一个最大id
      callback(id);
    });
  },
  //将新修改的请求数据写入数据文件
  writeFile: function (arr) {
    //将数组转化为字符串
    let jsonStr = JSON.stringify(arr);
    //重新写入数据文件
    fs.writeFile('./data/heros.json', jsonStr, 'utf-8', (err) => {
      if (err) console.log(err);
    });
  }
}

//将数据层暴露
module.exports = information;