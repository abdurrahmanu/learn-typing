import {defineStore} from 'pinia'
import {ref} from 'vue'

export const connectStore = defineStore('connectStore', () => {
    const hasInternetConnection = ref(navigator.onLine ? true : false)
    const connectingServer = ref(undefined)
    const connectionStrength = ref('')
    const showConnectionStrength = ref(false)
    const loadingTimeout = ref(undefined)

    return {
        hasInternetConnection,
        connectingServer,
        connectionStrength,
        showConnectionStrength,
        loadingTimeout,
    }
})