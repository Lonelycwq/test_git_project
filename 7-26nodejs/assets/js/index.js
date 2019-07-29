//使用ajax请求返回英雄列表
//创建一个ajax对象
const xhr = new XMLHttpRequest();
//设置请求的方式和地址
xhr.open('get', 'http://127.0.0.1:8080/getAllHeros');
//发送请求
xhr.send();
//注册一个监听通讯事件
xhr.onreadystatechange = function () {
  //判断响应状态
  if (xhr.readyState === 4 && xhr.status === 200) {
    //将返回得到的字符串转为数组
    let res = JSON.parse(xhr.responseText);
    //获取tbody元素
    let tbody = document.querySelector('#tbody')
    //声明一个空字符串
    let html = '';
    //遍历数组
    res.forEach(e => {
      html += `<tr>
      <td>${e.id}</td>
      <td>${e.name}</td>
      <td>${e.gender}</td>
      <td><img src="${e.img}"></td>
      <td>
        <a href="./edit.html?id=${e.id}">修改</a>
        <a data-id="${e.id}" href="javascript:void(0);">删除</a>
      </td>
    </tr>`
    });
    //将拼接的字符串填入tbody中
    tbody.innerHTML = html;
  }
}