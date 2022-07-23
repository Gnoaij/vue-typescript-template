import type { Ref } from 'vue'

import type { NOOP } from '@/shared/utils'

interface Listener<E = Event> {
  (e: E): void
}

export function useEventListener<N extends keyof DocumentEventMap>(
  event: N,
  listener: Listener<DocumentEventMap[N]>
): NOOP

export function useEventListener<N extends keyof WindowEventMap>(
  target: Window,
  event: N,
  listener: Listener<WindowEventMap[N]>
): NOOP

export function useEventListener<N extends keyof DocumentEventMap>(
  target: Document,
  event: N,
  listener: Listener<DocumentEventMap[N]>
): NOOP

export function useEventListener<T extends HTMLElement, N extends keyof HTMLElementEventMap>(
  target: T,
  event: N,
  listener: Listener<HTMLElementEventMap[N]>
): NOOP

export function useEventListener<T extends HTMLElement, N extends keyof HTMLElementEventMap>(
  target: Ref<T | undefined>,
  event: N,
  listener: Listener<HTMLElementEventMap[N]>
): NOOP

export function useEventListener(...args: any[]): NOOP {
  let target: any
  let event: string
  let listener: Listener

  if (args.length === 2) {
    target = document
    ;[event, listener] = args
  } else {
    ;[target, event, listener] = args
  }

  const stop = watch(
    () => unref(target),
    (el, oldEl, onCleanup) => {
      if (el) {
        el.addEventListener(event, listener)
        onCleanup(() => {
          el.removeEventListener(event, listener)
        })
      }
    },
    {
      immediate: true
    }
  )

  return stop
}
