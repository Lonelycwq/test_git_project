// 引入封装的axios
import axios from '@/utils/myaxios.js'
// 获取所有角色数据方法
export const getRoleList = () => {
  // 返回请求
  return axios({
    url: 'roles',
    method: 'get'
  })
}
