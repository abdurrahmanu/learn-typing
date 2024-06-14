import {defineStore} from 'pinia'
import {ref} from 'vue'

export const authStore = defineStore('authStore', () => {
    const isAuthenticated = ref(false)
    const userID  = ref()
    const userData = ref({})

    return {
        isAuthenticated,
        userID,
        userData,
    }
})