import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

// @ts-expect-error process is a nodejs global
const host = process.env.TAURI_DEV_HOST;
/** 启动`node`进程时所在工作目录的绝对路径 */
// @ts-expect-error process is a nodejs global
const root: string = process.cwd()

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
// @ts-expect-error process is a nodejs global
  console.log({ mode, root, host, env: process.cwd() });
  
  const {  VITE_API_BASE_URL } = loadEnv(mode, root)
  console.log({ VITE_API_BASE_URL });
  
  return {
    plugins: [vue()],
  
    // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
    //
    // 1. prevent vite from obscuring rust errors
    clearScreen: false,
    // 2. tauri expects a fixed port, fail if that port is not available
    server: {
      port: 1420,
      strictPort: true,
      host: host || false,
      hmr: host
        ? {
            protocol: "ws",
            host,
            port: 1421,
          }
        : undefined,
      watch: {
        // 3. tell vite to ignore watching `src-tauri`
        ignored: ["**/src-tauri/**"],
      },
      proxy: {
        ['/dev']: {
          target: "http://192.168.11.18:8092",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/dev/, ""),
        },
      },
    },
  }
});
