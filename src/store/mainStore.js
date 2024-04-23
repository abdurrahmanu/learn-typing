import {defineStore} from 'pinia'
import {ref, computed} from 'vue'
import {UseGetQuotes} from '../composables/UseGetQuotes'

export const mainStore = defineStore('mainStore', () => {
    const enableBackSpace = ref(true)
    const completionLevel = ref(0)
    const correctCount = ref(0)
    const wrongCount = ref(0)
    const containerText = ref('')
    const playerLastInput = ref('')
    const playerInputLength = ref(0)
    const startTime = ref(null)
    const totalTime = ref(null)
    const hasStartedSession = ref(false)
    const pauseTyping = ref(false)
    const playerInput = ref('')
    const backspaceIsPressed = ref(false)
    const timedTyping = ref(false)
    const customTexts = ref({})
    const useCustomText = ref(false)
    const enableRepeat = ref(false)
    const storedTextForRepeat = ref('')
    const typingCountdown = ref(30)
    const beginCountdown = ref(false)
    const countdown = ref(0)
    const howToUseCustomText = ref('select text using options')
    const timerID = ref()
    const alphabets = ref(false)
    const alphabetsMode = ref({
        uppercase: false,
        customCase: false,
        jumbo: false,
        backwards: false,
        spaced: false,
        styled: false,
    })

    const resultData = computed(() => {
        return {
            correctCount: correctCount.value,
            wrongCount: wrongCount.value,
            containerText: containerText.value,
            characters: containerText.value.length,
            totalTime: Math.round(totalTime.value),
            testType: ''
        }
    })
    
    const generateText = (config, restart, options) => {
        if (alphabets.value) {
            const englishAlphabets = ref('abcdefghijklmnopqrstuvwxyz')
            const spaced = 'a b c d e f g h i j k l m n o p q r s t u v w x y z'
            containerText.value = englishAlphabets.value

            if (alphabetsMode.value.spaced) {
                containerText.value = spaced
            }

            if (alphabetsMode.value.jumbo) {
                const text = ref(containerText.value.split(''))
                for (let index = text.value.length - 1; index > 0; index--) {
                    let random = Math.floor(Math.random() * index + 1)
                }
                containerText.value = text.value
                containerText.value = 'yuiopasdertflkjhgzxcqwmnbv'
                if (alphabetsMode.value.spaced) {
                    containerText.value = 'y u i o p a s d e r t f l k j h g z x c q w m n b v'
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

        if (howToUseCustomText.value === 'use both system and custom') {
            let custom = Object.values(customTexts.value)
            containerText.value = UseGetQuotes(config, custom).res.value
            return
        }

        if (useCustomText.value && howToUseCustomText.value === 'select text using options' && options) {
            containerText.value = storedTextForRepeat.value
            return
        }

        if (howToUseCustomText.value === 'use only custom') {
            let texts = Object.values(customTexts.value)
            let length = Object.keys(customTexts.value).length - 1
            let index = Math.round(Math.random() * length)
            containerText.value = texts[index]
            return
        }

        if (enableRepeat.value || restart ) {
            containerText.value = storedTextForRepeat.value
        } 
        else {
            containerText.value = UseGetQuotes(config).res.value
        }
    }
    
    const resetToDefault = () => {
        if (timedTyping.value) {
            clearInterval(timerID.value)
            beginCountdown.value = false
            countdown.value = false
        }
        hasStartedSession.value = false
        beginCountdown.value = false
        completionLevel.value = 0
        totalTime.value = null
        startTime.value = null
        correctCount.value = 0
        wrongCount.value = 0
        containerText.value = ''
        playerLastInput.value = ''
        playerInputLength.value = 0
        playerInput.value = ''
    }

    const sessionComplete = () => {
        if (timedTyping.value) {
            clearInterval(timerID.value)
            beginCountdown.value = false
            countdown.value = false
        }
        hasStartedSession.value = false

        totalTime.value = performance.now() - startTime.value
    }

    const playerTyping = (e) => {
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
        if (!getMobileOS() && e.key === 'Enter') return 
        if (!hasStartedSession.value) hasStartedSession.value = true
        playerInputLength.value++
        if (playerInputLength.value === 1)  {
            if (timedTyping.value) beginCountdown.value = true
            startTime.value = performance.now();
        }
        playerLastInput.value = eventSelector
        playerInput.value += playerLastInput.value
        if (playerInputLength.value === containerText.value.length) sessionComplete()
    }

    const playerInputTyping = (e) => {
        if (pauseTyping.value) return
        if (e.inputType === 'deleteContentBackward') {
            if (!enableBackSpace.value) return
            if (playerInputLength.value === 0) return
            backspaceIsPressed.value = true
        }
        if (e.inputType === 'deleteContentBackward') return
        backspaceIsPressed.value = false
        if (!hasStartedSession.value) hasStartedSession.value = true
        if (playerInputLength.value === 1)  {
            if (timedTyping.value) beginCountdown.value = true
            startTime.value = performance.now();
        }
        if (playerInputLength.value === containerText.value.length) sessionComplete()
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
        timerID,
        howToUseCustomText,
        countdown,
        typingCountdown,
        beginCountdown,
        enableBackSpace,
        useCustomText,
        enableRepeat,
        storedTextForRepeat,
        customTexts,
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
        pauseTyping,
        backspaceIsPressed,
        timedTyping,
        alphabets,
        alphabetsMode,
    }
})