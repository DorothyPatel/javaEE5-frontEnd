import request from './request'

export const login = (data) => {
  return request({
    url: '/login/user',
    method: 'post',
    data
  })
}
