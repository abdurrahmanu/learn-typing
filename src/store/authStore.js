export const authStore = defineStore('authStore', () => {
    const login = ref(false)
    const user = ref(null)
    const data = ref(null)
    
    return {
        login,
        user,
        data,
    }
})