//引入fs模块
const fs = require('fs');

//获取所有英雄的方法
function getAllHero(callback) {
  //读取文件获取数据
  fs.readFile('./data/heros.json', 'utf-8', (err, data) => {
    if (err) console.log(err);
    //将文件转化为数组对象
    let arr = JSON.parse(data);
    callback(arr);
  });
}
//写入json文件的方法
function writeFile(arr) {
  //将对象转化为json格式的字符串
  let content = JSON.stringify(arr);
  //写入文件
  fs.writeFile('./data/heros.json', content, 'utf-8', (err) => {
    if (err) console.log(err);
  });
}
//获取最大id的方法
function getMaxId(callback) {
  //调用获取数据的方法
  this.getAllHero((arr) => {
    //假设数组的第一个数据的id是最大id
    let id = arr[0].id;
    //遍历数组
    for (let i = 1; i < arr.length; i++) {
      //判断数组中数据的id是否大于最大id
      if (arr[i].id > id) {
        //谁大给最大id重新赋值
        id = arr[i].id;
      }
    }
    //回调函数返回最大id
    callback(id);
  });
}
//通过id获取对应数据的方法
function getHeroById(id, callback) {
  //获取所有英雄数据
  this.getAllHero((arr) => {
    //查找对应id的获取数据
    let target = arr.find((e) => {
      return e.id == id;
    });
    //回调函数返回target
    callback(target);
  });
}

let model = {
  getAllHero,
  writeFile,
  getMaxId,
  getHeroById
}

//暴露数据层model对象
module.exports = model;