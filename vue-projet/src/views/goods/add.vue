<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home/goods/list' }">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品新增</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <!-- 步骤条 -->
      <el-steps :active="activeName-0"
        finish-status="success">
        <el-step title="第一步"></el-step>
        <el-step title="第二步"></el-step>
        <el-step title="第三步"></el-step>
        <el-step title="第四步"></el-step>
        <el-step title="第五步"></el-step>
      </el-steps>
    </el-card>
    <el-card class="box-card">
      <!-- 表单 -->
      <el-form label-width="80px"
        :rules="rules"
        :model="goodsFrom">
        <el-tabs v-model="activeName"
          @tab-click="handleClick"
          tab-position="left">
          <el-tab-pane label="基本信息"
            name="0">
            <el-form-item label="商品名称"
              prop="goods_name">
              <el-input v-model="goodsFrom.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格"
              prop="goods_price">
              <el-input v-model="goodsFrom.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品数量"
              prop="goods_number">
              <el-input v-model="goodsFrom.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量"
              prop="goods_weight">
              <el-input v-model="goodsFrom.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品分类"
              prop="goods_cat">
              <el-cascader :options="options"
                :props="props"
                change-on-select
                @change="getgoodscat"
                :value="goodsFrom.goods_cat"></el-cascader>
            </el-form-item>

          </el-tab-pane>
          <el-tab-pane label="商品参数"
            name="1">商品参数</el-tab-pane>
          <el-tab-pane label="商品属性"
            name="2">商品属性</el-tab-pane>
          <el-tab-pane label="商品图片"
            name="3">商品图片</el-tab-pane>
          <el-tab-pane label="商品内容"
            name="4">商品内容</el-tab-pane>
        </el-tabs>
        <el-form-item size="large">
          <el-button type="primary"
            @click="getCateFrom">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 引入获取商品分类方法
import { getAllCatesList } from '@/api/cate_index'
export default {
  data () {
    return {
      // 步骤值和tab标签值
      activeName: 0,
      // 新增商品表单数据
      goodsFrom: {
        goods_name: '',
        goods_cat: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: [],
        attrs: []
      },
      // 级联选择器数据源
      options: [],
      // 级联选择器设置
      props: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      // 表单验证规则
      rules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goods_cat: [
          { required: true, message: '请选择商品分类', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    next () {
      if (this.activeName++ > 2) this.active = 0
    },
    handleClick (tab, event) {
      // console.log(tab, event)
    },
    getgoodscat (value) {
      this.goodsFrom.goods_cat = value.join(',')
    },
    getCateFrom () {
      // this.goodsFrom.goods_cat = this.goodsFrom.goods_cat.join(',')
      console.log(this.goodsFrom)
    },
    async getCate () {
      let res = await getAllCatesList(3)
      console.log(res)
      if (res.data.meta.status === 200) {
        this.options = res.data.data
      }
    }
  },
  mounted () {
    this.getCate()
  }
}
</script>

<style lang="less" scoped>
</style>
