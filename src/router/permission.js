// 路由守卫，控制页面跳转权限的，比如，登陆了之后才能访问主页
import router from './index'
import store from '@/store'
const whiteList = ['/login', '/register']
router.beforeEach((to, from, next) => {
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
