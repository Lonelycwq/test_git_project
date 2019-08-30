// 引入封装的axios
import axios from '@/utils/myaxios.js'
// 获取所有商品列表方法
export const getAllGoodsList = (params) => {
  // 返回请求
  return axios({
    url: 'goods',
    method: 'get',
    params
  })
}
