import {defineStore, storeToRefs} from 'pinia'
import {ref, computed} from 'vue'
import { mainStore } from './mainStore'

export const typingStateStore = defineStore('typingStateStore', () => {    
    const mainstore = mainStore()
    const {currentTest} = storeToRefs(mainstore)
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
        return ((playerInputLength.value) / currentTest.value.length) * 100 
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
        if (currentTest.value.length) {
            return playerInput.value.length >= currentTest.value.length/2
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