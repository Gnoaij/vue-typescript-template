export function useRequestAnimationFrame(callback: () => void) {
  let timer: number | undefined

  const invoke = () => {
    callback()
    timer = requestAnimationFrame(invoke)
  }

  const stop = () => {
    if (timer) {
      cancelAnimationFrame(timer)
      timer = undefined
    }
  }

  const start = () => {
    stop()
    invoke()
  }

  return { stop, start }
}
