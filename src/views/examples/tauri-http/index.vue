<script setup lang="ts" name="tauri-http">
import { defineAsyncComponent } from 'vue';
// import { fetch } from '@tauri-apps/plugin-http';

const TABS = [
  { laebl: 'tauri-http-GET',  name: 'tauri-http-GET', is: defineAsyncComponent(() => import('./pages/tauri-http-GET.vue')) },
  { laebl: 'tauri-http-POST',  name: 'tauri-http-POST', is: defineAsyncComponent(() => import('./pages/tauri-http-POST.vue')) }
]
const active = TABS[0].name

</script>
<template>
  <div class="p-2">
    <el-tabs v-model="active">
      <el-tab-pane
        v-for="item in TABS"
        :key="item.name"
        :name="item.name"
        :label="item.laebl"
      >
        <component :is="item.is" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="">
</style>