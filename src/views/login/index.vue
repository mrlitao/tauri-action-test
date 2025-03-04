<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

const greetMsg = ref("");
const greetError = ref("");
const name = ref("admin");
const password = ref("123456");

const loginHandle = async (params: any) => {
  console.log({ params });
  
  // 登录逻辑
  axios.post('/dev/login', { username: name.value, password: password.value })
    .then(response => {
      greetMsg.value = response.data;
      console.log({response});
    }).catch(err => {
      console.log({err});
      greetError.value = err.response.data;
    })
}
</script>

<template>
  <div>
    <form class="row" @submit.prevent="loginHandle">
      <input id="greet-input" v-model="name" placeholder="Enter a name...">
      <input v-model="password" placeholder="Enter a name...">
      <button type="submit">
        Greet
      </button>
    </form>
    <p>response: {{ greetMsg }}</p>
    <p>error：{{ greetError }}</p>
  </div>
</template>
<style lang="">
</style>