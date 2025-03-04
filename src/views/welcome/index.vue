<script setup lang="ts">
import { loginState, logout } from "@/srores/user.hook";
import { computed } from "vue";

const viewState = computed(() => JSON.parse(JSON.stringify(loginState.value, null, 2)));
console.log({ loginState, viewState });
</script>
<template>
  <div class="welcome">
    <div class="px-8">
      <div v-for="(value, k) in loginState" :key="k" class="flex gap-4">
        <span class="w-[100px]">{{ k }}：</span>
        <span class="font-bold w-[400px]">{{ value }}</span>
      </div>
    </div>
    <div class="w-full text-center">
      <el-tooltip content="退出登录后，将清除 token 等，并激活登录窗口">
        <el-button type="danger" link @click="logout">
          退出登录
        </el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<style lang="">
</style>