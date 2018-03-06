<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="'用户名'" v-model="listQuery.username">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="'姓名'" v-model="listQuery.author">
      </el-input>
      <el-select clearable style="width: 90px" v-model="listQuery.status" class="filter-item" :placeholder="'状态'">
        <el-option v-for="item in statusList" :key="item" :label="item" :value="item">
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
      <el-table-column label="姓名" width="150" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="最后一次登录时间" >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.lasttime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="添加用户时间" >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.firsttime}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" >
        <template slot-scope="scope">
          <el-button type="primary" v-waves size="small">重置密码</el-button>
          <el-button type="danger" v-waves size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <div class="pagination-container">
      <el-pagination background :current-page="1" :page-sizes="[10,20,30,50]" layout="total, sizes, prev, pager, next, jumper" :total="2">
      </el-pagination>
    </div> -->
  </div>
</template>

<script>
import { getList } from '@/api/table'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  data() {
    return {
      list: null,
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
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
        this.TimeCalculator(this.list)
      })
    },
    TimeCalculator(list) {
      list.map(item => {
        if (item.hasOwnProperty('lasttime')) {
          const time = new Date(item.lasttime)
          const year = time.getFullYear()
          const mouth = time.getMonth()
          const day = time.getDay()
          const hour = time.getHours()
          const minutes = time.getMinutes()
          const second = time.getSeconds()
          item.lasttime = `${year}年${mouth}月${day}日${hour}时${minutes}分${second}秒`
        }
        if (item.hasOwnProperty('firsttime')) {
          const time = new Date(item.firsttime)
          const year = time.getFullYear()
          const mouth = time.getMonth()
          const day = time.getDay()
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
