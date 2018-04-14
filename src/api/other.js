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
