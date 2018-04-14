<template>
  <div class="external">
    <h1 class="title">华软医疗管理系统</h1>
    <main>
      <h1>登录窗口</h1>
      <el-form :model="loginForm" :rules="rules" aria-label="100px" ref="loginForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item align="center">
          <el-button type="primary" @click="submitForm">登陆</el-button>
        </el-form-item>
      </el-form>
    </main>
    
    <el-dialog title="提示" :modal-append-to-body="false" :visible="showTips" center width="400px" :before-close="closeSetPwd">
      <h3>检测到您的密码是默认密码，请改更密码</h3>
      <el-form :model="resetPwdForm" :rules="rRules" aria-label="100px" ref="resetPwdForm">
        <el-form-item label="密码" prop="password">
          <el-input v-model="resetPwdForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="_password">
          <el-input v-model="resetPwdForm._password" type="password"></el-input>
        </el-form-item>
        <el-form-item align="center">
          <el-button type="primary" @click="resetPwd">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { login, resetPassword } from './api/index'
export default {
  name: 'external',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },

      showTips: false,
      resetPwdForm: {
        password: '',
        _password: ''
      },
      rRules: {
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        _password: [{ required: true, message: '请输入确认密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          login({
            username: this.loginForm.username,
            password: this.loginForm.password
          })
            .then(res => {
              if (res.status === 200) {
                if (res.data.code === 1) {
                  if (this.loginForm.password === '123456' || this.loginForm.password === '000000') {
                    this.showTips = true
                  }
                  const { token } = res.data
                  window.localStorage.setItem('siseToken', token)
                } else {
                  this.$message.error(res.data.msg)
                }
              } else {
                this.$message.error(res.statusText)
              }
            })
        } else {
          this.$message.error('请填写数据项')
        }
      })
    },
    closeSetPwd() {
      window.localStorage.removeItem('siseToken')
      this.showTips = false
    },
    resetPwd() {
      this.$refs.resetPwdForm.validate(valid => {
        if (valid) {
          resetPassword({
            username: this.loginForm.username,
            password: this.resetPwdForm.password
          })
            .then(res => {
              if (res.status === 200) {
                if (res.data.code === 1) {
                  this.showTips = false
                  this.$message.success(res.data.msg)
                  this.$router.push({ path: '/queryInfo' })
                } else {
                  this.$message.error(res.data.msg)
                }
              } else {
                this.$message.error(res.statusText)
              }
            })
        } else {
          this.$message.error('请填写数据项')
        }
      })
    }
  },
  created() {
    if (window.localStorage.getItem('siseToken')) {
      this.$router.push({ path: '/queryInfo' })
    }
  }
}
</script>

<style lang="scss" scoped>
.external {
  background: url('./imgs/timg.jpg') no-repeat;
  height: 100%;
  background-size: 100% 100%;
}

h1.title {
  position: absolute;
  left: 8%;
  top: 8%;
  font-size: 70px;
}

main {
  box-sizing: border-box;
  float: right;
  width: 400px;
  height: 400px;
  margin: 12% 10% 0 0;
  background-color: #fff;
  padding: 15px 40px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  h1 {
    font-size: 26px;
    text-align: left;
    margin-top: 19px;
    margin-bottom: 30px;
  }
}
</style>
