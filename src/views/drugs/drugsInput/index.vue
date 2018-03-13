<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" v-waves @click="addDrugsFormVisible = true" type="primary" icon="el-icon-edit">添加药品</el-button>
    </div>

    <el-table :data="list" ref="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
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
          <el-button type="primary" v-waves size="small" @click="resetClick(scope.row.username)">编辑</el-button>
          <el-button type="danger" v-waves size="small" @click="removeClick(scope.row.username)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加药品" :visible.sync="addDrugsFormVisible" width="50%">
      <el-form style="margin: 0 30px" :rules="addRules" :model="addDrugsForm" ref="addDrugsForm">
        <el-row>
          <el-col :span="12">
            <el-form-item prop="mBarcode" label="条形码" label-width="100px">
              <el-input v-model.number="addDrugsForm.mBarcode" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item prop="mType" label="药品类型" label-width="100px">
              <el-select style="width:100%" v-model="addDrugsForm.mType" placeholder="请选择药品类型">
                <el-option label="西药" value="西药"></el-option>
                <el-option label="中药" value="中药"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item prop="mName" label="药品名称" label-width="100px">
              <el-input style="width:100%" v-model="addDrugsForm.mName" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="生产商家" label-width="100px">
              <el-input v-model="addDrugsForm.factory" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item prop="mClassify" label="归属分类" label-width="100px">
              <div class="block">
                <el-cascader
                  size="medium"
                  placeholder="搜索"
                  :options="options"
                  v-model="addDrugsForm.mClassify"
                  style="width:100%"
                  filterable
                ></el-cascader>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item prop="mBatch" label="批号" label-width="100px">
              <el-input style="width:100%" v-model="addDrugsForm.mBatch" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item prop="mUseWay" label="用药方式" label-width="100px">
              <el-select style="width:100%" v-model="addDrugsForm.mUseWay" placeholder="请选择用药方式">
                <el-option v-for="item in useWayArr" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item prop="mTreatment" label="用药疗程" label-width="100px">
              <el-select style="width:100%" v-model="addDrugsForm.mTreatment" placeholder="请选择用药疗程">
                <el-option v-for="item in treatmentArr" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item prop="mStock" label="入库量" label-width="100px">
              <el-input style="width:100%" v-model.number="addDrugsForm.mStock" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item prop="mUnit" label="药品规格" label-width="100px">
              <el-select style="width:100%" v-model="addDrugsForm.mUnit" placeholder="请选择药品类型">
                <el-option v-for="item in unitArr" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item prop="mInPrice" label="进货价/元" label-width="100px">
              <el-input style="width:100%" v-model.number="addDrugsForm.mInPrice" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item prop="mOutPrice" label="售价/元" label-width="100px">
              <el-input style="width:100%" v-model.number="addDrugsForm.mOutPrice" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item prop="mProduceTime" label="生产日期" label-width="100px">
              <el-date-picker
                v-model="addDrugsForm.mProduceTime"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item prop="mOverdueTime" label="有效日期" label-width="100px">
              <el-date-picker
                v-model="addDrugsForm.mOverdueTime"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="备注" label-width="100px">
          <el-input
            style="width: 91.7%"
            type="textarea"
            :rows="5"
            placeholder="请输入备注"
            v-model="addDrugsForm.mRemark">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDrugsFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="resetForm('addDrugsForm')">重 置</el-button>
        <el-button type="primary" @click="submitForm('addDrugsForm')">确认添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { getList, resetPassword, removeUser, addUser } from '@/api/user'
import waves from '@/directive/waves' // 水波纹指令
import MdInput from '@/components/MDinput'
import { getClassify } from '@/api/other'
import { saveDrugsInfo } from '@/api/drugs'
import store from '@/store'

export default {
  directives: {
    waves
  },
  data() {
    return {
      addRules: {
        mBarcode: [
          { required: true, message: '请输入条形码', trigger: 'blur' },
          { type: 'number', message: '条形码必须为数字' }
        ],
        mName: [
          { required: true, message: '请输入药品名称', trigger: 'blur' }
        ],
        mType: [
          { required: true, message: '请选择药品类型', trigger: 'change' }
        ],
        mClassify: [
          { required: true, message: '请选择归属分类', trigger: 'change' }
        ],
        mBatch: [
          { required: true, message: '请输入批号', trigger: 'blur' }
        ],
        mUseWay: [
          { required: true, message: '请选择用药方式', trigger: 'change' }
        ],
        mTreatment: [
          { required: true, message: '请选择用药疗程', trigger: 'change' }
        ],
        mStock: [
          { required: true, message: '请输入入库量', trigger: 'blur' },
          { type: 'number', message: '入库量必须为数字' }
        ],
        mUnit: [
          { required: true, message: '请选择药品规格', trigger: 'change' }
        ],
        mInPrice: [
          { required: true, message: '请输入进货价', trigger: 'blur' },
          { type: 'number', message: '进货价必须为数字' }
        ],
        mOutPrice: [
          { required: true, message: '请输入售价', trigger: 'blur' },
          { type: 'number', message: '售价必须为数字' }
        ],
        mProduceTime: [
          { type: 'date', required: true, message: '请选择生产日期', trigger: 'change' }
        ],
        mOverdueTime: [
          { type: 'date', required: true, message: '请选择有效日期', trigger: 'change' }
        ]
      },
      addDrugsForm: {
        mBarcode: '',
        mName: '',
        mType: '',
        mBatch: '',
        factory: '',
        mInPrice: '',
        mStock: '',
        mClassify: [],
        mUnit: '',
        mUseWay: '',
        mTreatment: '',
        mOutPrice: '',
        mRemark: '',
        mProduceTime: '',
        mOverdueTime: ''
      },
      addDrugsFormVisible: false,
      list: [
        {
          mBarcode: 3000,
          mName: 'asd',
          mType: 'In',
          mBatch: '123123',
          factory: 'asdadsadasda',
          mInPrice: 1,
          mStock: 8,
          mClassify: 'wqdqqwdwqd',
          mUnit: 'sadczxcx',
          mUseWay: 'asdascascccasca',
          mTreatment: 'acascascascascsa',
          mOutPrice: 21115,
          mRemark: 'cassasacscasscacs',
          mProduceTime: 511156,
          mOverdueTime: 111516156516
        }
      ],
      unitArr: ['盒', '片', '两', '支', '袋', '板', '丸', '贴', '张', '克', '包', '桶', '瓶', '粒', '枚', '千克', 'L', 'ml', 'mi', 'mg'],
      useWayArr: ['口服', '冲服', '静脉点滴皮试', '雾化', '灌肠', '局部封闭', '穴位注射', '静脉点滴', '肌肉注射皮试', '静脉输液', '静脉注射', '外用', '睡前服用', '感冒打针'],
      treatmentArr: ['一天1次', '一天2次', '一天3次', '一天4次', '一天5次', '必要时(pm)'],
      options: [],
      listLoading: false
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
    getClassify()
      .then(res => {
        if (res.data.code === 1) {
          this.options = JSON.parse(res.data.data)
        }
      })
    this.fetchData()
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let s = ''
          this.addDrugsForm.mClassify.map((item, index) => {
            if (index === 0) {
              s += item
            } else {
              s += '/' + item
            }
          })
          const a = {
            ...this.addDrugsForm,
            mProduceTime: (new Date(this.addDrugsForm.mProduceTime)).getTime(),
            mOverdueTime: (new Date(this.addDrugsForm.mOverdueTime)).getTime(),
            mClassify: s,
            type: 'in',
            inputer: store.getters.name
          }
          saveDrugsInfo(a)
            .then(res => {
              if (res.data.code === 1) {
                this.$message({
                  type: 'success',
                  message: '药品录入成功！'
                })
                this.addDrugsFormVisible = false
                this.resetForm('addDrugsForm')
              }
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    fetchData() {
      this.listLoading = true
      this.listLoading = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
