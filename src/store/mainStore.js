import {defineStore} from 'pinia'
import {ref, computed} from 'vue'
import {generateTest} from '../composables/generateTest'

export const mainStore = defineStore('mainStore', () => {
    
    //Test container
    const containerRef = ref(null)
    const containerHeight = ref(0)
    const scrollDistance = ref(0) // Container scroll Y axis
    const scrollTextContainer = ref({}) // Scroll top distance {top: number}
    const containerText = ref('') // Test

    //keys states
    const enterKey = ref(false)
    const backspaceIsPressed = ref(false)
    const inputEl = ref(null)
    const focus = ref(false)
    const capsIsOn = ref(false)

    // Time states
    const timedTyping = ref(false)
    const startTime = ref(null)
    const totalTime = ref(null)
    const timerID = ref()
    const timePaused = ref(0)
    const beginCountdown = ref(false)

    // On-type states
    const completionLevel = ref(0) // test completion percentage
    const playerInput = ref('') // player current input
    const previousPlayerInput = ref('')
    const playerLastInput = ref('')
    const playerInputLength = ref(0)
    const hasCompletedSession = ref(false)
    const correctCount = ref(0)
    const wrongCount = ref(0)

    const beatCountdown = ref(null)
    const savedCountdown = ref(10) // default countdown || set countdown
    const useCustomText = ref(false) // user custom text
    const storedTest = ref('') // test to repeat
    const howToUseCustomText = ref('select text using options')

    // data for quotes 
    const movie = ref({})
    const customTexts = ref({}) 
    const authoredQuote = ref({})

    const resultData = computed(() => {
        return {
            correctCount: correctCount.value,
            wrongCount: wrongCount.value,
            containerText: containerText.value,
            characters: containerText.value.length,
            totalTime: totalTime.value.toFixed(2),
            WPM: Math.round( (((containerText.value.length - wrongCount.value) / 5)) / (totalTime.value/60)),
        }
    })

    const resetToDefault = () => {
        if (timedTyping.value) {
            clearInterval(timerID.value)
            beginCountdown.value = false
        }
        if (beatCountdown.value && timedTyping.value) beatCountdown.value = false
        else beatCountdown.value = null
        scrollDistance.value = 0
        scrollTextContainer.value = {}
        hasCompletedSession.value = false
        beginCountdown.value = false
        completionLevel.value = 0
        totalTime.value = 0
        startTime.value = null
        correctCount.value = 0
        wrongCount.value = 0
        containerText.value = ''
        playerLastInput.value = ''
        playerInputLength.value = 0
        playerInput.value = ''
    }

    const sessionComplete = async () => {
        hasCompletedSession.value = true
        if (timedTyping.value) {
            clearInterval(timerID.value)
            beginCountdown.value = false
            if (!beatCountdown.value) totalTime.value = savedCountdown.value
            else totalTime.value = (performance.now() - startTime.value).toFixed(0) / 1000
        } else {
            totalTime.value = (performance.now() - startTime.value).toFixed(0) / 1000
        }
    }

    const switchNext = (config, restart) => {
        resetToDefault()
        generateTest(config, restart)
    }

    return {
        resetToDefault,
        sessionComplete,
        switchNext,
        
        capsIsOn,
        resultData,
        inputEl,
        focus,

        containerRef,
        containerHeight,
        scrollDistance,
        scrollTextContainer,
        containerText ,

        enterKey,
        backspaceIsPressed,

        timedTyping,
        startTime,
        totalTime,
        timerID,
        timePaused,

        completionLevel,
        playerInput,
        playerLastInput,
        previousPlayerInput,
        playerInputLength,
        beginCountdown,
        hasCompletedSession,
        correctCount,
        wrongCount,

        beatCountdown,
        savedCountdown,
        useCustomText,
        storedTest,
        howToUseCustomText,

        movie,
        customTexts,
        authoredQuote,
    }
})














