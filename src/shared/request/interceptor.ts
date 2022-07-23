import type { AxiosInterceptorManager } from 'axios'

export class Interceptor<T = any> {
  private _manager: AxiosInterceptorManager<any>
  private _queue: number[]

  constructor(manager: AxiosInterceptorManager<any>) {
    this._manager = manager
    this._queue = []
  }

  public use<V = T>(onFulfilled?: (value: V) => any, onRejected?: (error: any) => any): number {
    const id = this._manager.use(onFulfilled, onRejected)
    this._queue.push(id)
    return id
  }

  public eject(id: number): void {
    this._manager.eject(id)
    const index = this._queue.indexOf(id)
    if (index !== -1) {
      this._queue.splice(index, 1)
    }
  }

  public ejectAll(): void {
    this._queue.forEach((id) => this._manager.eject(id))
    this._queue.length = 0
  }
}
