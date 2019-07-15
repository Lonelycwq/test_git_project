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

  //创建一个改变css的方法放在原型对象上面
  Init.prototype.css = function (name, value) {
    //判断有几个值，一个值为获取样式属性，两个值为设置样式
    if (value == undefined) {
      return window.getComputedStyle(this[0])[name];
    } else {
      //建一个数组用来存储一些需要带单位的常用属性名
      let pxArr = ['width', 'height', 'top', 'left', 'right', 'bottom', 'fontSize', 'padding', 'margin']
      //遍历伪数组，将所有获取到的元素都添加修改css方法
      for (let i = 0; i < this.length; i++) {
        //将要带单位的属性和不带单位的属性区分，indexof返回值为-1，说明带单位属性名的数组中没有
        if (pxArr.indexOf(name) !== -1) {
          //判断属性名中是否带了px
          if (value.toString().indexOf('px') === -1) {
            //返回值为-1代表没有px，就需要带上单位
            this[i].style[name] = value + 'px';
          } else {
            //属性值已经带了px，则不需要再添加
            this[i].style[name] = value;
          }
        } else {
          this[i].style[name] = value;
        }
      }
      return this;

    }
  }
})();