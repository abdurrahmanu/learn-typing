import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia'
import router from './router'
import './assets/tailwind.css'
import reRouter from './composables/reRouter'

const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(pinia)
reRouter()

app.mount('#app')