<template>
  <div>
    <h1>{{ msg }}产品页</h1>
    <router-link to="/computer">详情</router-link>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data () {
    return {
      msg: '**'
    }
  },
  watch: {
    $route (to, from) {
      var id = this.$route.params.id
      if (id === '1') {
        this.msg = '电脑'
      } else if (id === '2') {
        this.msg = '手机'
      } else if (id === '3') {
        this.msg = '飞机'
      }
    }
  },
  mounted () {
    // console.log(this.$route)
    // this.$router.push('/tiananmen')
    var id = this.$route.params.id
    if (id === '1') {
      this.msg = '电脑'
    } else if (id === '2') {
      this.msg = '手机'
    } else if (id === '3') {
      this.msg = '飞机'
    }
  }
}
</script>
<style lang="less">
</style>
