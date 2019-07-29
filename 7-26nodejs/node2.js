//引入模块
const http = require('http');
const fs = require('fs');
const queryString = require('querystring');
const template = require('art-template');
//创建服务器
const server = http.createServer();
//设置ip端口
server.listen(8080, '127.0.0.1', () => {
  console.log('服务器开启成功，通过 http://127.0.0.1:8080 访问');
});
//注册事件
server.on('request', (req, res) => {
  //先请求静态资源
  if (req.url.startsWith('/assets')) {
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
  } else {
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
    } else
      //请求新增页面文件
      if (req.url === '/views/add.html') {
        //读取文件并返回浏览器
        fs.readFile('./views/add.html', 'utf-8', (err, data) => {
          if (err) console.log(err);
          res.end(data);
        })
      } else if (req.url === '/addNewHero' && req.method === 'POST') {
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
        //读取json文件
        fs.readFile('./data/heros.json', 'utf-8', (err, content) => {
          if (err) console.log(err);
          //将读取到的json文件转化为对象
          let arr = JSON.parse(content);
          //设置新添加的数据的id数组中最后一个id的值+1
          let id = arr[0].id;
          //遍历数据将最大的id存入
          for (let i = 1; i < arr.length; i++) {
            //如果遍历的id大于第一个数据，重新将id赋值为更大的
            if (id < arr[i].id) {
              id = arr[i].id;
            }
          }
          //将大的id+1存入新增的对象中
          data.id = id + 1;
          arr.push(data);
          //将数组转化为json格式字符串
          let jsonStr = JSON.stringify(arr);
          //将新的数据写入json文件中
          fs.writeFile('./data/heros.json', jsonStr, 'utf-8', (err, data) => {
            if (err) {
              console.log(err);
            } else {
              //返回提示给用户
              let result = JSON.stringify({
                code: 200,
                msg: '新增成功'
              });
              res.end(result);
            }
          })
        })
      })
    }
  }
})