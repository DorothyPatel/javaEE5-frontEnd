import { login as loginAPI } from '@/api/login'
import router from '@/router'
import { setTokenTime } from '@/utils/auth'
import { ElLoading, ElMessage } from 'element-plus'
export default {
  // 开启命名空间
  namespaced: true,
  state: () => ({
    // 设置静态变量
    token: localStorage.getItem('token') || ''
  }),
  mutations: {
    // 提交更新数据的方法
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    }
  },
  actions: {
    login: function ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginAPI(userInfo)
          .then((res) => {
            const loading = ElLoading.service({
              lock: true,
              text: 'Loading',
              background: 'rgba(0,0,0,0.7)'
            })
            setTimeout(() => {
              loading.close()
              ElMessage.success('登录成功')
              // 成功之后跳转到我们的主页
              router.replace('/')
            })
            commit('setToken', res.token)
            // 执行setTokenTime方法，设置token的登录时间
            setTokenTime()
            resolve()
          })
          .catch((err) => {
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
