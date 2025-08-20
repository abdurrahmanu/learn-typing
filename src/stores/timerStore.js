export const timerStore = defineStore('timerStore', () => {

    const typingState = typingStore()
    const {playerInput, playerInputLength} = storeToRefs(typingState)

    const characterEqualityArray = ref([])
    const wpmPerSecondTimerID = ref(null)
    const wpmPerSecond = ref({})
    const totalTime = ref(null)
    const startTime = ref(null)
    const timerID = ref()
    const timePaused = ref(0)
    const beginCountdown = ref(false)
    const beatCountdown = ref(null)

    const wpmTime = (sessionComplete) => {
        let secondsCount = ref(0)
        let prevLength = ref(0)

        if (!sessionComplete) {
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
        } 
        
        else {
            clearInterval(wpmPerSecondTimerID.value)
            clearInterval(timerID.value)
            beginCountdown.value = false
            totalTime.value = (performance.now() - startTime.value).toFixed(0) / 1000
        }
    }

    const clearTimer = () => {
        timePaused.value = true
        beginCountdown.value = false
        characterEqualityArray.value = []
        clearInterval(timerID.value)
        beginCountdown.value = false
        if (beatCountdown.value) beatCountdown.value = false
        else beatCountdown.value = null
        totalTime.value = 0
        startTime.value = null
    }

    return {
        wpmTime,
        clearTimer,
        totalTime,
        characterEqualityArray,
        wpmPerSecond,
        wpmPerSecondTimerID,
        timerID,
        startTime,
        beginCountdown,
        beatCountdown,
        timePaused
    }
})