import {defineStore} from 'pinia'
import {ref, computed} from 'vue'

export const mainType = defineStore('mainType', () => {
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
    const resultData = ref({})
    const totalTime = ref(null)
    const lines = ref('')
    
    watchEffect(() => {
        if (textContainer.value) {
            lines.value = textContainer.value.textContent.split('\n')
        }
    })
    
    
    window.addEventListener('keypress', e => {
        if (focusInput.value && containerText.value.length && !sessionCompleted.value) {
            if (playerInputLength.value === 0) startTime.value = performance.now();
            completionLevel.value = ((playerInputLength.value + 1) / containerText.value.length) * 100
            playerLastInput.value = e.key
            playerInputLength.value++
    
            if (playerInputLength.value === containerText.value.length) {
                sessionCompleted.value = true
                startedTyping.value = false
                totalTime.value = performance.now() - startTime.value
                resultData.value = {
                    correctCount: correctCount.value,
                    wrongCount: wrongCount.value,
                    containerText: containerText.value,
                    characters: containerText.value.length,
                    totalTime: Math.round(totalTime.value),
                    testType: 'English-10-words'
                }
                emit('resultData', resultData.value)
                setTimeout(() => {                
                    resultData.value
                }, 10);
            }
    
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
        emit('startedTyping')
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
    
    
    return {

    }
})