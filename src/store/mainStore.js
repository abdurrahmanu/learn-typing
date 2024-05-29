import {defineStore} from 'pinia'
import {ref, computed} from 'vue'
import {UseGetQuotes} from '../composables/UseGetQuotes'

export const mainStore = defineStore('mainStore', () => {
    //Dictionary mode states
    const searchWord = ref('')
    const searchInputEl = ref(null) // Search Element
    const searchFieldIsFocused = ref(false)
    const allDictionaryDefinitons = ref({}) // Fetched definitions
    const dictionaryData = ref({ // Fetched data
        wordData: '',
        message: '',
        error: ''
    })
    
    //Alphabets mode states
    const useAlphabetCombination = ref(false)
    const alphabetsCombination = ref([]) // Alphabets combination for typing
    const alphabetsMode = ref({ // Alphabets mode config
        uppercase: false,
        customCase: false,
        random: false,
        backwards: false,
        spaced: false,
        styled: false,
    })
    
    // Element for input event - Mobile devices
    const inputEl = ref(null)

    //Test container
    const containerRef = ref(null)
    const containerHeight = ref(0)
    const scrollDistance = ref(0) // Container scroll Y axis
    const scrollTextContainer = ref({}) // Scroll top distance {top: number}
    const containerText = ref('') // Test

    //Modes
    const dictionaryMode = ref(false)
    const gameMode = ref(false)
    const alphabets = ref(false)

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

    const generateText = async (config, restart, options) => {
        if (dictionaryMode.value) {
            if (dictionaryData.value.wordData.length) {
                for (let index = 0; index < dictionaryData.value.wordData.length; index++) {
                    const {definitions} = dictionaryData.value.wordData[index]
                    allDictionaryDefinitons.value[dictionaryData.value.wordData[index].partOfSpeech] = definitions.map((data) => data.definition )
                }
                let randomPartOfSpeech = Math.ceil(Math.random() * dictionaryData.value.wordData.length) - 1
                let randomDefiniton = Math.ceil(Math.random() * Object.values(allDictionaryDefinitons.value)[randomPartOfSpeech].length) - 1
                containerText.value = Object.values(allDictionaryDefinitons.value)[randomPartOfSpeech][randomDefiniton] || 'Nothing to show'
            } else {
                containerText.value = dictionaryData.value.error || dictionaryData.value.message
            }
        }

        if (gameMode.value) {
            containerText.value = 'This is game Mode'
            return
        }

        if (alphabets.value) {
            enableRepeat.value = false
            const englishAlphabets = ref('abcdefghijklmnopqrstuvwxyz')
            containerText.value = englishAlphabets.value

            if (useAlphabetCombination.value && alphabetsCombination.value) {
                containerText.value = ''
                for (let index = 1; index < 60; index++) {
                    let random = Math.ceil(Math.random()  * alphabetsCombination.value.length) - 1
                    if (index % 6 === 0) containerText.value += ' '
                    else containerText.value += alphabetsCombination.value[random]
                }
            }

            if (alphabetsMode.value.random) {
                if (!(useAlphabetCombination.value && alphabetsCombination.value)) {
                    const text = ref(containerText.value.split(''))
                    let length = text.value.length
                    containerText.value = ''
    
                    for (let index = 0; index < length; index++) {
                        let random = Math.ceil(Math.random() * text.value.length) - 1
                        containerText.value += text.value[random]
                        text.value.splice(random, 1)
                    }
                }
            }

                if (alphabetsMode.value.spaced) {
                    let text = containerText.value
                    containerText.value = ''

                    for (let index = 0; index < (2 * text.length) -1; index++) {
                        if (index % 2 !== 0) {
                            containerText.value += ' '
                        } else {
                            containerText.value += text[index/2]
                        }
                    }
                }

                if (alphabetsMode.value.customCase) {
                    let text = containerText.value
                    containerText.value = ''
                    for (let index = 0; index < text.length; index++) {
                        let random = Math.round(Math.random() + 1)
                        if (random % 2 === 0) containerText.value += text[index].toUpperCase()
                        else containerText.value += text[index].toLowerCase()
                    }
                }
    
                if (alphabetsMode.value.uppercase) {
                    containerText.value = containerText.value.split('').map(alpha => alpha.toUpperCase()).join('')
                }
    
                if (alphabetsMode.value.backwards) {
                    containerText.value = containerText.value.split('').reverse().join('')
                }
            

            return
        }

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
        else if (!dictionaryMode.value && !alphabets.value && !gameMode.value) {
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
        dictionaryData.value = {
            wordData: '',
            message: '',
            error: ''
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

    const sessionComplete = () => {
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
        if (e.key === 'Enter' && !enterKey.value) return
        if (gameMode.value) return
        if (searchFieldIsFocused.value) return
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
        if (e.key === 'Enter' && !enterKey.value) return
        if (gameMode.value) return
        if (searchFieldIsFocused.value) return
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

    const switchNext = (config, restart, options) => {
        resetToDefault()
        generateText(config, restart, options)
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

        searchWord,
        searchInputEl,
        searchFieldIsFocused,
        allDictionaryDefinitons,
        dictionaryData ,

        useAlphabetCombination,
        alphabetsCombination,
        alphabets,
        
        inputEl,

        containerRef,
        containerHeight,
        scrollDistance,
        scrollTextContainer,
        containerText ,
        
        alphabetsMode,
        dictionaryMode,
        gameMode,

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

        movie,
        customTexts,
        authoredQuote,
    }
})














