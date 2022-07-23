import type { Ref } from 'vue'

import type { NOOP } from '@/shared/utils'
import { noop } from '@/shared/utils'

import { useEventListener } from './useEventListener'

type Handler = NOOP | (() => Promise<void>)

interface ReturnType {
  isSupported: boolean
  isFullscreen: Ref<boolean>
  exit: Handler
  enter: Handler
  toggle: Handler
}

enum FullscreenApi {
  ENABLED = 'fullscreenEnabled',
  ELEMENT = 'fullscreenElement',
  ENTER = 'requestFullscreen',
  EXIT = 'exitFullscreen'
}

export function useFullscreen(): ReturnType

export function useFullscreen<T extends HTMLElement>(target: T): ReturnType

export function useFullscreen<T extends HTMLElement>(target: Ref<T | undefined>): ReturnType

export function useFullscreen(target?: any): ReturnType {
  const isSupported = document[FullscreenApi.ENABLED]
  const isFullscreen = ref(!!document[FullscreenApi.ELEMENT])
  let exit: Handler
  let enter: Handler
  let toggle: Handler

  if (!isSupported) {
    exit = noop
    enter = noop
    toggle = noop

    return {
      isSupported,
      isFullscreen,
      exit,
      enter,
      toggle
    }
  }

  target = target ?? document.documentElement

  exit = async () => {
    if (document[FullscreenApi.ELEMENT]) {
      await document[FullscreenApi.EXIT]?.()
    }
  }

  enter = async () => {
    const el = unref(target)
    if (el) {
      await exit()
      await el[FullscreenApi.ENTER]?.()
    }
  }

  toggle = async () => {
    if (document[FullscreenApi.ELEMENT]) {
      await exit()
    } else {
      await enter()
    }
  }

  useEventListener(target, 'fullscreenchange', () => {
    isFullscreen.value = !!document[FullscreenApi.ELEMENT]
  })

  return {
    isSupported,
    isFullscreen,
    exit,
    enter,
    toggle
  }
}
