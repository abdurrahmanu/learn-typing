import {defineStore} from 'pinia'
import {ref} from 'vue'
import {generateTest} from '../composables/generateTest'
import { mainStore } from './mainStore'

export const nextStore = defineStore('nextStore', () => {
    const goNext = ref(false)
    
    const generateNewTest = () => {
        generateTest()
        mainStore().validateTestLines()
        goNext.value = false
    }

    return {
        generateNewTest,
        goNext,
    }
})