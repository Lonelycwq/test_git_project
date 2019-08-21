// 引入vue
import Vue from 'vue'
// 引入axios
// import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入第三方动画库
import '@/styles/animate.css'
// 引入路由
import router from '@/router/index'
// import First from '@/App.vue'
// import First from '@/components/first.vue'
// import First from '@/components/table.vue'
// import First from '@/components/animate.vue'
// import First from '@/components/axios.vue'
// import First from '@/components/index.vue'
// import First from '@/components/father.vue'
import First from '@/components/elementUi.vue'
// Vue.use(axios)
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(First)
}).$mount('#app')
