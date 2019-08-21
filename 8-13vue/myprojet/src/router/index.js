// 引入vue
import Vue from 'vue'
// 引入vue-router
import VueRouter from 'vue-router'
// 引入组件
// import index from '@/components/index'
// import product from '@/components/product'
// import computer from '@/components/computer'
import father from '@/components/father'
// 使用VueRouter
Vue.use(VueRouter)
// 创建路由对象：实现路由和组件的映射
export default new VueRouter({
  // 添加路由配置，通过routes实现路由配置
  routes: [{
    name: 'father',
    path: '/father',
    component: father
  }
    //   name: 'default',
    //   path: '/',
    //   redirect: {
    //     name: 'father'
    //   }
    // },
    // {
    //   name: 'index',
    //   path: '/index',
    //   component: index
    // },
    // {
    //   name: 'product',
    //   path: '/product/:id',
    //   component: product,
    //   children: [{
    //     name: 'computer',
    //     path: 'computer',
    //     component: computer
    //   }]
    // }
  ]
})
