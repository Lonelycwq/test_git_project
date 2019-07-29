//获取form表单
function serialize(formSelector) {
  let arr = [];
  let form = document.querySelector(formSelector);
  //父元素.querySelectorAll(选择器)根据选择器找到父元素的所有后代选择器
  let eles = form.querySelectorAll('[name]');
  // let eles = [];
  // let el = form.querySelectorAll('[name]')
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
  return arr.join('&');
}

//注册点击事件
let btn = document.querySelector('#sub');
btn.addEventListener('click', function () {
  //非空判断
  let name = document.querySelector('input[type="text');
  if (name.value === '') {
    alert('姓名不能为空');
    return;
  }
  //收集数据
  let data = serialize('#myform');
  let xhr = new XMLHttpRequest();
  xhr.open('get', 'http://127.0.0.1:8080/addHero?' + data);
  // xhr.setRequestHeader('Content-Type',)
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.responseText);
      // location.href = './index.html';
    }
  }
})