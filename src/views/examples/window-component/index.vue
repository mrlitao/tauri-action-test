<script setup lang="ts">
import { ref } from "vue";

const message = ref("这是一个新的窗口组件");
const count = ref(0);

</script>

<template>
  <div class="window-component">
    <h2>打开一个新窗口，我是一个vue组件</h2>
    <h2>{{ message }}{{ count }}</h2>
    <el-button type="primary" @click="count++">
      点击我
    </el-button>
    <el-table />
  </div>
</template>

<style scoped>
.window-component {
  padding: 20px;
  text-align: center;
  color: #000;
}
</style>