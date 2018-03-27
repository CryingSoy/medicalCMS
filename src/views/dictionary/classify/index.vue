<template>
  <div class="app-container">
    <el-button @click="addNewClassify" style="margin-left: 30px;" type="primary" icon="el-icon-edit">增加药品归属</el-button>
    <div class="card-box">
      <el-card v-if="item.length !== 0" v-for="item in classify" :key="item.value" class="box-card">
      <!-- <div slot="header" class="clearfix">
        <md-input v-if="item.edit" style="width: 90%; margin: 0; height: 1px" v-model="item.label"></md-input>
        <span v-else>{{ item.label }}</span>
        <el-button v-if="item.edit" @click="item.edit = !item.edit" style="float: right; padding: 0" type="text">完成</el-button>
        <div style="display: inline;" v-else>
          <el-button @click="addNewClassify" style="float: right; padding: 3px 0" type="text">增加</el-button>
          <el-button @click="item.edit = !item.edit" style="float: right; padding: 3px 0" type="text">编辑</el-button>
        </div>
      </div> -->
      <div class="custom-tree-container">
        <el-tree
          :data="item"
          node-key="value"
          :expand-on-click-node="false"
          :render-content="renderContent">
        </el-tree>
      </div>
    </el-card>
    </div>
  </div>
</template>

<script>
import { getClassify, setClassify } from '@/api/other'
import MdInput from '@/components/MDinput'

export default {
  name: 'classify',
  data() {
    return {
      classify: [],
      isSame: false
    }
  },
  mounted() {
    getClassify()
      .then(res => {
        if (res.data.code === 1) {
          // console.log(res.data.data)
          const arr = JSON.parse(res.data.data)
          // console.log(arr)
          this.classify = arr.map(item => {
            // this.$set(item, 'edit', false)
            return [item]
          })
          // console.log(this.classify)
          // console.log(JSON.stringify(this.classify))
        }
      })
  },
  components: {
    MdInput
  },
  methods: {
    eachC(arr, str) {
      arr.forEach((item, index) => {
        item.forEach((v, i) => {
          if (v.label === str.toString()) {
            this.isSame = true
          }
          if (v.hasOwnProperty('children') && v.children.length !== 0) {
            this.eachC([v.children], str)
          }
        })
      })
    },
    changeClassify(note, value) {
      const arr = []
      this.classify.forEach(item => {
        if (item[0] !== undefined) {
          arr.push(item[0])
        }
      })
      const str = JSON.stringify(arr)
      setClassify('mClassify', str)
        .then(res => {
          if (res.data.code === 1) {
            this.$message({
              type: 'success',
              message: `${note}：${value} 成功！`
            })
            getClassify()
          }
        })
    },
    append(data) {
      this.$prompt('分类名字', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        if (value !== null) {
          if (value.indexOf(' ') < 0) {
            this.isSame = false
            this.eachC(this.classify, value)
            if (!this.isSame) {
              const newChild = { label: value, value }
              if (!data.children) {
                this.$set(data, 'children', [])
              }
              data.children.push(newChild)
              this.changeClassify('添加分类', value)
            } else {
              this.$message({
                type: 'error',
                message: '分类名称已存在'
              })
            }
          } else {
            this.$message({
              type: 'info',
              message: '分类名称不能包含空格'
            })
          }
        } else {
          this.$message({
            type: 'info',
            message: '未输入分类名称'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    edit(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.value === data.value)
      this.$prompt('分类名字', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        if (value !== null) {
          if (value.indexOf(' ') < 0) {
            children[index].label = value
            children[index].value = value
            this.changeClassify('修改分类名称', value)
          } else {
            this.$message({
              type: 'info',
              message: '分类名称不能包含空格'
            })
          }
        } else {
          this.$message({
            type: 'info',
            message: '未输入分类名称'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.value === data.value)
      this.$confirm(`此操作将永久删除分类：${children[index].label}，是否继续？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const note = children[index].label
        children.splice(index, 1)
        this.changeClassify('删除分类', note)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    renderContent(h, { node, data, store }) {
      return (
        <span class='custom-tree-node' style='width: 100%'>
          <span style='line-height: 30px'>{node.label}</span>
          <span style='float: right'>
            <el-button size='mini' type='text' on-click={ () => this.append(data) }>增加</el-button>
            <el-button size='mini' type='text' on-click={ () => this.edit(node, data) }>编辑</el-button>
            <el-button size='mini' type='text' on-click={ () => this.remove(node, data) }>删除</el-button>
          </span>
        </span>)
    },
    addNewClassify() {
      this.$prompt('分类名字', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        if (value !== null) {
          if (value.indexOf(' ') < 0) {
            // const newChild = { label: value, value, children: [] }
            // if (!data.children) {
            //   this.$set(data, 'children', [])
            // }
            // data.children.push(newChild)
            // console.log(this.classify)
            this.isSame = false
            this.eachC(this.classify, value)
            if (!this.isSame) {
              this.classify.push([{ label: value, value }])
              this.changeClassify('添加分类', value)
            } else {
              this.$message({
                type: 'error',
                message: '分类名称已存在'
              })
            }
          } else {
            this.$message({
              type: 'info',
              message: '分类名称不能包含空格'
            })
          }
        } else {
          this.$message({
            type: 'info',
            message: '未输入分类名称'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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

.box-card {
  width: 480px;
  margin: 30px 30px;
}

.card-box {
  display: flex;
  flex-wrap: wrap;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
