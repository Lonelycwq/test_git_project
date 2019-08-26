<template>
  <div class="jurisdiction">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-button type="success" @click="addmodal = true">添加角色</el-button>
    <!-- 用户数据表格 -->
    <el-table border=""
      :data="roleList"
      style="width: 100%;margin-top:15px;margin-bottom:15px">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row v-for="rights in scope.row.children"
            :key="rights.id"
            style="margin-bottom:10px;border-bottom:1px dashed #ccc">
            <el-col :span="4">
              <el-tag closable @close="delRight(scope.row,rights.id)">
                {{rights.authName}}</el-tag>
            </el-col>
            <el-col :span="20">
              <el-row v-for="tag in rights.children"
                :key="tag.id">
                <el-col :span="4">
                  <el-tag type="success"
                    closable
                    style="margin-bottom:15px;margin-right:10px;"
                    @close="delRight(scope.row,tag.id)">{{tag.authName}}</el-tag>
                </el-col>
                <el-col :span="20">
                  <el-tag type="info"
                    v-for="tagmin in tag.children"
                    :key="tagmin.id"
                    closable
                    style="margin-bottom:15px;margin-right:10px;"
                    @close="delRight(scope.row,tagmin.id)">
                    {{tagmin.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <div v-if="scope.row.children.length === 0">
            没有任何的权限，请先分配！！
          </div>
        </template>
      </el-table-column>
      <el-table-column type="index"
        align="center">
      </el-table-column>
      <el-table-column prop="roleName"
        label="角色名称"
        align="center">
      </el-table-column>
      <el-table-column prop="roleDesc"
        label="描述"
        align="center">
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
              icon="el-icon-edit"
              @click="openedit(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item"
            effect="dark"
            content="分配角色"
            placement="top">
            <el-button plain
              type="success"
              icon="el-icon-share"
              @click="allotrole(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item"
            effect="dark"
            content="删除操作"
            placement="top">
            <el-button plain
              type="danger"
              icon="el-icon-delete"
              @click="delrole(scope.row.id)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增角色模态框 -->
    <el-dialog title="添加角色"
      :visible.sync="addmodal">
      <el-form :model="roleobj"
        :rules="rules"
        ref="addroleform"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="角色名称"
          prop="roleName">
          <el-input v-model="roleobj.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述"
          prop="roleDesc">
          <el-input v-model="roleobj.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
        class="dialog-footer">
        <el-button @click="resetForm('addroleform','addmodal')">取 消</el-button>
        <el-button type="primary"
          @click="addrole('addroleform')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改角色模态框 -->
    <el-dialog title="修改角色"
      :visible.sync="editmodal">
      <el-form :model="editroleobj"
        :rules="rules"
        ref="editroleform"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="角色名称"
          prop="roleName">
          <el-input v-model="editroleobj.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述"
          prop="roleDesc">
          <el-input v-model="editroleobj.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
        class="dialog-footer">
        <el-button @click="resetForm('editroleobj','editmodal')">取 消</el-button>
        <el-button type="primary"
          @click="editrole('editroleform')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 角色分配权限模态框 -->
    <el-dialog title="分配权限"
      :visible.sync="rightmodal">
      <el-tree
        :data="treedata"
        show-checkbox
        node-key="id"
        :default-expand-all='true'
        :default-checked-keys="clickroleList"
        :props="defaultProps">
      </el-tree>
      <div slot="footer"
        class="dialog-footer">
        <el-button @click="rightmodal = false">取 消</el-button>
        <el-button type="primary"
          @click="changeright">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入获取角色列表的方法
import { getRoleList, addRole, delRightByRid, delRoleById, editRoleById } from '@/api/role_index.js'
// 引入获取权限列表方法
import { getAllRightList } from '@/api/right_index.js'

export default {
  data () {
    return {
      roleList: [],
      treedata: [],
      clickroleList: [],
      addmodal: false,
      rightmodal: false,
      editmodal: false,
      // 角色表单
      roleobj: {
        roleName: '',
        roleDesc: ''
      },
      editroleobj: {
        id: '',
        roleName: '',
        roleDesc: ''
      },
      // 树形结构配置
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      // 表单验证规则
      rules: {
        roleName: [
          { required: true, message: '角色名称', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '角色描述', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 封装获取所有角色数据方法
    init () {
      getRoleList()
        .then((res) => {
          console.log(res)
          if (res.data.meta.status === 200) {
          // 给角色列表数组赋值
            this.roleList = res.data.data
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    // 删除当前角色权限
    delRight (row, rightId) {
      delRightByRid(row.id, rightId)
        .then((res) => {
          console.log(res)
          if (res.data.meta.status === 200) {
            this.$message.success(res.data.meta.msg)
            // this.init()
            row.children = res.data.data
          }
        }).catch((err) => {
          console.log(err)
        })
    },
    // 清空表单方法，第一个参数为表单ref值第二个参数为modal标识变量
    resetForm (formName, modal) {
      // 清空表单
      this.$refs[formName].resetFields()
      // 隐藏模态框
      this[modal] = false
      // this.clickroleList = []
    },
    // 新增角色方法
    addrole (formName) {
      console.log(this.roleobj)
      // 对整个表单验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addRole(this.roleobj)
            .then((res) => {
              console.log(res)
              if (res.data.meta.status === 201) {
                this.init()
                this.$message.success('新增角色成功')
                this.addmodal = false
              } else {
                this.$message.error(res.data.meta.msg)
              }
            }).catch((err) => {
              console.log(err)
              this.$message.error('新增角色失败')
            })
        } else {
          this.$message.error('新增角色失败')
        }
      })
    },
    // 分配角色
    allotrole (row) {
      console.log(row)
      getAllRightList('tree')
        .then((res) => {
          console.log(res)
          this.treedata = res.data.data
        }).catch((err) => {
          console.log(err)
        })
      let newarr = []
      console.log(this.clickroleList)
      function fn (arr) {
        // for (let i = 0; i < arr.length; i++) {
        //   // this.clickroleList.push(arr[i].id)
        //   newarr.push(arr[i].id)
        //   // console.log(arr[i].id)
        //   if (arr[i].children) {
        //     fn(arr[i].children)
        //   }
        // }
        arr.forEach((e) => {
          newarr.push(e.id)
          if (e.children) {
            fn(e.children)
          }
        })
      }
      fn(row.children)
      this.clickroleList.length = 0
      // row.children.filter(function (val) {
      //   console.log(val.id)
      //   return val.id
      // })
      this.clickroleList = [...newarr]
      console.log(this.clickroleList)
      this.rightmodal = true
    },
    openedit (row) {
      this.editroleobj.roleDesc = row.roleDesc
      this.editroleobj.roleName = row.roleName
      this.editroleobj.id = row.id
      this.editmodal = true
    },
    editrole (formName) {
      // 对整个表单验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editRoleById(this.editroleobj)
            .then((res) => {
              console.log(res)
              if (res.data.meta.status === 200) {
                this.init()
                this.$message.success('编辑角色成功')
                this.editmodal = false
              } else {
                this.$message.error(res.data.meta.msg)
              }
            })
            .catch((err) => {
              console.log(err)
              this.$message.error('编辑角色失败')
            })
        } else {
          this.$message.error('编辑角色失败')
        }
      })
    },
    // 删除角色方法
    delrole (id) {
      // 确认提示框确认删除
      this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定时发送删除数据请求
        delRoleById(id)
          .then((res) => {
            if (res.data.meta.status === 200) {
              // 删除成功提示
              this.$message.success(res.data.meta.msg)
              // 重新获取所有用户数据，异步加载表格
              this.init()
            }
          }).catch((err) => {
            console.log(err)
          })
      }).catch(() => {
        this.$message.success('取消删除')
      })
    }
  },
  mounted () {
    // 获取角色列表方法
    this.init()
  }
}
</script>

<style lang="less" scoped>
</style>
