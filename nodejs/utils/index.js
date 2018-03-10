const crypto = require('crypto')

const utils = {
  changeWithMD5(str) {
    const md5 = crypto.createHash('md5')
    const md5Str = md5.update(str).digest('hex')
    return md5Str
  },
  /**
   * 获取当天后的第几天
   * @param  { Number } AddDayCount - 增加的天数
   * @return { Object } dd          - 返回增加日期后的对象
   */
  getDay(AddDayCount) {
    const dd = new Date()
    dd.setDate(dd.getDate() + AddDayCount)
    return dd
  }
}

module.exports = utils
