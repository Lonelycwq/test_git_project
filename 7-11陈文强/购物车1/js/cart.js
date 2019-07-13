$(function () {
  let id = location.search.substring(5);
  // console.log(location.search.substring(5));
  //数组.filter 用于对数组里面的数据进行筛选，返回一个新的数值
  // let arr = phoneData.filter(function(e,i){
  //   return e.pID == id;
  // });
  //数组里面查找满足条件的元素
  let phoneArr = phoneData.find(function (e, i) {
    return e.pID == id;
  });
  //   let cart = `<div class="item" data-id="${phoneArr.pID}">
  //   <div class="row">
  //     <div class="cell col-1 row">
  //       <div class="cell col-1">
  //         <input type="checkbox" class="item-ck" checked="">
  //       </div>
  //       <div class="cell col-4">
  //         <img src="${phoneArr.imgSrc}" alt="">
  //       </div>
  //     </div>
  //     <div class="cell col-4 row">
  //       <div class="item-name">${phoneArr.name}</div>
  //     </div>
  //     <div class="cell col-1 tc lh70">
  //       <span>￥</span>
  //       <em class="price">${phoneArr.price}</em>
  //     </div>
  //     <div class="cell col-1 tc lh70">
  //       <div class="item-count">
  //         <a href="javascript:void(0);" class="reduce fl">-</a>
  //         <input autocomplete="off" type="text" class="number fl" value="1">
  //         <a href="javascript:void(0);" class="add fl">+</a>
  //       </div>
  //     </div>
  //     <div class="cell col-1 tc lh70">
  //       <span>￥</span>
  //       <em class="computed">${phoneArr.price}</em>
  //     </div>
  //     <div class="cell col-1">
  //       <a href="javascript:void(0);" class="item-del">从购物车中移除</a>
  //     </div>
  //   </div>
  // </div>`;
  //   $('.item-list').append(cart);
  //取出本地存储数据
  let shopArr;
  let shopArrStr = localStorage.getItem('shopCart');
  // console.log(shopArrStr);
  //判断数据是否为空，不为空则在数组中加入已存在的数据
  if (shopArrStr == null) {
    shopArr = [];
  } else {
    //将字符串类型数据转化为数组类型
    shopArr = JSON.parse(shopArrStr);
  }
  console.log(shopArr);
  //循环遍历数组里面所有的的数据并拼接
  let html = '';
  for (let i = shopArr.length - 1; i >= 0; i--) {
    html += `<div class="item" data-id="${shopArr[i].pID}">
    <div class="row">
      <div class="cell col-1 row">
        <div class="cell col-1">
          <input type="checkbox" class="item-ck" checked="">
        </div>
        <div class="cell col-4">
          <img src="${shopArr[i].imgSrc}" alt="">
        </div>
      </div>
      <div class="cell col-4 row">
        <div class="item-name">${shopArr[i].name}</div>
      </div>
      <div class="cell col-1 tc lh70">
        <span>￥</span>
        <em class="price">${shopArr[i].price}</em>
      </div>
      <div class="cell col-1 tc lh70">
        <div class="item-count">
          <a href="javascript:void(0);" class="reduce fl">-</a>
          <input autocomplete="off" type="text" class="number fl" value="1">
          <a href="javascript:void(0);" class="add fl">+</a>
        </div>
      </div>
      <div class="cell col-1 tc lh70">
        <span>￥</span>
        <em class="computed">${shopArr[i].price}</em>
      </div>
      <div class="cell col-1">
        <a href="javascript:void(0);" class="item-del">从购物车中移除</a>
      </div>
    </div>
    </div>`;
  }
  //将拼接的字符串插入页面合适的位置中
  $('.item-list').html(html);
  //事件委托移除一栏商品
  $('.item-list').on('click', '.item-del', function () {
    $(this).parents('.item').remove();
    shopNumber();
    money();
    let id = $(this).parents('.item').attr('data-id');
    console.log(id);
    let shopArrStr = localStorage.getItem('shopCart');
    console.log(shopArrStr);
    let shopArr = JSON.parse(shopArrStr);
    console.log(shopArr);
    shopArr.forEach(function (e, i) {
      if (id == shopArr[i].pID) {
        //一致则删除这条元素
        shopArr.splice(i, 1);
      }
    });
    //将数值转化为json字符串格式
    shopArrStr = JSON.stringify(shopArr);
    //将数据存入本地
    localStorage.setItem('shopCart', shopArrStr);
  });

  $('.number').on('blur', function () {
    let number = $(this).val();
    // console.log($(this).parents('.item').children('.price').text());
    $(this).parents('.item').find('.computed').text($(this).parents('.item').find('.price').text() * number);
    // console.log($(this).parents('.item').children('.computed').text());
    fnItem();
  });
  //购物车加减
  //获取元素 + - 按钮注册点击事件
  $('.item-list').on('click', '.add', function () {
    //获取原来的件数
    let old = parseInt($(this).prev('.number').val());
    // console.log('+++++' + old);
    old++;
    //判断件数大于0时取消减号按钮的不可点击
    if (old > 1) {
      $(this).prev().prev('.reduce').removeClass('disabled');
    }
    //phoneArr
    //将修改的值填入框中
    $(this).prev('.number').val(old);
    // let index = $(this).parents('.item').index();
    // console.log(shopArr[index]);
    $(this).parents('.item').find('.computed').text($(this).parents('.item').find('.price').text() * old);
    fnItem();
  });
  $('.item-list').on('click', '.reduce', function () {
    //获取原来的件数
    let old = parseInt($(this).next('.number').val());
    // console.log('-----' + old);
    if (old === 1) {
      $(this).addClass('disabled');
      return;
    }
    old--;
    // old < 1 ? old = 1 : old;
    // console.log(old);
    $(this).next('.number').val(old);
    // let index = $(this).parents('.item').index();
    // console.log(shopArr[index]);
    $(this).parents('.item').find('.computed').text($(this).parents('.item').find('.price').text() * old);
    fnItem();
  });
  //全选购物车
  function fnAll() {
    $('.pick-all1').prop('checked', $('.pick-all').prop('checked'));
    $('.item-ck').prop('checked', $('.pick-all').prop('checked'));
    console.log($('.pick-all'));
    shopNumber();
    money();
  }

  function fnAll1() {
    $('.item-ck').prop('checked', $('.total-of .pick-all').prop('checked'));
    console.log($('.pick-all'));
    shopNumber();
    money();
  }

  function fnItem() {
    $('.pick-all').prop('checked', $('.item-ck:checked').length === $('.item-ck').length);
    shopNumber();
    money();
  }
  //商品件数
  function shopNumber() {
    $('.selected').text($('.item-ck:checked').length);
  }
  //给结算设值
  function money() {
    let allPrice = 0;
    // let priceArr = $('.item .price');
    for (let i = 0; i < $('.item-ck:checked').length; i++) {
      allPrice += parseInt($('.item .computed')[i].innerText);
    }
    $('.total-money').text(allPrice);
  }
  $('.pick-all').on('click', fnAll);
  $('.total-of .pick-all').on('click', fnAll1);

  $('.item-ck').on('click', fnItem);

  //底部商品件数和总金额
  // setInterval(() => {
  $('.selected').text($('.item-ck:checked').length);
  // }, 10);
  let allPrice = 0;
  // let priceArr = $('.item .price');
  for (let i = 0; i < $('.item-ck:checked').length; i++) {
    allPrice += parseInt($('.item .computed')[i].innerText);
    // console.log(parseInt($('.item .price')[i].innerText));
    // console.log(allPrice);
  }
  // $('.item .price').forEach(e => {
  //   allPrice += parseInt(e.innerText);
  // });
  // console.log($('.item .price'));
  // let danjiage = parseInt($('.item .price').text());
  // allPrice += danjiage;
  $('.total-money').text(allPrice);

});