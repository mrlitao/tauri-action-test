import Welcome from '@/views/welcome/index.vue'
// import Login from '@/views/login/index.vue'

export default [
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: Login,
  //   meta: { title: '登录', hideInMenu: true }
  // },
  {
    path: '/welcome',
    component: Welcome,
    meta: {
      title: '首页',
    }
  },
]