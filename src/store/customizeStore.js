import {defineStore} from 'pinia'
import {ref} from 'vue'

export const customizeStore = defineStore('customizeStore', () => {
    const customizeSettingsProp = ref([])
    const goToProgressPage = ref(false)
    const customizeProp = ref([])

    return {
        customizeProp,
        customizeSettingsProp,
        goToProgressPage,
    }
})