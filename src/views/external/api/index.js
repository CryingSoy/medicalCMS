import fetch from './fetch'
const api = 'http://localhost:3001/external'

const apiMap = {
  login: '/login',
  getUserInfo: '/getUserInfo',
  resetPassword: '/resetPassword',
  getStudentInfoByParams: '/getStudentInfoByParams',
  getTreatInfoByParams: '/getTreatInfoByParams',
  changeStudentInfo: '/changeStudentInfo'
}

export function login(args) {
  const url = api + apiMap.login
  const data = {}
  if (args && args.username) data.username = args.username
  if (args && args.password) data.password = args.password
  return fetch({
    url,
    method: 'post',
    data
  })
}

export function getUserInfo(args) {
  const url = api + apiMap.getUserInfo
  return fetch({
    url,
    method: 'post'
  })
}

export function getStudentInfoByParams(args) {
  const url = api + apiMap.getStudentInfoByParams
  const data = {}
  if (args && args.params) data.params = args.params
  if (args && args.page) data.page = args.page
  if (args && args.pageSize) data.pageSize = args.pageSize
  return fetch({
    url,
    method: 'post',
    data
  })
}

export function getTreatInfoByParams(args) {
  const url = api + apiMap.getTreatInfoByParams
  const data = {}
  if (args && args.params) data.params = args.params
  if (args && args.page) data.page = args.page
  if (args && args.pageSize) data.pageSize = args.pageSize
  return fetch({
    url,
    method: 'post',
    data
  })
}

export function resetPassword(args) {
  const url = api + apiMap.resetPassword
  const data = {}
  if (args && args.username) data.username = args.username
  if (args && args.password) data.password = args.password
  return fetch({
    url,
    method: 'post',
    data
  })
}

export function changeStudentInfo(data) {
  console.log(data)
  const url = api + apiMap.changeStudentInfo
  return fetch({
    url,
    method: 'post',
    data
  })
}
