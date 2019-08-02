$(function () {
  //获取当前页面的英雄id
  let data = kits.getUrlPrams();
  //ajax当前英雄请求数据
  $.ajax({
    type: "get",
    url: "http://127.0.0.1:8080/getHeroById",
    data,
    success: function (res) {
      if (res.code === 200) {
        // console.log(res);
        //将获取的数据填充至对应的控件
        $('#name').val(res.data.name);
        $(res.data.gender === '男' ? '#nan' : '#nv').prop('checked', true);
        $('#headSrc').val(res.data.img);
        $('#photo').attr('src', res.data.img);
        $('#id').val(res.data.id);
        //获取元素注册事件
        $('#sub').on('click', function () {
          //用户名输入框非空判断
          if ($('input[type="text"]').val().trim().length === 0) {
            alert('用户名不可为空');
            return;
          }
          //获取表单控件的值
          let data = $('#form').serialize();
          console.log(data);
          //ajax发送新增请求
          $.ajax({
            type: 'post',
            url: 'http://127.0.0.1:8080/editHero',
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
      }
    }
  });
});