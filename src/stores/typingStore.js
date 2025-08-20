export const typingStore = defineStore('typingStore', () => {    
    const mainstore = mainStore()
    const {currentTest} = storeToRefs(mainstore)
    const {test} = currentTest.value

    const spaces = ref({})
    const playerInput = ref('') 
    const refocus = ref(false)
    const enterKey = ref(false)
    const focus = ref(false)
    const backspaceIsPressed = ref(false)
    const inputEl = ref(null)
    const currentWordArray = ref([])
    const deletedValue = ref('')
    const testCompleted = ref(false)
    const beginTest = ref(false)

    const completionLevel = computed(() => {
        return ((playerInputLength.value) / currentTest.value.test.length) * 100 
    })

    const resetTypingState = () => {
        playerInput.value = ''
        spaces.value = {}
        testCompleted.value = false
        beginTest.value = false
    }

    const typedWhiteSpaces = computed(() => Object.keys(spaces.value).length)

    const playerLastInput = computed(() => {
        return playerInput.value[playerInput.value.length - 1]
    })

    const playerInputLength = computed(() => {
        return playerInput.value.length
    })

    const halfWayReset = computed(() => {
        if (test.length) {
            return playerInput.value.length >= test.length/2
        }

        return false
    })

    return {
        resetTypingState,
        spaces,
        completionLevel,
        playerInput,
        playerLastInput,
        playerInputLength,
        refocus,
        enterKey,
        focus,
        backspaceIsPressed,
        currentWordArray,
        typedWhiteSpaces,
        inputEl,
        deletedValue,
        testCompleted,
        beginTest,
        halfWayReset,
    }
})