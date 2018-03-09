<template>
  <div id="auth">
    <el-radio v-model="orderid" label="0" checked="checked">16进制(8HEX)</el-radio>
    <el-radio v-model="orderid" label="1">10进制(10DEC)</el-radio>
    <el-radio v-model="formatID" label="0" checked="checked">正常</el-radio>
    <el-radio v-model="formatID" label="1">倒序</el-radio>
    <el-button @click="start()">开始读卡</el-button>
    <el-button @click="stop()">停止读卡</el-button>
    <el-input v-model="cardid"></el-input>
  </div>
</template>

<script>
export default {
  name: 'auth',
  data() {
    return {
      cardid: 123,
      orderid: '0',
      formatID: '0'
    }
  },
  mounted() {
    var rfidreader = window.rfidreader
    rfidreader.onResult(resultdata => {
      switch (resultdata.FunctionID) {
        case 0:
          if (resultdata.Result > 0) {
            this.cardid = resultdata.strData
          }
          break
      }
    })
  },
  methods: {
    start() {
      var rfidreader = window.rfidreader
      var FormatID
      var OrderID
      FormatID = this.formatID
      OrderID = this.orderid
      rfidreader.Repeat = 1
      rfidreader.HaltAfterSuccess = 1
      rfidreader.RequestTypeACardNo(FormatID, OrderID)
    },
    stop() {
      var rfidreader = window.rfidreader
      var FormatID
      var OrderID
      FormatID = this.formatID
      OrderID = this.orderid
      rfidreader.Repeat = 0
      rfidreader.RequestTypeACardNo(FormatID, OrderID)
    }
  }
}
</script>

