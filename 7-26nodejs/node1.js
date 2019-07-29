//引入HTTP模版、fs模版、template模版和地址栏模版
const http = require('http');
const fs = require('fs');
const template = require('art-template');
const url = require('url');
//创建一个服务器
const server = http.createServer();
//给服务器设置端口和ip
server.listen(8080, () => {
  console.log('服务器已开启，通过 http://127.0.0.1:8080');
});
//给服务器注册事件
server.on('request', (req, res) => {
  //打印有请求进入
  console.log('有请求进入');
  //判断请求的文件是不是以特定文件夹名称开头
  if (req.url.startsWith('/assets')) {
    //判断请求的文件是不是css结尾
    if (req.url.endsWith('.css')) {
      //文件是css的时候改变响应头
      res.setHeader('Content-Type', 'text/css');
    }
    //读取文件
    fs.readFile('.' + req.url, (err, data) => {
      //判断是否有报错，有则打印
      if (err) console.log(err);
      //将读取到的文件返回浏览器
      res.end(data);
    });
  } else {
    //使用url模块得到请求的方法和参数
    let result = url.parse(req.url, true);
    // //判断请求的地址是否是要求的
    // if (req.url === '/getAllHeros') {
    //   //读取文件
    //   fs.readFile('./data/heros.json', (err, data) => {
    //     //将读取到的文件返回浏览器
    //     res.end(data);
    //   });
    //判断请求的文件是否一致
    if (req.url === '/views/index.html') {
      //读取文件
      fs.readFile('./data/heros.json', 'utf-8', (err, data) => {
        if (err) console.log(err);
        //将读取的字符串转化为数组
        let arr = JSON.parse(data);
        //引入模版
        let html = template(__dirname + '/views/index.html', {
          arr
        });
        //返回数据给浏览器
        res.end(html);
      });
    } else if (req.url === '/views/add.html') {
      //读取静态资源add页面文件
      fs.readFile('./views/add.html', (err, data) => {
        if (err) console.log(err);
        res.end(data);
      })
    }
    //判断请求和请求方式是否一致
    if (result.pathname === '/addHero' && req.method === 'GET') {
      console.log('新增英雄请求进入');
      //读取json文件
      fs.readFile('./data/heros.json', (err, data) => {
        if (err) console.log(err);
        //将读取的json文件转化为数组 
        let arr = JSON.parse(data);
        //声明一个变量作为新增的数据的id
        let id = 0;
        //遍历数组
        arr.forEach(e => {
          //判断得出最大的id
          if (e.id > id) {
            id = e.id;
          }
        });
        //将新增数据加一个id值
        result.query.id = id + 1;
        //将修改后的数据添加到数组的最后
        arr.push(result.query);
        //将数组转化为字符串
        let jsonstr = JSON.stringify(arr);
        //使用fs写入文件，将新的数据字符串重新写入文件中
        fs.writeFile('./data/heros.json', jsonstr, 'utf-8', (err) => {
          if (err) console.log(err);
          //返回提示
          let obj = {
            code: 200,
            msg: '添加成功'
          }
          res.end(JSON.stringify(obj));
        })
      });
    }
  }
});
//npm install - s art-template