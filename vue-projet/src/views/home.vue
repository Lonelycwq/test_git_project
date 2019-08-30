<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <div class="logo">
          <h1 class="logo"></h1>
        </div>
        <el-col :span="24">
          <el-menu class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :unique-opened="true"
            :router="true">
            <el-submenu :index="item.order+''"
              v-for="item in menuList"
              :key="item.id">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item.authName}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item :index="'/home/'+subitem.path"
                  v-for="subitem in item.children"
                  :key="subitem.id">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>{{subitem.authName}}</span>
                  </template>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-aside>
      <el-container>
        <el-header>
          <span class="myicon myicon-menu toggle-btn"></span>
          <h2 class="system-title">后台管理</h2>
          <a href="javascript:void(0)"
            class="welcome"
            @click="exit">退出</a>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// 引入获取左侧菜单方法
import { getLeftList } from '@/api/right_index'
export default {
  data () {
    return {
      menuList: []
    }
  },
  methods: {
    exit () {
      // 确认提示框确认退出
      this.$confirm('此操作将退出当前帐号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('logincookie')
        this.$router.push({ name: 'login' })
      }).catch(() => {
        this.$message.success('取消退出')
      })
    }
  },
  mounted () {
    getLeftList()
      .then((res) => {
        // console.log(res)
        if (res.data.meta.status === 200) {
          this.menuList = res.data.data
        }
      }).catch((err) => {
        console.log(err)
      })
  }
}
</script>

<style lang="less" scoped>
/deep/.el-menu-item-group__title {
  padding: 0;
}
.home {
  height: 100%;
  .el-menu {
    width: auto;
  }
  // 如果是展开状态,那么宽度就是200px,如果是合并状态,宽度:auto
  .el-menu:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height: 60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #fff;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      color: #ffd049;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
    &:hover {
      color: #f85d48;
    }
  }
}
</style>
