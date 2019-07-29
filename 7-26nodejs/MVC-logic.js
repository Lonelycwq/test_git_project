//引入模块
const fs = require('fs');
const template = require('art-template');
const queryString = require('querystring');

//引入数据层
const information = require('./MVC-information');


//创建对象将所有方法存入
let logic = {
  //请求静态资源逻辑
  getStaticResource: function (req, res) {
    //判断是否是css文件
    if (req.url.endsWith('.css')) {
      //设置请求头
      res.setHeader('Content-Type', 'text/css');
    }
    //读取静态文件
    fs.readFile(__dirname + req.url, (err, data) => {
      if (err) console.log(err);
      //将读取的文件返回浏览器
      res.end(data);
    });
  },
  //请求index页面的方法
  getIndexHtml: function (req, res) {
    //调用读取数据方法
    information.getAllHero((array) => {
      //调用模版引擎获取到整个页面的字符串
      let html = template(__dirname + '/views/index.html', {
        array
      }, 'utf-8')
      //将模版引擎返回浏览器
      res.end(html);
    })
  },
  //请求add新增页面的方法
  getAddHtml: function (req, res) {
    //读取页面文件
    fs.readFile('./views/add.html', 'utf-8', (err, data) => {
      if (err) console.log(err);
      //返回页面给浏览器
      res.end(data);
    });
  },
  //请求新增英雄方法
  getNewHero: function (req, res) {
    //声明一个空字符串存放数据
    let data = '';
    //给请求注册一个分块请求的事件
    req.on('data', (chunck) => {
      //将分块请求的数据拼接
      data += chunck;
    });
    console.log(data);
    //注册一个请求完毕的事件
    req.on('end', () => {
      //将拼接的字符串转为对象
      data = queryString.parse(data);
      information.getAllHero((arr) => {
        information.getMaxId((maxId) => {
          //将最大id+1添加到新传的数据中
          data.id = maxId + 1;
          //将新传的数据添加在数据数组中
          arr.push(data);
          information.writeFile(arr);
          //创建一个对象
          let result = {
            code: 200,
            msg: '新增成功'
          }
          //将对象返回浏览器
          res.end(JSON.stringify(result));
        })
      });
    });
  }
}

//将逻辑层暴露
module.exports = logic;