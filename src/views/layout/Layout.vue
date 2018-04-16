<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <app-main></app-main>
    </div>
    <Drugs></Drugs>
  </div>
</template>

<script>
import Drugs from '@/views/layout/components/Drugs'
import { Navbar, Sidebar, AppMain } from '@/views/layout/components'
import { getClassify } from '@/api/other'
import { mapGetters } from 'vuex'
const authArr = [
  '首页',
  '权限管理（开发）',
  '权限管理',
  '统计',
  '用户管理',
  '药品管理',
  '字典表管理',
  '就诊'
]
const authMap = {
  '首页': 4,
  '权限管理（开发）': 5,
  '权限管理': 6,
  '统计': 7,
  '用户管理': 8,
  '药品管理': 9,
  '字典表管理': 10,
  '就诊': 11
}
export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    Drugs
  },
  data() {
    return {
      authList: []
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    ...mapGetters([
      'level'
    ])
  },
  watch: {
    level() {
      if (this.level === '校医') this.fetchAuth()
    }
  },
  methods: {
    fetchAuth() {
      const menu = document.querySelector('.menu-wrapper')
      const app = document.querySelector('.app-wrapper')
      app.style.display = 'none'
      getClassify('doctorAuth')
        .then(res => {
          if (res.data.code === 1) {
            this.authList = JSON.parse(res.data.data)
            const menu = document.querySelector('.menu-wrapper')
            const meunArr = menu.childNodes
            const _tempArr = authArr.slice()
            this.authList.forEach((e, i) => {
              if (authArr.indexOf(e) > -1) {
                _tempArr.splice(_tempArr.indexOf(e), 1)
              }
            })
            _tempArr.forEach(e => {
              meunArr[authMap[e]].style.display = 'none'
            })
            app.style.display = 'block'
          }
        })
    }
  },
  mounted() {
    if (this.level === '校医') this.fetchAuth()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
