// 按需引入element-plus（该方法稳定且明确。当然也支持：https://element-plus.org/zh-CN/guide/quickstart.html#%E6%8C%89%E9%9C%80%E5%AF%BC%E5%85%A5）
import type { App, Component } from 'vue'
import {
  ElConfigProvider,

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

  ElDialog
} from 'element-plus'
const components = [
  ElConfigProvider,

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

  ElDialog
]

/** ElDialog */
ElDialog.props.appendToBody = { type: Boolean, default: true }
ElDialog.props.closeOnClickModal = { type: Boolean, default: false }
ElDialog.props.alignCenter = { type: Boolean, default: true } // 默认水平垂直对齐对话框
ElDialog.props.draggable = { type: Boolean, default: true }
ElDialog.props.width = { type: [String, Number], default: '600px' }


const plugins = [
  ElMessage,
  ElMessageBox
]

/** 按需引入`element-plus` */
export default (app: App) => {
  // 全局注册组件
  components.forEach((component: Component) => (app.component(component.name as string, component)))
  // 全局注册插件
  plugins.forEach(plugin => (app.use(plugin)))
  // app.config.globalProperties.$message = ElMessage
}
