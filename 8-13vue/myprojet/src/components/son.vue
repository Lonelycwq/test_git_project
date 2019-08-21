<template>
  <div class="son">
    <h2>这是一个子组件</h2>
    <p>{{msg}}</p>
    <p>{{sname}}</p>
    子传父的数据
    <input
      type="text"
      v-model="zcfname"
      @input="tellname"
    >
    <button @click="tellname">子传父数据</button>
    <p>妹妹男朋友{{bfname}}</p>
  </div>
</template>
<script>
import bus from '@/utils/myvue'
export default {
  props: ['sname'],
  data () {
    return {
      msg: '子组件',
      zcfname: 'biubiubiu发射',
      bfname: '???'
    }
  },
  // watch: {
  //   zcfname (val) {
  //     this.$emit('getname', this.zcfname)
  //   }
  // },
  methods: {
    tellname () {
      this.$emit('getname', this.zcfname)
    }
  },
  mounted () {
    bus.$on('getbgname', (data) => {
      console.log(data)
      this.bfname = data.zczname
    })
  }
}
</script>
<style lang="less">
.son {
  background: #ce3f3f;
}
</style>
