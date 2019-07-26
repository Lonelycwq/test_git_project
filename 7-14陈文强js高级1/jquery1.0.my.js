//使用自调用函数
;
(function () {
  //将$/jquery变成window里的方法，变成一个全局变量
  window.$ = window.jquery = jquery;

  /*
  封装函数使它可以改变css样式
  先根据js的方法来获取元素
  document.querySelectorAll(选择器)；这种方式会返回一个数组，所以我们也要模仿给出一个数组
  通过遍历数组来给我们的对象返回得到的数组数据和数组长度
  */
  function jquery(selector) {
    //存储获取元素得到的伪数组
    return new Init(selector);
    //遍历数组将数据变成jquery里面的数据
  }

  //创建一个自定义构造函数用来表示返回的是伪数组的样子
  function Init(selector) {
    //先存储用js获取得到的伪数组
    let element = document.querySelectorAll(selector);
    //遍历伪数组，将得到的数据赋给实例对象并以键值对的形式展示
    for (let i = 0; i < element.length; i++) {
      //实例对象里面的属性名属性值就等于js获取到的元素伪数组
      this[i] = element[i];
    }
    //将获取到的伪数组的长度赋值给实例对象
    this.length = element.length;
  }

  //创建一个改变css的方法放在原型对象上面，两个参数为属性名和属性值
  Init.prototype.css = function (name, value) {
    //遍历数组，将所有获取到的元素都添加修改css方法
    for (let i = 0; i < this.length; i++) {
      this[i].style[name] = value + 'px';
    }
    // return this;
  }
})();