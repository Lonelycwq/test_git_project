//引入数据层model模块
const model = require('./model');

//请求主页的方法
function getIndexHtml(req, res) {
  //引用数据层获取所有英雄的方法
  model.getAllHero((arr) => {
    //引入模版引擎将数据传入
    res.render('index', {
      arr
    });
  });
}
//请求新增页的方法
function getAddHtml(req, res) {
  //使用模版引擎直接读取返回页面
  res.render('add');
}
//请求修改页的方法
function getEditHtml(req, res) {
  //使用模版引擎直接读取返回页面
  res.render('edit');
}
//通过id获取数据的方法
function getHeroById(req, res) {
  //获取到请求参数的id
  let id = req.query.id;
  //使用方法获取到id对应的数据
  model.getHeroById(id, (target) => {
    //声明一个空对象
    let response = {};
    //判断是否有对应的数据,传回浏览器对应的对象
    if (target) {
      response.code = 200;
      response.msg = '获取数据成功';
      response.data = target;
    } else {
      response.code = 503;
      response.msg = '没有找到对应的数据，请确认id是否正确';
    }
    res.send(response);
  })
}
//修改英雄数据的方法
function editHeroById(req, res) {
  //获取请求的参数数据
  let data = req.body;
  //先获取所有英雄数据
  model.getAllHero((arr) => {
    // arr.forEach((e, i) => {
    //   //判断数组中数据id相等于请求参数的数据id
    //   if (e.id === data.id) {
    //     //将所有英雄的中进入判断的那条数据重新赋值为请求数据
    //     e = data;
    //     console.log(222);
    //     break;
    //   }
    // });
    //遍历数组
    for (let i = 0; i < arr.length; i++) {
      //判断数组中数据id相等于请求参数的数据id
      if (arr[i].id === data.id) {
        //将所有英雄的中进入判断的那条数据重新赋值为请求数据
        arr[i] = data;
        break;
      }
    }
    //将新数据写入json
    model.writeFile(arr);
    //修改成功返回提示
    res.send({
      code: 200,
      msg: '修改成功'
    });
  });
}
//请求删除英雄的方法
function delHero(req, res) {
  //获取请求带回的参数
  let id = req.query.id;
  //调用获取全部英雄数据的方法、
  model.getAllHero((arr) => {
    // //遍历获取到总英雄数据数组
    // arr.forEach((e, i) => {
    //   //判断总数据中id和请求删除带的id相等
    //   if (e.id == id) {
    //     //通过判断时将数组中通过的那条数据删除
    //     arr.splice(i, 1);
    //     //跳出循环
    //     break;
    //   }
    // });
    //使用findIndex方法判断数组中是否有id相同的数据
    let identical = arr.findIndex((e) => {
      return e.id == id;
    });
    //使用三元表达式判断，有则返回符合条件的元素的索引位置，无则返回-1
    identical != -1 ? arr.splice(identical, 1) : 0;
    console.log(arr);
    //删除数据后将新数据写入json文件
    model.writeFile(arr);
    //返回提示给浏览器
    res.send({
      code: 200,
      msg: '删除成功'
    });
  });
}
//新增数据的方法
function addNewHero(req, res) {
  //先读取出数据来
  model.getAllHero((arr) => {
    //获得全部数据中最大id
    model.getMaxId((maxId) => {
      //计算得出新数据的id
      req.body.id = maxId + 1;
      //将新数据添加到总数据的数组中
      arr.push(req.body);
      console.log(arr);
      //将新的总数据写入json文件中
      model.writeFile(arr);
      //返回提示对象
      res.send({
        code: 200,
        msg: '新增成功'
      });
    });
  });
}

let controller = {
  getIndexHtml,
  getAddHtml,
  getEditHtml,
  editHeroById,
  getHeroById,
  delHero,
  addNewHero
}

//暴露逻辑层model对象
module.exports = controller;