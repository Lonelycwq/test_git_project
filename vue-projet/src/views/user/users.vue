<template>
  <div class="users">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin: 15px 0;">
      <el-input placeholder="请输入内容"
        v-model="userobj.query"
        class="input-with-select"
        style="width:300px;margin-right:15px"
        @keyup.enter.native="init">
        <el-button slot="append"
          icon="el-icon-search"
          @click="init"></el-button>
      </el-input>
      <el-button type="primary"
        plain
        @click="addmodal = true">添加用户</el-button>
    </div>

    <!-- 用户数据表格 -->
    <el-table border=""
      :data="userList"
      style="width: 100%;margin-bottom:15px">
      <el-table-column type="index"
        align="center">
      </el-table-column>
      <el-table-column prop="username"
        label="姓名"
        align="center">
      </el-table-column>
      <el-table-column prop="email"
        label="邮箱"
        align="center">
      </el-table-column>
      <el-table-column prop="mobile"
        label="电话"
        align="center">
      </el-table-column>
      <el-table-column label="用户状态"
        align="center">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="editState(scope.row.id,scope.row.mg_state)">
          </el-switch>
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
              icon="el-icon-edit"
              @click="edit(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item"
            effect="dark"
            content="分配角色"
            placement="top">
            <el-button plain
              type="success"
              icon="el-icon-share"
              @click="openrole(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item"
            effect="dark"
            content="删除操作"
            placement="top">
            <el-button plain
              type="danger"
              icon="el-icon-delete"
              @click="deluser(scope.row.id)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="userobj.pagenum"
        :page-sizes="[2, 4, 6, 10]"
        :page-size="userobj.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <!-- 新增用户模态框 -->
    <el-dialog title="添加用户数据"
      :visible.sync="addmodal">
      <el-form :model="adduserobj"
        :rules="rules"
        ref="adduserobj"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="用户名"
          prop="username">
          <el-input v-model="adduserobj.username"></el-input>
        </el-form-item>
        <el-form-item label="密码"
          prop="password">
          <el-input v-model="adduserobj.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱"
          prop="email">
          <el-input v-model="adduserobj.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号"
          prop="mobile">
          <el-input v-model="adduserobj.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
        class="dialog-footer">
        <el-button @click="resetForm('adduserobj','addmodal')">取 消</el-button>
        <el-button type="primary"
          @click="addUser('adduserobj')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑用户模态框 -->
    <el-dialog title="编辑用户数据"
      :visible.sync="editmodal">
      <el-form :model="edituserobj"
        :rules="rules"
        ref="edituserobj"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="用户名">
          <el-input v-model="edituserobj.username"
            :disabled="true"
            style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="邮箱"
          prop="email">
          <el-input v-model="edituserobj.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号"
          prop="mobile">
          <el-input v-model="edituserobj.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
        class="dialog-footer">
        <el-button @click="resetForm('edituserobj','editmodal')">取 消</el-button>
        <el-button type="primary"
          @click="editTrue('edituserobj')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分配用户角色模态框 -->
    <el-dialog title="分配用户角色"
      :visible.sync="rolemodal">
      <el-form :model="userroleobj"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="用户名">
          <el-input v-model="userroleobj.username"
            :disabled="true"
            style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="userroleobj.rid"
            clearable
            placeholder="请选择角色">
            <el-option v-for="item in roleList"
              :key="item.value"
              :label="item.roleName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer"
        class="dialog-footer">
        <el-button @click="rolemodal = false">取 消</el-button>
        <el-button type="primary"
          @click="changerole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入获取所有用户数据的方法
import { getAllUsers, getAddUsers, editUsers, userState, delUserById, editRole } from '@/api/user_index.js'
// 引入获取角色列表的方法
import { getRoleList } from '@/api/role_index.js'
export default {
  data () {
    return {
      userList: [],
      roleList: [],
      total: 0,
      // 模态框标识
      addmodal: false,
      editmodal: false,
      delmodal: false,
      rolemodal: false,
      // 用户列表对象
      userobj: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      // 新增用户表单对象
      adduserobj: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 修改用户表单对象
      edituserobj: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      },
      // 分配角色对象
      userroleobj: {
        id: '',
        rid: '',
        username: ''
      },
      // 表单验证规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入合法的邮箱地址', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[34578]\d{9}$/, message: '请输入正确手机号', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 切换分页下拉列表时触发事件
    handleSizeChange (val) {
      this.userobj.pagesize = val
      this.init()
    },
    // 点击不同页码时触发事件
    handleCurrentChange (val) {
      this.userobj.pagenum = val
      this.init()
    },
    // 获取所有用户数据方法
    init () {
      getAllUsers(this.userobj)
        .then(res => {
          console.log(res)
          if (res.data.meta.status === 200) {
            // 成功获取数据则给表格数据赋值和总页数赋值
            this.userList = res.data.data.users
            this.total = res.data.data.total
          } else if (res.data.meta.status === 400) {
            // 失败则提示用户
            this.$message.error(res.data.meta.msg)
          } else {
            // 异常则跳转至登录页
            this.$router.push({ name: 'login' })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 新增用户方法
    addUser (formName) {
      // 对整个表单验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 调用新增用户数据的方法
          getAddUsers(this.adduserobj)
            // 发送请求成功
            .then((res) => {
              // console.log(res)
              // 成功失败都提示
              if (res.data.meta.status === 201) {
                // 重新获取所有用户数据，异步加载表格
                this.init()
                // 成功提示
                this.$message.success(res.data.meta.msg)
                // 关闭模态框
                this.addmodal = false
                // 清空表单
                this.resetForm('adduserobj', 'addmodal')
              } else {
                // 新增失败报错
                this.$message.error(res.data.meta.msg)
              }
            }).catch((err) => {
              console.log(err)
              this.$message.error('新增用户失败')
            })
        } else {
          // 表单未通过验证时提示
          this.$message.error('新增用户失败')
          return false
        }
      })
    },
    // 清空表单方法，第一个参数为表单ref值第二个参数为modal标识变量
    resetForm (formName, modal) {
      // console.log(formName, modal)
      // console.log(this.$refs[formName])
      // 清空表单
      this.$refs[formName].resetFields()
      // 隐藏模态框
      this[modal] = false
    },
    // 编辑按钮方法
    edit (row) {
      // console.log(row)
      // 将当前行的数据对应赋值给发送请求需要传的数据
      this.edituserobj.id = row.id
      this.edituserobj.username = row.username
      this.edituserobj.email = row.email
      this.edituserobj.mobile = row.mobile
      // 展开模态框
      this.editmodal = true
    },
    // 用户数据修改方法
    editTrue (formName) {
      // 对整个表单验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(this.edituserobj)
          // 调用新增用户数据的方法
          editUsers(this.edituserobj)
            // 发送请求成功
            .then((res) => {
              // console.log(res)
              // 成功失败都提示
              if (res.data.meta.status === 200) {
                // 成功提示
                this.$message.success(res.data.meta.msg)
                // 重新获取所有用户数据，异步加载表格
                this.init()
                // 关闭模态框
                this.editmodal = false
                // 清空模态框表单
                this.resetForm('edituserobj', 'editmodal')
              } else {
                // 错误提示
                this.$message.error(res.data.meta.msg)
              }
            }).catch((err) => {
              console.log(err)
              this.$message.error('编辑用户失败')
            })
        } else {
          this.$message.error('编辑用户失败')
          return false
        }
      })
    },
    // 修改用户状态方法
    editState (uid, type) {
      userState(uid, type)
        // 发送请求成功
        .then((res) => {
          console.log(res)
          // 成功失败都提示
          if (res.data.meta.status === 200) {
            // 成功提示
            this.$message.success(res.data.meta.msg)
            // 重新获取所有用户数据，异步加载表格
            this.init()
          } else {
            this.$message.error('更改状态失败')
          }
        }).catch((err) => {
          console.log(err)
          this.$message.error('更改状态失败')
        })
    },
    // 根据id删除用户数据方法
    deluser (id) {
      // 确认提示框确认删除
      this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定时发送删除数据请求
        delUserById(id)
          .then((res) => {
            if (res.data.meta.status === 200) {
              // 删除成功提示
              this.$message.success(res.data.meta.msg)
              // 判断当前页有一条数据的时候，删除成功后退回上一页
              if (this.userobj.pagenum !== 1 && this.userList.length === 1) {
                this.handleCurrentChange(this.userobj.pagenum - 1)
              }
              // 重新获取所有用户数据，异步加载表格
              this.init()
            }
          }).catch((err) => {
            console.log(err)
          })
      }).catch(() => {
        this.$message.success('取消删除')
      })
    },
    // 打开分配角色模态框
    openrole (row) {
      this.userroleobj.id = row.id
      this.userroleobj.rid = row.rid
      this.userroleobj.username = row.username
      // 打开模态框
      this.rolemodal = true
    },
    // 分配角色确认方法
    changerole () {
      if (this.userroleobj.rid) {
        // 发送分配请求
        editRole(this.userroleobj)
          .then((res) => {
            console.log(res)
            if (res.data.meta.status === 200) {
              // 分配角色成功提示
              this.$message.success(res.data.meta.msg)
              // 重新获取所有用户数据，异步加载表格
              this.init()
              // 关闭模态框
              this.rolemodal = false
            } else {
              this.$message.error('分配角色失败')
            }
          }).catch((err) => {
            console.log(err)
            this.$message.error('分配角色失败')
          })
      } else {
        this.$message.error('请选择角色')
      }
    }
  },
  mounted () {
    // 初入页面获取数据渲染表格
    this.init()
    // 获取角色列表方法
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
  }
}
</script>

<style lang="less" scoped>
</style>
