type Theme = 'light' | 'dark'

export const useGlobalStore = defineStore('global', {
  state: () => ({
    theme: <Theme>(document.documentElement.dataset['theme'] ?? 'light')
  }),
  actions: {
    toggleTheme(target?: Theme) {
      localStorage.setItem(
        'theme',
        (document.documentElement.dataset['theme'] = this.theme =
          target ? target : this.theme === 'light' ? 'dark' : 'light')
      )
    }
  }
})
