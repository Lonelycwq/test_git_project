// 引入封装的axios
import axios from '@/utils/myaxios.js'
// 登录请求方法
export const login = (data) => {
  // 返回请求
  return axios({
    url: 'login',
    method: 'post',
    data
  })
}
