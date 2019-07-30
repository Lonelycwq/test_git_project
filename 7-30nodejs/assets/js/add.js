$(function () {
  //获取元素注册事件
  $('#sub').on('click', function () {
    //用户名输入框非空判断
    if ($('input[type="text"]').val().trim().length === 0) {
      alert('用户名不可为空');
      return;
    }
    //获取表单控件的值
    let data = $('#myform').serialize();
    //ajax发送新增请求
    $.ajax({
      type: 'post',
      url: 'http://127.0.0.1:8080/addNewHero',
      data,
      success: function (res) {
        //请求成功则弹窗提示并跳转
        if (res.code === 200) {
          alert(res.msg);
          location.href = './index';
        }
      }
    });
  });
});