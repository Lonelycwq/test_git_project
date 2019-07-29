const fs = require('fs');


let model = {
  getAllHero: function (callback) {
    //读取文件
    fs.readFile('./data/heros.json', 'utf-8', (err, data) => {
      if (err) console.log(err);
      //将读取的字符串转化为数组
      let arr = JSON.parse(data);
      callback(arr);
    });
  },
  getMaxId: function (callback) {
    //读取json文件
    this.getAllHero((arr) => {
      let id = arr[0].id;
      //遍历数据将最大的id存入
      for (let i = 1; i < arr.length; i++) {
        //如果遍历的id大于第一个数据，重新将id赋值为更大的
        if (id < arr[i].id) {
          id = arr[i].id;
        }
      }
      //返回最大id
      callback(id);
    })
  },
  writeFile: function (arr) {
    //将数组转化为json格式字符串
    let jsonStr = JSON.stringify(arr);
    fs.writeFile('./data/heros.json', jsonStr, 'utf-8', (err, data) => {
      if (err) {
        console.log(err);
      }
    })

  }
}

module.exports = model;