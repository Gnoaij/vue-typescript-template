<script setup lang="ts">
import { useEventListener, useFullscreen } from './hooks'

const { toggle } = useFullscreen()

useEventListener('keydown', (e: KeyboardEvent) => {
  e.code === 'Enter' && toggle()
})
</script>

<template>
  <RouterView v-slot="{ Component }">
    <component :is="Component" />
  </RouterView>
</template>

<style lang="scss">
body {
  min-height: 100vh;
  overflow-x: hidden;
  color: var(--text-color-regular);
  text-align: center;
  user-select: none;
  background-color: var(--background-color-regular);
  transition: color 0.3s ease-in, background-color 0.3s ease-in;
}

#nprogress .bar {
  background-color: V.$color-green-1 !important;

  .peg {
    box-shadow: 0 0 10px V.$color-green-1, 0 0 5px V.$color-green-1 !important;
  }
}
</style>
