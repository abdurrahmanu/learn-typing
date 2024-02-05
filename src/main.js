import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia'
import router from './router'
import './assets/tailwind.css'
import {typingStore} from './store/typingStore'

const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(pinia)

const store = typingStore()

router.beforeEach((to, from) => {
    if (to.name === 'result' && !store.result) {
        return {name: 'typing'}
    }
})

app.mount('#app')