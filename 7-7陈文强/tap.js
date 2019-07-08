/**
 * @author cwq //1017904699@qq.com
 * @date 2019/7/7/11：18
 * @description  封装好的移动端单击事件
 * @param {类型 - element } element 
 * @param {number} span 按下的时间间隔
 * @param {number} offset 允许的偏移距离
 * @param {function}  callback 回调函数
 */

function tap(element, callback, span, offset) {
  //先定义一个变量设置触摸开始到触摸结束的时间限制为500ms
  let time = 500;
  //再定义一个变量设置触摸开始到触摸结束偏移不能超过50px
  let painyiX = 50;
  let painyiY = 50;
  //定义一个变量表示开始触摸的时间
  let timeStart = 0;
  //定义两个变量表示开始触摸的坐标
  let startX = 0;
  let startY = 0;
  //注册手指触摸开始事件
  element.addEventListener('touchstart', function (e) {
    //判断触摸点是否唯一
    if (e.touches.length != 1) {
      console.log('触摸点不是一个');
      return;
    }
    //获取触摸开始的毫秒数
    timeStart = Date.now();
    //获取触摸开始的触摸点位置
    startX = e.touches[0].pageX;
    startY = e.touches[0].pageY;
  })

  //注册手指触摸结束事件
  element.addEventListener('touchend', function (e) {
    // 是否单指操作
    if (e.changedTouches.length !== 1) {
      console.log('不是单指操作');
      return;
    }
    //获取触摸结束的毫秒数
    let timeEnd = Date.now();
    //触摸结束和触摸开始的毫秒数相减判断是否是单击
    if ((timeEnd - timeStart) > time) {
      console.log('手指停留时间太长')
      return;
    }
    //获取触摸开始的触摸点位置
    let endX = e.changedTouches[0].pageX;
    let endY = e.changedTouches[0].pageY;
    //判断触摸结束和触摸开始的偏移是否过大
    if (Math.abs(endX - startX) > painyiX || Math.abs(endY - startY) > painyiY) {
      console.log('手指偏移距离过大')
      return;
    }
    console.log('这是一个手指点击事件')
    // 如果已经是一个单击操作了，需要做一些对应的响应 - 如果是封装好的代码里面，需要让别人能做一些什么事情，就让把一个函数传递归来
    callback && callback();
  })
}