import request from '@/utils/request'

export function getStudentInfo(cardId) {
  return request({
    url: '/student/getStudentInfo',
    method: 'get',
    params: { cardId }
  })
}

export function getStudentInfoByParams(params) {
  return request({
    url: '/student/getStudentInfoByParams',
    method: 'get',
    params
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

export function getTreatInfoByTime(st, et) {
  return request({
    url: '/treat/getTreatInfoByTime',
    method: 'get',
    params: {
      type: 'treatTime',
      startTime: st,
      endTime: et
    }
  })
}

