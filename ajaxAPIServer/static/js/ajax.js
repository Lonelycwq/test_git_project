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