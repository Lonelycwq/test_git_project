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
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/home/users">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>用户列表</span>
                  </template>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>权限管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>角色列表</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="2-2">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>权限列表</span>
                  </template>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="3-1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>商品列表</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="3-2">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>分类参数</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="3-3">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>商品分类</span>
                  </template>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>订单管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="4-1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>订单列表</span>
                  </template>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>数据统计</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="5-1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>数据报表</span>
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
            class="welcome">退出</a>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {}
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
