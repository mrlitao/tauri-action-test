<script setup lang="ts">
import { reactive, ref } from "vue";
import tauriHttp from '@/utils/http/tauri-http.ts';
// import { fetch } from '@tauri-apps/plugin-http';

const greetMsg = ref("");
const greetError = ref("");
const formObject = reactive({
  name: 'admin',
  password: '123456'
})

const loginHandle = () => {
  const params = { username: formObject.name, password: formObject.password }
  // 登录逻辑
  tauriHttp.post('http://192.168.11.18:8092/login', params)
    .then((response: any) => {
      console.log({ response });
      greetMsg.value = response;
    }).catch((err: Error) => {
      console.log({ err });
      greetError.value = err.message;
    })
}
</script>

<template>
  <div>
    <el-form class="row" :model="formObject" label-width="100">
      <el-form-item label="用户名">
        <el-input id="greet-input" v-model="formObject.name" placeholder="Enter a name..." />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formObject.password" placeholder="Enter a name..." />
      </el-form-item>
      <el-button type="primary" @click="loginHandle">
        登录试试
      </el-button>
    </el-form>
    <p>response: {{ greetMsg }}</p>
    <p>error：{{ greetError }}</p>
  </div>
</template>
<style lang="">
</style>