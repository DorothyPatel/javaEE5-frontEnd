import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/register/index')
  },
  {
    path: '/',
    name: '/',
    component: () => import('../layout'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/index.vue')
      },
      {
        path: 'uploadPictures',
        name: 'uploadPictures',
        component: () => import('@/views/uploadPictures/index.vue')
      },
      {
        path: 'myhome',
        name: 'myhome',
        component: () => import('@/views/myhome/index.vue')
      },
      {
        path: 'otherhome',
        name: 'otherhome',
        component: () => import('@/views/otherhome/index.vue')
      },
      {
        path: 'update',
        name: 'update',
        component: () => import('@/views/update/index.vue')
      },
      {
        path: 'updateInfor',
        name: 'updateInfor',
        component: () => import('@/views/updateInfor/index.vue')
      },
      {
        path: 'updateHead',
        name: 'updateHead',
        component: () => import('@/views/updateHead/index.vue')
      },
      {
        path: 'users',
        name: 'users',
        component: () => import('@/views/users/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
