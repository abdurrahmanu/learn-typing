import {defineStore} from 'pinia'
import {ref} from 'vue'
import { UseGetQuotes } from '../composables/UseGetQuotes'

export const typingStore = defineStore('typingStore', () => {
    const customizeSettingsProp = ref([])
    const goToProgressPage = ref(false)
    const canRestart = ref(false)
    const startedTyping = ref(false)
    const completionLevel = ref(0)
    const customizeProp = ref([])
    const focusInput = ref(false)
    const containerText = ref('')
    const restart = ref(false)
    const textAlign = ref('')
    const next = ref(false)
    const result = ref(null)

    const checkConfiguration = (e) => {
        if (startedTyping.value) {
            canRestart.value = true
        }
    }

    const generateText = () => {
        completionLevel.value = 0
        focusInput.value = true
        if (customizeSettingsProp.value.length) {
            containerText.value = UseGetQuotes(customizeSettingsProp.value).res.value
        }
        else {
            containerText.value = UseGetQuotes().res.value
        }
        startedTyping.value = true
    }

    const switchNext = () => {
        next.value = true
        setTimeout(() => {    
            next.value = false
        }, 0);
    }



// typing container...............

const correctCount = ref(0)
const wrongCount = ref(0)
const playerLastInput = ref('')
const playerInputLength = ref(0)
const sessionCompleted = ref(false)
const restartTyping = ref(false)
const startTime = ref(null)
const resultData = ref({})
const totalTime = ref(null)

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
        next,
        customizeProp,
        containerText,
        completionLevel,
        focusInput,
        customizeSettingsProp,
        textAlign,
        result,
        canRestart,
        restart,
        startedTyping,
        goToProgressPage,
        checkConfiguration,
        generateText,
        switchNext,





// typing container
        correctCount,
        wrongCount,
        playerLastInput ,
        playerInputLength,
        sessionCompleted,
        restartTyping,
        startTime,
        resultData ,
        totalTime,
        BeginNextSession,
    }
})