<template>
  <div class=".dashboard-editor-container">
    <!-- <div class="dashboard-text">name:{{name}}</div>
    <div class="dashboard-text">roles:<span v-for='role in roles' :key='role'>{{role}}</span></div> -->
    <panel-group :pN="pN" :mN="mN" style="padding:16px 16px 0;" @handleSetLineChartData="handleSetLineChartData"></panel-group>

    <el-row v-loading="loading" style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData"></line-chart>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getTreatInfoByTime } from '@/api/treat'
import { getDrugsFlowByTime } from '@/api/drugs'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'

const lineChartData = {
  newVisitis: {
    expectedData: [],
    actualData: []
  }
}

export default {
  name: 'dashboard',
  components: {
    PanelGroup,
    LineChart
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      loading: false,
      pN: 0,
      mN: 0,
      xArray: []
    }
  },
  mounted() {
    this.loading = true
    const a = [6, 5, 4, 3, 2, 1, 0]
    const b = a.map(z => {
      const c = new Date(+new Date() - z * 86400000)
      const d = c.getHours() * 60 * 60 * 1000
      const e = c.getMinutes() * 60 * 1000
      const f = c.getSeconds() * 1000
      const g = c.getMilliseconds()
      const h = d + e + f + g
      const i = (23 - c.getHours()) * 60 * 60 * 1000
      const j = (59 - c.getMinutes()) * 60 * 1000
      const k = (59 - c.getSeconds()) * 1000
      const l = 1000 - c.getMilliseconds()
      const m = i + j + k + l
      return {
        sT: +c - h,
        eT: +c + m
      }
    })
    
    if (1) {
      (async() => {
        for (const i of b) {
          const c = await this.refresh(i)
          if (c.length) {
            let t = 0
            const mT = []
            for (const d of c) {
              t += parseInt(d.totalPrice)
              mT.push(d.totalPrice)
            }
            lineChartData.newVisitis.expectedData.push(t)
            lineChartData.newVisitis.actualData.push(Math.max.apply(null, mT))
            lineChartData.newVisitis.date = new Date()
          } else {
            lineChartData.newVisitis.expectedData.push(0)
            lineChartData.newVisitis.actualData.push(0)
            lineChartData.newVisitis.date = new Date()
          }

          const d = await this.pNum(i)
          if (d.length) {
            this.xArray.push(d.length)
          } else {
            this.xArray.push(0)
          }
          this.pN = this.xArray[6]
        }
        this.loading = false
        this.mN = lineChartData.newVisitis.expectedData[6]
      })()
    }

  },
  methods: {
    refresh(i) {
      return new Promise((resolve, reject) => {
        getTreatInfoByTime(i.sT, i.eT)
          .then(res => {
            if (res.data.code === 1) {
              resolve(res.data.data)
            }
          })
      })
    },
    pNum(i) {
      return new Promise((resolve, reject) => {
        getTreatInfoByTime(i.sT, i.eT)
          .then(res => {
            if (res.data.code === 1) {
              resolve(res.data.data)
            }
          })
      })
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
