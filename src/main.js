import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia'
import router from './router'
import './assets/tailwind.css'
import {mainStore} from './store/mainStore'
import { authStore } from './store/authStore'

const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(pinia)

const auth = authStore()
const store = mainStore()

router.beforeEach((to, from) => {
    if (to.name === 'result' && !store.hasCompletedSession || to.name === 'progress' && !auth.isAuthenticated) {
        return {name: 'home'}
    }
})

app.mount('#app')