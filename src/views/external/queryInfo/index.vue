<template>
  <div class="queryInfo">
    <header>
      <div class="header-body">
        <h1>高校医疗查询系统</h1>
        <div class="header-body-right">
          <span style="color: #fff">{{username}}</span>
          <a href="javascript:;" v-if="username" @click="logout">退出</a>
        </div>
      </div>
    </header>
    <main>
      <div v-if="type === 'student'">
        <el-tabs class="mt50" type="border-card">
          <el-tab-pane label="个人信息" class="tx">
            <el-table
              :data="studentInfoFormat"
              border
              style="width: 100%; margin-top: -10px">
              <el-table-column
                prop="title"
                label=""
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="value"
                label="信息"
                align="center"
              >
              </el-table-column>
            </el-table>
            <el-button class="mt20" type="primary" @click="changeStudentInfo">更改个人信息</el-button>
          </el-tab-pane>
          <el-tab-pane label="历史就诊记录">
              <el-table
              :data="sTreatInfo"
              style="width: 100%; margin-top: -10px">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" class="demo-table-expand" label-width="80px">
                    <el-form-item label="姓名">
                      <span>{{ props.row.name }}</span>
                    </el-form-item>
                    <el-form-item label="详细病情">
                      <span>{{ props.row.diseaseDetail }}</span>
                    </el-form-item>
                    <el-form-item label="医嘱">
                      <span>{{ props.row.doctorRemark }}</span>
                    </el-form-item>
                    <el-form-item label="用药信息">
                      <el-table :data="JSON.parse(props.row.medicineDetail)" border>
                        <el-table-column label="条形码" prop="mBarcode" align="center"></el-table-column>
                        <el-table-column label="药名" prop="mName" align="center"></el-table-column>
                        <el-table-column label="类型" prop="mType" align="center"></el-table-column>
                        <el-table-column label="数量" prop="num" align="center"></el-table-column>
                        <el-table-column label="价格" prop="price" align="center"></el-table-column>
                      </el-table>
                    </el-form-item>
                  </el-form>
                  </template>
                </el-table-column>
                <el-table-column label="日期" prop="treatTime" :formatter="timeFormatter"></el-table-column>
                <el-table-column label="消费金额" prop="totalPrice"></el-table-column>
                <el-table-column label="主要病因" prop="disease"></el-table-column>
                <el-table-column label="校医名" prop="doctor"></el-table-column>
              </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="teacher" v-else-if="type === 'teacher'">
        <h2>查询学生信息及就诊信息</h2>
        <span>查询条件：</span>
        <el-select v-model="tQueryType">
          <el-option label="学号" value="stuId"></el-option>
          <el-option label="姓名" value="name"></el-option>
        </el-select>
        <span style="margin-left: 20px">关键字：</span>
        <div style="display: inline-block">
          <el-input v-model="keyword" placeholder="请输入关键字"></el-input>
        </div>
        <el-button style="margin-left: 20px" type="primary" @click="queryStudentInfo">查询</el-button>
        <h2 style="margin-top: 30px">搜索结果</h2>
        <el-table :data="queryResult" border style="width: 100%; margin-top: 10px">
          <el-table-column label="学生卡号" prop="cardId" align="center"></el-table-column>
          <el-table-column label="学生卡号" prop="cardId" align="center"></el-table-column>
          <el-table-column label="学号" prop="stuId" align="center"></el-table-column>
          <el-table-column label="姓名" prop="name" align="center"></el-table-column>
          <el-table-column label="性别" prop="sex" align="center"></el-table-column>
          <el-table-column label="年龄" prop="age" align="center"></el-table-column>
          <el-table-column label="电话号码" prop="phone" align="center"></el-table-column>
          <el-table-column label="宿舍" prop="room" align="center"></el-table-column>
          <el-table-column label="系别" prop="depart" align="center"></el-table-column>
          <el-table-column label="身高" prop="height" align="center"></el-table-column>
          <el-table-column label="体重" prop="weight" align="center"></el-table-column>
          <el-table-column label="血型" prop="blood" align="center"></el-table-column>
          <el-table-column label="过敏史" prop="allergy" align="center"></el-table-column>
          <el-table-column label="操作" align="center" fixed="right" width="150">
            <template slot-scope="scope">
              <el-button @click="lookTreat(scope.row)" type="primary" size="small">查看就诊记录</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-else>loading</div>
    </main>

    <el-dialog title="更改个人信息" center :visible.sync="studentDialogVisible" width="40%">
      <el-form :model="sDialogForm" label-position="left" label-width="80px">
        <el-form-item label="学生卡号">
          <el-input v-model="sDialogForm.cardId" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="sDialogForm.stuId" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="sDialogForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="sDialogForm.sex" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="sDialogForm.age" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="sDialogForm.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="宿舍号">
          <el-input v-model="sDialogForm.room" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="系别">
          <el-input v-model="sDialogForm.depart" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="身高">
          <el-input v-model="sDialogForm.height" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="体重">
          <el-input v-model="sDialogForm.weight" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="血型">
          <el-input v-model="sDialogForm.blood" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="过敏史">
          <el-input v-model="sDialogForm.allergy" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="studentDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeStudentInfoSubmit">更 改</el-button>
      </div>
    </el-dialog>

    <el-dialog title="查看就诊记录" center :visible.sync="teacherDialogVisible" width="60%">
      <el-table
        :data="tTreatInfo"
        style="width: 100%; margin-top: -10px">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" class="demo-table-expand" label-width="80px">
            <el-form-item label="姓名">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="详细病情">
              <span>{{ props.row.diseaseDetail }}</span>
            </el-form-item>
            <el-form-item label="医嘱">
              <span>{{ props.row.doctorRemark }}</span>
            </el-form-item>
            <el-form-item label="用药信息">
              <el-table :data="JSON.parse(props.row.medicineDetail)" border>
                <el-table-column label="条形码" prop="mBarcode" align="center"></el-table-column>
                <el-table-column label="药名" prop="mName" align="center"></el-table-column>
                <el-table-column label="类型" prop="mType" align="center"></el-table-column>
                <el-table-column label="数量" prop="num" align="center"></el-table-column>
                <el-table-column label="价格" prop="price" align="center"></el-table-column>
              </el-table>
            </el-form-item>
          </el-form>
          </template>
        </el-table-column>
        <el-table-column label="日期" prop="treatTime" :formatter="timeFormatter"></el-table-column>
        <el-table-column label="消费金额" prop="totalPrice"></el-table-column>
        <el-table-column label="主要病因" prop="disease"></el-table-column>
        <el-table-column label="校医名" prop="doctor"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { getUserInfo, getStudentInfoByParams, getTreatInfoByParams, changeStudentInfo } from '../api/index'
export default {
  name: 'queryInfo',
  data() {
    return {
      type: '',
      username: '',

      studentInfo: [],

      studentDialogVisible: false,

      sDialogForm: {},

      sTreatInfo: [],

      tQueryType: 'stuId',
      keyword: '',

      queryResult: [],

      teacherDialogVisible: false,

      tTreatInfo: []
    }
  },
  methods: {
    checkUserlogin() {
      if (window.localStorage.getItem('siseToken')) {
        getUserInfo()
          .then(res => {
            if (res.status === 200) {
              if (res.data.code === 1) {
                const { data } = res.data
                this.type = data.type
                this.username = data.username
                if (this.type === 'student') this.getStudentInfo()
              } else {
                this.$message.error(res.data.msg)
                window.localStorage.removeItem('siseToken')
                this.$router.push({ path: '/' })
              }
            } else {
              this.$message.error(res.statusText)
            }
          })
      } else {
        this.$message.error('登陆信息错误')
        this.$router.push({ path: '/' })
      }
    },
    getStudentInfo() {
      getStudentInfoByParams({
        params: JSON.stringify([{ name: 'stuId', word: this.username }])
      })
        .then(res => {
          if (res.status === 200) {
            if (res.data.code === 1) {
              const { data } = res.data
              if (data.length > 0) {
                this.studentInfo = data[0]
                this.sDialogForm = { ...this.studentInfo }
              }
              this.getUserTreatInfo()
            } else {
              this.$message.error(res.data.msg)
            }
          } else {
            this.$message.error(res.statusText)
          }
        })
    },
    getUserTreatInfo() {
      getTreatInfoByParams({
        params: JSON.stringify([{ name: 'stuId', word: this.username }])
      })
        .then(res => {
          if (res.status === 200) {
            if (res.data.code === 1) {
              const { data } = res.data
              this.sTreatInfo = data
            } else {
              this.$message.error(res.data.msg)
            }
          } else {
            this.$message.error(res.statusText)
          }
        })
    },
    changeStudentInfo() {
      this.studentDialogVisible = true
    },
    logout() {
      window.localStorage.removeItem('siseToken')
      this.$router.push({ path: '/' })
    },
    changeStudentInfoSubmit() {
      changeStudentInfo(this.sDialogForm)
        .then(res => {
          if (res.status === 200) {
            if (res.data.code === 1) {
              this.$message.success(res.data.msg)
              this.getStudentInfo()
            } else {
              this.$message.error(res.data.msg)
            }
          } else {
            this.$message.error(res.statusText)
          }
        })
    },
    queryStudentInfo() {
      if (!this.keyword) return
      getStudentInfoByParams({
        params: JSON.stringify([{ name: this.tQueryType, word: this.keyword }])
      })
        .then(res => {
          if (res.status === 200) {
            if (res.data.code === 1) {
              const { data } = res.data
              this.queryResult = data
              this.$message.success(res.data.msg)
            } else {
              this.$message.error(res.data.msg)
            }
          } else {
            this.$message.error(res.statusText)
          }
        })
    },
    lookTreat(row) {
      this.teacherDialogVisible = true
      getTreatInfoByParams({
        params: JSON.stringify([{ name: 'stuId', word: row.stuId }])
      })
        .then(res => {
          if (res.status === 200) {
            if (res.data.code === 1) {
              const { data } = res.data
              this.tTreatInfo = data
              this.$message.success(res.data.msg)
            } else {
              this.$message.error(res.data.msg)
            }
          } else {
            this.$message.error(res.statusText)
          }
        })
    },
    timeFormatter(row, column) {
      return parseTime(new Date(+row.treatTime))
    }
  },
  computed: {
    studentInfoFormat() {
      return [
        {
          title: '学生卡号',
          value: this.studentInfo.cardId
        },
        {
          title: '学号',
          value: this.studentInfo.stuId
        },
        {
          title: '姓名',
          value: this.studentInfo.name
        },
        {
          title: '性别',
          value: this.studentInfo.sex
        },
        {
          title: '年龄',
          value: this.studentInfo.age
        },
        {
          title: '手机号码',
          value: this.studentInfo.phone
        },
        {
          title: '宿舍号',
          value: this.studentInfo.room
        },
        {
          title: '系别',
          value: this.studentInfo.depart
        },
        {
          title: '身高',
          value: this.studentInfo.height
        },
        {
          title: '体重',
          value: this.studentInfo.weight
        },
        {
          title: '血型',
          value: this.studentInfo.blood
        },
        {
          title: '过敏史',
          value: this.studentInfo.allergy
        }
      ]
    }
  },
  created() {
    this.checkUserlogin()
  }
}

function parseTime(date) {
  const y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m < 10 ? ('0' + m) : m
  let d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  let h = date.getHours()
  h = h < 10 ? ('0' + h) : h
  let minute = date.getMinutes()
  minute = minute < 10 ? ('0' + minute) : minute
  let second = date.getSeconds()
  second = second < 10 ? ('0' + second) : second
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
}
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  height: 50px;
  background: url('../imgs/header.png');
  .header-body {
    display: flex;
    max-width: 1200px;
    margin: 0 auto;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    .header-body-right {
      margin-right: 20px;
    }
    h1 {
      font-size: 20px;
    }
  }
}

main {
  padding-top: 50px;
  div {
    max-width: 1200px;
    margin: 0 auto;
  }
}

.mt20 {
  margin-top: 20px;
}

.mt50 {
  margin-top: 50px;
}

.tx {
  text-align: center;
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
}

.teacher {
  padding-top: 20px;
}

span {
  color: #666;
}
</style>
