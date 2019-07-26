//使用自调用函数
(function () {
  //将封装的函数变成一个window全局函数，让它可以在外面使用
  window.$ = window.jquery = jquery;

  //实现基本的改变css方法
  function jquery(selector) {
    return new Init(selector);
  }

  //将所有方法放在原型对象上
  function Init(selector) {
    //获取选择器元素，获取到一个伪数组
    let dom = document.querySelectorAll(selector);
    //给获取的伪数组循环添加方法
    for (let i = 0; i <= dom.length; i++) {
      this[i] = dom[i];
      console.log(this, this[i]);
    }
    //给伪数组添加一个length属性
    this.length = dom.length;
  }
  //给原型添加方法
  Init.prototype.css = function (name, value) {
    //遍历this伪数组，将所有的都添加样式
    for (let i = 0; i < this.length; i++) {
      this[i].style[name] = value + 'px';
    }
  }
})();