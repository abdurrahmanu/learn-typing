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