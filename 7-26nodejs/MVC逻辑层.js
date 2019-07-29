//引入模块
const fs = require('fs');
const queryString = require('querystring');
const template = require('art-template');
const model = require('./MVC数据层');

let controller = {
  //请求静态数据的方法
  staticResource: function (req, res) {
    //判断是css文件时改变请求头
    if (req.url.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css;charset=utf-8');
    }
    //读取文件
    fs.readFile(__dirname + req.url, (err, data) => {
      if (err) console.log(err);
      //将静态数据返回浏览器
      res.end(data);
    })
  },
  //请求主页的方法
  getIndexHtml: function (req, res) {
    model.getAllHero(function (array) {
      //引入模版
      let html = template(__dirname + '/views/index.html', {
        array
      });
      //返回数据给浏览器
      res.end(html);
    })
  },
  //请求新增页面的方法
  getAddHtml: function (req, res) {
    //读取文件并返回浏览器
    fs.readFile('./views/add.html', 'utf-8', (err, data) => {
      if (err) console.log(err);
      res.end(data);
    })
  },
  //请求新增数据的方法
  addNewHero: function (req, res) {
    //声明一个空字符串用来存储接收的参数
    let data = '';
    //注册传输一块一块接收事件
    req.on('data', (chunck) => {
      //将一块一块数据拼接
      data += chunck;
    });
    //注册一个接收完毕事件用来处理数据
    req.on('end', () => {
      //将接收的的字符串数据转为对象
      data = queryString.parse(data);
      model.getAllHero((arr) => {
        //得到最大id
        model.getMaxId((maxId) => {
          //将大的id+1存入新增的对象中
          data.id = maxId + 1;
          arr.push(data);
          model.writeFile(arr);
          //返回提示给用户
          let result = JSON.stringify({
            code: 200,
            msg: '新增成功'
          });
          res.end(result);
        })
      })
    })
  }
}

//暴露逻辑层
module.exports = controller;