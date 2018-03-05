const crypto = require('crypto')

const utils = {
  changeWithMD5 (str) {
    const md5 = crypto.createHash('md5')
    const md5Str = md5.update(str).digest('hex')
    return md5Str
  }
}

module.exports = utils