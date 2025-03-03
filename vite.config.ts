import { defineConfig, loadEnv } from "vite";
import { resolve } from "node:path";
import createPlugins from "./build/plugins";
import createProxy from "./build/proxy";
import createAlias from "./build/alias";

const host = process.env.TAURI_DEV_HOST;
/** 启动`node`进程时所在工作目录的绝对路径 */
const root: string = process.cwd();

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
	console.log({ mode, root, host, aaa: import.meta.url });
	const env = loadEnv(mode, root);
	console.log({ env, VITE_PROXY: typeof env.VITE_PROXY });
	return {
		plugins: createPlugins(mode, env),
		resolve: {
			// alias: createAlias(),
			alias: {
				...createAlias(),
				"@": resolve(__dirname, "./src")
				// "@": resolve(dirname(fileURLToPath(import.meta.url)), 'src')
			}
		},
		// Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
		//
		// 1. prevent vite from obscuring rust errors
		clearScreen: false,
		// 2. tauri expects a fixed port, fail if that port is not available
		server: {
			port: 1420,
			strictPort: true,
			host: host || false,
			hmr: host ? {
						protocol: "ws",
						host,
						port: 1421,
					}
					: undefined,
			watch: {
				// 3. tell vite to ignore watching `src-tauri`
				ignored: ["**/src-tauri/**"],
			},
			proxy: env.VITE_PROXY && env.VITE_PROXY.startsWith("[[") ? createProxy(JSON.parse(env.VITE_PROXY)) : {
				["/dev"]: {
					target: "http://192.168.11.18:8082",
					changeOrigin: true,
					rewrite: (path: string) => path.replace(/^\/dev/, ""),
				},
			},
		},
	};
});
