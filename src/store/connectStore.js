import {defineStore} from 'pinia'
import {ref} from 'vue'

export const connectStore = defineStore('connectStore', () => {
    const connectionAvailable = ref(navigator.onLine ? true : false)
    const isConnectingServer = ref(undefined)
    const connectionStrength = ref('')
    const showConnectionStrength = ref(false)
    const loadingTimeout = ref(undefined)

    return {
        connectionAvailable,
        isConnectingServer,
        connectionStrength,
        showConnectionStrength,
        loadingTimeout,
    }
})