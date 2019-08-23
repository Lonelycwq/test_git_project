<template>
  <div class="users">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin: 15px 0;">
      <el-input
        placeholder="请输入内容"
        v-model="userobj.query"
        class="input-with-select"
        style="width:300px;margin-right:15px"
        @keyup.enter.native="init"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="init"
        ></el-button>
      </el-input>
      <el-button
        type="primary"
        plain
      >添加用户</el-button>
    </div>
    <el-table
      border=""
      :data="userList"
      style="width: 100%;margin-bottom:15px"
    >
      <el-table-column
        type="index"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="用户状态"
        align="center"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑操作"
            placement="top"
          >
            <el-button
              plain
              type="primary"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="分配角色"
            placement="top"
          >
            <el-button
              plain
              type="success"
              icon="el-icon-share"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="删除操作"
            placement="top"
          >
            <el-button
              plain
              type="danger"
              icon="el-icon-delete"
            ></el-button>
          </el-tooltip>

        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="userobj.pagenum"
        :page-sizes="[2, 4, 6, 10]"
        :page-size="userobj.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background="#fbc4c4"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
// 引入获取所有用户数据的方法
import { getAllUsers } from '@/api/user_index.js'
export default {
  data () {
    return {
      userKey: '',
      userList: [],
      total: 0,
      userobj: {
        query: '',
        pagenum: 1,
        pagesize: 2
      }
    }
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    // 切换分页下拉列表时触发事件
    handleSizeChange (val) {
      this.userobj.pagesize = val
      this.init()
    },
    handleCurrentChange (val) {
      this.userobj.pagenum = val
      this.init()
    },
    init () {
      getAllUsers(this.userobj)
        .then((res) => {
          console.log(res)
          if (res.data.meta.status === 200) {
            this.userList = res.data.data.users
            this.total = res.data.data.total
          } else if (res.data.meta.status === 400) {
            this.$message.error(res.data.meta.msg)
            this.$router.push({ name: 'login' })
          }
        }).catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="less" scoped>
</style>
