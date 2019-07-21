/**
 * 自己封装的ajax函数
 * @param {object} options 
 * @example {
 *  type : 请求方式 ，可以是get或者post
 *  url : 请求的地址
 *  data : 携带回服务器的数据
 *  callback : 请求成功的回调函数
 * }
 */
function ajax(options) {
  options = options || {};
  var type = options.type || 'get';
  var url = options.url || '';
  var data = options.data || {};
  var callback = options.callback || null;
  // 因为type别人在使用的时候，可能会写出不一样的大小写，统一在里面转换为小写
  type = type.toLowerCase();
  // 因为我们要求别人是以键值对的形式把数据传入，帮忙把对象转换为固定格式
  // 键=值&键=值
  var temp = [];
  for (var key in data) {
    temp.push(`${key}=${data[key]}`);
  }
  data = temp.join('&');

  // 1 创建异步对象
  var xhr = new XMLHttpRequest();
  // 2 告诉他去哪里获取数据
  // 判断一下是否是get请求，如果是，就这样传递数据
  if (type === 'get') {
    xhr.open(type, url + '?' + data);
    // 3 把他派出去
    xhr.send();
  } else {
    xhr.open(type, url);
    // 如果是post请求，还要设置请求头
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    // 3 把他派出去
    xhr.send(data);
  }
  // 4 时刻关注办事的进度
  xhr.onreadystatechange = function () {
    // 4 是请求完成响应回到浏览器，并且把响应报文解析完毕的状态
    if (xhr.readyState == 4 && xhr.status == 200) {
      // 在这里处理服务器返回数据之后的逻辑
      callback && callback(xhr.responseText);
    }
  }
}
