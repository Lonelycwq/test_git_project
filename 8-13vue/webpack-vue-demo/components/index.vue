<template>
  <div>
    <p class="p1">这是一个尾部</p>
    <p>{{msg}}</p>
  </div>
</template>

<script>
// export default {}相当于module.export = {}
//返回一个对象
export default {
  data() {
    return {
      msg: "这个一个小尾巴"
    };
  }
};
</script>


<style lang="css">
.p1 {
  color: aqua;
}
</style>