import request from '@/utils/request'

export function getClassify(name) {
  return request({
    url: '/others/getOthersByName',
    method: 'get',
    params: { name }
  })
}

export function setClassify(name, content) {
  return request({
    url: '/others/changeOthersByName',
    method: 'post',
    data: {
      name,
      content
    }
  })
}

export function getDrugsDetail(barcode) {
  return request({
    url: 'http://api.jisuapi.com/barcode2/query',
    method: 'get',
    params: { 
      appkey: '2d6897693df6271d',
      barcode
     }
  })
}

