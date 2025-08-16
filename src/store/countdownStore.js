export const countdownStore = defineStore('countdown', () => {
    const countDownElement = ref(null)
    const isNextCountDown = ref(true)
    const timerID = ref(null)
    const intervalID = ref(null)
    const start = ref(false)
    const countdown = ref(0)

    const mainstore = mainStore()
    const {currentTest} = storeToRefs(mainstore)

    const timer = (level) => {
        const {test} = currentTest.value

        let wpm = {
            'beginner': 50,
            'amateur': 70,
            'expert': 90
        }

        return Math.ceil(((test.length / 5) * 60) / wpm[level])
    }

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
        countDownElement,
        isNextCountDown,
        timerID,
        intervalID,
        start,
        countdown,
        clearCounter,
        timer,
    }
})
