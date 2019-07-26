$(function () {
  let id = location.search.substring(5);
  // console.log(location.search.substring(5));
  //数组.filter 用于对数组里面的数据进行筛选，返回一个新的数值
  // let arr = phoneData.filter(function(e,i){
  //   return e.pID == id;
  // });
  //数组里面查找满足条件的元素
  let phoneObj = phoneData.find(function (e, i) {
    return e.pID == id;
  });
  //修改商品名称
  $('.sku-name').text(phoneObj.name);
  //修改商品价格
  $('.summary-price .dd em').text('￥' + phoneObj.price);
  //修改图片
  $('.preview-img>img').attr('src', phoneObj.imgSrc);
  //修改图片
  $('.bigimg').attr('src', phoneObj.imgSrc);
  //改变加购跳转链接
  $('.addshopcar').attr('href', './cart.html?pID=' + phoneObj.pID + '');
  //商品的加减
  //获取元素 + - 按钮注册点击事件
  let chooseNumber = $('.choose-number');
  let jiaBtn = $('.add');
  let jianBtn = $('.reduce');
  jiaBtn.on('click', function () {
    //获取原来的件数
    let old = parseInt(chooseNumber.val());
    old++;
    if (old > 1) {
      jianBtn.removeClass('disabled');
    }
    chooseNumber.val(old);
  });
  jianBtn.on('click', function () {
    //获取原来的件数
    let old = parseInt(chooseNumber.val());
    if (old === 1) {
      jianBtn.addClass('disabled');
      return;
    }
    old--;
    // old < 1 ? old = 1 : old;
    // console.log(old);
    chooseNumber.val(old);
  });

  //点击加入购物车将数据存入本地
  let shopArr;
  let shopArrStr = localStorage.getItem('shopCart');
  console.log(shopArrStr);
  if (shopArrStr == null) {
    shopArr = [];
  } else {
    //将字符串类型数据转化为数组类型
    shopArr = JSON.parse(shopArrStr);
  }
  // let shopObj = {
  //   imgSrc: phoneObj.imgSrc,
  //   left: phoneObj.left,
  //   name: phoneObj.name,
  //   pID: phoneObj.pID,
  //   percent: phoneObj.percent,
  //   price: phoneObj.price
  // }
  $('.addshopcar').on('click', function () {
    shopArr.push(phoneObj);
    let shopArrStr = JSON.stringify(shopArr);
    localStorage.setItem('shopCart',shopArrStr);
  });

  //初始隐藏遮罩层和大图区域
  $('.mask').hide();
  $('.big').hide();
  $('.big').css('overflow', 'hidden');
  $('.bigimg').css('width', '150%');
  //给小图区域绑定鼠标移入事件
  $('.preview-img').on('mouseover', function () {
    $('.mask').show();
    $('.big').show();
  });

  //给小图区域绑定鼠标移出事件
  $('.preview-img').on('mouseout', function () {
    $('.mask').hide();
    $('.big').hide();
  });
  //给小图绑定鼠标滑过事件
  $('.preview-img').on('mousemove', function (e) {
    //遮罩层中心显示在鼠标处
    //计算遮罩层离盒子的距离 = 鼠标离页面的距离 - 盒子离页面的距离 - 遮罩宽高的一半
    //获取鼠标离页面的距离
    // console.log(e);
    let x = e.pageX;
    let y = e.pageY;
    // console.log('鼠标离页面左边距离' + x);
    // console.log('鼠标离页面上面距离' + y);
    //获取盒子离页面的距离
    let boxX = $('.preview-wrap').position().left;
    let boxY = $('.preview-wrap').position().top;
    // console.log('盒子离页面上面距离' + boxX);
    // console.log('盒子离页面上面距离' + boxY);
    //获得遮罩宽度的一半
    let maskWidth = $('.mask').width() / 2;
    let maskHeight = $('.mask').height() / 2;
    // console.log('遮罩宽度' + maskWidth);
    // console.log('遮罩高度' + maskHeight);
    //计算出遮罩层随鼠标滑动所显示的位置
    let maskX = x - boxX - maskWidth;
    let maskY = y - boxY - maskHeight;
    //约束遮罩层能移动的最小距离和最大距离
    //最小距离
    maskX = maskX < 0 ? 0 : maskX;
    maskY = maskY < 0 ? 0 : maskY;
    //最大距离 = 盒子宽高 - 遮罩层宽高
    let maxX = $('.preview-img').width() - $('.mask').width();
    let maxY = $('.preview-img').height() - $('.mask').height();
    maskX = maskX > maxX ? maxX : maskX;
    maskY = maskY > maxY ? maxY : maskY;
    //将遮罩层该移动的距离设置到遮罩层上
    $('.mask').css('left', maskX + 'px');
    $('.mask').css('top', maskY + 'px');

    //获得大图区域最大移动距离 = 大图宽高 - 大盒子宽高
    let bigImgX = $('.bigimg').width() - $('.big').width();
    let bigImgY = $('.bigimg').height() - $('.big').height();
    //获取大图移动距离的公式为 遮罩移动距离/遮罩最大移动距离=大图移动距离/大图最大移动距离
    let bigX = maskX * bigImgX / maxX;
    let bigY = maskY * bigImgY / maxY;
    //设置计算的值给大图
    $('.bigimg').css('left', -bigX + 'px');
    $('.bigimg').css('top', -bigY + 'px');
  });

});