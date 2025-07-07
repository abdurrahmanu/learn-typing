import {defineStore} from 'pinia'
import {ref, computed} from 'vue'
import { mainStore } from './mainStore'

export const typingStateStore = defineStore('typingStateStore', () => {
    const mainstore = mainStore()

    const spaces = ref({})
    const playerInput = ref('') 
    const playerLastInput = ref('')
    const playerInputLength = ref(0)
    const refocus = ref(false)
    const enterKey = ref(false)
    const focus = ref(false)
    const backspaceIsPressed = ref(false)
    const inputEl = ref(null)
    const currentWordArray = ref([])
    const textIsFocused = ref(false)

    const completionLevel = computed(() => {
        return ((playerInputLength.value) / mainstore.containerText.length) * 100 
    })

    const resetTypingState = () => {
        playerLastInput.value = ''
        playerInput.value = ''
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