declare global {
  ViteEnv: {
    NODE_ENV: 'development' | 'production' | 'test';
    VITE_ENV: 'development' | 'production' | 'test';
  }
}

declare interface ViteEnv {
  VITE_APP_TITLE: string;
  VITE_APP_API_BASE_URL: string;
  VITE_APP_API_BASE_URL_DEV: string;
  VITE_APP_API_BASE_URL_TEST: string;
  VITE_APP_API_BASE_URL_PROD: string;
  VITE_APP_API_BASE_URL_PROD2: string;
  VITE_APP_API_BASE_URL_PROD3: string;
}

declare namespace ViteEnv {
  interface ImportMeta {
    readonly env: ViteEnv;
  }
  type NODE_ENV = 'development' | 'production' | 'test';
  type VITE_ENV = 'development' | 'production' | 'test';
}

export {};