import {defineStore} from 'pinia'
import {ref} from 'vue'

export const authStore = defineStore('authStore', () => {
    const login = ref(false)
    const user = ref(null)
    
    return {
        login,
        user
    }
})