<script setup lang="ts">
import { useGlobalStore } from '@/stores'

const globalStore = useGlobalStore()
const { theme } = storeToRefs(globalStore)
const { toggleTheme } = globalStore
</script>

<template>
  <header class="layout-header">
    <nav>
      <RouterLink to="/home">Home</RouterLink>
      <span> | </span>
      <RouterLink to="/clock">Clock</RouterLink>
      <span> | </span>
      <IconMsLightModeOutline
        class="icon pointer"
        v-show="theme === 'light'"
        @click="toggleTheme()"
      />
      <IconMsDarkModeOutline
        class="icon pointer"
        v-show="theme === 'dark'"
        @click="toggleTheme()"
      />
    </nav>
  </header>
</template>

<style scoped lang="scss">
.layout-header {
  padding: 1.5rem;

  a,
  span,
  .icon {
    vertical-align: middle;
  }

  a {
    color: var(--text-color-regular);
    transition: color 0.3s ease-in;

    &.router-link-exact-active {
      color: var(--text-color-active);
    }
  }

  .icon {
    width: 2rem;
    height: 2rem;
    padding: 0.25rem;
    border-radius: 50%;

    &:hover {
      background-color: var(--background-color-hover);
    }
  }
}
</style>
