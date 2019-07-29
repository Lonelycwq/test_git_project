//工具类封装

let kits = {};


/**
 * @author cwq //1017904699@qq.com
 * @date 2019/7/1/22:00
 * @description  一个获取随机整数[n-m]之间的方法
 * @param {number} m 一个随机区间的最小数
 * @param {number} n 一个随机区间的最大数
 * @return {number} 返回一个[n-m]之间随机整数
 */
kits.randomInt = function (m, n) {
  return Math.floor(Math.random() * (m - n + 1) + n);
}


/**
 * @author cwq //1017904699@qq.com
 * @date 2019/7/1/22:00
 * @description  获取当前年月日时分秒并按照格式排布方法
 * @return {string} 返回一个按照格式拼接好的当前年月日时分秒
 */
kits.myDate = function () {
  //创建一个日期实例对象并获取到年月日时分秒
  let mydate = new Date();
  let yyyy = mydate.getFullYear();
  //月份用0开始所有要加1
  let mm = mydate.getMonth() + 1;
  let dd = mydate.getDate();
  let hh = mydate.getHours();
  let ss = mydate.getMinutes();
  let aa = mydate.getSeconds();
  //判断数字为个位数时在数字前面加个0
  mm = mm < 10 ? '0' + mm : mm;
  dd = dd < 10 ? '0' + dd : dd;
  hh = hh < 10 ? '0' + hh : hh;
  ss = ss < 10 ? '0' + ss : ss;
  aa = aa < 10 ? '0' + aa : aa;
  //返回一个拼接的字符串
  return yyyy + '-' + mm + '-' + dd + '  ' + hh + '：' + ss + '：' + aa;
}


/**
 * @author cwq //1017904699@qq.com
 * @date 2019/7/1/22:00
 * @description  一个获取随机十六进制颜色的方法
 * @return {string} 返回一个拼接好的十六进制颜色
 */
//封装一个获取随机颜色的函数使用十六进制
kits.Color1 = function () {
  //声明一个存储颜色的变量，字符串开头为#
  let color = '#';
  //因为颜色有6位字符，所以循环6次得到6个随机元素
  for (let i = 0; i < 6; i++) {
    //得到一个0-15随机数整数，声明变量存储随机数
    let indexColor = Math.floor(Math.random() * (15 - 0 + 1) + 0);
    //将随机到的数转换为十六进制并拼装
    color += indexColor.toString(16);
  }
  //返回值为十六进制的随机颜色
  return color;
}


/**
 * @author cwq //1017904699@qq.com
 * @date 2019/7/1/22:00
 * @description  一个获取随机颜色rgba的方法
 * @return {string} 返回一个拼接好的rgba颜色
 */
//封装一个获取随机颜色的函数使用rgba
kits.Color2 = function () {
  //调用三次上面的函数然后存储进rgb三原色中
  let red = kits.randomInt(0, 255);
  let green = kits.randomInt(0, 255);
  let blue = kits.randomInt(0, 255);
  //得到一个大于零小于一的随机两位小数
  let opc = parseInt(Math.random() * 100) / 100 + 0.01;
  //将三个变量拼装进rgb属性值中
  let rgba = 'rgba(' + red + ',' + green + ',' + blue + ',' + opc + ')';
  //返回值为拼装的rgba属性值
  return rgba;
};


/**
 * @author cwq //1017904699@qq.com
 * @date 2019/7/1/22:00
 * @description  一个获取时间差的函数,返回相差的天/时/分/秒
 * @param {number} start 一个开始时间的当前总毫秒数
 * @param {number} end 一个结束时间的当前总毫秒数
 * @return {string} 返回一个拼接好的相差的天/时/分/秒
 */
//1.封装一个获取时间差的函数,返回相差的天/时/分/秒
kits.timeDifference = function (start, end) {
  //2.定义一个变量存储结束世界减去开始时间的毫秒数差
  let interval = end - start;
  //3.相减得到的毫秒数转化为秒
  interval /= 1000;
  //4.定义变量存储日时分秒，并使用绝对值取得整数
  let day = Math.round(interval / 60 / 60 / 24);
  let hour = Math.round(interval / 60 / 60 % 24);
  let minute = Math.round(interval / 60 % 60);
  let second = Math.round(interval % 60);
  //5.返回值为相差的天时分秒
  return day + '天' + hour + '时' + minute + '分' + second + '秒';
}


/**
 * @author cwq //1017904699@qq.com
 * @date 2019/7/7/11:00
 * @description  一个可以生成唯一id(尽可能)的方法
 * @param {string} cleckall 全选框的id名称
 * @param {string} clecktd 下面复选框的选择器名
 * @return {undefined}
 */
//全选与反选
kits.cleckAll = function (cleckall, clecktd) {
  //声明变量存储获取的全选框和单个选框
  let cleckAll = document.querySelector(cleckall);
  let cleckTd = document.querySelectorAll(clecktd);
  //全选框绑定点击事件
  cleckAll.onclick = function () {
    //声明变量存储全选框的checked值
    let cleckAll1 = cleckAll.checked;
    //循环遍历单个复选框
    for (let i = 0; i < cleckTd.length; i++) {
      //判断全选框为选中时，下面单个复选框全部选中，否则全部不选中
      if (cleckAll1 === true) {
        cleckTd[i].checked = true;
      } else {
        cleckTd[i].checked = false;
      }
    }
  }
  //循环给所有单个复选框绑定点击事件
  for (let i = 0; i < cleckTd.length; i++) {
    cleckTd[i].onclick = function () {
      //使用反证法，假设全选框是选中状态
      let flag = true;
      //循环单个复选框的次数来判断单个复选框是否选中
      for (let j = 0; j < cleckTd.length; j++) {
        //循环至有一个未选择的时候改变全选框的选中状态为不选中
        if (cleckTd[j].checked == false) {
          flag = false;
          break;
        }
      }
      //改变全选框的状态
      cleckAll.checked = flag;
    }
  }
}


/**
 * @author cwq //1017904699@qq.com
 * @date 2019/7/7/11:00
 * @description  一个可以生成唯一id(尽可能)的方法
 * @param {number} mix 一个最小数
 * @param {number} max 一个最大数
 * @return {undefined}
 */
kits.primaryKey = function (mix, max) {
  //通过时间戳+大范围的随机数来生成id
  let now = Date.now(); //得到的是从1970-现在为止的总的毫秒数
  //为了防止在1毫秒之内生成的id有多个，再加上一个大范围的随机数100000-999999
  let r = kits.randomInt(mix, max);
  //两个得到的结果，拼接起来
  return now + '' + r;
}


/**
 * @author cwq //1017904699@qq.com
 * @date 2019/7/7/11:18
 * @description  封装好的移动端单击事件
 * @param {类型 - element } element 
 * @param {number} span 按下的时间间隔
 * @param {number} offset 允许的偏移距离
 * @param {function}  callback 回调函数
 */

kits.tap = function (element, callback, span, offset) {
  //先定义一个变量设置触摸开始到触摸结束的时间限制为500ms
  span = span || 500;
  //再定义一个变量设置触摸开始到触摸结束偏移不能超过50px
  offset = offset || 30;
  //定义一个变量表示开始触摸的时间
  let timeStart = 0;
  //定义两个变量表示开始触摸的坐标
  let startX = 0;
  let startY = 0;
  //注册手指触摸开始事件
  element.addEventListener('touchstart', function (e) {
    //判断触摸点是否唯一
    if (e.touches.length != 1) {
      // console.log('触摸点不是一个');
      return;
    }
    //获取触摸开始的毫秒数
    timeStart = Date.now();
    //获取触摸开始的触摸点位置
    startX = e.touches[0].pageX;
    startY = e.touches[0].pageY;
  })

  //注册手指触摸结束事件
  element.addEventListener('touchend', function (e) {
    // 是否单指操作
    if (e.changedTouches.length !== 1) {
      // console.log('不是单指操作');
      return;
    }
    //获取触摸结束的毫秒数
    let timeEnd = Date.now();
    //触摸结束和触摸开始的毫秒数相减判断是否是单击
    if ((timeEnd - timeStart) > span) {
      // console.log('手指停留时间太长')
      return;
    }
    //获取触摸开始的触摸点位置
    let endX = e.changedTouches[0].pageX;
    let endY = e.changedTouches[0].pageY;
    //判断触摸结束和触摸开始的偏移是否过大
    if (Math.abs(endX - startX) > offset || Math.abs(endY - startY) > offset) {
      // console.log('手指偏移距离过大')
      return;
    }
    // console.log('这是一个手指点击事件')
    // 如果已经是一个单击操作了，需要做一些对应的响应 - 如果是封装好的代码里面，需要让别人能做一些什么事情，就让把一个函数传递归来
    callback && callback();
  })
}


/**
 * @author cwq //1017904699@qq.com
 * @date 2019/7/16/22:18
 * @description 读取存储在localStorage里面的数组的方法
 * @param {string} key 存储数据使用的键
 * @return {Array} 返回一个数组，如果不存在，返回空数组
 */
kits.loadData = function (key) {
  let str = localStorage.getItem(key);
  let arr = JSON.parse(str);
  if (!arr) {
    arr = [];
  }
  return arr;
}


/**
 * @author cwq //1017904699@qq.com
 * @date 2019/7/16/22:18
 * @description 用于将数组存储到localStorage里面的方法
 * @param {string} key 存储使用的键
 * @param {Array} arr 要存储的数组数据
 * @return {undefined}
 */
kits.saveData = function (key, arr) {
  let json = JSON.stringify(arr);
  localStorage.setItem(key, json);
}


/**
 * @author cwq //1017904699@qq.com
 * @date 2019/7/16/22:18
 * @description 计算购物车里面的商品总量的方法
 * @param {string} localName 存储使用的键
 * @return {string} 返回一个购物车中商品数量的总数
 */
kits.total = function (localName) {
  // 加载所有的数据
  let arr = kits.loadData(localName);
  // 计算总件数
  let total = 0;
  arr.forEach(function (e) {
    total += e.number;
  });
  return total;
}




/**
 * @author cwq //1017904699@qq.com
 * @date 2019/7/19/8:25
 * @description 封装的一个tab栏方法
 */
class Tab {
  //tab栏有属性 -- 只要是代码汇总可以产生变化的东西，都可以认为是对象的属性
  /*
  会变化的类名 
  li的选择器  navSelector
  内容的选择器  contentSelector
  触发的时间类型 type 
  特殊的li的类名 navClass
  显示隐藏内容的类名 contentClass
  */
  //存放属性
  constructor(options) {
    //options必须是一个对象或者不传,为了省略传参和无序传参
    options = options || {};
    //添加tab栏几个会变的元素为属性，并设置一个默认值
    this.navSelector = options.navSelector || '.nav>li';
    this.contentSelector = options.contentSelector || '.content';
    this.type = options.type || 'mouseover';
    this.navClass = options.navClass || 'active';
    this.contentClass = options.contentClass || 'show';
  }
  //tab方法
  addEvent() {
    //闭包形式将实例对象的this存入_this中
    let _this = this;
    //获取tab列表和下面内容元素
    let lis = document.querySelectorAll(this.navSelector);
    let contents = document.querySelectorAll(this.contentSelector);
    //循环遍历tab列表
    lis.forEach((e, i) => {
      //给每一个tab绑定一个动态的事件类型
      e.addEventListener(_this.type, function () {
        //排他思想，先将所有tab列表的特殊样式清空
        lis.forEach(e => {
          e.classList.remove(_this.navClass);
        });
        //再将当前触发事件的tab添加特殊样式
        this.classList.add(_this.navClass);
        //排他思想，先将所有单个内容的特殊样式清空，使所有内容都隐藏
        contents.forEach(e => {
          e.classList.remove(_this.contentClass);
        });
        //再将当前触发事件的tab对应的内容块添加样式显示
        contents[i].classList.add(_this.contentClass);
      });
    });
  }
}
//创建一个实例对象，并调用addevent方法
// let tab = new Tab();
// tab.addEvent();


/**
 * @author cwq //1017904699@qq.com
 * @date 2019/7/19/8:30
 * @description 封装的一个自动切换tab栏方法
 */
//创建一个自定义构造函数并使用extends继承上一个tab函数的属性和方法
class autoTab extends Tab {
  constructor(options) {
    //在autoTab构造函数的最前面调用Tab
    super(options);
    options = options || {};
    //新增动态的定时器时间属性和tabli个数
    this.time = options.time || 1000;
    this.num = options.num || 2;
  }
  autoPaly() {
    //定义一个变量表示当前tab是第几个
    let index = 0;
    //获取定时器id
    let intervalId = setInterval(() => {
      //获取tab栏li元素和对应单块内容元素
      let lis = document.querySelectorAll(this.navSelector);
      let contents = document.querySelectorAll(this.contentSelector);
      //当前tab为最后一个时将index改为0
      index == this.num ? index = 0 : index++;
      //调用tab排他加特殊样式方法
      this.changeNavStyle(lis, lis[index])
      //调用对应内容块排他加特殊样式方法
      this.changeContentStyle(contents, contents[index])

    }, this.time);
    //调用停止自动切换方法将定时器id传入方法
    this.stopPaly(intervalId);
  }
  //tab排他加特殊样式方法
  changeNavStyle(lis, currentLi) {
    //遍历伪数组将所有tab样式变一致
    lis.forEach(e => {
      e.classList.remove(this.navClass);
    })
    //
    currentLi.classList.add(this.navClass);
  }
  // 修改内容的样式的方法
  changeContentStyle(contents, currentContent) {
    contents.forEach(e => {
      e.classList.remove(this.contentClass);
    })
    // 把对应div显示
    currentContent.classList.add(this.contentClass);
  }
  //停止自动切换方法
  stopPaly(Id) {
    //闭包存储实例对象的this
    let _this = this;
    //获取tab栏li元素和对应单块内容元素
    let lis = document.querySelectorAll(this.navSelector);
    let contents = document.querySelectorAll(this.contentSelector);
    //遍历tab栏元素
    lis.forEach((e, i) => {
      //设置所有tab的自定义id
      e.setAttribute('data-id', i);
      //给所有tab绑定事件
      e.addEventListener(this.type, function () {
        //清除停止定时器
        clearInterval(Id);
        //获取当前触发的tab存储
        let eq = this.getAttribute('data-id');
        //调用tab排他加特殊样式方法并将当前tab索引传参，改变当前对应的tab
        _this.changeNavStyle(lis, lis[eq]);
        //调用修改内容的样式的方法并将当前tab索引传参，改变当前对应的内容
        _this.changeContentStyle(contents, contents[eq]);
      });
      //给所有tab注册鼠标离开事件
      e.addEventListener('mouseout', function () {
        //重新调用自动切换方法
        _this.autoPaly();
      });
    });
  }
}
//使用方法
// let autotab = new autoTab({
//   navSelector: '.nav1>li',
// })
// autotab.autoPaly();


/**
 * @author cwq //1017904699@qq.com
 * @date 2019/7/21/11:00
 * @description 封装的一个ajax方法
 * @param {object || null} options 对象传参
 * @example options{
 *    type: 请求方式 - get || post,
 *    url: 请求地址 - url || '',
 *    data: 发送回数据 - data || '',
 *    callback: 回调函数里面方法 - callback || function () {}
 * @return {undefined}
 */
/*
options是一个对象，要求属性有四个
1.请求方式 2.请求地址 3.发送回数据 4.回调函数里面方法
*/
function ajax(options) {
  //设置参数默认值
  options = options || {};
  options.type = options.type || 'get';
  options.url = options.url || '';
  options.data = options.data || '';
  options.callback = options.callback || function () {
    console.log('无回调函数')
  };
  // 创建一个实例对象
  let xhr = new XMLHttpRequest();
  //如果是get请求，将数据拼接在url后面
  if (options.type == 'get') {
    options.url += '?' + options.data
  }
  xhr.open(options.type, options.url);
  //如果是post请求，将数据放在发送请求里里面并设置请求头
  if (options.type == 'post') {
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(options.data);
  } else {
    xhr.send();
  }
  //监听通讯状态
  xhr.onreadystatechange = function () {
    //判断发送请求成功和是否响应成功
    if (xhr.readyState === 4 && xhr.status === 200) {
      options.callback(xhr.responseText);
    }
  }
}


/**
 * @author cwq //1017904699@qq.com
 * @date 2019/7/24/10:00
 * @description 封装的一个获取地址栏后面所有参数并转为对象的方法
 * @return {object} 返回一个转化的对象
 */
//创建一个自定义构造函数并使用extends继承上一个tab函数的属性和方法
kits.getUrlPrams = function () {
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
}


/**
 * @author cwq //1017904699@qq.com
 * @date 2019/7/25/9:20
 * @description 表单控件的合法判断的方法
 * @param {object} dom 需要判断的元素
 * @param {Array} arr 要判断的规则数组
 * @example 
    先创建一个实例对象，然后调用add方法传入参数然后再调用start方法返回一个判断结果返回的提示语
 * @return {string} 返回一个判断对应的提示语
 */
//构造函数用来存储一些判断规则的方法
let strategies = {
  //判断为空的方法，变量有：控件内容、提示语
  isNonEmpty: function (val, msg) {
    //判断控件内容去除前后空格的长度等于0时则输入为空
    if (val.trim().length === 0) {
      //返回提示用户的提示语
      return msg;
    }
  },
  //判断控件输入长度的方法，变量有：控件内容、限制字符数、提示语
  minLength: function (val, len, msg) {
    //判断控件内容去除前后空格的长度小于限制字符数
    if (val.trim().length < len) {
      //返回提示用户的提示语
      return msg;
    }
  },
  //判断控件输入长度的方法，变量有：控件内容、提示语
  isMoilbe: function (val, msg) {
    //判断控件内容不是合法手机号
    if (!/(^1[3|5|7|8][0-9]{9}$)/.test(val) === true) {
      //返回提示用户的提示语
      return msg;
    }
  }
}
// 声明一个自定义构造函数
class Validator {
  constructor() {
    // 用一个数组，用来存储所有的验证的函数
    this.validateFuncs = [];
  }
  // 给构造函数的原型添加一个方法，让其可以添加一个新的函数进去，变量为要判断的元素和规则数组数组
  add(dom, arr) {
    // 遍历数组，往this.validateFuncs 添加新的验证的方法
    arr.forEach((e) => {
      //声明一个变量存储对象
      let fn = function () {
        //声明一个变量获取到数组中的一个个规则对象
        // let rule = arr[i] = e;
        //声明一个变量存储规则对象中函数名属性值用冒号分割出来的数组
        let params = e.fnName.split(':'); // [minLength,8]
        //声明一个变量用来存储之前分割出来的数组的第一个数据
        let fnName = params.shift(); // fnName里面可能会包含参数
        //在分割的数组的最前面插入元素的value值为数组的第一个数据
        params.unshift(dom.value); // [dom.vlaue,8]
        //在分割的数组的最后面插入规则的提示语
        params.push(e.errMsg); // [dom.value,8,rule.errMsg];
        //返回 strategies函数的函数名借用分割拼接好的数组的值
        return strategies[fnName].apply(dom, params);
      }
      //将遍历得到的函数一个个插入validateFuncs数组中
      this.validateFuncs.push(fn);
    });
  }
  // 一个可以把数组里面的每个函数都执行的方法
  start() {
    //循环遍历validateFuncs数组中所有对象
    for (let i = 0; i < this.validateFuncs.length; i++) {
      //声明一个变量用来获取  每个规则函数按顺序调用判断不通过返回的提示语
      let msg = this.validateFuncs[i]();
      // console.log(msg);
      //如果有则返回这个提示语
      if (msg) {
        return msg;
      }
    }
  }
}


/**
 * @author cwq //1017904699@qq.com
 * @date 2019/7/28/21:00
 * @description 获取表单控件所有有name属性的内容并以键=值&键=值的形式输出
 * @param {string} formSelector 需要判断的元素的标签
 * @example 
  //收集数据
  let data = serialize('#myform');
 * @return {string} 一个键=值&键=值的格式字符串
 */
//获取form表单里所有有name属性的控件值
kits.serialize = function (formSelector) {
  let arr = [];
  //获取表单form元素
  let form = document.querySelector(formSelector);
  //父元素.querySelectorAll(选择器)根据选择器找到父元素的所有后代选择器
  let eles = form.querySelectorAll('[name]');
  eles.forEach(e => {
    //判断复选框是否选中
    if (e.type === 'radio' && e.checked) {
      //获取name属性
      let key = e.name;
      //获取value属性
      let value = e.value;
      //变成键=值的形式
      arr.push(key + '=' + value);
    }
    if (e.type !== 'radio') {
      //获取name属性
      let key = e.name;
      //获取value属性
      let value = e.value;
      //变成键=值的形式
      arr.push(key + '=' + value);
    }
  });
  //返回一个键=值&键=值的格式字符串
  return arr.join('&');
}