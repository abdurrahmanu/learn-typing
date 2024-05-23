import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia'
import router from './router'
import './assets/tailwind.css'
import {mainStore} from './store/mainStore'
import { storeToRefs } from 'pinia'
import { customizeStore } from './store/customizeStore'

const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(pinia)

const customize = customizeStore()
const store = mainStore()
const {startTime} = storeToRefs(store)
const {generateText, resetToDefault} = store

const {customizers} = storeToRefs(customize)
const {} = store

router.beforeEach((to, from) => {
    if (to.name === 'result' && !store.hasCompletedSession) {
        return {name: 'home'}
    }
    if (to.name === 'home') {
        if (!startTime.value) {
            resetToDefault()
            generateText(customizers.value)
        }
    }
})

app.mount('#app')