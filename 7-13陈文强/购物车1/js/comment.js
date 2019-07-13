$(function(){
  let shopArrStr = localStorage.getItem('shopCart');
  let shopArr = JSON.parse(shopArrStr);
  let allnum = 0;
  shopArr.forEach(e => {
    allnum += e.number;
  });
  $('.count').text(allnum);
});