import {defineStore} from 'pinia'
import {ref} from 'vue'

export const connectStore = defineStore('connectStore', () => {
    const hasInternetConnection = ref(false)
    const connectingServer = ref(undefined)
    const connectionStrength = ref('')

    return {
        hasInternetConnection,
        connectingServer,
        connectionStrength,
    }
})