import request from '@/utils/request'

export function getClassify() {
  return request({
    url: '/others/getOthersByName',
    type: 'get',
    params: { name: 'mClassify' }
  })
}
