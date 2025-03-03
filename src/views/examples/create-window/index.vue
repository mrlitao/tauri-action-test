<script setup lang="ts">
import createTauriWindow from '@/hooks/useTauriCreateWindow/index'
import { WebviewWindow } from '@tauri-apps/api/webviewWindow'

import { Window } from "@tauri-apps/api/window"
import { Webview } from "@tauri-apps/api/webview"
const createWebview = async () => {
  const appWindow = new Window('uniqueLabel');
  console.log({ appWindow });
  
  // // loading embedded asset:
  // const webview = new Webview(appWindow, 'theUniqueLabel', {
  //   url: 'path/to/page.html'
  // });
  // alternatively, load a remote URL:
  const webview = new Webview(appWindow, 'theUniqueLabel', {
    url: 'http://localhost:1420/#/welcome',
    // url: 'https://github.com/tauri-apps/tauri',
    // url: 'http://192.168.11.18:8022/welcome',
    devtools: true,
    width: 200,
    height: 200,
    x: 100,
    y: 100
  });

  webview.once('tauri://created', function () {
    // webview successfully created

  }).then();
  webview.once('tauri://error', function (e) {
    // an error happened creating the webview
    console.log('webview error', e);
    
  }).then();

  // emit an event to the backend
  await webview.emit("some-event", "data");
  // listen to an event from the backend
  const unListen = await webview.listen("event-name", () => { });
  unListen();
}

const createWebviewWindow = async () => {
  const win = await createTauriWindow({
    label: 'my-label',
    title: 'Title',
    // url: 'https://github.com/tauri-apps/tauri',
    url: '/tauri-window.html',
    width: 600,
    height: 600,
    x: 200,
    y: 100
  })
  if (!win) return
  console.log({
    win,
    isVisible: win.isVisible(),
    isEnabled: win.isEnabled(),
    innerSize: win.innerSize(),
    isClosable: win.isClosable(),
  });

}

const activeConfigWindow = () => {
  //这个appWindow.hide();是实现登录之后隐藏（关闭）登录界面，然后再显示新打开的test界面
  //appWindow.hide();
  const testWindow = WebviewWindow.getByLabel("doc");//这里就是获取label
  console.log({ testWindow });
  // testWindow.show();
}
</script>
<template>
  <div>
    <button @click="createWebviewWindow">
      创建 WebviewWindow 窗口
    </button>
    <button @click="createWebview">
      创建 Webview 窗口
    </button>
    <button @click="activeConfigWindow">
      config 配置的窗口
    </button>
  </div>
</template>

<style lang="">
</style>