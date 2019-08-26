// 引入封装的axios
import axios from '@/utils/myaxios.js'
// 获取所有用户数据方法
export const getAllUsers = (params) => {
  // 返回请求
  return axios({
    url: 'users',
    method: 'get',
    params
  })
}
// 新增用户方法
export const getAddUsers = (data) => {
  // 返回请求
  return axios({
    url: 'users',
    method: 'post',
    data
  })
}
// restful 接口编程
// 登录新增用户方法
export const editUsers = (data) => {
  // 返回请求
  return axios({
    url: `users/${data.id}`,
    method: 'put',
    data
  })
}
// 改变用户状态方法
export const userState = (uid, type) => {
  // 返回请求
  return axios({
    url: `users/${uid}/state/${type}`,
    method: 'put'
  })
}
// 根据id删除用户方法
export const delUserById = (id) => {
  // 返回请求
  return axios({
    url: `users/${id}`,
    method: 'delete'
  })
}
// 分配角色方法
export const editRole = (data) => {
  // 返回请求
  return axios({
    url: `users/${data.id}/role`,
    method: 'put',
    data
  })
}
