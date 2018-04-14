<template>
  <div class="treat-box">
    <div class="card-box">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>学生信息</span>
          <el-button style="float: right;" size="small" type="primary" @click="queryCardId" icon="el-icon-search">读卡</el-button>
          <el-button style="float: right; margin-right: 30px" size="small" type="primary" icon="el-icon-search">查询学号</el-button>
          <el-input style="float: right; width:200px;" size="small"></el-input>
        </div>
        <el-form v-loading="loading" :model="studentInfo" ref="studentInfo">
          <el-row>
            <el-col :span="6">
              <el-form-item label="姓名" label-width="100px" required>
                <el-input style="width:100%" v-model="studentInfo.name" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="年龄" label-width="100px" required>
                <el-input v-model="studentInfo.age" auto-complete="off">
                  <template slot="append">岁</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="身高" label-width="100px">
                <el-input style="width:100%" v-model="studentInfo.height" auto-complete="off">
                  <template slot="append">cm</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="性别" label-width="100px" required>
                <el-radio-group v-model="studentInfo.sex">
                  <el-radio-button label="男"></el-radio-button>
                  <el-radio-button label="女"></el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="6">
              <el-form-item label="体重" label-width="100px">
                <el-input v-model="studentInfo.weight" auto-complete="off">
                  <template slot="append">kg</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="电话" label-width="100px" :rules="[
                { required: true, message: '电话不能为空'},
                { type: 'number', message: '电话必须为数字值'}
              ]">
                <el-input style="width:100%" v-model="studentInfo.phone" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="宿舍" label-width="100px">
                <el-input v-model="studentInfo.room" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="血型" label-width="100px">
                <el-radio-group v-model="studentInfo.blood">
                  <el-radio-button label="A"></el-radio-button>
                  <el-radio-button label="B"></el-radio-button>
                  <el-radio-button label="O"></el-radio-button>
                  <el-radio-button label="AB"></el-radio-button>
                  <el-radio-button label="未知"></el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="6">
              <el-form-item label="学号" label-width="100px" required>
                <el-input v-model="studentInfo.stuId" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="卡号" label-width="100px" required>
                <el-input v-model="studentInfo.cardId" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="系别" label-width="100px">
                <el-input v-model="studentInfo.depart" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="就诊史" label-width="100px">
                <el-button @click="searchTreat" size="small" type="primary" icon="el-icon-search">查询</el-button>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-form-item label="过敏史" label-width="100px">
              <el-input
                type="textarea"
                :autosize="{ minRows: 4}"
                placeholder="请输入过敏史"
                v-model="studentInfo.allergy">
              </el-input>
            </el-form-item>
          </el-row>
        </el-form>
      </el-card>
    </div>

    <div class="card-box">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>就诊信息</span>
        </div>
        <div id="treat">
          <el-form status-icon :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="treatForm">
            <!-- <h3 class="title">就诊</h3> -->
            <!-- <el-form-item label="卡号" prop="studentId">
              <el-col :span="20">
                <el-input v-model="ruleForm.studentId"></el-input>
              </el-col>
              <el-col style="padding-left:15px;" :span="4">
              <el-button type="primary" icon="el-icon-search" @click="queryCardId">查询</el-button>
              </el-col>
            </el-form-item> -->
            <el-form-item label="当前校医" prop="doctorName">
              <el-col :span="20">
                <el-input v-model="ruleForm.doctorName"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="病因" prop="disease">
              <el-col :span="20">
                <el-input v-model="ruleForm.disease"></el-input>
              </el-col>
              <el-col style="padding-left:15px;" :span="3">
                <el-dropdown @command="handleCommand">
                  <el-button type="primary" icon="el-icon-plus"></el-button>
                  <el-cascader
                    size="medium"
                    placeholder="搜索"
                    :options="optionsa"
                    @change="handleChange"
                    v-model="diseaseSelect"
                    style="width:10px; opacity:0; position: absolute; top:0"
                    filterable
                  ></el-cascader>
                  <el-dropdown-menu slot="dropdown">
                    <!-- <el-dropdown-item command="感冒（上呼吸道感染）">感冒（上呼吸道感染）</el-dropdown-item>
                    <el-dropdown-item command="发烧">发烧</el-dropdown-item>
                    <el-dropdown-item command="头痛">头痛</el-dropdown-item>
                    <el-dropdown-item command="胃痛">胃痛</el-dropdown-item>
                    <el-dropdown-item command="关节扭伤">关节扭伤</el-dropdown-item> -->
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-form-item>
            <el-form-item label="详细症状" prop="diseaseDetail">
              <el-col :span="20">
                <el-input :autosize="{minRows: 3}" type="textarea" v-model="ruleForm.diseaseDetail"></el-input>
              </el-col>
            </el-form-item>
            <!-- <el-form-item label="就诊时间" required>
              <el-col :span="20">
                <el-form-item prop="treatDate">
                  <el-date-picker type="datetime" placeholder="选择日期" v-model="ruleForm.treatDate" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item> -->
            <el-form-item label="" align="center" prop="drugName">
              <el-col :span="20">
                <el-button type="primary" icon="el-icon-circle-plus-outline" @click="fetchData">添加药品</el-button>
                <!-- <el-autocomplete @keyup.enter.native="scan" popper-class="drugSearchResults" v-model="searchItem" :fetch-suggestions="querySearch" placeholder="请输入内容" @select="handleSelect">
                  <i class="el-icon-search el-input__icon" slot="prefix"></i>
                  <i v-show="searchItem" class="el-icon-circle-close el-input__icon" slot="suffix" @click="clearSelectItem"></i>
                  <template slot-scope="props">
                    <div class="name">{{ props.item.name }}<span v-if="props.item.hasOwnProperty('barCode')" class="barCode">[{{ props.item.barCode }}]</span><div class="num">x{{ props.item.num }}</div></div>
                    <span class="useDetail">{{ props.item.useDetail }}</span>
                    <span class="factory">{{ props.item.factory }}</span>
                  </template>
                </el-autocomplete> -->
              </el-col>
            </el-form-item>
            <el-form-item label="药品列表">
              <el-col :span="24">
                <el-table :summary-method="getSummaries" show-summary stripe align="left" ref="multipleTable" :data="selectArray" tooltip-effect="dark" style="width: 100%">
                <el-table-column type="selection" width="60">
                </el-table-column>
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="table-expand">
                      <el-form-item label="归属分类">
                        <span>{{ props.row.mClassify }}</span>
                      </el-form-item>
                      <el-form-item label="生产商家">
                        <span>{{ props.row.factory }}</span>
                      </el-form-item>
                      <el-form-item label="用药方式">
                        <span>{{ props.row.mUseWay }}</span>
                      </el-form-item>
                      <el-form-item label="用药疗程">
                        <span>{{ props.row.mTreatment }}</span>
                      </el-form-item>
                      <el-form-item label="进货价">
                        <span>{{ props.row.mInPrice }}</span>
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
                <el-table-column label="条形码" width="125">
                  <template slot-scope="scope">{{ scope.row.mBarcode }}</template>
                </el-table-column>
                <el-table-column prop="mName" label="名称" width="160">
                </el-table-column>
                <el-table-column prop="mType" label="药品类型" width="100">
                </el-table-column>
                <el-table-column prop="mOutPrice" label="售价" width="90" align="center">
                </el-table-column>
                <el-table-column prop="selectNum" label="数量" align="center">
                  <template slot-scope="scope">
                    <el-input @change="refreshTableData(scope.$index, selectArray);checkNumber(scope.$index, selectArray)" class="selectNum" v-model="scope.row.selectNum" size="mini"></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="mUnit" label="单位" width="90" align="center">
                </el-table-column>
                <el-table-column prop="mStock" label="库存" width="90" align="center">
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="120">
                  <template slot-scope="scope">
                    <el-button type="text" @click.native.prevent="refreshTableData(scope.$index, selectArray, 'sub')" :disabled="scope.row.selectNum==0">-</el-button>
                    <el-button type="text" @click.native.prevent="refreshTableData(scope.$index, selectArray, 'add')" :disabled="scope.row.selectNum==scope.row.num">+</el-button>
                    <el-button @click.native.prevent="deleteRow(scope.$index, selectArray)" type="text" size="medium">
                      移除
                    </el-button>
                  </template>
                </el-table-column>
                </el-table>
                <el-button v-if="this.selectArray.length!==0" class="deleteButton" @click="toggleSelection(selectArray)">清除所选</el-button>
              </el-col>
            </el-form-item>
            <!-- <el-form-item label="是否请假" prop="leaveDay">
              <el-radio-group v-model="ruleForm.leaveDay">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item> -->
            <!-- <el-form-item label="请假时间" v-show="ruleForm.leaveDay">
              <el-col :span="24">
                <el-select v-model="ruleForm.leave" placeholder="请选择">
                  <el-option v-for="item in ruleForm.leaveDayArray" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-form-item> -->
            <el-form-item label="医嘱" prop="doctorRemark">
              <el-col :span="20">
                <el-input :autosize="{minRows: 3}" type="textarea" v-model="ruleForm.doctorRemark"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item align="center">
              <el-button type="primary" @click="submitForm('ruleForm')">就诊完成</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>

    <el-dialog title="就诊史" :visible.sync="searchStudentTreatVisible" width="80%">
      <el-table :data="list" ref="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
        <el-table-column align="center" label='序号' width="95">
          <template slot-scope="scope">
            {{scope.$index}}
          </template>
        </el-table-column>
        <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" class="stuDrugsInfos">
            <el-row>
              <el-form-item label="学生卡号">
                <span>{{ props.row.cardId }}</span>
              </el-form-item>
            </el-row>
            <el-row>
            <el-form-item label="诊断信息">
              <span>{{ props.row.diseaseDetail }}</span>
            </el-form-item>
            </el-row>
            <el-row>
            <el-form-item label="药品列表">
              <el-table :data="JSON.parse(props.row.medicineDetail)" border fit highlight-current-row>
                <el-table-column prop="mBarcode" label="条形码">
                </el-table-column>
                <el-table-column prop="mName" label="药品名称">
                </el-table-column>
                <el-table-column prop="mType" label="药品类型">
                </el-table-column>
                <el-table-column prop="mClassify" label="药品归属">
                </el-table-column>
                <el-table-column prop="factory" label="生产厂商">
                </el-table-column>
                <el-table-column prop="mUnit" label="药品规格">
                </el-table-column>
                <el-table-column prop="mUseWay" label="用药方式">
                </el-table-column>
                <el-table-column prop="mTreatment" label="用药疗程">
                </el-table-column>
                <el-table-column prop="num" label="使用数量">
                </el-table-column>
                <el-table-column prop="price" label="金额">
                </el-table-column>
              </el-table>
            </el-form-item>
            </el-row>
            <el-row>
            <el-form-item label="医嘱">
              <span>{{ props.row.doctorRemark }}</span>
            </el-form-item>
            </el-row>
          </el-form>
        </template>
      </el-table-column>
        <el-table-column label="学生姓名">
          <template slot-scope="scope">
            {{scope.row.name}}
          </template>
        </el-table-column>
        <el-table-column label="学生学号">
          <template slot-scope="scope">
            {{scope.row.stuId}}
          </template>
        </el-table-column>
        <el-table-column label="症状名" >
          <template slot-scope="scope">
            {{scope.row.disease}}
          </template>
        </el-table-column>
        <el-table-column label="就诊时间" >
          <template slot-scope="scope">
            {{scope.row.treatTime}}
          </template>
        </el-table-column>
        <el-table-column label="就诊医生" >
          <template slot-scope="scope">
            {{scope.row.doctor}}
          </template>
        </el-table-column>
        <el-table-column label="总金额" >
          <template slot-scope="scope">
            {{scope.row.totalPrice}}
          </template>
        </el-table-column>
        <!-- <el-table-column align="center" label="操作" width="200px">
          <template slot-scope="scope">
            <el-button type="primary" v-waves size="small" @click="resetClick(scope.row.username)">编辑</el-button>
            <el-button type="danger" v-waves size="small" @click="removeClick(scope.row.username)">删除</el-button>
          </template>
        </el-table-column> -->
      </el-table>

      <div class="pagination-container">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </el-dialog>

    <el-dialog title="选择药品" :visible.sync="addDrugsFormVisible" width="80%">
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
  </div>
</template>

<script>
import { getStudentInfo, saveStudentInfo, getTreatInfoByParams, saveTreatInfo } from '@/api/treat'
import { getDrugsInfo } from '@/api/drugs'
import { getClassify } from '@/api/other'
import waves from '@/directive/waves' // 水波纹指令
import { rfid } from '@/api/rfid'
import store from '@/store'

export default {
  directives: {
    waves
  },
  name: 'treat',
  data() {
    return {
      diseaseSelect: [],
      optionsa: [],
      isFirst: true,
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
      total: 0,
      page: 1,
      pageSize: 10,
      list: [],
      listLoading: false,
      searchStudentTreatVisible: false,
      rfidreader: rfid.createNew(),
      loading: false,
      orderid: '0',
      formatID: '0',
      searchStudentId: '',
      dialogTableVisible: false,
      treatData: {
        id: ''
      },
      searchArray: [],
      searchItem: '',
      selectArray: [],
      totalMoney: 0,
      studentInfo: {},
      studentTreat: [],
      studentTreatVisible: false,
      ruleForm: {
        studentId: '',
        doctorName: '',
        treatDate: '',
        disease: '',
        diseaseDetail: '',
        drugName: '',
        leaveDay: '',
        doctorRemark: '',
        leave: '',
        leaveDayArray: [
          {
            value: 1,
            label: '一天'
          },
          {
            value: 2,
            label: '两天'
          },
          {
            value: 3,
            label: '三天'
          },
          {
            value: 4,
            label: '四天'
          },
          {
            value: 5,
            label: '五天'
          },
          {
            value: 6,
            label: '六天'
          },
          {
            value: 7,
            label: '一个星期'
          },
          {
            value: 14,
            label: '两个星期'
          }
        ]
      },
      rules: {
        studentId: [
          { required: true, message: '请输入卡号', trigger: 'blur' }
        ],
        doctorName: [
          { required: true, message: '请输入校医名字', trigger: 'blur' }
        ],
        disease: [
          { required: true, message: '请输入病因', trigger: 'blur' }
        ],
        diseaseDetail: [
          { required: true, message: '请输入详细症状', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    getClassify('mClassify')
      .then(res => {
        if (res.data.code === 1) {
          this.optionsa = JSON.parse(res.data.data)
        }
      })
    this.ruleForm.doctorName = store.getters.name
    if (!this.rfidreader.TryConnect()) {
      this.$alert('浏览器不支持，请更换浏览器后重试！', '提示', {
        confirmButtonText: '确定',
        callback: action => {}
      })
    }
    this.rfidreader.onResult(resultdata => {
      switch (resultdata.FunctionID) {
        case 0:
          if (resultdata.Result > 0) {
            this.studentInfo.cardId = resultdata.strData
            getStudentInfo(resultdata.strData)
              .then(res => {
                this.Stop()
                this.loading = false
                const { data } = res.data
                if (res.data.code === 1 && data.isExist) {
                  this.$message({
                    message: '查询成功',
                    type: 'success'
                  })
                  this.isFirst = false
                  this.studentInfo = data.info
                } else {
                  this.isFirst = true
                  this.$message({
                    message: '未查询到该学生的信息，该学生为第一次就诊。请填写学生基本信息，就诊成功后会录入该学生信息。',
                    type: 'warning',
                    duration: 5000
                  })
                }
              })
          }
          break
      }
    })
  },
  methods: {
    handleChange() {
      this.ruleForm.disease = this.diseaseSelect[this.diseaseSelect.length - 1]
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
    handleSizeChange(val) {
      const a = [{ 'name': 'cardId', 'word': this.studentInfo.cardId }]
      this.pageSize = val
      this.searchTreat(JSON.stringify(a))
    },
    handleCurrentChange(val) {
      const a = [{ 'name': 'cardId', 'word': this.studentInfo.cardId }]
      this.page = val
      this.searchTreat(JSON.stringify(a))
    },
    searchTreat() {
      if (this.studentInfo.stuId === undefined || this.studentInfo.stuId === '') {
        this.$message({
          message: '学号不能为空',
          type: 'error'
        })
        return
      } else {
        this.searchStudentTreatVisible = true
        const a = [{ 'name': 'stuId', 'word': this.studentInfo.stuId }]
        getTreatInfoByParams(JSON.stringify(a), this.page, this.pageSize)
          .then(res => {
            if (res.data.code === 1) {
              if (res.data.data.length !== 0) {
                this.$message({
                  message: `查询学号为${this.studentInfo.stuId}的就诊史成功`,
                  type: 'success'
                })
                this.total = res.data.total
                this.list = res.data.data
              } else {
                this.$message({
                  message: `学号为${this.studentInfo.stuId}尚未拥有就诊史`,
                  type: 'warning'
                })
              }
            }
          })
      }
    },
    queryCardId() {
      this.resetForm('studentInfo')
      this.loading = true
      this.Start()
      setTimeout(() => {
        if (this.loading) {
          this.loading = false
          this.Stop()
          this.$message({
            type: 'warning',
            message: '读卡超时'
          })
        }
      }, 5000)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const medicine = this.selectArray.map(item => {
            return {
              id: item.id,
              mBarcode: item.mBarcode,
              mName: item.mName,
              mType: item.mType,
              mClassify: item.mClassify,
              factory: item.factory,
              mUnit: item.mUnit,
              mUseWay: item.mUseWay,
              mTreatment: item.mTreatment,
              num: item.selectNum,
              price: item.selectNum * item.mOutPrice
            }
          })
          if (this.studentInfo.name !== undefined && this.studentInfo.cardId !== undefined && this.studentInfo.stuId !== undefined && this.studentInfo.age !== undefined && this.studentInfo.sex !== undefined) {
            if (this.isFirst) {
              (name => {
                saveStudentInfo(this.studentInfo)
                  .then(res => {
                    if (res.data.code === 1) {
                      this.$notify({
                        title: '成功',
                        message: `${name}的信息录入成功`,
                        type: 'success'
                      })
                    }
                  })
              })(this.studentInfo.name)
              saveTreatInfo({
                cardId: this.studentInfo.cardId,
                name: this.studentInfo.name,
                stuId: this.studentInfo.stuId,
                disease: this.ruleForm.disease,
                diseaseDetail: this.ruleForm.diseaseDetail,
                medicineDetail: JSON.stringify(medicine),
                doctor: this.ruleForm.doctorName,
                totalPrice: this.totalMoney || '0',
                doctorRemark: this.ruleForm.doctorRemark,
                restTime: ''
              })
                .then(res => {
                  if (res.data.code === 1) {
                    this.$message({
                      type: 'success',
                      message: '就诊成功！'
                    })
                    this.resetForm('ruleForm')
                    this.resetForm('studentInfo')
                    this.ruleForm.doctorName = store.getters.name
                  }
                })
            } else {
              saveTreatInfo({
                cardId: this.studentInfo.cardId,
                name: this.studentInfo.name,
                stuId: this.studentInfo.stuId,
                disease: this.ruleForm.disease,
                diseaseDetail: this.ruleForm.diseaseDetail,
                medicineDetail: JSON.stringify(medicine),
                doctor: this.ruleForm.doctorName,
                totalPrice: this.totalMoney || '0',
                doctorRemark: this.ruleForm.doctorRemark,
                restTime: ''
              })
                .then(res => {
                  if (res.data.code === 1) {
                    this.$message({
                      type: 'success',
                      message: '就诊成功！'
                    })
                    this.resetForm('ruleForm')
                    this.resetForm('studentInfo')
                    this.ruleForm.doctorName = store.getters.name
                  }
                })
            }
          } else {
            this.$message({
              type: 'warning',
              message: '请填写学生信息！'
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.studentInfo = {}
      this.selectArray = []
      this.searchItem = ''
    },
    handleCommand(command) {
      this.ruleForm.disease = command
      if (command === '感冒（上呼吸道感染）') {
        this.ruleForm.diseaseDetail = '上呼吸道感染简称上感，又称普通感冒。是包括鼻腔、咽或喉部急性炎症的总称。广义的上感不是一个疾病诊断，而是一组疾病，包括普通感冒、病毒性咽炎、喉炎、疱疹性咽峡炎、咽结膜热、细菌性咽-扁桃体炎。狭义的上感又称普通感冒，是最常见的急性呼吸道感染性疾病，多呈自限性，但发生率较高。成人每年发生2～4次，儿童发生率更高，每年6～8次。全年皆可发病，冬春季较多。'
      } else if (command === '发烧') {
        this.ruleForm.diseaseDetail = '热原直接作用于体温调节中枢、体温中枢功能紊乱或各种原因引起的产热过多、散热减少，导致体温升高超过正常范围的情形。每个人的正常体温略有不同，而且受时间、季节、环境、月经等因素的影响。一般认为当口腔温度高于37.5 ℃，腋窝温度高于37℃，或一日之间体温相差在1℃以上，即为发烧。发烧是临床上最常见的症状，是疾病进展过程中的重要临床表现，可见于多种感染性疾病和非感染性疾病。但有时体温升高不一定都是疾病引起的，某些情况可有生理性体温升高，如剧烈运动、月经前期及妊娠期，进入高温环境或热水浴等均可使体温较平时略高，这些通过自身调节可恢复正常。'
      } else if (command === '头痛') {
        this.ruleForm.diseaseDetail = '头痛（headache） 是临床常见的症状，通常将局限于头颅上半部，包括眉弓、耳轮上缘和枕外隆突连线以上部位的疼痛统称头痛。头痛病因繁多，神经痛、颅内感染、颅内占位病变、脑血管疾病、颅外头面部疾病、以及全身疾病如急性感染、中毒等均可导致头痛。发病年龄常见于青年、中年和老年。'
      } else if (command === '胃痛') {
        this.ruleForm.diseaseDetail = '胃痛，中医病证名。多由外感寒邪、饮食所伤、情志不畅和脾胃素虚等病因而引发。胃是主要病变脏腑，常与肝脾等脏有密切关系。胃气郁滞、失于和降是胃痛的主要病机。治疗以理气和胃为大法，根据不同证候，采取相应治法。'
      } else if (command === '关节扭伤') {
        this.ruleForm.diseaseDetail = '关节扭伤的常见症状有疼痛、肿胀、关节活动不灵等，其中疼痛是每个关节扭伤的病人都会出现的症状，而肿胀、皮肤青紫、关节不能转动则是扭伤的常见表现。'
      }
    },
    closeStudentInfo() {
      while (this.studentInfo.length > 0) {
        this.studentInfo.pop()
      }
      while (this.studentTreat.length > 0) {
        this.studentTreat.pop()
      }
      this.dialogTableVisible = false
      this.studentTreatVisible = false
    },
    handleSelect(item) {
      let a = false
      this.selectArray.map((items, index) => {
        if (items.mName === item.mName) {
          this.refreshTableData(index, this.selectArray, 'add')
          a = true
        }
      })
      if (!a) {
        item.selectNum = 1
        this.selectArray.push(item)
      }
      this.addDrugsFormVisible = false
    },
    scan() {
      this.timeouts = setTimeout(() => {
        if (this.searchArray.length === 1 && this.searchArray[0].mBarCode === this.searchItem) {
          let a = false
          this.selectArray.map((items, index) => {
            if (items.name === this.searchArray[0].name) {
              this.refreshTableData(index, this.selectArray, 'add')
              a = true
            }
          })
          this.searchItem = ''
          if (!a) {
            this.searchArray[0].selectNum = 1
            this.selectArray.push(this.searchArray[0])
            this.searchItem = ''
          }
        }
      }, 800)
    },
    clearSelectItem(ev) {
      this.searchItem = ''
    },
    checkNumber(index, array) {
      if (isNaN(array[index].selectNum)) {
        this.$message({
          message: '请输入数字',
          type: 'warning'
        })
        array[index].selectNum = 0
      }
      if (parseInt(array[index].selectNum) < 0 || parseInt(array[index].selectNum) > parseInt(array[index].mStock)) {
        this.$message({
          message: '数量大于或小于库存',
          type: 'warning'
        })
        array[index].selectNum = 0
      }
    },
    toggleSelection(rows) {
      if (rows) {
        this.$refs.multipleTable.selection.map((item, index) => {
          this.selectArray.map((items, indexs) => {
            if (items.name === item.name) {
              this.deleteRow(indexs, this.selectArray)
            }
          })
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    selectNumChange(value) {
      console.log(value)
    },
    refreshTableData(index, rows, alg) {
      if (alg === 'add') {
        rows[index].selectNum++
      } else if (alg === 'sub') {
        rows[index].selectNum--
      }
      const a = rows[index]
      const aI = index
      const b = rows.map((item, index) => {
        if (index < aI || index > aI) {
          return item
        } else if (index === aI) {
          return a
        }
      })
      rows.splice(0, rows.length)
      b.map((item, index) => {
        rows.push(b[index])
      })
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        if (index === 3) {
          sums[index] = ''
          return
        }
        if (index === 8) {
          sums[index] = ''
          return
        }
        const values = data.map(item => {
          if (column.property === 'selectNum') {
            return {
              name: '数量',
              num: Number(item[column.property])
            }
          } else if (column.property === 'mOutPrice') {
            return {
              name: '售价',
              value: Number(item[column.property]),
              selectNum: item['selectNum']
            }
          } else {
            return item[column.property]
          }
        })
        if (!values.every(value => {
          if ((typeof value) === 'object') {
            return false
          } else {
            return isNaN(value)
          }
        })) {
          sums[index] = values.reduce((prev, curr) => {
            if ((typeof values[0]) === 'object') {
              if (values[0].name === '售价') {
                const value = Number(curr.value)
                if (!isNaN(value)) {
                  return prev + (curr.value * curr.selectNum)
                } else {
                  return prev
                }
              } else {
                const value = Number(curr.num)
                if (!isNaN(value)) {
                  return prev + curr.num
                } else {
                  return prev
                }
              }
            } else {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }
          }, 0)
          if ((typeof values[0]) === 'object') {
            if (values[0].name === '售价') {
              sums[index] = sums[index].toFixed(2)
              this.totalMoney = sums[index]
              sums[index] += ' 元'
            } else {
              sums[index] += ' 件'
            }
          }
        } else {
          sums[index] = ''
        }
      })

      return sums
    },
    Start() {
      var FormatID
      var OrderID
      FormatID = this.formatID
      OrderID = this.orderid
      this.rfidreader.Repeat = 1
      this.rfidreader.HaltAfterSuccess = 1
      this.rfidreader.RequestTypeACardNo(FormatID, OrderID)
    },
    Stop() {
      var FormatID
      var OrderID
      FormatID = this.formatID
      OrderID = this.orderid
      this.rfidreader.Repeat = 0
      this.rfidreader.RequestTypeACardNo(FormatID, OrderID)
    }
  }
}
</script>

<style lang="scss" scoped>
#treat {
  height: 100%;
  padding-top: 50px;
  display: flex;
  justify-content: space-around;
  .treatForm {
    // max-width: 1080px;
    min-width: 1080px;
    width: 70%;
  }
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.card-box{
  display: flex;
  justify-content: space-around;
  background: rgba(156, 156, 156, 0.014)
}

.box-card {
  // max-width: 1280px;
  // min-width: 720px;
  width: 100%;
  margin: 30px;
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

.stuDrugsInfo {
  font-size: 0;
  .label {
    width: 90px;
    color: #99a9bf;
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

// .treatForm {
//   max-width: 800px;
//   min-width: 600px;
//   width: 70%;
//   margin-top: 20px;
// }

// section {
//   display: flex;
//   justify-content: space-around;
//   div {
//     width: 20%;
//     height: 15%;
//     padding: 9% 0;
//     background-color: rgb(35, 181, 171);
//     border-radius: 15px;
//     color: #fff;
//     font-size: 30px;
//     cursor: pointer;
//   }
//   div:hover {
//     background-color: rgba(35, 181, 171, .7);
//   }
// }

// .el-dropdown-link {
//     cursor: pointer;
//     color: rgba(35, 181, 171, 1);
// }

// .el-icon-arrow-down {
//   font-size: 30px;
// }

// .el-autocomplete {
//   width: 583.33px;
// }

// .drugSearchResults {
//   li {
//     line-height: normal;
//     padding: 7px;

//     .name .num {
//       text-overflow: ellipsis;
//       overflow: hidden;
//     }
//     .useDetail,.factory {
//       font-size: 12px;
//       color: #b4b4b4;
//     }
//     .factory {
//       float: right;
//     }
//     .num {
//       float: right;
//     }
//   }
// }

// .el-icon-circle-close {
//   cursor: pointer;
// }

// .medicineDetail {
//   margin-top: 20px;
// }

.table-expand {
  font-size: 0;
}
.table-expand label {
  width: 90px;
  color: #99a9bf;
}
.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.deleteButton {
  position: relative;
  float: right;
  right: 12px;
  bottom: 45px;
  z-index: 999;
}

// .title {
//   font-size: 24px;
//   color: rgb(82, 82, 82);
//   margin-bottom: 30px;
//   margin-left: 15px;
//   text-align: left;
// }

// .diseaseInfo {
//   width: 100% !important;
//   border-bottom:1px solid #d9d9d9;
//   padding-bottom: 20px;
// }

.selectNum {
  width: 55px !important;
}

// .el-input .el-input__inner {
//     padding: 0 !important;
//   }
</style>

