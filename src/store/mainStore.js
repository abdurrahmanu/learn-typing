import {defineStore} from 'pinia'
import {ref, computed} from 'vue'
import {UseGetQuotes} from '../composables/useGetQuotes'

export const mainStore = defineStore('mainStore', () => {
    const textContainer = ref(null)
    const completionLevel = ref(0)
    const correctCount = ref(0)
    const wrongCount = ref(0)
    const containerText = ref('')
    const playerLastInput = ref('')
    const playerInputLength = ref(0)
    const sessionCompleted = ref(false)
    const restartTyping = ref(false)
    const focusInput = ref(false)
    const startTime = ref(null)
    const totalTime = ref(null)
    const startedTyping = ref(false)
    const result = ref('')
    const customizeSettingsProp = ref([])
    const textAlign = ref(false)

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
    
    const generateText = () => {
        completionLevel.value = 0
        focusInput.value = true
        if (customizeSettingsProp.value.length) {
            containerText.value = UseGetQuotes(customizeSettingsProp.value).res.value
        }
        else {
            containerText.value = UseGetQuotes().res.value
        }
    }
    
    const BeginNextSession = () => {
        resultData.value = {}
        totalTime.value = null
        completionLevel.value = 0
        startTime.value = null
        correctCount.value = 0
        wrongCount.value = 0
        focusInput.value = false
        containerText.value = ''
        playerLastInput.value = ''
        playerInputLength.value = 0
        sessionCompleted.value = false
        restartTyping.value = true
        setTimeout(() => {
        restartTyping.value = false
        }, 0);
    }

    const sessionComplete = () => {
        sessionCompleted.value = true
        startedTyping.value = false
        totalTime.value = performance.now() - startTime.value
        result.value = resultData.value
    }

    const playerTyping = (e) => {
        if (focusInput.value && !sessionCompleted.value) {
            startedTyping.value = true
            playerInputLength.value++
            if (playerInputLength.value === 1)  startTime.value = performance.now();
            completionLevel.value = ((playerInputLength.value + 1) / containerText.value.length) * 100        
            playerLastInput.value = e.key
            if (playerInputLength.value === containerText.value.length) sessionComplete
        }
    }

    return {
        BeginNextSession,
        generateText,
        sessionComplete,
        playerTyping,
        textAlign,
        resultData,
        totalTime,
        textContainer,
        completionLevel,
        correctCount,
        wrongCount,
        containerText,
        playerLastInput,
        playerInputLength,
        sessionCompleted,
        restartTyping,
        focusInput,
        focusInput,
        startTime,
        totalTime,
        result,
    }
})