<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="'用户名'" v-model="listQuery.username">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="'姓名'" v-model="listQuery.author">
      </el-input>
      <el-select clearable style="width: 90px" v-model="listQuery.status" class="filter-item" :placeholder="'状态'">
        <el-option v-for="item in statusList" :key="item" :label="labelCreator(item)" :value="item">
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
      <el-button class="filter-item" style="margin-left: 10px;" v-waves @click="handleCreate" type="primary" icon="el-icon-edit">添加</el-button>
      <!-- <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">{{$t('table.export')}}</el-button>
      <el-checkbox class="filter-item" style='margin-left:15px;' @change='tableKey=tableKey+1' v-model="showReviewer">{{$t('table.reviewer')}}</el-checkbox> -->
    </div>

    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
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
      <el-table-column label="姓名" width="70" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="最后一次登录时间" >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.updatetime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="注册时间" >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.firsttime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" >
        <template slot-scope="scope">
          <el-button type="primary" v-waves size="small" @click="resetClick(scope.row.username)">重置密码</el-button>
          <el-button type="danger" v-waves size="small">删除</el-button>
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
          <transition name="el-zoom-in-top">
          <span v-if="passwordTipsVis" style="position: absolute;font-size: 12px; color: rgba(255, 66, 55, .85);">Tips: {{ passwordTips }}</span>
          </transition>
        </el-form-item>
      </el-form>
      <div slot="footer" style="margin-bottom:30px" class="dialog-footer" align="center">
        <el-button style="margin-right:30px" @click="dialogFormVisible = false">取 消</el-button>
        <el-button style="margin-left:30px" type="primary" @click="confirmReset()">确认重置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, resetPassword } from '@/api/user'
import waves from '@/directive/waves' // 水波纹指令
import MdInput from '@/components/MDinput'

export default {
  directives: {
    waves
  },
  data() {
    return {
      list: null,
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
    confirmReset() {
      if (this.passwordTipsVis || this.resetPasswordForm.password === '') {
        this.$message({
          message: '请输入正确格式的密码',
          type: 'warning'
        })
      } else {
        resetPassword(this.resetPasswordForm.username, this.resetPasswordForm.password, 'userInfo')
          .then(res => {
            this.$message({
              type: 'success',
              message: res.data.msg
            })
            this.resetPasswordDiglog()
            this.dialogFormVisible = false
            this.fetchData()
          })
      }
    },
    resetPasswordDiglog() {
      this.resetPasswordForm.password = ''
      this.passwordTipsVis = false
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
    resetClick(item) {
      this.dialogFormVisible = true
      this.resetPasswordForm.password = ''
      this.passwordTipsVis = false
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
      getList('student').then(response => {
        this.list = response.data.data
        this.listLoading = false
        this.TimeCalculator(this.list)
      })
    },
    TimeCalculator(list) {
      list.map(item => {
        if (item.hasOwnProperty('updatetime')) {
          const time = new Date(item.updatetime)
          const year = time.getFullYear()
          const mouth = time.getMonth() + 1
          const day = time.getDate()
          const hour = time.getHours()
          const minutes = time.getMinutes()
          const second = time.getSeconds()
          item.updatetime = `${year}年${mouth}月${day}日${hour}时${minutes}分${second}秒`
        }
        if (item.hasOwnProperty('firsttime')) {
          const time = new Date(item.firsttime)
          const year = time.getFullYear()
          const mouth = time.getMonth() + 1
          const day = time.getDate()
          const hour = time.getHours()
          const minutes = time.getMinutes()
          const second = time.getSeconds()
          item.firsttime = `${year}年${mouth}月${day}日${hour}时${minutes}分${second}秒`
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
