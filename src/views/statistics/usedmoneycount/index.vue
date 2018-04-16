<template>
  <div class=".dashboard-editor-container">
    <!-- <div class="dashboard-text">name:{{name}}</div>
    <div class="dashboard-text">roles:<span v-for='role in roles' :key='role'>{{role}}</span></div> -->
    <!-- <panel-group style="padding:16px 16px 0;" @handleSetLineChartData="handleSetLineChartData"></panel-group> -->
    <el-row style="margin: 30px">
      <el-col>
        <span>时间</span>
        <el-date-picker
          v-model="date"
          type="date"
          @change="selectDate"
          :clearable="false"
          placeholder="选择日期">
        </el-date-picker>
        <span v-show="selectV" style="margin-left: 15px">
          药品名称：{{ selectName }}
        </span>
        <span style="margin-left: 15px">
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="fetchData">选择药品</el-button>
        </span>
        <!-- <el-select>
          <el-option label="999感冒灵颗粒"></el-option>
        </el-select> -->
      </el-col>
    </el-row>

    <el-dialog title="增加药品" :visible.sync="addDrugsFormVisible" width="80%">
      <p>查询条件：
        <el-tag
          :key="tag.value"
          v-for="tag in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)">
          {{tag.label}}: {{tag.word}}
        </el-tag>
        <el-select class="select-tag" size="small" v-if="inputVisible" v-model="selectValue" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">增加条件</el-button>
      </p>
      <el-table :data="addlist" ref="addlist" v-loading.body="addlistLoading" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column align="center" label='序号' width="95">
          <template slot-scope="scope">
            {{scope.$index}}
          </template>
        </el-table-column>
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
              <span>{{ props.row.mProduceTime }}</span>
            </el-form-item>
            <el-form-item label="有效期至">
              <span>{{ props.row.mOverdueTime }}</span>
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
        <el-table-column label="id">
          <template slot-scope="scope">
            {{scope.row.id}}
          </template>
        </el-table-column>
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
        <el-table-column align="center" label="操作" width="200px">
          <template slot-scope="scope">
            <el-button type="primary" v-waves size="small" @click="handleSelect(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination background @size-change="addhandleSizeChange" @current-change="addhandleCurrentChange" :current-page="addpage" :page-sizes="[10, 20, 30, 50]" :page-size="addpageSize" layout="total, sizes, prev, pager, next, jumper" :total="addtotal">
        </el-pagination>
      </div>
    </el-dialog>

    <el-row v-loading="listLoading" element-loading-text="数据获取中"
    element-loading-spinner="el-icon-loading" style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :xDate="xDate" :chart-data="lineChartData"></line-chart>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getDrugsInfo, getDrugsFlowByTime } from '@/api/drugs'
import { getTreatInfoByTime } from '@/api/treat'
import LineChart from './components/LineChart'
import waves from '@/directive/waves' // 水波纹指令

const lineChartData = {
  newVisitis: {
    expectedData: [],
    actualData: []
  },
  date: 1233
}

export default {
  name: 'dashboard',
  directives: {
    waves
  },
  components: {
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
      selectName: '',
      selectV: false,
      inputVisible: false,
      inputValue: '',
      selectValue: 'mBarcode',
      options: [
        {
          value: 'mBarcode',
          label: '条形码'
        },
        {
          value: 'id',
          label: 'id'
        },
        {
          value: 'mName',
          label: '药品名称'
        },
        {
          value: 'mType',
          label: '药品类型'
        },
        {
          value: 'mClassify',
          label: '归属分类'
        },
        {
          value: 'factory',
          label: '生产厂家'
        },
        {
          value: 'mUnit',
          label: '药品规格'
        },
        {
          value: 'mUseWay',
          label: '用药方式'
        },
        {
          value: 'mTreatment',
          label: '用药疗程'
        },
        {
          value: 'mRemark',
          label: '备注'
        },
        {
          value: 'mBatch',
          label: '批号'
        },
        {
          value: 'mStock',
          label: '库存量'
        },
        {
          value: 'mInPrice',
          label: '进货价'
        },
        {
          value: 'mOutPrice',
          label: '售价'
        }
      ],
      dynamicTags: [],
      addtotal: 0,
      addpage: 1,
      addpageSize: 10,
      addlist: [],
      addlistLoading: false,
      addDrugsFormVisible: false,
      lineChartData: lineChartData.newVisitis,
      date: null,
      xDate: null,
      xArray: [],
      yArray: [],
      listLoading: false
    }
  },
  methods: {
    pushArray(i) {
      return new Promise((resolve, reject) => {
        getDrugsFlowByTime(i.sT, i.eT)
          .then(res => {
            if (res.data.code === 1) {
              resolve(res.data.data)
            }
          })
      })
    },
    handleSelect(item) {
      this.addDrugsFormVisible = false
      this.selectV = true
      this.selectName = item.mName
      if (this.date) {
        this.selectDate(this.date)
      }
    },
    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        let str = ''
        this.options.map(item => {
          if (item.value === this.selectValue) {
            str = item.label
          }
        })
        this.dynamicTags.push({
          word: inputValue,
          value: this.selectValue,
          label: str
        })
        // this.fetchAllData()
        this.fetchData()
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
      // this.fetchAllData()
      this.fetchData()
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
      // this.fetchAllData()
      this.fetchData()
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    addhandleSizeChange(val) {
      this.addpageSize = val
      this.fetchData('', '', this.addpageSize)
    },
    addhandleCurrentChange(val) {
      this.addpage = val
      this.fetchData('', '', this.addpage)
    },
    fetchData(edit, page, pageSize) {
      this.addlistLoading = true
      this.addDrugsFormVisible = true
      const a = []
      this.dynamicTags.map(item => {
        a.push({
          'name': item.value,
          'word': item.word
        })
      })
      if (!page || !pageSize) {
        page = this.addpage
        pageSize = this.addpageSize
      }
      getDrugsInfo(JSON.stringify(a), page, pageSize)
        .then(res => {
          if (res.data.code === 1) {
            this.$message({
              type: 'success',
              message: `查询成功！一共查询到${res.data.total}条记录`
            })
            this.addlist = res.data.data
            this.addtotal = res.data.total
            this.addlistLoading = false
          }
        })
    },
    selectDate(date) {
      const a = [6, 5, 4, 3, 2, 1, 0]
      const b = a.map(z => {
        const c = new Date(+date - z * 86400000)
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
      
      if (this.selectName) {
        (async () => {
          this.listLoading = true
          for (const i of b) {
            const c = await this.pushArray(i)
            if (c.length) {
              for (const i of c) {
                if (this.selectName === i.mName) {
                  if (i.useType === 'in') {
                    this.xArray.push(parseInt(i.useTotal))
                  } else if (i.useType === 'out') {
                    this.yArray.push(parseInt(i.useTotal))
                  }
                } else {
                  this.xArray.push(0)
                  this.yArray.push(0)
                }
              }
            } else {
              this.xArray.push(0)
              this.yArray.push(0)
            }
          }
          this.listLoading = false
          lineChartData.newVisitis.expectedData = this.xArray
          lineChartData.newVisitis.actualData = this.yArray
          lineChartData.newVisitis.date = date
          // this.xDate = date
          this.xArray = []
          this.yArray = []
        })()
      }
      // this.xDate = date
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

.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.select-tag {
  width: 120px;
  margin-left: 10px;
  // vertical-align: bottom;
}

.drugsInfo {
  font-size: 0;
  .label {
    width: 90px;
    color: #99a9bf;
  }
  .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 33%;
  }
}
</style>
