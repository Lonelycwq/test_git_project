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
  });

  //注册删除事件
  $('tbody').on('click', '.btndel', function () {
    // console.log($(this));
    //获取删除的元素的suoyin
    let index = $(this);
    //创建一个空数组
    let arr = [];
    //遍历数据，循环获取索引
    for (let i = 0; i < index.length; i++) {
      //将数据存入数组
      arr.push(index[i].dataset.id);
    }
    // console.log(arr);
    ///发送ajax请求删除数据
    $.ajax({
      type: "get",
      url: "/delMenuByIndex",
      data: {
        arr
      },
      dataType: "json",
      success: function (res) {
        //提示用户新增成功
        $('.alert-danger').text(res.msg).fadeIn(500).delay(2000).fadeOut(500);
        getAllMenu();
      }
    });

  })
});