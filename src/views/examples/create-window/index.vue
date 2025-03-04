<script setup lang="ts">
// hooks
import { useRouter } from "vue-router"
import createTauriWindow from '@/hooks/useTauriCreateWindow/index'

const router = useRouter()
const createComponentWindow = async () => {
  const win = await createTauriWindow({
    label: 'vue-component-window',
    title: 'Vue Component Window',
    url: '/window-component-html.html',
    x: 100,
    y: 100,
    width: 800,
    height: 600,
    decorations: true,
    // center: true,
    // visible: true
  })

  console.log({ win });

}

const createComponentWindow2 = async () => {
  const win = await createTauriWindow({
    label: 'vue-component-other-window',
    title: 'Vue Component Other Window',
    url: '/new-windows/window-component-html.html',
    x: 100,
    y: 100,
    width: 800,
    height: 600,
    decorations: true,
    // center: true,
    // visible: true
  })
  console.log({ win });
}

/**
 * 创建新窗口
 * url 可以直接设置 path，前提是需要注册路由，又因为如果是 hash 模式，需要有 # 符号，所以需要手动添加，
 * 但是如果是 history 模式，将会打开一个新窗口，新窗口展示的内容为路由指向的组件文件
 */
const createComponentWindow3 = async () => {
  console.log({ location });
  // const { href, origin, pathname } = location
  const resolve = router.resolve({
    path: "/tauri-component-window",
  })
  console.log({ resolve });
  const win = await createTauriWindow({
    label: '/tauri-component-window',
    title: '/tauri-component-window',
    // url: location.origin + '/tauri-component-window',
    url: resolve.href,
    // url: "/tauri-component-window",
    x: 100,
    y: 100,
    width: 800,
    height: 600,
    decorations: true,
    // center: true,
    // visible: true
  })
  console.log({ win });
}

const works = [
  { label: "创建 Vue 组件窗口，html 文件在顶级目录下", tooltip: "", event: createComponentWindow },
  { label: "创建 Vue 组件窗口，html 文件其他路径", tooltip: "", event: createComponentWindow2 },
  { label: "创建 Vue 组件窗口，直接设置 path", tooltip: "", event: createComponentWindow3 },
]

</script>
<template>
  <div class="flex flex-wrap gap-4">
    <el-button
      v-for="(work, index) in works"
      :key="index"
      type="primary"
      class="m-12"
      @click="work.event"
    >
      {{ work.label }}
    </el-button>
  </div>
</template>

<style lang="">
</style>