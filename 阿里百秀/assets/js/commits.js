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
  },
  //创建一个自定义构造函数并使用extends继承上一个tab函数的属性和方法
  getUrlPrams: () => {
    //截取地址栏?后面所有字符串
    let search = location.search.substring(1);
    //以&符号将字符串分割为数组
    let arr = search.split('&');
    //声明一个空对象
    let prams = {};
    //遍历分割的数组
    arr.forEach(e => {
      //将数组中遍历的所有值以=号分割为一个个小的数值，数组中只有两个值
      let temp = e.split('=');
      //声明变量存储键
      let key = temp[0];
      //声明变量存储值
      let val = temp[1];
      //对象的键=值，通过遍历填充对象
      prams[key] = val;
    });
    // console.log(prams);
    //函数返回拼接的对象
    return prams;
  },

}