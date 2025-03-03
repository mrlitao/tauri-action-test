import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// https://devtools-next.vuejs.org/
import VueDevTools from 'vite-plugin-vue-devtools'
/** 组件自动导入 */
/** 组件自动导入 */
/** UnoCss */
import UnoCss from 'unocss/vite'
/** vite-svg-loader */
import ViteSvgLoader from 'vite-svg-loader'
/** UnoCss */
// import { createHtmlPlugin } from 'vite-plugin-html'
// import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// types
import type { PluginOption } from 'vite'

export default (mode: string, env: any): PluginOption[] => {
	const plugins = [
		vue(),
		vueJsx(),
		UnoCss({
			// https://unocss.nodejs.cn/integrations/vite
			mode: 'global'
		}),
		ViteSvgLoader(),
	]
	if (mode !== 'production') plugins.push(VueDevTools() as any)

	return plugins
}
