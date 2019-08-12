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
        //将所有表单清空
        $('#id').val('');
        $('#name').val('');
        $('#slug').val('');
        //将新增按钮隐藏显示编辑按钮
        $('.btnAdd').show();
        $('.btnEdit').hide();
        getAllCate();
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
            //提示用户删除成功
            $('.alert-danger').text(res.msg).fadeIn(500).delay(2000).fadeOut(500);
            //重新加载分页
            getAllCate();
          }
        }
      });
    }
  });

  //全选框全选反选
  $('#checkAll').on('click', function () {
    //获取全选框的状态
    let status = $(this).prop('checked');
    //将全选框的状态给tbody的复选框
    $('tbody .checktd').prop('checked', status);
    //判断tbody中复选框选中的个数超过1个显示批量删除
    if ($('tbody .checktd:checked').length > 1) {
      $('.btnDels').fadeIn(500);
    } else {
      $('.btnDels').fadeOut(400);
    }
  })

  //tbody中复选框全选反选
  $('table').on('click', '.checktd', function () {
    //获取复选框个数
    let cleckAll = $('tbody .checktd')
    //获取复选框选中个数
    let cleckNum = $('tbody .checktd:checked').length
    // //使用反证法，假设全选框是选中状态
    // let flag = true;
    // //循环单个复选框的次数来判断单个复选框是否选中
    // for (let i = 0; i < cleckAll.length; i++) {
    //   //循环至有一个未选择的时候改变全选框的选中状态为不选中
    //   if (cleckAll[i].checked == false) {
    //     flag = false;
    //     break;
    //   }
    // }
    // $('#checkAll').prop('checked', flag);
    //判断选中个数等于总个数，全选框选中，否则不选中
    if (cleckAll.length == cleckNum) {
      $('#checkAll').prop('checked', true);
    } else {
      $('#checkAll').prop('checked', false);
    }
    //判断tbody中复选框选中的个数超过1个显示批量删除
    if (cleckNum > 1) {
      $('.btnDels').fadeIn(500);
    } else {
      $('.btnDels').fadeOut(400);
    }
  });

  //批量删除按钮注册点击事件
  $('.btnDels').on('click', function () {
    //获取所有选中的元素
    let chkOpt = $('tbody .checktd:checked');
    // console.log(chkOpt);
    //声明一个空数组用来存储id数组
    let arr = [];
    // arr = chkOpt.map((e) => {
    //   return e.dataset.id;
    // });
    //循环元素数组
    for (let i = 0; i < chkOpt.length; i++) {
      //将所有id填入空数组中
      arr.push(chkOpt[i].dataset.id);
    }
    // console.log(arr);
    //提示用户
    if (confirm('确定删除数据吗？')) {
      //发送ajax请求删除数据
      $.ajax({
        type: "get",
        url: "/delCateById?id=" + arr.join(','),
        dataType: "json",
        success: function (res) {
          console.log(res);
          if (res.code === 200) {
            //提示用户删除成功
            $('.alert-danger').text(res.msg).fadeIn(500).delay(2000).fadeOut(500);
            //重新加载分页
            getAllCate();
          }
        }
      });
    }
  })
});