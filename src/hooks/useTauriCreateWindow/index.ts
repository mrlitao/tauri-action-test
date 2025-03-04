// import { getCurrentWindow } from '@tauri-apps/api/window'
import { WebviewWindow } from '@tauri-apps/api/webviewWindow'
// import { relaunch, exit } from '@tauri-apps/plugin-process'

// types
import type { WebviewOptions } from '@tauri-apps/api/webview'

// interface CustomWebviewOptions extends WebviewOptions {
//   label: string
//   maximized?: boolean
//   resizable?: boolean
//   title?: string,
//   url?: string
// }

type CustomWebviewOptions = {
  label: string
  maximized?: boolean
  resizable?: boolean
  title?: string
  decorations?: boolean
} & WebviewOptions

// const appWindow = getCurrentWindow()
// console.log({ appWindow });
// 创建窗口参数配置
export const windowConfig = {
  label: null,            // 窗口唯一label
  title: '',              // 窗口标题
  url: '',                // 路由地址url
  width: 1000,            // 窗口宽度
  height: 640,            // 窗口高度
  minWidth: null,         // 窗口最小宽度
  minHeight: null,        // 窗口最小高度
  x: null,                // 窗口相对于屏幕左侧坐标
  y: null,                // 窗口相对于屏幕顶端坐标
  center: true,           // 窗口居中显示
  resizable: true,        // 是否支持缩放
  maximized: false,       // 最大化窗口
  decorations: true,     // 窗口是否装饰边框及导航条
  alwaysOnTop: false,     // 置顶窗口
  dragDropEnabled: false, // 禁止系统拖放
  visible: false,         // 隐藏窗口
  // ...
}

// 获取窗口
const getWin = async (label: string) => {
  return await WebviewWindow.getByLabel(label)
}

const createTauriWindow = async (options: CustomWebviewOptions) => {
  // 是否主窗口
  if (options.label.indexOf('main') > -1) return await getWin('main')

  // 判断窗口是否存在
  const existWin = await getWin(options.label)
  if (existWin) {
    console.log('窗口已存在>>', existWin)
    await existWin.show()
    return existWin
  }

  options = Object.assign({}, windowConfig, options)
  // 创建窗口对象
  const win = new WebviewWindow(options.label, options)
  // 窗口创建完毕/失败
  await win.once('tauri://created', () => {
    console.log(options.label + 'tauri://created')
    win.show()
    // 是否最大化
    if (options.maximized && options.resizable) {
      console.log('is-maximized')
      win.maximize()
    }
  })

  await win.once('tauri://error', async (error) => {
    console.log('window create error!', error)
  })

  return win
}

export default createTauriWindow