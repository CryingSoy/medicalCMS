import request from '@/utils/request'

export function saveDrugsInfo(data) {
  return request({
    url: '/drug/saveDrugsInfo',
    method: 'post',
    data
  })
}

export function getDrugsInfo(params) {
  if (params === '[]') {
    return request({
      url: '/drug/getDrugsInfo',
      method: 'get',
      params
    })
  } else {
    return request({
      url: '/drug/getDrugsInfo',
      method: 'get',
      params: { params }
    })
  }
}

