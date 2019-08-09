$(function () {
  //注册上传文件的change事件
  $('#feature').on('change', function () {

    //获取文件
    console.log(this);
    let file = this.files[0];
    //收集表单控件数据
    let data = new FormData();
    //将文件传入总数据中
    data.append('img', file);
    //发送ajax请求上传文件
    $.ajax({
      type: "post",
      url: "/uploadFiles",
      data,
      processData: false,
      contentType: false,
      dataType: "json",
      success: function (res) {
        console.log(res);
        if (res.code === 200) {
          //显示预览图片
          $('.thumbnail').show().attr('src', '/uploads/' + res.img);
          //将图片名传给图片input隐藏域
          $('input[name="feature"]').val(res.img);
        } else {
          $('.alert-danger').children('span').text(res.msg).show();
        }
      }
    });
  })

  //发送ajax请求获取分类数据
  $.ajax({
    type: "get",
    url: "/getAllCate",
    dataType: "json",
    success: function (res) {
      // console.log(res);
      //声明选择列表总字符串，先设置一个所有分类
      let html = `<option value="all">所有分类</option>`;
      // 遍历获取到的数据数组，拼接字符串
      res.data.forEach((e, i) => {
        html += `<option value="${e.id}">${e.name}</option>`;
      });
      // 将拼接好的字符串填入页面选择列表中
      $('#category').html(html);
    }
  });

  //创建富文本框
  CKEDITOR.replace('content');
  //获取富文本框内容
  // CKEDITOR.instances.content.getData();
  //获取保存按钮元素注册点击事件
  $('.btnsubmit').on('click', function () {
    //将富文本框和页面文本域的值同步
    CKEDITOR.instances.content.updateElement();
    //获取所有表单控件的value值
    let data = $('form').serialize();
    //发送ajax请求
    $.ajax({
      type: "post",
      url: "/addPost",
      data,
      dataType: "json",
      success: function (res) {
        console.log(res);
        if (res.code === 200) {
          //提示用户新增成功
          alert(res.msg);
          //页面跳转
          location.href = '/admin/posts';
        } else {
          $('.alert-danger').children('span').text(res.msg).show();
        }
      }
    });

  })
});