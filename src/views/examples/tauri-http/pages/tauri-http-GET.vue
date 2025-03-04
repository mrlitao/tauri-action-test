<script setup lang="ts" name="tauri-http-GET">
import { ref } from 'vue';

import tauriHttp from '@/utils/http/tauri-http.ts';
const httpResult = ref('')

// Send a GET request
const query = async () => {
  // fetch('https://mock.mengxuegu.com/mock/65b5c7f3d7f4776a06ddffd3/example/user', {
  //   method: 'GET',
  // }).then(async (response) => {
  //   const text = await response.json()
  //   // const text = await response.text()
  //   console.log({ 
  //     response, 
  //     text,
  //    }); // e.g. 200
  //    httpResult.value = text
  // }).catch((error) => {
  //   console.log({ error });

  // })

  tauriHttp.get('https://mock.mengxuegu.com/mock/65b5c7f3d7f4776a06ddffd3/example/user').then((res: any) => { 
    console.log({ res });
    httpResult.value = res
  })

}
</script>
<template>
  <div>
    <el-button type="primary" @click="query">
      查询
    </el-button>
    <p>
      {{ httpResult }}
    </p>
  </div>
</template>

<style lang="">
</style>