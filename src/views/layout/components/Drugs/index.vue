<template>
  <div class="container">
    <el-popover title="" placement="left" trigger="hover" ref="popover1">
      <h3 style="text-align: center;">{{`30天内有${list.length}种药快要过期`}}</h3>
      <el-table :data="list" ref="list" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="drugsInfo">
            <el-form-item label="归属分类">
              <span>{{ props.row.mClassify }}</span>
            </el-form-item>
            <el-form-item label="生产商家">
              <span>{{ props.row.factory }}</span>
            </el-form-item>
            <el-form-item label="药品规格">
              <span>{{ props.row.mUnit }}</span>
            </el-form-item>
            <el-form-item label="用药方式">
              <span>{{ props.row.mUseWay }}</span>
            </el-form-item>
            <el-form-item label="用药疗程">
              <span>{{ props.row.mTreatment }}</span>
            </el-form-item>
            <el-form-item label="售价">
              <span>{{ props.row.mOutPrice }}</span>
            </el-form-item>
            <el-form-item label="生产日期">
              <span>{{ formatTime(props.row.mProduceTime) }}</span>
            </el-form-item>
            <el-form-item label="有效期至">
              <span>{{ formatTime(props.row.mOverdueTime) }}</span>
            </el-form-item>
            <el-form-item label="备注">
              <span>{{ props.row.mRemark }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
        <el-table-column label="条形码">
          <template slot-scope="scope">
            {{scope.row.mBarcode}}
          </template>
        </el-table-column>
        <!-- <el-table-column label="id">
          <template slot-scope="scope">
            {{scope.row.id}}
          </template>
        </el-table-column> -->
        <el-table-column label="药品名字">
          <template slot-scope="scope">
            {{scope.row.mName}}
          </template>
        </el-table-column>
        <el-table-column label="药品类型" >
          <template slot-scope="scope">
            {{scope.row.mType}}
          </template>
        </el-table-column>
        <el-table-column label="批号" >
          <template slot-scope="scope">
            {{scope.row.mBatch}}
          </template>
        </el-table-column>
        <el-table-column label="进货价" >
          <template slot-scope="scope">
            {{scope.row.mInPrice}}
          </template>
        </el-table-column>
        <el-table-column label="库存量" >
          <template slot-scope="scope">
            {{scope.row.mStock}}
          </template>
        </el-table-column>
      </el-table>
    </el-popover>
    <div v-show="ps">
      <el-button v-popover:popover1 type="danger">有{{list.length}}种药快要过期</el-button>
      <i @click="ps = false" class="el-icon-error" style="cursor: pointer;color: white;border: 1px solid rgba(0, 0, 0, 0.4); border-radius: 50%;position: absolute; top: -5px; right: -5px;"></i>
    </div>
  </div>
</template>

<script>
import { getOverdueByDay } from '@/api/drugs'
export default {
  data() {
    return {
      list: [],
      message: '有{{list.length}}种药快要过期',
      ps: true
    }
  },
  methods: {
    formatTime(date) {
      const time = new Date(+date)
      const year = time.getFullYear()
      const mouth = time.getMonth() + 1
      const day = time.getDate()
      return `${year}年${mouth}月${day}日`
    },
    fetchData() {
      getOverdueByDay({
        day: 30
      })
        .then(res => {
          if (res.status === 200) {
            if (res.data.code === 1) {
              this.list = res.data.data
            } else {
              this.$message.error(res.data.msg)
            }
          } else {
            this.$message.error(res.statusText)
          }
        })
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>

<style scoped>
.container {
  position: fixed;
  right: 20px;
  top: 80px;
}
</style>
