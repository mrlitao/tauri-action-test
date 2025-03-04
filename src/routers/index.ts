import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from '@/Layouts/index.vue'
const adminChildren: Record<string, any> = import.meta.glob(
  ['./modules/**/*.ts'],
  { eager: true }
)

const formatRoutes = (routes: Record<string, any>) => {
  console.log({ routes });
  return Object.keys(routes).map(key => {
    const value = routes[key].default
    return Array.isArray(value) ? value.map(item => item) : value
  }).flat(2)
}

const routes: RouteRecordRaw[] = [
  
  {
    path: '/admin',
    name: 'Admin',
    component: Layout,
    redirect: '/welcome',
    meta: {
      title: '后台管理',
      icon: 'el-icon-s-home',
    },
    children: formatRoutes(adminChildren)
  },
  {
    path: '/',
    redirect: '/admin',
  },
  {
    path: "/tauri-component-window",
    component: () => import('@/views/examples/window-component/index.vue'),
    meta: {
      title: 'Tauri Window Component',
      icon: 'el-icon-s-home',
    },
  },
  {
    path: "/404",
    component: () => import('@/views/errors/404.vue'),
  },
  // {
  //   path: "/:pathMatch(.*)*",
  //   redirect: "/404",
  // }
]

const router = createRouter({
  history: import.meta.env.DEV ? createWebHashHistory() : createWebHistory(),
  // history: createWebHistory(),
  // routes: staticRoutes.concat(routes),
  routes,
})

router.beforeEach((_to, _form) => {
  console.log({ _form, _to })
})

const useRouter = (app: App) => {
  app.use(router)
}

export {
  adminChildren,
  useRouter
}

export default router