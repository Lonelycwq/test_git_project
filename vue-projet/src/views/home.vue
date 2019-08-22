<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <div class="logo">
          <img
            src="../assets/logo.png"
            alt=""
          >
        </div>
        <el-col :span="24">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>选项1</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="1-2">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>选项2</span>
                  </template>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航二</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>选项1</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="2-2">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>选项2</span>
                  </template>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航三</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="3-1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>选项1</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="3-2">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>选项2</span>
                  </template>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="4">
              <i class="el-icon-location"></i>
              <span>导航四</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.logo {
  width: 100%;
  padding: 10px 20px;
  background: #fff;
  border-right: 1px solid 545c64;
}
/deep/.el-menu-item-group__title {
  padding: 0;
}
/deep/.el-aside {
  background: #545c64;
  height: 100vh;
}
</style>
