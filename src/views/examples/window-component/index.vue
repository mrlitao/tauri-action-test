<script setup lang="ts">
import { ref } from 'vue'
import { ElButton } from "element-plus"
const message = ref('这是一个新的窗口组件')
const count = ref(0)

</script>

<template>
  <div class="window-component">
    <h2>{{ message }}{{ count }}</h2>
    <el-button type="primary" @click="count++">
      点击我
    </el-button>
  </div>
</template>

<style scoped>
@import "element-plus/theme-chalk/el-button.css";
.window-component {
  padding: 20px;
  text-align: center;
  color: #000;
}
</style>