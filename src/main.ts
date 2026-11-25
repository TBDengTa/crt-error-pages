import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { useI18n } from './i18n'
import './app.css'

const { locale } = useI18n()
document.documentElement.lang = locale.value

createApp(App).use(router).mount('#app')
