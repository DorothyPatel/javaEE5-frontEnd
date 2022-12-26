import { login as loginAPI } from '@/api/login'
import { register as registerAPI } from '@/api/register'
import { addPictureInfor as pictureAPI } from '@/api/picture'
import { changePassword, changeInfor } from '@/api/users'
import router from '@/router'
import { setTokenTime } from '@/utils/auth'
import { ElLoading, ElMessage } from 'element-plus'
export default {
  // 开启命名空间
  namespaced: true,
  state: () => ({
    // 设置静态变量
    token: localStorage.getItem('token') || '',
    // siderBar的状态，初始为true值
    siderType: true,
    lang: localStorage.getItem('lang') || 'zh',
    username: localStorage.getItem('username') || '',
    password: localStorage.getItem('password') || '',
    name: localStorage.getItem('name') || '',
    introduction: localStorage.getItem('introduction') || '',
    gender: localStorage.getItem('gender') || '',
    province: localStorage.getItem('province') || '',
    city: localStorage.getItem('city') || '',
    email: localStorage.getItem('email') || '',
    mobile: localStorage.getItem('mobile') || '',
    qq: localStorage.getItem('qq') || ''
  }),
  mutations: {
    // 提交更新数据的方法
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    changeSiderType(state) {
      state.siderType = !state.siderType
    },
    changeLang(state, lang) {
      state.lang = lang
    },
    setUsername(state, username) {
      state.username = username
      localStorage.setItem('username', username)
    },
    setPassword(state, password) {
      state.password = password
      localStorage.setItem('password', password)
    },
    setName(state, name) {
      state.name = name
      localStorage.setItem('name', name)
    },
    setIntroduction(state, introduction) {
      state.introduction = introduction
      localStorage.setItem('introduction', introduction)
    },
    setGender(state, gender) {
      state.gender = gender
      localStorage.setItem('gender', gender)
    },
    setProvince(state, province) {
      state.province = province
      localStorage.setItem('province', province)
    },
    setQq(state, qq) {
      state.qq = qq
      localStorage.setItem('qq', qq)
    },
    setMobile(state, mobile) {
      state.password = mobile
      localStorage.setItem('mobile', mobile)
    },
    setCity(state, city) {
      state.city = city
      localStorage.setItem('city', city)
    },
    setEmail(state, email) {
      state.email = email
      localStorage.setItem('email', email)
    }
  },
  actions: {
    login: function ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        console.log(userInfo)
        loginAPI(userInfo)
          .then((res) => {
            const loading = ElLoading.service({
              lock: true,
              text: 'Loading',
              background: 'rgba(0,0,0,0.7)'
            })
            setTimeout(() => {
              loading.close()
              if (res.success === true) {
                ElMessage.success('登录成功')
                // 成功之后跳转到我们的主页
                router.replace('/')
                commit('setToken', res.token)
                // 执行setTokenTime方法，设置token的登录时间
                console.log(res)
                commit('setUsername', res.data.username)
                commit('setPassword', res.data.password)
                commit('setGender', res.data.gender)
                commit('setProvince', res.data.province)
                commit('setCity', res.data.city)
                commit('setName', res.data.name)
                commit('setIntroduction', res.data.introduction)
                commit('setMobile', res.data.mobile)
                commit('setQq', res.data.qq)
                commit('setEmail', res.data.email)
                setTokenTime()
              } else {
                ElMessage.error('您的用户名或者密码不正确')
              }
            })

            resolve()
          })
          .catch((err) => {
            console.log(userInfo)
            reject(err)
          })
      })
    },
    register: function ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        console.log(userInfo)
        registerAPI(userInfo)
          .then((res) => {
            const loading = ElLoading.service({
              lock: true,
              text: 'Loading',
              background: 'rgba(0,0,0,0.7)'
            })
            setTimeout(() => {
              loading.close()
              ElMessage.success('注册成功')
              // 成功之后跳转到我们的登录页面
              router.replace('/login')
            })
            resolve()
          })
          .catch((err) => {
            console.log(userInfo)
            reject(err)
          })
      })
    },
    addPictureInfor: function ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        console.log(userInfo)
        pictureAPI(userInfo)
          .then((res) => {
            const loading = ElLoading.service({
              lock: true,
              text: 'Loading',
              background: 'rgba(0,0,0,0.7)'
            })
            setTimeout(() => {
              loading.close()
              if (res.success === true) ElMessage.success('上传成功')
              else ElMessage.error('上传失败')
            })
            resolve()
          })
          .catch((err) => {
            console.log(userInfo)
            reject(err)
          })
      })
    },
    changePassword: function ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        console.log(userInfo)
        changePassword(userInfo)
          .then((res) => {
            const loading = ElLoading.service({
              lock: true,
              text: 'Loading',
              background: 'rgba(0,0,0,0.7)'
            })
            setTimeout(() => {
              loading.close()
              if (res.success === true) {
                ElMessage.success('修改成功')
                localStorage.setItem('password', userInfo.password)
              } else ElMessage.error('修改失败')
            })
            resolve()
          })
          .catch((err) => {
            console.log(userInfo)
            reject(err)
          })
      })
    },
    changeInformation: function ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        console.log(userInfo)
        changeInfor(userInfo)
          .then((res) => {
            const loading = ElLoading.service({
              lock: true,
              text: 'Loading',
              background: 'rgba(0,0,0,0.7)'
            })
            setTimeout(() => {
              loading.close()
              if (res.success === true) {
                ElMessage.success('修改成功')
                commit('setUsername', res.data.username)
                commit('setPassword', res.data.password)
                commit('setGender', res.data.gender)
                commit('setProvince', res.data.province)
                commit('setCity', res.data.city)
                commit('setName', res.data.name)
                commit('setIntroduction', res.data.introduction)
                commit('setMobile', res.data.mobile)
                commit('setQq', res.data.qq)
                commit('setEmail', res.data.email)
              } else ElMessage.error('修改失败')
            })
            resolve()
          })
          .catch((err) => {
            console.log(userInfo)
            reject(err)
          })
      })
    },
    logout({ commit }) {
      commit('setToken', '')
      localStorage.clear()
      router.replace('/login')
    }
  }
}
