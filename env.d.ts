/// <reference types="vite/client" />

import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
  }
}

declare global {
  interface ImportMetaEnv {
    readonly VITE_DEFAULT_TITLE: string
    readonly VITE_REQUEST_BASE_URL: string
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}
