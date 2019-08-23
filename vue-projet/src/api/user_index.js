// 引入封装的axios
import axios from '@/utils/myaxios.js'
// 登录请求方法
export const getAllUsers = (params) => {
  // 返回请求
  return axios({
    url: 'users',
    method: 'get',
    params
  })
}
