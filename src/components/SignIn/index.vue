<script setup lang="ts" name="SignIn">
import { computed, reactive } from "vue";
import { User, Lock } from '@element-plus/icons-vue'
import { loginState, login } from '@/srores/user.hook'

import { logo, name } from '@/PlatformConfiguration/index.ts'


const PlatformConfigurationName = computed(() => name)
const formObject = reactive({
  name: 'admin',
  password: '123456'
})

const loginHandle = () => {
  const params = { username: formObject.name, password: formObject.password }
  // 登录逻辑
  login(params).then(() => {
  })
}
</script>
<template>
  <el-dialog
      v-model="loginState.notSignedIn"
      width="600px"
      :show-close="false"
      :close-on-click-modal="false"
      class="sign-in-dialog"
  >
    <template #header>
      <div class="flex flex-col items-center justify-center">
        <!--          <logo ></logo>-->
        <component :is="logo" viewBox="0 0 206 231" width="60" height="60"></component>
        <span class="mt-4 font-bold text-3xl">{{ PlatformConfigurationName }}</span>
      </div>
    </template>
    <div class="p-4 flex flex-col sign-in-content">
      <el-form class="px-[120px] box-border m-x-[auto] w-full always-full-y" :model="formObject" label-width="0">
        <el-form-item>
          <el-input
              id="greet-input"
              v-model="formObject.name"
              :prefix-icon="User"
              placeholder="Enter a name..."
          />
        </el-form-item>
        <el-form-item>
          <el-input
              v-model="formObject.password"
              :prefix-icon="Lock"
              placeholder="登录密码"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="m-x-[auto]" @click="loginHandle">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<style lang="scss">
.sign-in-dialog {

  // .el-dialog__body {}

  .sign-in-content {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
}

</style>