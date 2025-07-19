import {defineStore} from 'pinia'
import {ref} from 'vue'
import {generateTest} from '../composables/generateTest'

export const nextStore = defineStore('nextStore', () => {
    const goNext = ref(false)
    
    const generateNewTest = () => {
        generateTest()
        goNext.value = false
    }

    return {
        generateNewTest,
        goNext,
    }
})