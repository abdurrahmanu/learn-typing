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
    const textAlign = ref(false)
    const pauseTyping = ref(false)
    const playerInput = ref('')
    const backspaceIsPressed = ref(false)
    const timedTyping = ref(false)
    const showMoreSettings = ref(false)
    const typeBlindly = ref(false)
    const customTexts = ref({})
    const useCustomText = ref(false)
    const enableRepeat = ref(false)
    const storedTextForRepeat = ref('')
    const typingCountdown = ref(30)
    const beginCountdown = ref(false)
    const countdown = ref(0)

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
    
    const generateText = (config, restart) => {
        if (enableRepeat.value || restart) {
            containerText.value = storedTextForRepeat.value
        } else {
            containerText.value = UseGetQuotes(config).res.value
        }
    }
    
    const resetToDefault = () => {
        hasStartedSession.value = false
        countdown.value = 0
        beginCountdown.value = false
        completionLevel.value = 0
        totalTime.value = null
        startTime.value = null
        correctCount.value = 0
        wrongCount.value = 0
        containerText.value = ''
        playerLastInput.value = ''
        playerInputLength.value = 0
        textAlign.value = false
        playerInput.value = ''
    }

    const sessionComplete = () => {
        hasStartedSession.value = false
        totalTime.value = performance.now() - startTime.value
    }

    const playerTyping = (e) => {
        if (e.type === 'keydown' && e.key === 'Backspace') {
            if (!enableBackSpace.value) return
            if (playerInputLength.value === 0) return
            backspaceIsPressed.value = true
            playerInputLength.value--
            playerInput.value = playerInput.value.slice(0, -1)
            playerLastInput.value = playerInput.value[playerInput.value - 1]
        }
        if (e.type === 'keydown') return
        if (e.type === 'keypress') {
            backspaceIsPressed.value = false
        }
        if (pauseTyping.value) return
        let eventSelector = getMobileOS() ? e.data : e.key
        if (!getMobileOS() && e.key === 'Enter') return 
        if (!hasStartedSession.value) hasStartedSession.value = true
        playerInputLength.value++
        if (playerInputLength.value === 1)  {
            if (timedTyping.value) beginCountdown.value = true
            startTime.value = performance.now();
        }
        completionLevel.value = ((playerInputLength.value + 1) / containerText.value.length) * 100        
        playerLastInput.value = eventSelector
        playerInput.value += playerLastInput.value

        if (playerInputLength.value === containerText.value.length) {
            sessionComplete()
        }
    }

    const inputEquality = computed(() => {
        return playerLastInput.value === containerText.value[playerInput.value.length - 1]
    })

    const switchNext = (config, restart) => {
        resetToDefault()
        generateText(config, restart)
    }
    
    function getMobileOS() {
        let userAgent = navigator.userAgent || navigator.vendor || window.opera;

        if (/windows phone/i.test(userAgent)) {
            return "Windows Phone";
        }

        if (/android/i.test(userAgent)) {
            return "Android";
        }

        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return "iOS";
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
        countdown,
        typeBlindly,
        typingCountdown,
        beginCountdown,
        enableBackSpace,
        useCustomText,
        showMoreSettings,
        enableRepeat,
        storedTextForRepeat,
        customTexts,
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
        pauseTyping,
        backspaceIsPressed,
        timedTyping,
    }
})