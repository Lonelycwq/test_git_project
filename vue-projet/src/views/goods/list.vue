<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin: 15px 0;">
      <el-input placeholder="请输入内容"
        v-model="goodsobj.query"
        class="input-with-select"
        style="width:300px;margin-right:15px"
        @keyup.enter.native="init">
        <el-button slot="append"
          icon="el-icon-search"
          @click="init"></el-button>
      </el-input>
      <el-button type="primary"
        plain
        @click="$router.push({name:'add'})">添加用户</el-button>
    </div>

    <!-- 用户数据表格 -->
    <el-table border=""
      :data="goodsList"
      style="width: 100%;margin-bottom:15px">
      <el-table-column type="index"
        align="center">
      </el-table-column>
      <el-table-column prop="goods_name"
        label="商品名称"
        width="600">
      </el-table-column>
      <el-table-column prop="goods_price"
        label="商品价格"
        align="center"
        width="100">
      </el-table-column>
      <el-table-column prop="goods_weight"
        label="商品重量"
        align="center"
        width="100">
      </el-table-column>
      <el-table-column prop="add_time"
        label="创建时间"
        align="center"
        width="200">
        <template slot-scope="scope">
          <div>
            {{ scope.row.add_time | timeFormat }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作"
        align="center">
        <template slot-scope="scope">
          <el-tooltip class="item"
            effect="dark"
            content="编辑操作"
            placement="top">
            <el-button plain
              type="primary"
              icon="el-icon-edit"></el-button>
          </el-tooltip>
          <el-tooltip class="item"
            effect="dark"
            content="审核"
            placement="top">
            <el-button plain
              type="success"
              icon="el-icon-share"></el-button>
          </el-tooltip>
          <el-tooltip class="item"
            effect="dark"
            content="删除操作"
            placement="top">
            <el-button plain
              type="danger"
              icon="el-icon-delete"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="goodsobj.pagenum"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="goodsobj.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
// 获取所有商品数据方法
import { getAllGoodsList } from '@/api/goods_index'
// 引入moment插件
import moment from 'moment'
export default {
  data () {
    return {
      total: 0,
      goodsobj: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      goodsList: []
    }
  },
  methods: {
    async init () {
      let res = await getAllGoodsList(this.goodsobj)
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.goodsList = res.data.data.goods
        this.total = res.data.data.total
      }
    },
    // 切换分页下拉列表时触发事件
    handleSizeChange (val) {
      this.goodsobj.pagesize = val
      this.init()
    },
    // 点击不同页码时触发事件
    handleCurrentChange (val) {
      this.goodsobj.pagenum = val
      this.init()
    }
  },
  filters: {
    timeFormat (time) {
      time = new Date(time * 1000)
      return moment(time).format('YYYY-MM-DD  HH:mm:ss')
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="less" scoped>
</style>
