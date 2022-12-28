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

export const getFansNum = (data) => {
  return request({
    url: '/user/selectOneConcernNum',
    method: 'post',
    data
  })
}

export const getConcernNum = (data) => {
  return request({
    url: '/user/selectOneConcernedNum',
    method: 'post',
    data
  })
}

export const getFansList = (data) => {
  return request({
    url: '/user/showFanList',
    method: 'post',
    data
  })
}

export const getConcernerList = (data) => {
  return request({
    url: '/user/showConcernList',
    method: 'post',
    data
  })
}

export const getOriginPics = (data) => {
  return request({
    url: '/main/selectPeopleAndItsPicture',
    method: 'post',
    data
  })
}

export const getAllOriginPics = (data) => {
  return request({
    url: '/main/selectPeopleConcernPicture',
    method: 'post',
    data
  })
}

export const getUsernameById = (data) => {
  return request({
    url: '/main/selectPeopleById',
    method: 'post',
    data
  })
}

export const getSearchPicture = (data) => {
  return request({
    url: '/main/selectPictureByNameVague',
    method: 'post',
    data
  })
}

export const getSearchMyPicture = (data) => {
  return request({
    url: '/main/selectMyPictureByNameVague',
    method: 'post',
    data
  })
}

export const getOriginPicsTime = () => {
  return request({
    url: '/main/selectPictureByTime',
    method: 'post'
  })
}

export const getSearchTagsPicture = (data) => {
  return request({
    url: '/main/selectPictureByTag',
    method: 'post',
    data
  })
}

export const getSearchUsersPicture = (data) => {
  return request({
    url: '/main/selectConcernPeopleAndItsPicture',
    method: 'post',
    data
  })
}

export const getOtherUserInfo = (data) => {
  return request({
    url: '/main/userQueryOtherUser',
    method: 'post',
    data
  })
}

export const concernOne = (data) => {
  return request({
    url: '/user/concernOnePeople',
    method: 'post',
    data
  })
}

export const UnconcernOne = (data) => {
  return request({
    url: '/user/cancelConcern',
    method: 'post',
    data
  })
}

export const updateHeadphoto = (data) => {
  return request({
    url: '/user/updateHeadPhoto',
    method: 'post',
    data
  })
}
