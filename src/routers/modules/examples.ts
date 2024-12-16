export default [
  {
    path: '/create-window',
    name: 'CreateWindow',
    component: () => import('@/views/examples/create-window/index.vue'),
    meta: {
      title: 'tauri 创建窗口',
    }
  },
  {
    path: '/tauri-http',
    name: 'TauriHttp',
    component: () => import('@/views/examples/tauri-http/index.vue'),
    meta: {
      title: 'tauri http',
    }
  }
]