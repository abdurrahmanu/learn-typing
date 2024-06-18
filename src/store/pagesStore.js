import {defineStore} from 'pinia'
import {ref} from 'vue'

export const pagesStore = defineStore('pagesStore', () => {
    const currentPage = ref(0)
    const toggleNavbar = ref(false)

    return {
        currentPage,
        toggleNavbar,
    }
})




