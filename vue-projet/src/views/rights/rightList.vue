<template>
  <div class="jurisdiction">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 权限数据表格 -->
    <el-table border=""
      :data="rightList"
      style="width: 100%;margin-bottom:15px">
      <el-table-column type="index"
        align="center">
      </el-table-column>
      <el-table-column prop="authName"
        label="权限名称"
        align="center">
      </el-table-column>
      <el-table-column prop="path"
        label="路径"
        align="center">
      </el-table-column>
      <el-table-column prop="level"
        label="层级"
        align="center">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.level | levelEdit}}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 引入获取权限列表方法
import { getAllRightList } from '@/api/right_index.js'
export default {
  data () {
    return {
      rightList: []
    }
  },
  methods: {

  },
  // 添加过滤器
  filters: {
    levelEdit (level) {
      if (level === '0') {
        return '一级'
      } else if (level === '1') {
        return '二级'
      } else if (level === '2') {
        return '三级'
      }
    }
  },
  mounted () {
    getAllRightList('list')
      .then((res) => {
        console.log(res)
        if (res.data.meta.status === 200) {
          this.rightList = res.data.data
        } else {
          this.$message.error(res.data.meta.msg)
        }
      }).catch((err) => {
        console.log(err)
        this.$message.error('获取数据失败')
      })
  }
}
</script>

<style lang="less" scoped>
</style>
