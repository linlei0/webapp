import axios from 'axios'

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 10 * 1000
})

service.defaults.headers['Content-Type'] = 'text/plain'
// 请求拦截
service.interceptors.request.use(
  config => {
   // console.log(config)
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  response => {
    // console.log(response)
    return response
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)
export default service
