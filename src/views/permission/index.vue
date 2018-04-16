<template>
  <div class="container">
    <h1>校医权限管理</h1>
    <el-form label-width="100px" align="left" label-position="left">
      <el-form-item label="权限管理">
        <el-checkbox-group v-model="checkList">
          <el-checkbox v-for="(l, i) in list" :key="i" :label="l"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">更改权限</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getClassify, setClassify } from '@/api/other'
export default {
  data() {
    return {
      list: [
        '首页',
        '权限管理（开发）',
        '权限管理',
        '统计',
        '用户管理',
        '药品管理',
        '字典表管理',
        '就诊'
      ],
      checkList: []
    }
  },
  methods: {
    fetchAuth() {
      getClassify('doctorAuth')
        .then(res => {
          this.checkList = JSON.parse(res.data.data)
        })
    },
    submit() {
      setClassify('doctorAuth', JSON.stringify(this.checkList))
        .then(res => {
          if (res.data.code === 1) {
            this.$message.success('更改权限成功')
          } else {
            this.$message.error(res.data.msg)
          }
        })
    }
  },
  mounted() {
    this.fetchAuth()
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
}
</style>
