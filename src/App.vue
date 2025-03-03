<script setup lang="ts">
import { useRoute } from 'vue-router'
// components
import SignIn from '@/components/SignIn/index.vue'
const route = useRoute()
</script>

<template>
  <el-config-provider>
    <div class="content">
      <sign-in />
      <h3 class="title">Welcome to Tauri + Vue {{ route.meta?.title }}</h3>
      <router-view></router-view>
    </div>
  </el-config-provider>
</template>
