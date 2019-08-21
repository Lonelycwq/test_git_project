<template>
  <div class="nver">
    <h2>这是一个子组件</h2>
    <p>{{msg}}</p>
    子传子的数据
    <input
      type="text"
      v-model="npy.zczname"
      @input="tellbfname"
    >
    <button @click="tellbfname">子传子数据</button>
  </div>
</template>
<script>
import bus from '@/utils/myvue'
export default {
  data () {
    return {
      msg: '女儿组件',
      npy: {
        zczname: 'biubiubiu发射',
        zczage: 18
      }
    }
  },
  methods: {
    tellbfname () {
      bus.$emit('getbgname', this.npy)
    }
  }
}
</script>
<style lang="less">
.nver {
  background: #595596;
}
</style>
