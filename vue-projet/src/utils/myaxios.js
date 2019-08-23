// 引入axios
import axios from 'axios'
// 设置基准路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 添加请求拦截器
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 获取token
  let token = localStorage.getItem('logincookie')
  // 在发送请求设置请求头
  config.headers.Authorization = token
  console.log(config)
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 添加登录验证方法
export default axios
