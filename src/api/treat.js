import request from '@/utils/request'

export function getStudentInfo(cardId) {
    return request({
      url: '/student/getStudentInfo',
      method: 'get',
      params: { cardId }
    })
}

export function getTreatInfoByParams(params, page, pageSize) {
    return request({
      url: '/treat/getTreatInfoByParams',
      method: 'get',
      params: { params, page, pageSize }
    })
}
