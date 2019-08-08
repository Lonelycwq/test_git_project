$(function () {
  $('.alert-danger').hide();

  //获取按钮元素注册事件
  $('#loginbtn').on('click', function (e) {
    console.log(6666);
    // e.preventDefault();
    //获取表单所有控件值
    let data = $('.login-wrap').serialize();
    console.log(data);
    //ajax发送查询请求
    $.ajax({
      type: "post",
      url: "/verifyLogin",
      data,
      datatype: 'json',
      success: function (res) {
        console.log(res);
        if (res.code == 400) {
          $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500).children('span').text(res.msg);
        } else {
          location.href = '/admin/index';
        }
      }
    });
  })
});