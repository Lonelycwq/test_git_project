$(function () {

  //封装获取分类数据请求
  function getAllCate() {
    //发送请求获取分类数据
    $.ajax({
      type: "get",
      url: "/getAllCate",
      dataType: "json",
      success: function (res) {
        // console.log(res);
        //渲染模版引擎
        let html = template('categoriesTemp', res);
        //将模版字符串插入页面中
        $('tbody').html(html);
      }
    });
  }
  getAllCate();

  //点击新增按钮注册点击事件
  $('.btnAdd').on('click', function () {
    //收集表单数据
    let data = $('form').serialize();
    // console.log(data);
    //发送新增ajax请求
    $.ajax({
      type: "get",
      url: "/getAddCate",
      data,
      dataType: "json",
      success: function (res) {
        // getAllCate();
        location.href = '/admin/categories'
      }
    });
  })

  //点击编辑注册委托事件
  $('tbody').on('click', '.btnedit', function () {
    //获取当前按钮上的所有自定义属性
    let obj = $(this).data();
    // console.log(obj);
    //将当前的所有数据填入表单
    $('#id').val(obj.id);
    $('#name').val(obj.name);
    $('#slug').val(obj.slug);
    //将新增按钮隐藏显示编辑按钮
    $('.btnAdd').hide();
    $('.btnEdit').show();

  });

  //点击编辑按钮注册点击事件
  $('.btnEdit').on('click', function () {
    //收集表单数据
    let data = $('form').serialize();
    // console.log(data);
    //发送新增ajax请求
    $.ajax({
      type: "get",
      url: "/editCateById",
      data,
      dataType: "json",
      success: function (res) {
        // getAllCate();
        location.href = '/admin/categories'
      }
    });
  })


  //点击编辑注册委托事件
  $('tbody').on('click', '.btndel', function () {
    //使用闭包方式获取当前this
    let _this = $(this);
    //获取当前按钮上的所有自定义属性
    let data = $(this).data();
    // console.log(data);
    //提示用户
    if (confirm('确定删除数据吗？')) {
      //发送ajax请求删除数据
      $.ajax({
        type: "get",
        url: "/delCateById",
        data,
        dataType: "json",
        success: function (res) {
          console.log(res);
          if (res.code === 200) {
            //移除当前删除一栏tr
            _this.parents('tr').remove();
            //提示用户删除成功
            $('.alert-danger').text(res.msg).fadeIn(500).delay(2000).fadeOut(500);
            //重新加载分页
            getAllCate();
          }
        }
      });
    }
  });

  //全选反选
  $('table').on('clcik', '.clecktd', function () {
    console.log($('.clecktd'));
    // //获取数据条数来推断复选框个数
    // let cleckNum = $(this).parents('tr').index
    // //使用反证法，假设全选框是选中状态
    // let flag = true;
    // //循环单个复选框的次数来判断单个复选框是否选中
    // for (let j = 0; j < cleckTd.length; j++) {
    //   //循环至有一个未选择的时候改变全选框的选中状态为不选中
    //   if (cleckTd[j].checked == false) {
    //     flag = false;
    //     break;
    //   }
    // }
  })
});