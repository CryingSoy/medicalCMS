import request from '@/utils/request'

export function getList(type) {
  return request({
    url: '/user/getUserByType',
    method: 'get',
    params: { type }
  })
}

export function resetPassword(username, password, type) {
  const data = { username, password, type }
  return request({
    url: '/user/resetPassword',
    method: 'post',
    data
  })
}

export function removeUser(username) {
  const data = { username }
  return request({
    url: '/user/removeUser',
    method: 'post',
    data
  })
}

export function addUser(username, password, type) {
  const data = { username, password, type }
  return request({
    url: '/user/addAdminOrDoctor',
    method: 'post',
    data
  })
}
