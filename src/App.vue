<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()

</script>

<template>
  <main class="container">
    <h3 class="title">Welcome to Tauri + Vue {{ route.meta?.title }}</h3>
    <div class="content">
      <router-view></router-view>
    </div>
  </main>
</template>

<style scoped lang="scss">
.container {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .title {
    margin: 0;
    height: 40px;
    width: 100%;
    text-align: center;
    line-height: 40px;
    font-weight: bold;
    font-size: 20px;
  }

  .content {
    min-height: 0;
    flex: 1;
  }
}
</style>
