import {defineStore} from 'pinia'
import {ref, computed} from 'vue'
import {UseGetQuotes} from '../composables/UseGetQuotes'

export const mainStore = defineStore('mainStore', () => {
    const completionLevel = ref(0)
    const correctCount = ref(0)
    const wrongCount = ref(0)
    const containerText = ref('')
    const playerLastInput = ref('')
    const playerInputLength = ref(0)
    const startTime = ref(null)
    const totalTime = ref(null)
    const hasStartedSession = ref(false)
    const customizeSettingsProp = ref([])
    const textAlign = ref(false)
    const playerInput = ref('')
    const config = ref({})

    const resultData = computed(() => {
        return {
            correctCount: correctCount.value,
            wrongCount: wrongCount.value,
            containerText: containerText.value,
            characters: containerText.value.length,
            totalTime: Math.round(totalTime.value),
            testType: 'English-10-words'
        }
    })
    
    const generateText = (config) => {
        if (config) containerText.value = UseGetQuotes(config).res.value
        else containerText.value = UseGetQuotes().res.value
    }
    
    const resetToDefault = () => {
        hasStartedSession.value = false
        completionLevel.value = 0
        totalTime.value = null
        startTime.value = null
        correctCount.value = 0
        wrongCount.value = 0
        containerText.value = ''
        playerLastInput.value = ''
        playerInputLength.value = 0
        customizeSettingsProp.value = []
        textAlign.value = false
        playerInput.value = ''
    }

    const sessionComplete = () => {
        hasStartedSession.value = false
        totalTime.value = performance.now() - startTime.value
    }

    const playerTyping = (e) => {
        if (e.key === 'Enter') return
        if (!hasStartedSession.value) hasStartedSession.value = true
        playerInputLength.value++
        if (playerInputLength.value === 1)  startTime.value = performance.now();
        completionLevel.value = ((playerInputLength.value + 1) / containerText.value.length) * 100        
        playerLastInput.value = e.key
        playerInput.value += playerLastInput.value

        if (playerInputLength.value === containerText.value.length) sessionComplete()
    }

    const inputEquality = computed(() => {
        return playerLastInput.value === containerText.value[playerInput.value.length - 1]
    })

    const switchNext = (config) => {
        resetToDefault()
        config ? generateText(config) : generateText()
    }

    return {
        resetToDefault,
        generateText,
        sessionComplete,
        playerTyping,
        switchNext,
        config,
        inputEquality,
        textAlign,
        resultData,
        totalTime,
        completionLevel,
        playerInput,
        correctCount,
        wrongCount,
        containerText,
        playerLastInput,
        playerInputLength,
        hasStartedSession,
        startTime,
        totalTime,
    }
})