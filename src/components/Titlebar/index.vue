<template>
  <transition name="fate-slider-y-30">
    <div v-show="show" class="titleBar" data-tauri-drag-region>
      <component
        v-for="(item, i) in titleBars"
        :key="i"
        :is="item.icon"
        class="title-bar-svg"
        @click="item.event"
      />
    </div>
  </transition>
</template>
<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from "vue";
import { Window } from '@tauri-apps/api/window';
import { useMouse } from '@vueuse/core'

import TitleBarMinimize from "./svg/titlebar-minimize.svg"
import TitleBarFullscreen from "./svg/titlebar-fullscreen.svg"
import TitleBarFullscreenActive from "./svg/titlebar-fullscreen-active.svg"
import TitleBarClose from "./svg/titlebar-close.svg"

const appWindow = new Window('main');
const localIsFullscreen = ref(false);
const show = ref(false);
console.log({ appWindow });

const { y, sourceType } = useMouse({ touch: false })
const watchY = watch(y, () => {
  if (sourceType.value === 'mouse') {
    show.value = y.value < 24;
  }
})

const TITLE_BAR_MINIMIZE = {
  icon: TitleBarMinimize,
  title: "最小化",
  event() {
    appWindow.minimize();
  }
}
const TITLE_BAR_FULLSCREEN = {
  icon: TitleBarFullscreenActive,
  title: "全屏",
  event: async () => {
    const isFullscreen = await appWindow.isFullscreen();
    localIsFullscreen.value = !isFullscreen;
    console.log({
      isFullscreen,
      aaa: localIsFullscreen.value
    });
    await appWindow.setFullscreen(localIsFullscreen.value);
  }
}
const TITLE_BAR_CLOSE = {
  icon: TitleBarClose,
  title: "关闭",
  event() {
    appWindow.close();
  }
}

const titleBars = computed(() => {
  if (localIsFullscreen.value) {
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    TITLE_BAR_FULLSCREEN.icon = TitleBarFullscreenActive;
  } else {
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    TITLE_BAR_FULLSCREEN.icon = TitleBarFullscreen;
  }
  return [TITLE_BAR_MINIMIZE, TITLE_BAR_FULLSCREEN, TITLE_BAR_CLOSE]
})
// TODO 弹窗出现时，titleBar 被遮住
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

.title-bar {
  --title-bar-height: 24px;
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
  line-height: var(--title-bar-height);
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

      .title-bar-svg {
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