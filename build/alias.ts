import { AliasOptions } from 'vite';
import tsconfigJson from '../tsconfig.json'
// import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const rootPath = resolve(__dirname, '../')
// console.log({ tsconfigJson, __dirname, rootPath, url: import.meta.url, a: resolve(__dirname, '../') });

const head = (xs: any[]) => (xs[0]);
const removeAsterisk = (s: string) => s.slice(0, -2);
// const toPath = (s: string) => fileURLToPath(new URL(s, import.meta.url));
// const toPath = (s: string) => fileURLToPath(new URL(s, 'file://' + rootPath));
const toPath = (path: string) => resolve(rootPath, path);
const AliasPair = (pair: any) => ({
  // 1. 取 path 数组下标 0 的
  // 2. 去掉 '/*'
  // 3. 转绝对路径
  [removeAsterisk(pair[0])]: toPath(removeAsterisk(head(pair[1])))
});

export default (): AliasOptions => {
  const paths = Object.entries(tsconfigJson.compilerOptions.paths)
  const alias = paths.reduce((acc, pair) => {
    return Object.assign(acc, AliasPair(pair))
  }, {})
  console.log({ paths, alias });

  return alias
};
