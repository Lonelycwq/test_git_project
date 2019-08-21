<template>
  <div id="app">
    <h2>{{ msg + '拼接字符串' }}</h2>
    <p v-text="msg1?'正确的':'错误的'"></p>
    <div v-html="html"></div>
    <a v-bind:href="href + msg1">一个简单的跳转</a>
    <!-- <img v-bind:src="src" alt=""> -->
    <p :title="data">鼠标悬停显示加载时间</p>
    <div class="box">
      <button @click="class1 = false">切换样式</button>
      <div :class="class1 ? 'boxson' : 'boxson1'"></div>
      <div :class="'boxson1'"></div>
    </div>
    <br>
    用户名：
    <input type="text" v-model="form.userName">
    <!-- <input type="text" v-model="form.userName" v-fous> -->
    <br>
    密码：
    <input type="text" v-model="form.userPass">
    <input type="text" v-model="form.userPass" v-focus v-color="'red'">
    <br>
    <input @click="getform" :value="btn" type="button">
    <ul>
      <li v-for="(value,index) in arr" :key="index">{{index + ":"+ value}}</li>
    </ul>
    <table>
      <thead>
        <tr>
          <th>姓名</th>
          <th>性别</th>
          <th>年龄</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value,index) in objarr" :key="index">
          <td>{{value.name}}</td>
          <td>{{value.gender}}</td>
          <td>{{value.age}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { focus } from '../tools/userdirective'
export default {
  data: function () {
    return {
      msg: '插值表达式',
      msg1: false,
      html: '<h3>结构插值表达式</h3>',
      href: '/index',
      data: '文字加载与' + new Date().toLocaleString(),
      class1: true,
      src: '../assets/logo.png',
      btn: '按钮',
      form: {
        userName: '',
        userPass: ''
      },
      arr: ['一一得一', '一二得二', '一三得三', '一四得四'],
      objarr: [
        { name: '张三', gender: '男', age: 22 }, { name: '小龙虾', gender: '女', age: 20 }, { name: '梅子', gender: '女', age: 18 }
      ]
    }
  },
  methods: {
    getform () {
      alert(this.form.userName + this.form.userPass)
    }
  },
  directives: {
    focus,
    fous: {
      inserted: function (el) {
        el.focus()
      }
    },
    color: {
      inserted: function (el, binding) {
        el.style.color = binding.value
      }
    }
  }
}

</script>

<style scoped lang="less">
.box{
  padding: 20px;
  font-size: 16px;
  color: salmon;
  .boxson{
    width: 300px;
    height: 150px;
    border: 1px solid #f00;
  }
  .boxson1{
    width: 150px;
    height: 75px;
    border: 5px solid salmon;
    transition: all linear 2s;
  }
}
.table {
border: 1px solid #ccc;
}
</style>
