//注册点击事件
$('#sub').on('click', function () {
  //非空判断
  if ($('input[type="text').val().trim() === '') {
    alert('姓名不能为空');
    return;
  }
  //收集数据
  let data = $('#myform').serialize();
  console.log(data);
  $.ajax({
    type: 'post',
    url: 'http://127.0.0.1:8080/addNewHero',
    data,
    success: function (res) {
      let reslut = JSON.parse(res);
      alert(reslut.msg);
      location.href = './../../views/index.html';
    }
  })
})