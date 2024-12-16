/**
 * tauri http plugins
 * use @tauri-apps/plugin-http
 * doc: https://tauri.app/reference/javascript/http/#proxy-1
 *      https://blog.csdn.net/weixin_51448331/article/details/143162131
 * 
 * 需要在 src-tauri/capabilities/default.json -> permissions 配置 http:default ？
 * 规范：https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch
 */

import { fetch, type ClientOptions } from '@tauri-apps/plugin-http';
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'PATCH';
export type Headers = Record<string, string>;
export interface Interceptors<T> {
  request: (config: T) => T;
  requestError: (error: any) => any;
  response: (response: any) => any;
  responseError: (error: any) => any;
}


export const defaultClientOptions: ClientOptions = {
  connectTimeout: 1500,
  // proxy: {}
}

export const defaultHeaders: Headers = {
  "Content-Type": "application/json",
  // 'Content-Type': 'application/x-www-form-urlencoded',
}

export const defaultInterceptors: Interceptors<any> = {
  request: (config) => {
    console.log({ config });
    return config;
  },
  requestError: (error) => Promise.reject(error),
  response: async (response) => {
    console.log({ response });
    const { status, statusText } = response;
    if (status >= 200 && status < 300) {
      const result = await response.json();
      console.log({ result, statusText });
      return result;
    } else {
      return response
    }

  },
  responseError: (error) => Promise.reject(error)
}



class TauriHttp {
  clientOptions: ClientOptions;
  interceptors: Interceptors<any> = defaultInterceptors;
  constructor(clientOptions: ClientOptions, interceptors: Interceptors<any> = defaultInterceptors) {
    this.interceptors = Object.assign({}, defaultInterceptors, interceptors)
    this.clientOptions = clientOptions;
  }

  fetch(method: HttpMethod, url: string, options: any) {
    options.headers = Object.assign({}, defaultHeaders, options.headers)
    options = this.interceptors.request(Object.assign({ method, mode: 'cors' }, this.clientOptions, options))
    const request = new Request(url, options)
    console.log({ options, request });
    try {
      // return fetch(url, options)
      return fetch(request, {})
        .then(this.interceptors.response)
        .catch(this.interceptors.responseError)
    } catch (error) {
      return this.interceptors.requestError(error)
    }
    // return fetch(url, options);
  }

  get(url: string, params?: any, headers: Record<string, string> = {}) {
    const options = { headers } as any
    if (params) {
      options.body = JSON.stringify(params)
    }
    console.log({ options });

    return this.fetch('GET', url, options)
  }

  post(url: string, data?: any, headers: Record<string, string> = {}) {
    const options = { headers } as any
    if (data) {
      options.body = JSON.stringify(data)
    }
    return this.fetch('POST', url, options)

  }
}

export default new TauriHttp(defaultClientOptions);