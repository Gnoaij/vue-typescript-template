import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'

import type { RequestId } from './axios'
import { Interceptor } from './interceptor'

export default class Request {
  private _instance: AxiosInstance
  private _queue: Map<RequestId, AbortController>

  public interceptors: {
    request: Interceptor<AxiosRequestConfig>
    response: Interceptor<AxiosResponse>
  }

  constructor(config?: AxiosRequestConfig) {
    this._instance = axios.create(config)
    this._queue = new Map()
    this.interceptors = {
      request: new Interceptor(this._instance.interceptors.request),
      response: new Interceptor(this._instance.interceptors.response)
    }
  }

  public async request<T = AxiosResponse, D = any>(config: AxiosRequestConfig<D>): Promise<T> {
    config = { url: '', method: 'GET', ...config }

    const requestId = config.customOptions?.requestId

    if (requestId) {
      this.abort(requestId)
      const abortController = new AbortController()
      config.signal = abortController.signal
      this._queue.set(requestId, abortController)
    }

    try {
      return await this._instance.request<any, T, D>(config)
    } finally {
      if (requestId && this._queue.has(requestId)) {
        this._queue.delete(requestId)
      }
    }
  }

  public get<T = AxiosResponse, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T> {
    return this.request<T, D>({ ...config, url, method: 'GET' })
  }

  public delete<T = AxiosResponse, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<T> {
    return this.request<T, D>({ ...config, url, method: 'DELETE' })
  }

  public post<T = AxiosResponse, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T> {
    return this.request<T, D>({ ...config, url, method: 'POST' })
  }

  public put<T = AxiosResponse, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T> {
    return this.request<T, D>({ ...config, url, method: 'PUT' })
  }

  public patch<T = AxiosResponse, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<T> {
    return this.request<T, D>({ ...config, url, method: 'PATCH' })
  }

  public abort(requestId: RequestId) {
    if (this._queue.has(requestId)) {
      this._queue.get(requestId)?.abort()
      this._queue.delete(requestId)
    }
  }
}
