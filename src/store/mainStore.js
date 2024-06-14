import {defineStore} from 'pinia'
import {ref, computed} from 'vue'
import {UseGetQuotes} from '../composables/UseGetQuotes'

export const mainStore = defineStore('mainStore', () => {
    const inputEl = ref(null)
    const focus = ref(false)
    const mode = ref('auto')

    //Test container
    const containerRef = ref(null)
    const containerHeight = ref(0)
    const scrollDistance = ref(0) // Container scroll Y axis
    const scrollTextContainer = ref({}) // Scroll top distance {top: number}
    const containerText = ref('') // Test

    //keys states
    const enterKey = ref(false)
    const enableBackSpace = ref(true)
    const backspaceIsPressed = ref(false)

    // Time states
    const timedTyping = ref(false)
    const startTime = ref(null)
    const totalTime = ref(null)
    const timerID = ref()
    const timePaused = ref(0)
    const beginCountdown = ref(false)

    // On-typing states
    const pauseTyping = ref(true)
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
    const enableRepeat = ref(false) // repeat a test
    const storedTextForRepeat = ref('') // test to repeat
    const howToUseCustomText = ref('select text using options')

    // Tests data for different modes 
    const movie = ref({}) // Data for quotes mode && movie quotes
    const customTexts = ref({}) // Data for custom quotes
    const authoredQuote = ref({}) // Data for quotes mode && authored quotes

    const resultData = computed(() => {
        return {
            correctCount: correctCount.value,
            wrongCount: wrongCount.value,
            containerText: containerText.value,
            characters: containerText.value.length,
            totalTime: totalTime.value.toFixed(2),
            testType: timedTyping.value ? 'Countdown mode ' + savedCountdown.value + 's' : '',
            WPM: Math.round( (((containerText.value.length - wrongCount.value) / 5)) / (totalTime.value/60))
        }
    })

    const generateText = async (config, restart, test) => {
        if (test) containerText.value = test

        // if (howToUseCustomText.value === 'use both system and custom') {
        //     let custom = Object.values(customTexts.value)
        //     containerText.value = UseGetQuotes(config, custom).res.value
        //     return
        // }
        // if (useCustomText.value && howToUseCustomText.value === 'select text using options' && options) {
        //     containerText.value = storedTextForRepeat.value
        //     return
        // }
        // if (howToUseCustomText.value === 'use only custom') {
        //     let texts = Object.values(customTexts.value)
        //     let length = Object.keys(customTexts.value).length - 1
        //     let index = Math.round(Math.random() * length)
        //     containerText.value = texts[index]
        //     return
        // }

        if (enableRepeat.value || restart ) {
            containerText.value = storedTextForRepeat.value
        }
        else if (!test) {
            let quote = UseGetQuotes(config).res.value
            if (typeof quote === 'object') {  
                if (!quote[2]) {
                    containerText.value = quote[1]
                    authoredQuote.value = {
                        author: quote[0]
                    }
                }
                else {
                    containerText.value = quote[2]
                    movie.value = {
                        name : quote[0],
                        quoteAuthor: quote[1]
                    }
                }
            } 
            else {
                movie.value = {}
                authoredQuote.value = {}
                containerText.value = quote
            }
        }
        storedTextForRepeat.value = containerText.value
    }

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

    const managePlayerInput = () =>{
        if (getMobileOS()) playerLastInput.value = playerInput.value[playerInput.value.length - 1]

        if (!playerInput.value) {
            if (previousPlayerInput.value === containerText.value[0]) correctCount.value--
            else wrongCount.value--
        }
        else {
            if (previousPlayerInput.value.length > playerInput.value.length) {
                if (containerText.value[previousPlayerInput.value.length - 1] === previousPlayerInput.value[previousPlayerInput.value.length - 1]) correctCount.value--
                else wrongCount.value--
            }
            else {
                if (getMobileOS()) {
                    if (playerInput.value[playerInput.value.length - 1] === containerText.value[playerInput.value.length - 1]) {
                        correctCount.value ++
                    }
                    else {
                        wrongCount.value++
                    }
                } else {
                    if (playerLastInput.value === containerText.value[playerInput.value.length - 1]) {
                        correctCount.value ++
                    }
                    else {
                        wrongCount.value++
                    }
                }
            }
        }
    
        playerInputLength.value = playerInput.value.length
        completionLevel.value = ((playerInputLength.value) / containerText.value.length) * 100     
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
        if (localStorage.getItem('dorayi-typing-result')) {
            const res = ref(JSON.parse(localStorage.getItem('dorayi-typing-result')))
            res.value.push(resultData.value)
            localStorage.setItem('dorayi-typing-result', JSON.stringify(res.value))
        } else {
        localStorage.setItem('dorayi-typing-result', JSON.stringify([resultData.value]))
        }
    }

    const playerTyping = (e) => {
        if (focus.value) return
        if (e.key === 'Enter' && !enterKey.value) return
        if (pauseTyping.value) return
        if (e.type === 'keydown' && e.key === 'Backspace') {
            if (!enableBackSpace.value) return
            if (playerInputLength.value === 0) return
            backspaceIsPressed.value = true
            playerInputLength.value--
            playerInput.value = playerInput.value.slice(0, -1)
            playerLastInput.value = playerInput.value[playerInput.value.length - 1]
        }
        if (e.type === 'keydown') return
        if (e.type === 'keypress')  backspaceIsPressed.value = false   
        let eventSelector = e.key || e.data
        if (e.key === 'Enter' && !enterKey.value) return 
        playerInputLength.value++
        
        if (playerInputLength.value === 1)  {
            if (timedTyping.value) {
                beatCountdown.value = false
                beginCountdown.value = true
            }
            startTime.value = performance.now();
        } 
        if (e.key === 'Enter' && e.type === 'keypress' && enterKey.value) playerLastInput.value = ' '
        else  playerLastInput.value = eventSelector
        playerInput.value += playerLastInput.value
        if (playerInputLength.value === containerText.value.length) {
            if (timedTyping.value) beatCountdown.value = true
            sessionComplete()
        }
    }

    const playerInputTyping = (e) => {
        if (focus.value) return
        if (e.key === 'Enter' && !enterKey.value) return
        if (pauseTyping.value) return
        if (e.inputType === 'deleteContentBackward') {
            if (!enableBackSpace.value) return
            if (playerInputLength.value === 0) return
            backspaceIsPressed.value = true
        }
        if (e.inputType === 'deleteContentBackward') return
        backspaceIsPressed.value = false
        if (playerInputLength.value === 1)  {
            if (timedTyping.value) {
                beatCountdown.value = false
                beginCountdown.value = true
            }
            startTime.value = performance.now();
        } 

        if (e.key === 'Enter' && enterKey.value)  playerInput.value += ' '
        if (playerInput.value.length === containerText.value.length) {
            if (timedTyping.value) beatCountdown.value = true
            sessionComplete()
        }
    }

    const switchNext = (config, restart, test) => {
        resetToDefault()
        generateText(config, restart, test)
    }

    function getMobileOS() {
        let userAgent = navigator.userAgent || navigator.vendor || window.opera;
        let regex = /Mobi|Android|webOS|iPhone|iPad|iPod|Blackberry|IEMobile|Opera Mini/i.test(userAgent) && !window.MSStream
        if (regex || ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
            return 'mobile'
        }
        return '';
    }

    return {
        getMobileOS,
        resetToDefault,
        generateText,
        sessionComplete,
        playerTyping,
        switchNext,
        playerInputTyping,
        managePlayerInput,
        resultData,

        inputEl,
        focus,

        containerRef,
        containerHeight,
        scrollDistance,
        scrollTextContainer,
        containerText ,

        enterKey,
        enableBackSpace,
        backspaceIsPressed,

        timedTyping,
        startTime,
        totalTime,
        timerID,
        timePaused,

        pauseTyping,
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
        enableRepeat,
        storedTextForRepeat,
        howToUseCustomText,

        mode,
        movie,
        customTexts,
        authoredQuote,
    }
})














