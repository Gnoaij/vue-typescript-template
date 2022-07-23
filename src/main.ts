import 'normalize.css'
import 'animate.css'
import 'nprogress/nprogress.css'
import './assets/css/base.scss'
import './assets/css/theme.scss'
import './assets/css/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
