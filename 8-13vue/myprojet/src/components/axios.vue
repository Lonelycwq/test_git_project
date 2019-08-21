<template>
  <div>
    <button @click="getAllCate">查询列表数据</button>
    <button @click="getCateById">根据id查询数据</button>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {}
  },
  methods: {
    getAllCate: function () {
      axios
        .get('http://127.0.0.1:8000/getAllCate')
        .then(result => {
          console.log(result.data)
        })
        .catch(result => { })
    },
    getCateById: function () {
      axios
        .get('http://127.0.0.1:8000/getPostById', {
          params: { id: 9 }
        })
        .then(result => {
          console.log(result.data)
        })
        .catch(result => { })
    }
  }
}
</script>
<style lang="less">
</style>
