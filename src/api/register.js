import request from './request'
export const register = (data) => {
  return request({
    url: '/register/userRegister',
    method: 'post',
    data
  })
}

export const checkUserName = (data) => {
  return request({
    url: '/register/checkUsername',
    method: 'post',
    data
  })
}

export const checkPassword = (data) => {
  return request({
    url: '/register/checkPassword',
    method: 'post',
    data
  })
}
