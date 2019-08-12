$(function () {

  //封装获取分类数据请求
  function getAllMenu() {
    //发送请求获取分类数据
    $.ajax({
      type: "get",
      url: "/getAllMenu",
      dataType: "json",
      success: function (res) {
        console.log(res);
        //渲染模版引擎
        let html = template('menuTemp', res);
        //将模版字符串插入页面中
        $('tbody').html(html);
      }
    });
  }
  getAllMenu();
  //注册新增按钮事件
  $('.btnadd').on('click', function () {
    //收集所有表单数据
    let data = $('form').serialize();
    console.log(data);
    //发送ajax请求
    $.ajax({
      type: "post",
      url: "/getAddMenu",
      data,
      dataType: "json",
      success: function (res) {
        // console.log(res);
        //提示用户新增成功
        $('.alert-danger').text(res.msg).fadeIn(500).delay(2000).fadeOut(500);
        //清空表单
        $('#title').val('');
        $('#text').val('');
        $('#link').val('');
        //重新加载表格数据
        getAllMenu();
      }
    });
  })
});