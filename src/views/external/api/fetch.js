import axios from 'axios'

const server = axios.create({
  timeout: 30000
})

server.interceptors.request.use(
  config => {
    if (localStorage.getItem('siseToken')) {
      config.headers.authorization = localStorage.getItem('siseToken')
    }
    return config
  }
)

export default server
