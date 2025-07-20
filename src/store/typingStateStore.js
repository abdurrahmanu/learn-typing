import {defineStore} from 'pinia'
import {ref, computed} from 'vue'
import { mainStore } from './mainStore'

export const typingStateStore = defineStore('typingStateStore', () => {
    const z = ref('') // This is a placeholder, replace with actual logic if needed
    
    const mainstore = mainStore()
    const spaces = ref({})
    const playerInput = ref('') 
    const refocus = ref(false)
    const enterKey = ref(false)
    const focus = ref(false)
    const backspaceIsPressed = ref(false)
    const inputEl = ref(null)
    const currentWordArray = ref([])
    const deletedValue = ref('')

    const completionLevel = computed(() => {
        return ((playerInputLength.value) / mainstore.currentTest.length) * 100 
    })

    const resetTypingState = () => {
        playerInput.value = ''
        spaces.value = {}
    }

    const typedWhiteSpaces = computed(() => Object.keys(spaces.value).length)

    const playerLastInput = computed(() => {
        return playerInput.value[playerInput.value.length - 1]
    })

    const playerInputLength = computed(() => {
        return playerInput.value.length
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
        z
    }
})