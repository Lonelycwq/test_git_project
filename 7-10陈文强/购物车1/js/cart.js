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
  let cart = `<div class="item" data-id="11">
  <div class="row">
    <div class="cell col-1 row">
      <div class="cell col-1">
        <input type="checkbox" class="item-ck" checked="">
      </div>
      <div class="cell col-4">
        <img src="${phoneArr.imgSrc}" alt="">
      </div>
    </div>
    <div class="cell col-4 row">
      <div class="item-name">${phoneArr.name}</div>
    </div>
    <div class="cell col-1 tc lh70">
      <span>￥</span>
      <em class="price">${phoneArr.price}</em>
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
      <em class="computed">${phoneArr.price}</em>
    </div>
    <div class="cell col-1">
      <a href="javascript:void(0);" class="item-del">从购物车中移除</a>
    </div>
  </div>
</div>`;
  $('.item-list').append(cart);
  //事件委托移除元素
  $('.item-list').on('click', '.item-del', function () {
    $(this).parents('.item').remove();
  });

  //购物车加减
  //购物车加减
  //获取元素 + - 按钮注册点击事件
  $('.item-list').on('click', '.add', function () {
    //获取原来的件数
    let old = parseInt($(this).prev('.number').val());
    console.log('+++++' + old);
    old++;
    if (old > 1) {
      $(this).prev().prev('.reduce').removeClass('disabled');
    }
    $(this).prev('.number').val(old);
  });
  $('.item-list').on('click', '.reduce', function () {
    //获取原来的件数
    let old = parseInt($(this).next('.number').val());
    console.log('-----' + old);
    if (old === 1) {
      $(this).addClass('disabled');
      return;
    }
    old--;
    // old < 1 ? old = 1 : old;
    // console.log(old);
    $(this).next('.number').val(old);
  });

  //全选购物车
  
});