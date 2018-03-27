import request from '@/utils/request'

export function getStudentInfo(cardId) {
  return request({
    url: '/student/getStudentInfo',
    method: 'get',
    params: { cardId }
  })
}

export function saveStudentInfo(data) {
  return request({
    url: '/student/saveStudentInfo',
    method: 'post',
    data
  })
}

export function getTreatInfoByParams(params, page, pageSize) {
  return request({
    url: '/treat/getTreatInfoByParams',
    method: 'get',
    params: { params, page, pageSize }
  })
}

export function saveTreatInfo(data) {
  return request({
    url: '/treat/saveTreatInfo',
    method: 'post',
    data
  })
}

export function getTreatInfoByTime(params) {
  return request({
    url: '/treat/getTreatInfoByTime',
    method: 'get',
    params
  })
}

