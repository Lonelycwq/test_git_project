<template>
  <div class="father">
    <h1>这是一个父组件</h1>
    <p>{{msg}}</p>
    <p>子传父的值是{{zcfname}}</p>
    <son
      v-bind:sname="sname"
      @getname="getname"
    ></son>
    <nver></nver>
  </div>
</template>
<script>
// 引入子组件
import son from '@/components/son'
import nver from '@/components/nver'
export default {
  // 注册子组件
  components: {
    son, nver
  },
  methods: {
    getname (val) {
      console.log(val)
      this.zcfname = val
    }
  },
  data () {
    return {
      msg: '父组件',
      sname: '传值',
      zcfname: ''
    }
  }
}
</script>
<style lang="less">
.father {
  background-color: pink;
}
</style>
