import request from './request'
export const addPictureInfor = (data) => {
  return request({
    url: '/main/addPictureInfor',
    method: 'post',
    data
  })
}
