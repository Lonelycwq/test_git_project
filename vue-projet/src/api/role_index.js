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
// 新增角色方法
export const addRole = (data) => {
  // 返回请求
  return axios({
    url: 'roles',
    method: 'post',
    data
  })
}
// 删除角色指定权限方法
export const delRightByRid = (roleId, rightId) => {
  // 返回请求
  return axios({
    url: `roles/${roleId}/rights/${rightId}`,
    method: 'delete'
  })
}
// 删除角色方法
export const delRoleById = (id) => {
  return axios({
    url: `roles/${id}`,
    method: 'delete'
  })
}
// 修改角色方法
export const editRoleById = (data) => {
  return axios({
    url: `roles/${data.id}`,
    method: 'put',
    data
  })
}
// 修改角色方法
export const allotRoleById = (roleId, rids) => {
  return axios({
    url: `roles/${roleId}/rights`,
    method: 'post',
    data: {
      rids
    }
  })
}
