import {defineStore} from 'pinia'
import {ref, computed} from 'vue'

export const typingStateStore = defineStore('typingStateStore', () => {
    const spaces = ref({})
    const completionLevel = ref(0) 
    const playerInput = ref('') 
    const previousPlayerInput = ref('')
    const playerLastInput = ref('')
    const playerInputLength = ref(0)
    const refocus = ref(false)
    const enterKey = ref(false)
    const focus = ref(false)
    const backspaceIsPressed = ref(false)
    const inputEl = ref(null)
    const currentWordArray = ref([])
    const textIsFocused = ref(false)

    const resetTypingState = () => {
        playerLastInput.value = ''
        playerInput.value = ''
        previousPlayerInput.value = ''
        completionLevel.value = 0
        playerInputLength.value = 0
        spaces.value = {}
    }

    const typedWhiteSpaces = computed(() => Object.keys(spaces.value).length)

    return {
        resetTypingState,
        spaces,
        completionLevel,
        playerInput,
        playerLastInput,
        previousPlayerInput,
        playerInputLength,
        refocus,
        enterKey,
        focus,
        backspaceIsPressed,
        inputEl,
        currentWordArray,
        typedWhiteSpaces,
        textIsFocused,
    }
})