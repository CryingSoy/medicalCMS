<template>
  <div id="auth">
    <el-select @change="getAuth()" v-model="sltValue">
      <el-option value="超级管理员">超级管理员</el-option>
      <el-option value="校医">校医</el-option>
      <el-option label="全部" value="">全部</el-option>
      <el-option label="不用过滤" value="notNeedFilter"></el-option>
    </el-select>
    <!-- <el-button @click="getAuth()">获取权限数组</el-button> -->
    <p>权限数组为：{{ authArr }}</p>
    <el-table :data="tList" v-loading.body="loading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="接口权限">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="edit-input" size="small" v-model="scope.row.authArr"></el-input>
            <el-button class='cancel-btn' size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">cancel</el-button>
          </template>
          <span v-else>{{ scope.row.authArr }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button v-if="scope.row.edit" type="success" @click="confirmEdit(scope.row)" size="small" icon="el-icon-circle-check-outline">Ok</el-button>
          <el-button v-else type="primary" @click='scope.row.edit=!scope.row.edit' size="small" icon="el-icon-edit">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAuthTable, setAuthTable } from '@/api/auth'

export default {
  name: 'auth',
  data() {
    return {
      sltValue: '',
      authArr: '',
      tList: [],
      tStr: '',
      loading: false
    }
  },
  mounted() {
    this.getAuth()
  },
  methods: {
    getAuth() {
      this.loading = true
      if (this.sltValue === '') {
        getAuthTable()
          .then(res => {
            const items = res.data.data
            this.tList = items.map(v => {
              this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html

              v.originalauthArr = v.authArr //  will be used when user click the cancel botton

              return v
            })
            this.loading = false
          })
      } else {
        getAuthTable(this.sltValue)
          .then(res => {
            const items = res.data.data
            this.tList = items.map(v => {
              this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html

              v.originalauthArr = v.authArr //  will be used when user click the cancel botton

              return v
            })
            this.loading = false
          })
      }
    },
    setAuth(arrAuth) {
      if (this.sltValue === '') {
        this.$message({
          message: 'type为空',
          type: 'warning'
        })
        this.getAuth()
      } else {
        setAuthTable(arrAuth, this.sltValue)
          .then(res => {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.getAuth()
          })
      }
    },
    cancelEdit(row) {
      row.authArr = row.originalauthArr
      row.edit = false
      this.$message({
        message: '取消修改',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      row.edit = false
      row.originalauthArr = row.authArr
      this.tList.map(t => {
        delete t.edit
        delete t.originalauthArr
      })
      this.setAuth(this.tList[0].authArr)
    }
  }
}
</script>

