import {defineStore} from 'pinia'
import {ref, computed} from 'vue'

export const correctWrongCountStore = defineStore('correctWrongCountStore', () => {
    const correctCount = ref(0)
    const wrongCount = ref(0)

    const resultData = computed(() => {
        return {
            correctCount: correctCount.value,
            wrongCount: wrongCount.value,
        }
    })

    const clearResult = () => {
        correctCount.value = 0
        wrongCount.value = 0
    }

    return {
        resultData,
        correctCount,
        wrongCount,
        clearResult
    }
})