import {defineStore} from 'pinia'
import {ref, computed} from 'vue'
import {generateTest} from '../composables/generateTest'

export const mainStore = defineStore('mainStore', () => {
    const characterEqualityArray = ref([])
    const wpmPerSecond = ref({})
    const wpmPerSecondTimerID = ref(null)
    const preferredConfigs = ref(undefined)
    const route = ref(null)
    const mobileBackspace = ref(false)
    const quoteType = ref('')
    const demo = ref(false)
    const keyboardMode = ref(false)
    const goNext = ref(true)

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
            WPM: Math.round(((containerText.value.length / 5) - (wrongCount.value / 5)) / (totalTime.value/60)),
        }
    })

    const wpmTime = () => {
        let secondsCount = ref(0)
        let prevLength = ref(0)

        if (!hasCompletedSession.value) {
            if (playerInput.value) {
                wpmPerSecondTimerID.value = setInterval(() => {
                    secondsCount.value++
                    let gross = playerInput.value.slice(prevLength.value).length
                    let net = gross - characterEqualityArray.value.slice(prevLength.value).filter(bool => bool === false).length

                    let grossCharPerMinute = gross * 60
                    let netCharPerMinute = net * 60

                    let grossWPM = grossCharPerMinute/5
                    let netWPM = netCharPerMinute/5

                    wpmPerSecond.value[secondsCount.value] = {
                        grossWPM: grossWPM,
                        netWPM: netWPM
                    }
                    prevLength.value = playerInputLength.value
                }, 1000);
            }
        } else {
            clearInterval(wpmPerSecondTimerID.value)
        }
    }

    // 59, 30, 20, 15, 12, 10, 9, 8
    // 2,   3,  4,  5,  6,  7, 8, 9
    // 60/2 = 30
    //(60 + 30)/3 = 20
    // (60 + 30 + 20) / 4 = 
    // (60 + 30 + 20 + 15) / 5 =
    // (60 + 30 + 20 + 15 + 12) / 6 =
    // (60 + 30 + 20 + 15 + 12 + 10) / 7 =
    // (60 + 30 + 20 + 15 + 12 + 10 + 9) / 8 =
    // (60 + 30 + 20 + 15 + 12 + 10 + 9 + 8) / 9 =

    // 116, 104, 76, 40 20
 
    const resetToDefault = () => {
        clearInterval(timerID.value)
        beginCountdown.value = false
        if (beatCountdown.value) beatCountdown.value = false
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
        characterEqualityArray.value = {}
        characterEqualityArray.value = []
        wpmPerSecond.value = {}
    }

    const sessionComplete = async () => {
        hasCompletedSession.value = true
        wpmTime()
        clearInterval(timerID.value)
        beginCountdown.value = false
        totalTime.value = (performance.now() - startTime.value).toFixed(0) / 1000
    }

    const switchNext = (config, restart) => {
        goNext.value = false
        resetToDefault()
        generateTest(config, restart)
        goNext.value = true
    }

    return {
        wpmTime,
        preferredConfigs,
        wpmPerSecond,
        characterEqualityArray,
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

        testContainerEl,
        containerHeight,
        scrollDistance,
        scrollTextContainer,
        containerText ,

        enterKey,
        backspaceIsPressed,

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