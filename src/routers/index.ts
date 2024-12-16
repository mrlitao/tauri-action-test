import { createMemoryHistory, createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/Layouts/index.vue'
const adminChildrens: Record<string, any> = import.meta.glob(
  ['./modules/**/*.ts'],
  { eager: true }
)

const formatRoutes = (routes: Record<string, any>) => {
  console.log({ routes });
  return Object.keys(routes).map(key => {
    console.log({ routes, key });
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
    children: formatRoutes(adminChildrens)
  },
  {
    path: '/',
    redirect: '/admin',
  },
]

const router = createRouter({
  history: import.meta.env.DEV ? createWebHashHistory() : createMemoryHistory(),
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
  adminChildrens,
  useRouter
}

export default router