import store from '@/store'
import { diffTokenTime } from '@/utils/auth'
import axios from 'axios'
import { ElMessage } from 'element-plus'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
// 为每一个接口添加上token信息,通过service这个url拿到信息，都执行下面这个方法
// service.interceptors.response.use(
//   (config) => {
//     config.headers.Authorization = localStorage.getItem('token')
//     return config
//   },
//   (error) => {
//     return Promise.reject(new Error(error))
//   }
// )
// 使用axios的相应请求拦截器
service.interceptors.response.use(
  (response) => {
    console.log(response)
    // 从response中返回data和meta，解构出来,elmessage该怎么用？
    const { data, meta } = response.data
    if (meta.status === 200 || meta.status === 201) {
      return data
    } else {
      ElMessage.error(meta.msg)
      return Promise.reject(new Error(meta.msg))
    } // 以上是由请求相应的情况，也可能连请求相应也没有
  },
  (error) => {
    error.response && ElMessage.error(error.response.data)
    return Promise.reject(new Error(error.response.data))
  }
)
service.interceptors.request.use(
  (config) => {
    if (localStorage.getItem('token')) {
      if (diffTokenTime()) {
        store.dispatch('app/logout')
        return Promise.reject(new Error('token 失效了'))
      }
    }
    config.headers.Authorization = localStorage.getItem('token')
    return config
  },
  (error) => {
    return Promise.reject(new Error(error))
  }
)
export default service
