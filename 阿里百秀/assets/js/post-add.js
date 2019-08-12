$(function () {
  //注册上传文件的change事件
  $('#feature').on('change', function () {
    //获取文件
    // console.log(this);
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
          $('.alert-danger').children('span').text(res.msg).fadeIn(500).delay(2000).fadeOut(500);
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
  //获取路径中的参数
  let id = albx.getUrlPrams();
  // console.log(id);
  //判断请求路由是否携带参数
  if (id.id) {
    // console.log(id);
    //根据id发送ajax请求，获取对应id的文章所有数据并填入页面
    $.ajax({
      type: "get",
      url: "/getPostById",
      data: id,
      dataType: "json",
      success: function (res) {
        // console.log(res);
        if (res.code === 200) {
          //id填入
          $('input[name="id"]').val(res.data.id)
          //标题填入
          $('#title').val(res.data.title);
          //内容填入
          $('#content').val(res.data.content);
          //将富文本框和页面文本域的值同步
          CKEDITOR.instances.content.updateElement();
          //别名填入
          $('#slug').val(res.data.slug);
          //图片填入
          $('input[name="feature"').val(res.data.feature);
          $('.thumbnail').attr('src', '../../uploads/' + res.data.feature).show();
          //分类填入
          $('#category').val(res.data.category_id);
          //发布时间填入
          $('#created').val(res.data.created);
          //状态填入
          $('#status').val(res.data.status);
        }
      }
    });
  }
  //获取保存按钮元素注册点击事件
  $('.btnsubmit').on('click', function () {
    //将富文本框和页面文本域的值同步
    CKEDITOR.instances.content.updateElement();
    // //获取所有表单控件的value值
    // let data = $('form').serialize();
    //发送ajax请求
    if (id.id) {
      console.log(id);
      //有id说明是编辑文章
      option('/editPostById');
    } else {
      console.log(id);
      //无id说明是新增页面
      option('/addPost')
    }
  });
  //将点击按钮之后的ajax请求封装
  function option(url) {
    //发送ajax请求
    $.ajax({
      type: "post",
      url: url,
      data: $('form').serialize(),
      dataType: "json",
      success: function (res) {
        console.log(res);
        if (res.code === 200) {
          //提示用户新增成功
          alert(res.msg);
          //页面跳转
          location.href = '/admin/posts';
        } else {
          $('.alert-danger').children('span').text(res.msg).fadeIn(500).delay(2000).fadeOut(500);
        }
      }
    });
  }
});