import {defineStore} from 'pinia'
import {ref} from 'vue'

export const connectStore = defineStore('connectStore', () => {
    const isOnline = ref(false)
    const connectingServer = ref(navigator.onLine ? true : false)

    return {
        isOnline,
        connectingServer
    }
})