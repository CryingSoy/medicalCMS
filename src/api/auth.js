import request from '@/utils/request'

export function getAuthTable(type) {
  if (type === undefined) {
    return request({
      url: '/auth/getAuthTable',
      method: 'get'
    })
  } else {
    return request({
      url: '/auth/getAuthTable',
      method: 'get',
      params: { type }
    })
  }
}

export function setAuthTable(authArr, type) {
  if (type === undefined) {
    console.log(authArr)
    const data = { authArr }
    return request({
      url: '/auth/setAuthTable',
      method: 'post',
      data
    })
  } else {
    const data = { type, authArr }
    return request({
      url: '/auth/setAuthTable',
      method: 'post',
      data
    })
  }
}
