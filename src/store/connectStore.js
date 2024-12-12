import {defineStore} from 'pinia'
import {ref} from 'vue'

export const connectStore = defineStore('connectStore', () => {
    const isOnline = ref(false)

    return {
        isOnline,
    }
})