/**
 * tauri http plugins
 * use @tauri-apps/plugin-http
 * doc: https://tauri.app/reference/javascript/http/#proxy-1
 *      https://blog.csdn.net/weixin_51448331/article/details/143162131
 *
 * 需要在 src-tauri/capabilities/default.json -> permissions 配置 http:default ？
 * 规范：https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch
 */
import { fetch, type ClientOptions } from "@tauri-apps/plugin-http";
import { useElMessage } from "@/hooks/useElMessage";
import { ElMessage } from "element-plus";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "HEAD" | "OPTIONS" | "PATCH";
export type Headers = Record<string, string>;

export interface Interceptors<T> {
	request: (config: T) => T;
	requestError: (error: any) => any;
	response: (response: any) => any;
	responseError: (error: any) => any;
}

export interface ExtendClientOptions extends ClientOptions {
	baseUrl: string;
}

/** 默认客户端选项 */
export const defaultClientOptions: ExtendClientOptions = {
	baseUrl: import.meta.env.VITE_API_TAURI_HTTP_BASE_URL,
	connectTimeout: 1500,
	// proxy: {}
};
/** 默认headers选项 */
export const defaultHeaders: Headers = {
	"Content-Type": "application/json",
	// 'Content-Type': 'application/x-www-form-urlencoded',
	// 流式类型

	// "Accept": "application/json",
	// "Access-Control-Allow-Origin": "*",
};
/** 默认拦截器 */
export const defaultInterceptors: Interceptors<any> = {
	request: (config) => {
		console.log({ config });
		return config;
	},
	requestError: (error) => Promise.reject(error),
	response: async (response) => {
		console.log(`${ response.url }--返回结果：`, { response });
		const { status, statusText } = response;
		if (status >= 200 && status < 300) return await response.json();

		ElMessage.error(statusText);
		return Promise.reject(response);
	},
	responseError: (error) => {
		const { status } = error;
		if (!status) {
			useElMessage.error("网络请求失败");
			return Promise.reject(error);
		}
		console.log(`${ error.url }--发生错误，返回结果：`, { error });
		if (typeof error === "object") {
			for (const key in error) {
				if (Object.prototype.hasOwnProperty.call(error, key)) {
					const element = error[key];
					console.log({ key, element });
				}
			}
		}
		return Promise.reject(error);
	}
};

export class TauriHttp {
	clientOptions: ExtendClientOptions;
	interceptors: Interceptors<any> = defaultInterceptors;

	constructor(clientOptions: ExtendClientOptions, interceptors: Interceptors<any> = defaultInterceptors) {
		this.interceptors = Object.assign({}, defaultInterceptors, interceptors);
		this.clientOptions = clientOptions;
	}

	fetch(method: HttpMethod, url: string, options: RequestInit & ClientOptions) {
		const { baseUrl, ...restClientOptions } = this.clientOptions;
		options.headers = Object.assign({}, defaultHeaders, options.headers);
		options = this.interceptors.request(Object.assign({ method, mode: "cors" }, restClientOptions, options));

		const request = new Request(baseUrl + url, options);
		console.log({ options, request });
		try {
			// return fetch(url, options)
			return fetch(request, {}).then(this.interceptors.response).catch(this.interceptors.responseError);
		} catch (error) {
			return this.interceptors.requestError(error);
		}
		// return fetch(url, options);
	}

	get(url: string, params?: any, headers: Record<string, string> = {}) {
		const options = { headers } as any;
		if (params) {
			options.body = JSON.stringify(params);
		}
		console.log({ options });

		return this.fetch("GET", url, options);
	}

	post(url: string, data?: any, headers: Record<string, string> = {}) {
		const options = { headers } as any;
		if (data) {
			options.body = JSON.stringify(data);
		}
		return this.fetch("POST", url, options);

	}
}

export default new TauriHttp(defaultClientOptions);