import {defineStore} from 'pinia'
import {ref} from 'vue'

export const authStore = defineStore('authStore', () => {
    const showUser = ref(false)
    const isAuthenticated = ref(false)
    const userID  = ref()
    const preferredConfigs = ref({})

    return {
        isAuthenticated,
        userID,
        preferredConfigs,
        showUser,
    }
})