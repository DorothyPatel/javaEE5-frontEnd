import request from './request'
export const getUser = (params) => {
  return request({
    url: '/users',
    params
  })
}
export const changeUserState = (uid, type) => {
  return request({
    url: `users/${uid}/state/:${type}`,
    method: 'put'
  })
}
export const addUser = (data) => {
  return request({
    url: 'users',
    method: 'post',
    data
  })
}

export const editUser = (data) => {
  return request({
    url: `users/${data.id}`,
    method: 'put',
    data
  })
}

export const deleteUser = (id) => {
  return request({
    url: `users/${id}`,
    method: 'delete'
  })
}

export const changePassword = (data) => {
  return request({
    url: '/user/updatePassword',
    method: 'post',
    data
  })
}

export const changeInfor = (data) => {
  return request({
    url: '/user/updateInfor',
    method: 'post',
    data
  })
}
