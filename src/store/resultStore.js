import {defineStore} from 'pinia'
import {ref, computed} from 'vue'

export const resultStore = defineStore('resultStore', () => {


    
    const accuracyBasedOnLevels = computed(() => {
        if (difficulty.value === 'beginner') {
            return accuracy.value > 70 ? true : false
        }
        else if (difficulty.value === 'amateur') {
            return accuracy.value > 80 ? true : false
        }
        else if (difficulty.value === 'expert') {
            return accuracy.value > 95 ? true : false
        }
    })
    
    const wpmBasedOnLevels = computed(() => {
        if (customizers.value['timer']) {
            if (difficulty.value === 'beginner') {
            return beatCountdown.value && (WPM.value * (accuracy.value / 100)).toFixed(0) > 50 ? true : false
            }
            else if (difficulty.value === 'amateur') {
                return beatCountdown.value && (WPM.value * (accuracy.value / 100)).toFixed(0) > 65 ? true : false
            }
            else if (difficulty.value === 'expert') {
                return beatCountdown.value && (WPM.value * (accuracy.value / 100)).toFixed(0) > 85 ? true : false
            }
        } 
        
        else {        
            if (difficulty.value === 'beginner') {
                return (WPM.value * (accuracy.value / 100)).toFixed(0) > 50 ? true : false
            }
            else if (difficulty.value === 'amateur') {
                return (WPM.value * (accuracy.value / 100)).toFixed(0) > 65 ? true : false
            }
            else if (difficulty.value === 'expert') {
                return (WPM.value * (accuracy.value / 100)).toFixed(0) > 85 ? true : false
            }
        }
    })
    
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
    

    return {
        testResult,
        wpmBasedOnLevels,
        accuracyBasedOnLevels,
        ErrorRatioBasedOnLevels,
    }
})