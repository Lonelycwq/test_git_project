import Vue from 'vue'
import Router from 'vue-router'
import login from './views/login.vue'
import home from './views/home.vue'
import welcome from './views/welcome.vue'
import users from './views/user/users.vue'
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
    }
    ]
  }
  ]
})
