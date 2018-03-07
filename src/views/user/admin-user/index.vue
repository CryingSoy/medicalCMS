<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="'用户名'" v-model="listQuery.username">
      </el-input>
      <el-select clearable style="width: 90px" v-model="listQuery.status" class="filter-item" :placeholder="'级别'">
        <el-option v-for="item in adminType" :key="item" :label="item === '超级管理员' ? '超级管理员' : '校医'" :value="item">
      </el-option>
      </el-select>
      <!-- <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.type" :placeholder="$t('table.type')">
        <el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key">
        </el-option>
      </el-select>
      <el-select @change='handleFilter' style="width: 140px" class="filter-item" v-model="listQuery.sort">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select> -->
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" v-waves @click="adminDialogFormVisible = true" type="primary" icon="el-icon-edit">添加</el-button>
      <!-- <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">{{$t('table.export')}}</el-button>
      <el-checkbox class="filter-item" style='margin-left:15px;' @change='tableKey=tableKey+1' v-model="showReviewer">{{$t('table.reviewer')}}</el-checkbox> -->
    </div>

    <el-table :data="list" ref="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="用户名">
        <template slot-scope="scope">
          {{scope.row.username}}
        </template>
      </el-table-column>
      <el-table-column label="级别">
        <template slot-scope="scope">
          {{scope.row.level}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="上一次修改密码成功时间" >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.lastUpdateTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" >
        <template slot-scope="scope">
          <el-button type="primary" v-waves size="small" @click="resetClick(scope.row.username)">重置密码</el-button>
          <el-button type="danger" v-waves size="small" @click="removeClick(scope.row.username)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <div class="pagination-container">
      <el-pagination background :current-page="1" :page-sizes="[10,20,30,50]" layout="total, sizes, prev, pager, next, jumper" :total="2">
      </el-pagination>
    </div> -->

    <el-dialog width="500px" title="重置密码" :visible.sync="dialogFormVisible">
      <el-form :model="resetPasswordForm">
        <el-form-item label="用户名：" style="padding-left: 30px;">
          <span style="font-size: 16px">{{ this.resetPasswordForm.username }}</span>
        </el-form-item>
        <md-input @blur="passwordValidator()" v-model="resetPasswordForm.password" style="width: 400px; margin-left: 30px" placeholder="输入密码">
          <span style="font-size: 14px">新密码</span>
        </md-input>
        <el-form-item style="padding:0 0 0 30px;">
          <span v-if="passwordTipsVis" style="position: absolute;font-size: 14px; color: red;">Tips: {{ passwordTips }}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" style="margin-bottom:30px" class="dialog-footer" align="center">
        <el-button style="margin-right:30px" @click="dialogFormVisible = false">取 消</el-button>
        <el-button style="margin-left:30px" type="primary" @click="confirmReset()">确认重置</el-button>
      </div>
    </el-dialog>

    <el-dialog width="500px" title="新增管理员账户" :visible.sync="adminDialogFormVisible">
      <el-form style="margin-left: 30px" ref="addAdminForm" :rules="adminRules" :model="addAdminForm">
        <el-form-item label="类型" prop="type">
          <el-select clearable v-model="addAdminForm.type" class="filter-item" :placeholder="'请选择类型'">
            <el-option v-for="item in adminType" :key="item" :label="item" :value="item === '超级管理员' ? 'admin' : 'doctor'">
          </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="username">
          <md-input v-model="addAdminForm.username" style="width: 380px;" placeholder="输入用户名">
          <span style="font-size: 14px">用户名</span>
        </md-input>
        </el-form-item>
        <el-form-item prop="password">
          <md-input v-model="addAdminForm.password" style="width: 380px;" placeholder="输入密码">
            <span style="font-size: 14px">密码</span>
          </md-input>
        </el-form-item>
      </el-form>
      <div slot="footer" style="margin-bottom:30px" class="dialog-footer" align="center">
        <el-button style="margin-right:30px" @click="adminDialogFormVisible = false">取 消</el-button>
        <el-button style="margin-left:30px" type="primary" @click="confirmAdd()">确认创建</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, resetPassword, removeUser, addUser } from '@/api/user'
import waves from '@/directive/waves' // 水波纹指令
import MdInput from '@/components/MDinput'

export default {
  directives: {
    waves
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if (value.indexOf(' ') >= 0) {
        callback(new Error('用户名不能包含空格'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.indexOf(' ') >= 0) {
        callback(new Error('密码不能包含空格'))
      } else if (value.length < 6 || value.length > 16) {
        callback(new Error('密码长度必须是6到16'))
      } else {
        callback()
      }
    }
    return {
      list: null,
      addAdminForm: {
        username: '',
        password: '',
        type: ''
      },
      adminType: ['超级管理员', '校医'],
      adminRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        type: [{ required: true, message: '请选择类型', trigger: 'change' }]
      },
      adminDialogFormVisible: false,
      resetPasswordForm: {
        username: '',
        password: ''
      },
      passwordTips: '',
      passwordTipsVis: false,
      dialogFormVisible: false,
      listLoading: true,
      statusList: [1, 2, 3, 12],
      listQuery: {
        username: '',
        author: '',
        status: '',
        page: 1,
        limit: 20
      }
    }
  },
  components: {
    MdInput
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    confirmAdd() {
      this.$refs['addAdminForm'].validate((valid) => {
        if (valid) {
          addUser(this.addAdminForm.username, this.addAdminForm.password, this.addAdminForm.type)
            .then(res => {
              if (res.data.code === 1) {
                this.$message({
                  type: 'success',
                  message: `${res.data.msg}`
                })
                this.$refs['addAdminForm'].resetFields()
                this.adminDialogFormVisible = false
                this.fetchData()
              }
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    removeClick(username) {
      this.$confirm(`此操作将删除用户'${username}', 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeUser(username)
          .then(res => {
            this.$message({
              type: 'success',
              message: `删除用户'${username}'成功!`
            })
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    confirmReset() {
      if (this.passwordTipsVis || this.resetPasswordForm.password === '') {
        this.$message({
          message: '请输入正确格式的密码',
          type: 'warning'
        })
      } else {
        resetPassword(this.resetPasswordForm.username, this.resetPasswordForm.password)
          .then(res => {
            this.$message({
              type: 'success',
              message: res.data.msg
            })
            this.resetPasswordDiglog()
            this.dialogFormVisible = false
          })
      }
    },
    passwordValidator() {
      if (this.resetPasswordForm.password.length < 6 || this.resetPasswordForm.password.length > 16) {
        this.passwordTipsVis = true
        this.passwordTips = '密码长度必须是6到16'
      } else if (this.resetPasswordForm.password.indexOf(' ') >= 0) {
        this.passwordTipsVis = true
        this.passwordTips = '密码不能有空格'
      } else {
        this.passwordTipsVis = false
      }
    },
    resetPasswordDiglog() {
      this.resetPasswordForm.password = ''
      this.passwordTipsVis = false
    },
    resetClick(item) {
      this.dialogFormVisible = true
      this.resetPasswordDiglog()
      this.resetPasswordForm.username = item
    },
    labelCreator(label) {
      switch (label) {
        case 1: return '坐诊中'
        case 2: return '休息中'
        case 3: return '下班了'
        case 12: return '坐诊中和休息中'
      }
    },
    handleCreate() {
      console.log('1')
    },
    handleFilter() {
      // let del
      // let queryList = this.list.map((item, value) => {
      //   if (item.username.indexOf(this.listQuery.username) >= 0) {
      //     if (this.listQuery.author === '') {
      //       return item
      //     } else if (item.author.indexOf(this.listQuery.author) >= 0) {
      //       return item
      //     }
      //   }
      //   if (item.author.indexOf(this.listQuery.author) >= 0) {
      //     if (this.listQuery.username === '') {
      //       return item
      //     } else if (item.username.indexOf(this.listQuery.username) >= 0) {
      //       return item
      //     }
      //   }
      //   del.push(value)
      // })
      // console.log(queryList)
    },
    fetchData() {
      this.listLoading = true
      getList('admin').then(response => {
        this.list = response.data.data
        // this.listLoading = false
        // this.TimeCalculator(this.list)
      })
      getList('adminDoctor').then(response => {
        response.data.data.map(item => {
          this.list.push(item)
        })
        this.listLoading = false
        this.TimeCalculator(this.list)
      })
    },
    TimeCalculator(list) {
      list.map(item => {
        if (item.hasOwnProperty('lastUpdateTime')) {
          const time = new Date(item.lastUpdateTime)
          const year = time.getFullYear()
          const mouth = time.getMonth() + 1
          const day = time.getDate()
          const hour = time.getHours()
          const minutes = time.getMinutes()
          const second = time.getSeconds()
          item.lastUpdateTime = `${year}年${mouth}月${day}日${hour}时${minutes}分${second}秒`
        }
        if (item.hasOwnProperty('status')) {
          if (item.status === 1) {
            item.status = '坐诊中'
          }
          if (item.status === 2) {
            item.status = '休息中'
          }
          if (item.status === 3) {
            item.status = '下班了'
          }
          if (item.status === 12) {
            item.status = '坐诊中和休息中'
          }
        }
        return item
      })
    }
  }
}
</script>
