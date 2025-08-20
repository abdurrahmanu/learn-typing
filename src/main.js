import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia'
import router from './router'
import './assets/tailwind.css'
import routeRedirect from './composables/redirect'

const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(pinia)
routeRedirect()

app.mount('#app')