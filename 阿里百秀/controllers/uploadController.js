//引入path模块
const path = require('path');
//引入文件上传模块
const formidable = require('formidable');

//暴露上传文件的方法
module.exports.uploadFiles = (req, res) => {
  //创建一个文件上传对象
  let form = new formidable.IncomingForm();
  //设置编码格式
  form.encoding = 'utf-8';
  //设置文件上传存储路径
  form.uploadDir = __dirname + '/../uploads';
  //设置保留文件扩展名
  form.keepExtensions = true;
  //实现文件上传操作
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.json({
        code: 400,
        msg: '文件上传失败'
      });
    } else {
      // console.log(files.img.path);
      //通过path.basename方法获取图片总路径最后一段文件名
      let filename = path.basename(files.img.path);
      // console.log(filename);
      res.json({
        code: 200,
        msg: '文件上传成功',
        img: filename
      });
    }
  })
}