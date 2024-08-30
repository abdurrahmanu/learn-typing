import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const countdownStore = defineStore('countdown', () => {
    const countDownElement = ref(null)
    const isNextCountDown = ref(true)
    const timerID = ref(null)
    const intervalID = ref(null)
    const start = ref(false)
    const textLength = ref()
    const level = ref('beginner')
    const countdown = ref(0)

    const timeForBeginner = computed(() => {
        let correctWords = ((textLength.value ) / 5) - (textLength.value  * 0.3)
        let wpm = 50
        return Math.ceil(((textLength.value / 5) * 60) / wpm)
    })
    
    const timeForAmateur = computed(() => {
        let wpm = 70
        return Math.ceil(((textLength.value / 5) * 60) / wpm)
    })
    
    const timeForExpert = computed(() => {
        let wpm = 90
        return Math.ceil(((textLength.value / 5) * 60) / wpm)
    })

    const clearCounter = () => {
        clearInterval(intervalID.value)
        clearTimeout(timerID.value)
        countDownElement.value = null
        isNextCountDown.value = true
        timerID.value = null
        intervalID.value = null
        start.value = false
        countdown.value = 0
    }

    return {
        textLength,
        timeForAmateur,
        timeForBeginner,
        timeForExpert,
        countDownElement,
        isNextCountDown,
        timerID,
        intervalID,
        start,
        countdown,
        level,
        clearCounter
    }
})
