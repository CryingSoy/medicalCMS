<template>
  <div class="app-container">
    <div class="card-box">
      <el-card v-for="item in classify" :key="item.value" class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ item.label }}</span>
        <el-button @click="append" style="float: right; padding: 3px 0" type="text">增加</el-button>
      </div>
      <div class="custom-tree-container">
        <el-tree
          :data="item.children"
          show-checkbox
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
import { getClassify } from '@/api/other'

export default {
  name: 'classify',
  data() {
    return {
      classify: []
    }
  },
  mounted() {
    getClassify()
      .then(res => {
        if (res.data.code === 1) {
          this.classify = JSON.parse(res.data.data)
          console.log(this.classify)
        }
      })
  },
  methods: {
    append(data) {
      const newChild = { label: 'testtest', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },
    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    renderContent(h, { node, data, store }) {
      return (
        <span class='custom-tree-node' style='width: 100%'>
          <span style='line-height: 30px'>{node.label}</span>
          <span style='float: right'>
            <el-button size='mini' type='text' on-click={ () => this.append(data) }>增加</el-button>
            <el-button  size='mini' type='text' on-click={ () => this.remove(node, data) }>删除</el-button>
          </span>
        </span>)
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
