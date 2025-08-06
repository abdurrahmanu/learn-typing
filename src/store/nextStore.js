import {defineStore} from 'pinia'
import {ref} from 'vue'
import {generateTest} from '../composables/generateTest'
import { validateTestLines } from '../composables/validateTestLines'

export const nextStore = defineStore('nextStore', () => {
    const goNext = ref(false)
    
    const generateNewTest = () => {
        generateTest()
        validateTestLines()
        goNext.value = false
    }

    return {
        generateNewTest,
        goNext,
    }
})