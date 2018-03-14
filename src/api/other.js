import request from '@/utils/request'

export function getClassify() {
  return request({
    url: '/others/getOthersByName',
    method: 'get',
    params: { name: 'mClassify' }
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

