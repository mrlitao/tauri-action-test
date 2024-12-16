// 按需引入element-plus（该方法稳定且明确。当然也支持：https://element-plus.org/zh-CN/guide/quickstart.html#%E6%8C%89%E9%9C%80%E5%AF%BC%E5%85%A5）
import type { App, Component } from 'vue'
import {
  ElHeader,
  ElMain,
  ElAside,
  ElMenu,
  ElContainer,
  ElFooter,
  ElTable,
  ElTableColumn,
  ElPagination,

  ElForm,
  ElFormItem,
  ElInput,

  ElButton,
  ElButtonGroup,

  ElTabs,
  ElTabPane,

  ElMessage,
  ElMessageBox,
} from 'element-plus'
const components = [
  ElHeader,
  ElMain,
  ElAside,
  ElMenu,
  ElContainer,
  ElFooter,
  ElTable,
  ElTableColumn,
  ElPagination,

  ElForm,
  ElFormItem,
  ElInput,

  ElButton,
  ElButtonGroup,

  ElTabs,
  ElTabPane,
]

const plugins = [
  ElMessage,
  ElMessageBox
]

/** 按需引入`element-plus` */
export default (app: App)=> {
  // 全局注册组件
  components.forEach((component: Component) => (app.component(component.name as string, component)))
  // 全局注册插件
  plugins.forEach(plugin => (app.use(plugin)))
  // app.config.globalProperties.$message = ElMessage
}
