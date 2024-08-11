import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const countdownStore = defineStore('countdown', () => {
    const animationName = ref(null)
    const countDownElement = ref(null)
    const isNextCountDown = ref(true)
    const timerID = ref(null)
    const intervalID = ref(null)
    const start = ref(false)
    const countdown = ref(0)

    const clearCounter = (count) => {
        clearInterval(intervalID.value)
        clearTimeout(timerID.value)
        animationName.value = null
        countDownElement.value = null
        isNextCountDown.value = true
        timerID.value = null
        intervalID.value = null
        start.value = false
        countdown.value = count || 0
    }

    return {
        animationName,
        countDownElement,
        isNextCountDown,
        timerID,
        intervalID,
        start,
        countdown,
        clearCounter
    }
})
