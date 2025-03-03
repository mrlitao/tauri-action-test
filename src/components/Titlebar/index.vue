<template>
  <transition name="fate-slider-y-30">
    <div v-show="show" class="titlebar" data-tauri-drag-region>
      <component v-for="(item, i) in titlebars" :key="i" :is="item.icon" class="titlebar-svg" @click="item.event" />
    </div>
  </transition>
</template>
<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from "vue";
import { Window } from '@tauri-apps/api/window';
import { useMouse } from '@vueuse/core'

import TitlebarMinimize from "./svg/titlebar-minimize.svg"
import TitlebarFullscreen from "./svg/titlebar-fullscreen.svg"
import TitlebarFullscreenActive from "./svg/titlebar-fullscreen-active.svg"
import TitlebarClose from "./svg/titlebar-close.svg"


const appWindow = new Window('main');
const localIsFullscreen = ref(false);
const show = ref(false);
console.log({ appWindow });

const { x, y, sourceType } = useMouse({ touch: false })
const watchY = watch(y, () => {
  if (sourceType.value === 'mouse') {
    if (y.value < 24) {
      show.value = true;
    } else {
      show.value = false;
    }
  }
})

const TITLEBAR_MINIMIZE = {
  icon: TitlebarMinimize,
  title: "最小化",
  event() {
    appWindow.minimize();
  }
}
const TITLEBAR_FULLSCREEN = {
  icon: TitlebarFullscreenActive,
  title: "全屏",
  event: async () => {
    const isFullscreen = await appWindow.isFullscreen();
    localIsFullscreen.value = !isFullscreen;
    console.log({
      isFullscreen,
      aaa: localIsFullscreen.value
    });
    appWindow.setFullscreen(localIsFullscreen.value);
  }
}
const TITLEBAR_CLOSE = {
  icon: TitlebarClose,
  title: "关闭",
  event() {
    appWindow.close();
  }
}

const titlebars = computed(() => {
  if (localIsFullscreen.value) {
    TITLEBAR_FULLSCREEN.icon = TitlebarFullscreenActive;
  } else {
    TITLEBAR_FULLSCREEN.icon = TitlebarFullscreen;
  }
  return [TITLEBAR_MINIMIZE, TITLEBAR_FULLSCREEN, TITLEBAR_CLOSE]
})
// TODO 弹窗出现时，titlebar 被遮住
onBeforeUnmount(watchY)
</script>
<style lang="scss">
.fate-slider-y-30-enter-active,
.fate-slider-y-30-leave-active {
  transition: transform 0.38s ease, opacity 0.2s ease;
}

.fate-slider-y-30-enter-from,
.fate-slider-y-30-leave-to {
  opacity: 0;
  transform: translateY(-24px);
}

.titlebar {
  --titlebar-height: 24px;
  box-sizing: border-box;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  width: 100%;
  padding: 2px 8px;
  border-top-left-radius: var(--normal-radius);
  border-top-right-radius: var(--normal-radius);
  line-height: var(--titlebar-height);
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 8px;
  // -webkit-transform: translateY(24px);
  // transform: translateY(-24px);
  // transition: transform 0.2s ease-in-out;

  &[data-tauri-drag-region] {
    &:hover {
      background-color: #66666699;
      cursor: grab;
    }

    &:active {
      background-color: #7f00f7;
      cursor: grabbing;

      .titlebar-svg {
        color: #FFFFFF;

      }
    }
  }

  &-svg {
    width: 24px;
    cursor: pointer;

    &:hover {
      color: #cccccc;
    }

    &:active {
      color: #2df700;
    }

    &:nth-child(2) {
      width: 18px;
    }
  }

  &+div {
    padding-top: calc(24px + 4px);
  }
}
</style>