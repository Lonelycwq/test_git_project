// 引入封装的axios
import axios from '@/utils/myaxios.js'
// 获取所有商品分类列表方法
export const getAllCatesList = (type) => {
  // 返回请求
  return axios({
    url: 'categories',
    method: 'get',
    params: {
      type
    }
  })
}
