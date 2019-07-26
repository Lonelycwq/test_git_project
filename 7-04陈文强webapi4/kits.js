//工具类封装

let kits = {};

//随机整数[n-m]之间整方法
kits.randomInt = function (m, n) {
  return Math.floor(Math.random() * (m - n + 1) + n);
}


//获取当前年月日时分秒并按照格式排布方法
kits.mydate = function () {
  let mydate = new Date();
  let yyyy = mydate.getFullYear();
  let mm = mydate.getMonth();
  let dd = mydate.getDate();
  let hh = mydate.getHours();
  let ss = mydate.getMinutes();
  let aa = mydate.getSeconds();
  mm = mm < 10 ? '0' + mm : mm;
  dd = dd < 10 ? '0' + dd : dd;
  hh = hh < 10 ? '0' + hh : hh;
  ss = ss < 10 ? '0' + ss : ss;
  aa = aa < 10 ? '0' + aa : aa;
  return yyyy + '-' + mm + '-' + dd + '  ' + hh + '：' + ss + '：' + aa;
}


//1.封装一个获取随机颜色的函数使用十六进制
kits.Color1 = function () {
  //2.声明一个存储颜色的变量，字符串开头为#
  let color = '#';
  //3.因为颜色有6位字符，所以循环6次得到6个随机元素
  for (let i = 0; i < 6; i++) {
    //4.得到一个0-15随机数整数，声明变量存储随机数
    let indexColor = Math.floor(Math.random() * (15 - 0 + 1) + 0);
    //5.将随机到的数转换为十六进制并拼装
    color += indexColor.toString(16);
  }
  //6.返回值为十六进制的随机颜色
  return color;
}


//1.封装一个获取随机颜色的函数使用rgba
kits.Color2 = function () {
  //2.调用三次上面的函数然后存储进rgb三原色中
  let red = kits.randomInt(0, 255);
  let green = kits.randomInt(0, 255);
  let blue = kits.randomInt(0, 255);
  let opc = Math.random();
  //3.将三个变量拼装进rgb属性值中
  let rgba = 'rgba(' + red + ',' + green + ',' + blue + ',' + opc + ')';
  //4.返回值为拼装的rgba属性值
  return rgba;
};

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

//封装一个可以生成唯一id的方法
kits.primaryKey = function(){
  //通过时间戳+大范围的随机数来生成id
  let now = Date.now();//得到的是从1970-现在为止的总的毫秒数
  //为了防止在1毫秒之内生成的id有多个，再加上一个大范围的随机数
  let r = kits.randomInt(100000,999999);
  //两个得到的结果，拼接起来
  return now + '' + r;
}