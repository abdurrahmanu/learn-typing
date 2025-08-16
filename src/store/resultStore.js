export const resultStore = defineStore('resultStore', () => {
    const timerstore = timerStore()
    const {totalTime, beatCountdown} = storeToRefs(timerstore)

    const characterstore = characterStore()
    const {resultData, incorrectCharCount} = storeToRefs(characterstore)

    const customize = settingsStore()
    const {settings} = storeToRefs(customize)

    const mainstore = mainStore()
    const {currentTest} = storeToRefs(mainstore)

    const difficulty = computed(() => settings.value.difficulty)

    const test = computed(() => {
        return currentTest.value.test
    })

    const WPM = computed(() => {
        return Math.round(((test.value.length / 5) - (incorrectCharCount.value / 5)) / (totalTime.value/60))
    })

    const accuracy = computed(() => {
        return Math.round((resultData.value.correctCharCount/(test.value.length) * 100))
    })

    const failedToBeatCountdown = computed(() => settings.value['countdown'] && !beatCountdown.value)

    const accuracyBasedOnLevels = () => {
        const accuracyObject = {
            'beginner': accuracy.value > 70 ? true : false,
            'amateur': accuracy.value > 80 ? true : false,
            'expert': accuracy.value > 5 ? true : false,
        }

        return accuracyObject[difficulty.value]
    }
    
    const wpmBasedOnLevels = () => {
        let timer = failedToBeatCountdown.value? 'timer' : 'no-timer'

        const wpmObject = {
            'timer': {
                'beginner': beatCountdown.value && (WPM.value * (accuracy.value / 100)).toFixed(0) > 50 ? true : false,
                'amateur': beatCountdown.value && (WPM.value * (accuracy.value / 100)).toFixed(0) > 65 ? true : false,
                'expert': beatCountdown.value && (WPM.value * (accuracy.value / 100)).toFixed(0) > 85 ? true : false,
            },
            'no-timer': {
                'beginner': (WPM.value * (accuracy.value / 100)).toFixed(0) > 50 ? true : false,
                'amateur': (WPM.value * (accuracy.value / 100)).toFixed(0) > 65 ? true : false,
                'expert': (WPM.value * (accuracy.value / 100)).toFixed(0) > 85 ? true : false,
            }
        }

        return wpmObject[timer][difficulty.value]
    }

    const errorRatio = () => {
        const total = test.value.length
        const correct = failedToBeatCountdown.value ? 
        resultData.value.incorrectCharCount : 
        (resultData.value.incorrectCharCount) + (test.value.length - (resultData.value.incorrectCharCount + resultData.value.correctCharCount))

        return correct + '/' + total
    }

    const errorRatioLevel = () => {
        let result = resultData.value
        let length = test.value.length
        let timer = failedToBeatCountdown.value ? 'timer' : 'no-timer'

        const errorRatioObject = {
            'timer': {
                'beginner': ((result.incorrectCharCount) + (length - result.correctCharCount) / (length)) * 100 < 30,
                'amateur': ((result.incorrectCharCount) + (length - result.correctCharCount) / (length)) * 100 < 20,
                'expert': ((result.incorrectCharCount) + (length - result.correctCharCount) / (length)) * 100 < 10,
            },
            'no-timer': {
                'beginner': (result.incorrectCharCount / length) * 100 < 30,
                'amateur': (result.incorrectCharCount / length) * 100 < 20,
                'expert': (result.incorrectCharCount / length) * 100 < 10,
            }
        }

        return errorRatioObject[timer][difficulty.value]
    }
    
    const ErrorRatioBasedOnLevels = computed(() => errorRatioLevel() ? true : false)
    
    const testResult  = computed(() => {
        if (difficulty.value === 'beginner') {        
            return accuracy.value > 70 && (WPM.value * (accuracy.value / 100)).toFixed(0) > 50 && errorRatioLevel() ? 'you passed the test' : 'you failed the test'
        } 
        else if (difficulty.value === 'amateur') {
            return accuracy.value > 80 && (WPM.value * (accuracy.value / 100)).toFixed(0) > 65 && errorRatioLevel() ? 'you passed the test' : 'you failed the test'
        } 
        else if (difficulty.value === 'expert') {
            return accuracy.value > 95 && (WPM.value * (accuracy.value / 100)).toFixed(0) > 85 && errorRatioLevel() ? 'you passed the test' : 'you failed the test'
        }
    }) 

    const resultSections = computed(() => {
        return {
            'accuracy': [accuracy.value + '%', accuracyBasedOnLevels()],
            'time': totalTime.value.toFixed(0) + 's',
            'wpm': [(WPM.value * (accuracy.value / 100)).toFixed(0), wpmBasedOnLevels()],
            'error ratio': [errorRatio(), errorRatioLevel() ? true : false]
        }
    })

    const difficultyStyle = computed(() => {
        return difficulty.value === 'beginner' ? 'ring-[#44b0d3] text-[#44b0d3]' : difficulty.value === 'amateur' ? 'ring-[#ffa07a] text-[#ffa07a]' : difficulty.value === 'expert' ? 'ring-[#4d5f43] text-[#4d5f43]' : ''
    })



    return {
        WPM,
        accuracy,
        failedToBeatCountdown,
        testResult,
        difficultyStyle,
        resultSections,
        errorRatio,
        errorRatioLevel,
        wpmBasedOnLevels,
        accuracyBasedOnLevels,
        ErrorRatioBasedOnLevels,
    }
})