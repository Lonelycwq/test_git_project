<template>
  <div class="login">
    <div class="container">
      <img
        src="@/assets/avatar.jpg"
        alt="用户头像"
        class="avatar"
      >
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input
            prefix-icon="myicon myicon-user"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="myicon myicon-key"
            v-model="loginForm.password"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="login"
            class="login-btn"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/login_index.js'
export default {
  data () {
    return {
      // 表单数据
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 表单验证规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 登录按钮触发事件
    login () {
      // 通过$refs.loginForm获取元素并二次验证
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // 调用登录请求方法
          login(this.loginForm)
            .then((res) => {
              console.log(res)
              localStorage.setItem('logincookie', res.data.data.token)
              if (res.data.meta.status === 200) {
                this.$message.success(res.data.meta.msg)
                this.$router.push('/home')
              } else {
                this.$message.error(res.data.meta.msg)
              }
              // eslint-disable-next-line handle-callback-err
            }).catch((err) => {
              this.$message.error('服务器异常')
            })
        } else {
          this.$message.error('用户名或密码错误')
          // 错误则停止提交
          return false
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 80px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: absolute;
      left: 50%;
      top: -60px;
      width: 120px;
      height: 120px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
      transform: translateX(-50%);
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
