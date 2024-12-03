import {defineStore} from 'pinia'
import {ref} from 'vue'

export const cookiesStore = defineStore('cookiesStore', () => {
    const showCookiesModal = ref(null)
    const useCookies  = ref(null)

    return {
        showCookiesModal,
        useCookies,
    }
})