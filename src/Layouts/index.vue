<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from 'vue-router'

const router = useRouter()
const paths = computed(() => {
  const routes = router.options.routes || [] // router.getRoutes()
  const layoutChildren = routes.find(item => item?.path?.startsWith('/admin'))?.children || []
  return layoutChildren
})

</script>
<template>
  <div class="layout">
    <div>
      <span v-for="item in paths" :key="item.path">
        <router-link style="margin: .5em 1em;" :to="item.path">{{ item.meta?.title }}</router-link>
        <span v-if="item.children">
          <span v-for="child in item.children" :key="child.path">
            <router-link style="margin:.5em 1em;" :to="child.path">{{ child.meta?.title }}</router-link>
          </span>
        </span>
      </span>
    </div>
    <div style="min-height: 0; flex: 1;">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component"></component>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
}

/* 下面我们会解释这些 class 是做什么的 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>