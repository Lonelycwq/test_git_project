<template>
  <div>
    <button @click="isBox = !isBox">动画切换按钮</button>
    <button @click="isAnimate = !isAnimate">动画切换按钮使用第三方动画库</button>
    <button @click="isGou = !isGou">动画切换按钮使用钩子函数</button>
    <transition name="box">
      <div class="box" v-show="isBox"></div>
    </transition>
    <transition enter-active-class="animated rubberBand" leave-active-class="animated flash">
      <div class="box" v-show="isAnimate"></div>
    </transition>
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="box" v-show="isGou"></div>
    </transition>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isBox: false,
      isAnimate: false,
      isGou: false
    }
  },
  methods: {
    beforeEnter: function (el) {
      el.style.marginLeft = '200px'
    },
    // 当与 CSS 结合使用时
    // 回调函数 done 是可选的
    // el:就是指当前添加过渡动画效果的元素
    enter: function (el, done) {
      console.log(1)
      let dis = 200
      let timeid = setInterval(() => {
        dis--
        el.style.marginLeft = dis + 'px'
        if (dis === 0) {
          clearInterval(timeid)
          done()
        }
      }, 1)
    },
    afterEnter: function (el) {
      el.style.marginLeft = '0px'
    }
  }
}
</script>
<style lang="less">
.box {
  width: 200px;
  height: 200px;
  background-color: #00ffff;
}
.box-enter {
  margin-left: -220px;
  background-color: #00ffff;
}
.box-enter-active {
  transition: all 3s linear;
}
.box-enter-to {
  margin-left: 300px;
  background-color: #00ff4c;
}
.box-leave {
  margin-left: 300px;
  background-color: #00ff4c;
}
.box-leave-active {
  transition: all 2s linear;
}
.box-leave-to {
  margin-left: -220px;
  background-color: #00ffff;
}
</style>
