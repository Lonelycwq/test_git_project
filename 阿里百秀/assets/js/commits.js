//创建一个对象存储所有公用的方法
let albx = {
  getRouterName: () => {
    //获取地址栏所有字符串
    let url = location.href;
    //获取地址栏中是否有？
    let index = location.href.indexOf('?');
    //设置一个空字符串存储路由
    let router = '';
    //判断地址栏是否带参数
    if (index == -1) {
      //没有带参数就只获取最后一个/的所有字符串
      router = url.substr(url.lastIndexOf('/') + 1);
    } else {
      //带参数则获取最后一个/和？中间的字符串
      router = url.substring(url.lastIndexOf('/') + 1, index);
    }
    return router;
  }
}