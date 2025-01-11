import {defineStore} from 'pinia'
import {ref, computed} from 'vue'
import {generateTest} from '../composables/generateTest'

export const mainStore = defineStore('mainStore', () => {
    const preferredConfigs = ref(undefined)
    const route = ref(null)
    const mobileBackspace = ref(false)
    const quoteType = ref('')
    const demo = ref(false)
    const keyboardMode = ref(false)
    const goNext = ref(true)
    const isLoaded = ref(false)
    const backOnline = ref(false)
    const hasAnimated = ref(false)

    //Test container
    const customizeElement = ref(null)
    const testContainerEl = ref(null)
    const containerHeight = ref(0)
    const scrollDistance = ref(0) // Container scroll Y axis
    const scrollTextContainer = ref({}) // Scroll top distance {top: number}
    const containerText = ref('') // Test
    const customLengthInput = ref(null)

    //keys states
    const refocus = ref(false)
    const enterKey = ref(false)
    const backspaceIsPressed = ref(false)
    const inputEl = ref(null)
    const restartEl = ref(null)
    const restartSvgEl = ref(null)
    const focus = ref(false)
    const allSpacesIndex = ref([])
    const pulseAnimate = ref(false)
    const currentWordArray = ref([])

    // Time states
    const timedTyping = ref(false)
    const startTime = ref(null)
    const totalTime = ref(null)
    const timerID = ref()
    const timePaused = ref(0)
    const beginCountdown = ref(false)
    const spaces = ref({})

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
    const useCustomText = ref(false) // user custom text
    const storedTest = ref('') // test to repeat
    const howToUseCustomText = ref('select text using options')

    // data for quotes 
    const movie = ref({})
    const customTests = ref({
        'demo': 'This is a custom test, you can add your own test, use the plus icon. This particular demo cannot be deleted.'
    }) 
    const authoredQuote = ref({})

    const resultData = computed(() => {
        return {
            correctCount: correctCount.value,
            wrongCount: wrongCount.value,
            containerText: containerText.value,
            characters: containerText.value.length,
            totalTime: totalTime.value.toFixed(2),
            WPM: Math.round(  ((containerText.value.length / 5) - (wrongCount.value / 5)) / (totalTime.value/60)),
        }
    })

    const resetToDefault = () => {
        if (timedTyping.value) {
            clearInterval(timerID.value)
            beginCountdown.value = false
        }
        if (beatCountdown.value && timedTyping.value) beatCountdown.value = false
        else beatCountdown.value = null
        playerLastInput.value = ''
        playerInput.value = ''
        previousPlayerInput.value = ''
        scrollDistance.value = 0
        scrollTextContainer.value = {}
        hasCompletedSession.value = false
        beginCountdown.value = false
        completionLevel.value = 0
        totalTime.value = 0
        spaces.value = {}
        startTime.value = null
        correctCount.value = 0
        wrongCount.value = 0
        containerText.value = ''
        allSpacesIndex.value = []
        playerInputLength.value = 0
    }

    const sessionComplete = async () => {
        hasCompletedSession.value = true
        if (timedTyping.value) {
            clearInterval(timerID.value)
            beginCountdown.value = false
        }
        totalTime.value = (performance.now() - startTime.value).toFixed(0) / 1000
    }

    const switchNext = (config, restart) => {
        goNext.value = false
        resetToDefault()
        generateTest(config, restart)
        goNext.value = true
    }

    return {
        preferredConfigs,
        resetToDefault,
        sessionComplete,
        switchNext,
        quoteType,
        route,
        resultData,
        inputEl,
        customLengthInput,
        restartEl,
        restartSvgEl,
        customizeElement,
        focus,
        demo,
        keyboardMode,
        goNext,
        refocus,
        isLoaded,
        backOnline,
        hasAnimated,

        testContainerEl,
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
        spaces,

        completionLevel,
        playerInput,
        playerLastInput,
        previousPlayerInput,
        playerInputLength,
        beginCountdown,
        hasCompletedSession,
        correctCount,
        wrongCount,
        allSpacesIndex,
        pulseAnimate,
        currentWordArray,

        beatCountdown,
        useCustomText,
        storedTest,
        howToUseCustomText,

        movie,
        customTests,
        authoredQuote,
        mobileBackspace,
    }
})














