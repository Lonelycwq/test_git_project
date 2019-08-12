$(function () {
  //引入获取路由名称的方法
  let router = albx.getRouterName();
  // console.log(router);
  //排他去除特殊样式
  $('.aside .nav>li').removeClass('active');
  //给当前路由对应的li设置特殊样式
  $('#' + router).addClass('active');
  //判断是否是文章模块
  if (router == 'posts' || router == 'post-add' || router == 'categories') {
    //给文章tab添加特殊样式
    $('#posts-module').addClass('active').children('a').removeClass('collapsed');
    //展开折叠
    $('#menu-posts').addClass('in').attr('aria-expanded', 'true');
  }
  //判断是否是设置模块
  if (router == 'nav-menus' || router == 'slides' || router == 'settings') {
    //给设置tab添加特殊样式
    $('#nav-module').addClass('active').children('a').removeClass('collapsed');
    //展开折叠
    $('#menu-settings').addClass('in').attr('aria-expanded', 'true');
  }
});