$(function () {

  //定义当前列表初始页码和一页展示多少数据
  let pageNum = 1;
  let pageSize = 2;

  //封装请求文章列表的请求和渲染列表及分页
  function init(search) {
    //发送ajax请求文章列表
    $.ajax({
      type: "get",
      url: "/getAllPost",
      data: {
        pageNum: pageNum,
        pageSize: pageSize,
        //获取形参search中所有的属性
        ...search
      },
      success: function (res) {
        console.log(res);
        //渲染模版引擎
        let html = template('postTemp', res.data);
        //将模版字符串插入页面中
        $('tbody').html(html);
        //生成分页结构
        setpagenation(Math.ceil(res.data.total / pageSize));
      }
    });
  }

  //页面一开始调用获取文章列表的方法
  init();
  //实现分页
  function setpagenation(total) {
    // console.log(total);
    //分页初始化
    $('.pagination').bootstrapPaginator({
      //配置分页
      bootstrapMajorVersion: 3,
      //当前页码
      currentPage: pageNum,
      //总页数
      totalPages: total,
      onPageClicked: function (event, originalEvent, type, page) {
        // console.log(type, page);
        //pageNum重新赋值为点击的页码
        pageNum = page;
        //重新获取数据生成当前页面结构
        init();
      }
    });
  }

  //发送ajax请求获取筛选分类数据
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
      $('.cateSelector').html(html);
    }
  });

  //给筛选按钮注册点击事件
  $('.btn-search').on('click', () => {
    //获取两个筛选的选择列表
    let obj = {
      cate: $('.cateSelector').val(),
      status: $('.statusSelector').val()
    }
    // console.log(obj);
    init(obj);
  });

  //给删除按钮注册委托事件
  $('tbody').on('click', '.btn-del', function () {
    //使用闭包方式获取当前this
    let _this = $(this);
    //获取当前数据id
    let id = $(this).data();
    // console.log($(this));
    //提示用户
    if (confirm('确定删除数据吗？')) {
      //发送ajax请求删除数据
      $.ajax({
        type: "get",
        url: "/delPostById",
        data: id,
        dataType: "json",
        success: function (res) {
          console.log(res);
          if (res.code === 200) {
            //移除当前删除一栏tr
            _this.parents('tr').remove();
            //提示用户删除成功
            $('.alert-danger').text(res.msg).fadeIn(500).delay(2000).fadeOut(500);
            //判断页面中表格中tr是否只有一条
            if ($('tbody>tr').length == 1) {
              //判断页码是否为大于1，大于则自减减
              if (pageNum > 1) {
                pageNum--
              }
              //重新加载分页
              init();
            }
          }
        }
      });
    }
  });
});