<script setup lang="ts">
import { useRoute } from 'vue-router'
// components
import SignIn from '@/components/SignIn/index.vue'
const route = useRoute()
import CustomTitlebar from "@/components/Titlebar/index.vue";
</script>

<template>
  <el-config-provider>
    <custom-titlebar></custom-titlebar>
    <div class="content">
      <sign-in />
      <h3 class="title">Welcome to Tauri + Vue {{ route.meta?.title }}</h3>
      <router-view></router-view>
    </div>
  </el-config-provider>
</template>
