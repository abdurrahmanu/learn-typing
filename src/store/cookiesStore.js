import {defineStore} from 'pinia'
import {ref} from 'vue'

export const cookiesStore = defineStore('cookiesStore', () => {
    const showCookiesModal = ref(false)
    const useCookies  = ref(null)

    return {
        showCookiesModal,
        useCookies,
    }
})