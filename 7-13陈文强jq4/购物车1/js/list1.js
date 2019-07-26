$(() => {
  //定义一个空字符串变量存储拼接的页面字符串
  let html = '';
  //遍历数组将页面动态的数据绑定并拼接字符串
  phoneData.forEach(e => {
    html += `<li class="goods-list-item">
      <a href="detail.html?id=${e.pID}">
        <div class="item-img">
          <img src="${e.imgSrc}" alt="">
        </div>
        <div class="item-title">
          ${e.name}
        </div>
        <div class="item-price">
          <span class="now">¥${e.price}</span> <s>￥${e.price + 1000}</s>
        </div>
        <div class="sold">
          <span> 已售 <em>${e.percent}% </em></span>
          <div class="scroll">
            <div class="per" style="width:${e.percent}%"></div>
          </div>
          <span>剩余<i>${e.left}</i>件</span>
        </div>
      </a>
      <a href="detail.html?id=${e.pID}" class="buy">
        查看详情
      </a>
    </li>`;
  });
  //将拼接的字符串插入ul中
  $('.goods-list>ul').html(html);
});