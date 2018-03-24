import request from '@/utils/request'

export function getStudentInfo(cardId) {
    return request({
      url: '/student/getStudentInfo',
      method: 'get',
      params: { cardId }
    })
}

