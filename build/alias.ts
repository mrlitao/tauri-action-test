import { AliasOptions } from "vite";
// import tsconfigJson from "../tsconfig.json";
// import { fileURLToPath } from 'node:url';
import { resolve } from "node:path";
import { createRequire } from "module";

const rootPath = resolve(__dirname, "../");
// console.log({ tsconfigJson, __dirname, rootPath, url: import.meta.url, a: resolve(__dirname, '../') });

const head = (xs: any[]) => (xs[0]);
const removeAsterisk = (s: string) => s.endsWith("*") ? s.slice(0, -2) : s;
// const toPath = (s: string) => fileURLToPath(new URL(s, import.meta.url));
// const toPath = (s: string) => fileURLToPath(new URL(s, 'file://' + rootPath));
const toPath = (path: string) => resolve(rootPath, path);
const AliasPair = (pair: any) => pair && pair[0] && ({
	// 1. 取 path 数组下标 0 的
	// 2. 去掉 '/*'
	// 3. 转绝对路径
	[removeAsterisk(pair[0])]: toPath(removeAsterisk(head(pair[1])))
});

/**
 * 根据 tsconfig.json compilerOptions.paths 配置生成 vite.config resolve.alias
 * @param root 当前根目录路径string
 */
export default (root: string): AliasOptions => {
	// const require = createRequire(import.meta.url);
	const require = createRequire(root);
	// const version = require(resolve(root, "package.json")).version;
	// 读取 root 目录下的 tsconfig.json 文件的某个值
	const paths = require(resolve(root, "tsconfig.json")).compilerOptions.paths;

	// const alias=  Object.entries(tsconfigJson?.compilerOptions?.paths ?? paths).reduce((acc, pair) => {
	const alias=  Object.entries(paths).reduce((acc, pair) => {
		return Object.assign(acc, AliasPair(pair));
	}, {});
	console.log("路径别名配置：", alias);
	return alias
};
