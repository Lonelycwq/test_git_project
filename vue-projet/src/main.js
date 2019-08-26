// 引入vue
import Vue from 'vue'
// 引入路由
import router from '@/router'
// 引入第三方饿了吗框架
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入主页
import App from './App.vue'
// import App from '@/views/login.vue'
// 引入自定义样式
import '@/styles/index.less'
// 是否为开发环境
Vue.config.productionTip = false
// 使用饿了吗ui
Vue.use(ElementUI)
// 添加导航前置守卫
router.beforeEach((to, from, next) => {
  // console.log(to)
  // 获取token
  let token = localStorage.getItem('logincookie')
  // 判断是否有token
  if (token || to.path === '/login') {
    // 有token时直接执行之后的代码
    next()
  } else {
    // 没有token时重定向
    next({
      path: '/login'
    })
  }
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
