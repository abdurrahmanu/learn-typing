export const characterStore = defineStore('characterStore', () => {
    const correctCharCount = ref(0)
    const incorrectCharCount = ref(0)

    const resultData = computed(() => {
        return {
            correctCharCount: correctCharCount.value,
            incorrectCharCount: incorrectCharCount.value,
        }
    })

    const clearResult = () => {
        correctCharCount.value = 0
        incorrectCharCount.value = 0
    }

    return {
        resultData,
        correctCharCount,
        incorrectCharCount,
        clearResult
    }
})