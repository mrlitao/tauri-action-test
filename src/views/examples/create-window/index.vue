<script setup lang="ts">
import createTauriWindow from '@/hooks/useTauriCreateWindow/index'
const createComponentWindow = async () => {
  const win = await createTauriWindow({
    label: 'vue-component-window',
    title: 'Vue Component Window',
    url: '/window-component.html',
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
    url: '/new-windows/window-component.html',
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

</script>
<template>
  <div class="flex gap-4">
    <el-button type="primary" class="m-12" @click="createComponentWindow">
      创建 Vue 组件窗口，html 文件在顶级目录下
    </el-button>
    <el-button type="primary" class="m-12" @click="createComponentWindow2">
      创建 Vue 组件窗口，html 文件其他路径
    </el-button>
  </div>
</template>

<style lang="">
</style>