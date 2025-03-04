<script setup lang="ts">
  import { computed } from "vue";

  const aaa = computed(() => location)
</script>

<template>
  <div class="font-bold text-3xl">
    404
    <div>
      {{ aaa }}
    </div>
  </div>
</template>

<style scoped>

</style>