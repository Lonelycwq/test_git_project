$(function () {
  //注册事件委托
  $('#tbody').on('click', 'a:last-child', function () {
    //非空判断
    if (!confirm('确认要删除吗？')) {
      return;
    }
    //获取对应的id
    let id = $(this).attr('data-id');
    let _this = this;
    console.log(id);
    //发送ajax请求
    $.ajax({
      type: 'get',
      url: 'http://127.0.0.1:8080/delHero',
      data: {
        id
      },
      success: function (res) {
        console.log(res);
        if (res.code === 200) {
          // 提示用户，并且把对应的行移除
          alert(res.msg);
          $(_this).parents('tr').remove();
        }
      }
    });
  });
});