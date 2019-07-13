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

  //取出本地存储数据
  let shopArr;
  let shopArrStr = localStorage.getItem('shopCart');
  //判断数据是否为空，不为空则在数组中加入已存在的数据
  if (shopArrStr !== null) {
    $('.empty-tip').hide();
    $('.cart-header').show();
    $('.total-of').show();
    //将字符串类型数据转化为数组类型
    shopArr = JSON.parse(shopArrStr);
    // console.log(shopArr);
    //循环遍历数组里面所有的的数据并拼接
    let html = '';
    for (let i = shopArr.length - 1; i >= 0; i--) {
      let numPrice = shopArr[i].number * shopArr[i].price;
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
            <input autocomplete="off" type="text" class="number fl" value="${shopArr[i].number}">
            <a href="javascript:void(0);" class="add fl">+</a>
          </div>
        </div>
        <div class="cell col-1 tc lh70">
          <span>￥</span>
          <em class="computed">${numPrice}</em>
        </div>
        <div class="cell col-1">
          <a href="javascript:void(0);" class="item-del">从购物车中移除</a>
        </div>
      </div>
      </div>`;
    }
    if (shopArr.length == 0) {
      console.log(shopArrStr);
      $('.empty-tip').show();
      $('.cart-header').hide();
      $('.total-of').hide();
    }
    //将拼接的字符串插入页面合适的位置中
    $('.item-list').html(html);
  }

  //商品件数输入框失去焦点时计算
  $('.number').on('blur', function () {
    let old = parseInt($(this).val());
    console.log(old);
    // $(this).parents('.item').find('.computed').text($(this).parents('.item').find('.price').text() * number);
    let id = $(this).parents('.item').attr('data-id');
    let obj = shopArr.find(e => {
      return e.pID == id;
    })
    obj.number = old;
    let shopArrStr = JSON.stringify(shopArr);
    localStorage.setItem('shopCart', shopArrStr);
    $(this).parents('.item').find('.computed').text(obj.price * obj.number);
    money();
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
    // let id = parseInt($(e).parents('.item').attr('data-id'));
    // $(this).parents('.item').find('.computed').text($(this).parents('.item').find('.price').text() * old);
    let id = $(this).parents('.item').attr('data-id');
    let obj = shopArr.find(e => {
      return e.pID == id;
    })
    obj.number = old;
    let shopArrStr = JSON.stringify(shopArr);
    localStorage.setItem('shopCart', shopArrStr);
    $(this).parents('.item').find('.computed').text(obj.price * obj.number);
    money();
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
    // $(this).parents('.item').find('.computed').text($(this).parents('.item').find('.price').text() * old);
    let id = $(this).parents('.item').attr('data-id');
    let obj = shopArr.find(e => {
      return e.pID == id;
    })
    obj.number = old;
    money();
  });
  //全选购物车
  function fnAll() {
    $('.pick-all1').prop('checked', $('.pick-all').prop('checked'));
    $('.item-ck').prop('checked', $('.pick-all').prop('checked'));
    console.log($('.pick-all'));
    money();
  }

  function fnAll1() {
    $('.item-ck').prop('checked', $('.total-of .pick-all').prop('checked'));
    console.log($('.pick-all'));
    money();
  }

  function fnItem() {
    $('.pick-all').prop('checked', $('.item-ck:checked').length === $('.item-ck').length);
    money();
  }

  //封装商品件数修改重新改变本地存储

  //封装商品件数和总价设值方法
  function money() {
    //底部商品件数和总金额
    let totalnum = 0;
    let totalmon = 0;
    $('.item-list input[type=checkbox]:checked').each((i, e) => {
      let id = parseInt($(e).parents('.item').attr('data-id'));
      // let shopArrStr = localStorage.getItem('shopCart');
      // let shopArr = JSON.parse(shopArrStr);
      // console.log(shopArr);
      shopArr.forEach(e => {
        // console.log(e.pID, id);
        if (id == e.pID) {
          // console.log(e);
          totalnum += e.number;
          totalmon += e.number * e.price;
        }
      });
    });
    // $('.selected').text($('.item-ck:checked').length);
    // let allPrice = 0;
    // for (let i = 0; i < $('.item-ck:checked').length; i++) {
    //   allPrice += parseInt($('.item .computed')[i].innerText);
    // }
    $('.selected').text(totalnum);
    $('.total-money').text(totalmon);
  }
  money();
  $('.pick-all').on('click', fnAll);
  $('.total-of .pick-all').on('click', fnAll1);
  $('.item-ck').on('click', fnItem);

  //事件委托移除一栏商品
  $('.item-list').on('click', '.item-del', function () {
    let _this = this;
    //提示框提示用户是否删除
    $("#dialog-confirm").dialog({
      resizable: false,
      height: 140,
      modal: true,
      buttons: {
        "确认": function () {
          $(this).dialog("close");
          // 把对应的商品结构移除
          // console.log(_this);
          $(_this).parents('.item').remove();
          // 把本地数据移除
          // 我们现在需要根据id获取本地存储里面的数据
          let id = parseInt($(_this).parents('.item').attr('data-id'));
          // console.log(id);
          // 把对应id的数据读取出来
          // let obj = arr.find(e => {
          //   return e.pID === id;
          // });
          // // console.log(obj);
          // // 把对应的id的数据从本地存储里面移除
          // // arr.splice(从哪里开始删除,总共删除多少个);
          // let index = arr.indexOf(obj);
          // console.log(index);

          // 获取满足条件的元素的索引          
          let index = shopArr.findIndex((e) => {
            return e.pID === id
          })

          shopArr.splice(index, 1);
          //将数值转化为json字符串格式
          shopArrStr = JSON.stringify(shopArr);
          //将数据存入本地
          localStorage.setItem('shopCart', shopArrStr);
          shopArrStr = JSON.parse(localStorage.getItem('shopCart'));
          if (shopArrStr.length == 0) {
            $('.empty-tip').show();
            $('.cart-header').hide();
            $('.total-of').hide();
          }
          money();
        },
        "取消": function () {
          $(this).dialog("close");
        }
      }
    });
    // let id = $(this).parents('.item').attr('data-id');
    // let shopArrStr = localStorage.getItem('shopCart');
    // console.log(shopArrStr);
    // let shopArr = JSON.parse(shopArrStr);
    // console.log(shopArr);
    // shopArr.forEach(function (e, i) {
    //   if (id == shopArr[i].pID) {
    //     //一致则删除这条元素
    //     shopArr.splice(i, 1);
    //   }
    // });
    // //将数值转化为json字符串格式
    // shopArrStr = JSON.stringify(shopArr);
    // //将数据存入本地
    // localStorage.setItem('shopCart', shopArrStr);
    // money();

  });
});