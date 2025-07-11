import {defineStore} from 'pinia'
import {ref} from 'vue'
import {generateTest} from '../composables/generateTest'

export const nextStore = defineStore('nextStore', () => {
    const goNext = ref(false)
    
    const switchNext = (config) => {
        generateTest(config)
        setTimeout(() => goNext.value = false, 0);
    }

    return {
        switchNext,
        goNext,
    }
})