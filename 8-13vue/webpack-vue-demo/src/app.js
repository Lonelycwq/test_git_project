//引入vue组件
import index from '../components/index.vue';

//引入vue
import Vue from 'vue';

//渲染到页面指定位置
//创建一个vue实例对象
new Vue({
  el: '#app',
  //实现渲染
  render(h) {
    return h(index);
  },
});