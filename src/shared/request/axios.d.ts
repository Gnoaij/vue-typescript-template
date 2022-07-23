import 'axios'

export type RequestId = number | string | symbol

export interface CustomOptions {
  requestId?: RequestId
}

declare module 'axios' {
  interface AxiosRequestConfig {
    customOptions?: CustomOptions
  }
}
