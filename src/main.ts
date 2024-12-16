import { createApp, type Component } from "vue";
import App from "./App.vue";
/** use vue-router */
import router from "./routers";
// UnoCss global-mode、iconify 需要
import 'virtual:uno.css'
import 'element-plus/dist/index.css'

import "@/styles/index.scss";
import useElementPlus from '@/plugins/element-plus'
function readyApp(rootTemplate: Component): Promise<App> {
  return new Promise((resolve, reject) => {
    try {
      const app = createApp(rootTemplate)
      app.use(router)
      app.use(useElementPlus)
      app.mount("#app")
      resolve(app)
    } catch (error) {
      reject(error)
    }
  })
}
readyApp(App).then((app) => {
  console.log({ app });
})
