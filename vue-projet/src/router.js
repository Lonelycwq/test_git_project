import Vue from 'vue'
import Router from 'vue-router'
import login from './views/login.vue'
import home from './views/home.vue'
import welcome from './views/welcome.vue'
import users from './views/user/users.vue'
import rights from './views/rights/rightList.vue'
import roles from './views/rights/roleList.vue'
import goods from './views/goods/goods.vue'
import add from './views/goods/add.vue'
import list from './views/goods/list.vue'
// import app from './App.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'default',
    redirect: {
      name: 'login'
    }
  }, {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/home',
    name: 'home',
    component: home,
    redirect: {
      name: 'welcome'
    },
    children: [{
      path: 'welcome',
      name: 'welcome',
      component: welcome
    },
    {
      path: 'users',
      name: 'users',
      component: users
    },
    {
      path: 'rights',
      name: 'rights',
      component: rights
    },
    {
      path: 'roles',
      name: 'roles',
      component: roles
    },
    {
      path: 'goods',
      name: 'goods',
      component: goods,
      redirect: {
        name: 'list'
      },
      children: [{
        path: 'add',
        name: 'add',
        component: add
      },
      {
        path: 'list',
        name: 'list',
        component: list
      }
      ]
    }
    ]
  }
  ]
})
