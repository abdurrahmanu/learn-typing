import {defineStore} from 'pinia'
import {ref} from 'vue'

export const cookiesStore = defineStore('cookiesStore', () => {
    const cookiesModal = ref(null)
    const saveConfigs = ref(false)

    return {
        cookiesModal,
        saveConfigs,
    }
})