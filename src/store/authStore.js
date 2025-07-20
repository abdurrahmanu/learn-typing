import {defineStore} from 'pinia'
import {ref} from 'vue'

export const authStore = defineStore('authStore', () => {
    const login = ref(false)
    const user = ref(null)
    const data = ref(null)
    const userDataAndStats = ref({})
    const result = ref(null)
    
    return {
        userDataAndStats,
        result,
        login,
        user,
        data,
    }
})