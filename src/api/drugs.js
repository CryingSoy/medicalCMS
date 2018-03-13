import request from '@/utils/request'

export function saveDrugsInfo(data) {
  return request({
    url: '/drug/saveDrugsInfo',
    method: 'post',
    data
  })
}

export function getDrugsInfo(params, page, pageSize) {
  if (params === '[]') {
    return request({
      url: '/drug/getDrugsInfo',
      method: 'get',
      params: { page, pageSize }
    })
  } else {
    return request({
      url: '/drug/getDrugsInfo',
      method: 'get',
      params: { params, page, pageSize }
    })
  }
}

export function updateDrugsInfo(data) {
  return request({
    url: '/drug/updateDrugsInfo',
    method: 'post',
    data
  })
}

