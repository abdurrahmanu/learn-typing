<template>
    <div :class="appTheme" class="min-h-[200px] text-center cursor-default result">
        <div class="flex w-fit m-auto gap-x-4">
            <p class="py-1 text-2xl text-center text-slate-500 stats">STATISTICS</p>
            <div class="relative px-3 ring-[1px] hover:ring-[3px] m-auto font-black text-[15px] drop-shadow-md uppercase rounded-full cursor-pointer w-fit peer" :class="[difficulty === 'beginner' ? 'ring-[#44b0d3] text-[#44b0d3]' : difficulty === 'amateur' ? 'ring-[#ffa07a] text-[#ffa07a]' : difficulty === 'expert' ? 'ring-[#4d5f43] text-[#4d5f43]' : '']">{{ difficulty }}</div>
        </div>
        <div class="flex py-1 m-auto gap-x-2 w-fit text-slate-300">            
            <div class="relative w-fit">       
                <div :class="[difficulty === 'beginner' ? 'bg-[#44b0d3]' : difficulty === 'amateur' ? 'bg-[#ffa07a]' : difficulty === 'expert' ? 'bg-[#4d5f43]' : '']" class="absolute rounded-md top-[115%] left-[50%] translate-x-[-50%] z-[1] text-left p-2 hidden peer-hover:block text-black font-medium shadow-sm shadow-black text-[13px] max-w-[300px]">
                    <p class="font-bold underline uppercase">TO PASS {{ difficulty }} TEST</p>
                    <p class="min-w-[200px]">* Accuracy more than {{  difficulty === 'beginner' ? '70%' : difficulty === 'amateur' ? '80%' : difficulty === 'expert' ? '95%' : '' }} </p>
                    <p class="min-w-[200px]">* Words Per Minute (WPM) more than {{ difficulty === 'beginner' ? '50' : difficulty === 'amateur' ? '65' : difficulty === 'expert' ? '85' : '' }} </p>
                    <p class="min-w-[200px]">* Error Percentage less than {{  difficulty === 'beginner' ? '30%' : difficulty === 'amateur' ? '20%' : difficulty === 'expert' ? '10%' : '' }} </p>
                    <p class="min-w-[200px]">* Beat Countdown</p>
                </div>
            </div>
        </div>
        <div class="w-fit p-[1px] hover:bg-gradient-to-tr transition-all duration-500rounded-md m-auto py-3">            
            <div class="flex justify-center p-3 m-auto border border-transparent  text-[17px] rounded-md w-fit hover:border-zinc-600">

                <div v-for="(sectionValue, sectionKey, index) in resultSections" :key="index" class="relative px-2  text-center border-r border-r-teal-700">
                    <div v-if="Array.isArray(sectionValue)">
                        <pass v-if="sectionValue[1]" class="absolute bottom-0 right-[2px] w-4" />
                        <fail v-else class="absolute bottom-0 right-[2px] w-4" />
                    </div>
                    <div class="relative">                        
                        <div class="px-2 border border-transparent rounded-full peer uppercase font-[400]">{{ sectionKey }}</div>
                        <!-- <div class="absolute text-sm rounded-md top-[115%] left-[0%] z-[1] text-left p-1 hidden peer-hover:block shadow-sm shadow-black bg-neutral-900 min-w-[185px]  max-w-[300px] text-slate-400">
                            <p>The percentage of correctly typed characters out of the total number of characters.</p>
                        </div> -->
                    </div>
                    <div class="config font-[500]">{{ Array.isArray(sectionValue) ? sectionValue[0]  : sectionValue}}</div>
                </div>
            </div>
        </div>
        <!-- <LineChart :wpm="wpmPerSecond" /> -->
    </div>
</template>

<script setup>
import {computed, onUpdated, ref} from 'vue'
import {storeToRefs} from 'pinia'
import {mainStore} from '../store/mainStore'
import {themeStore}  from '../store/themeStore'
import { customizeStore } from '../store/customizeStore'
import { countdownStore } from '../store/countdownStore'
import pass from '../components/svg/pass.vue'
import fail from '../components/svg/fail.vue'
import LineChart from '../components/LineChart.vue'
import {charCountStore} from '../store/charCountStore'
import { resultStore } from '../store/resultStore'
import {timerStore} from '../store/timerStore'

const resultstore = resultStore()
const {} = storeToRefs(resultstore)

const timerstore = timerStore()
const {totalTime, beatCountdown, wpmPerSecond} = storeToRefs(timerstore)

const charcountstore = charCountStore()
const {resultData, incorrectCharCount} = storeToRefs(charcountstore)

const count = countdownStore()
const {level}  = storeToRefs(count)

const customize = customizeStore()
const {customizers, difficulty} = storeToRefs(customize)

const theme_ = themeStore()
const { appTheme } = storeToRefs(theme_)

const store = mainStore()
const {containerText} = storeToRefs(store)

const WPM = ref(Math.round(((containerText.value.length / 5) - (incorrectCharCount.value / 5)) / (totalTime.value/60)))

const accuracy = ref(Math.round((resultData.value.correctCharCount/(containerText.value.length) * 100)))

const failedToBeatCountdown = computed(() => customizers.value['timer'] && !beatCountdown.value)

const errorRatio = () => {
    const total = containerText.value.length
    const correct = failedToBeatCountdown.value ? 
    resultData.value.incorrectCharCount : 
    (resultData.value.incorrectCharCount) + (containerText.value.length - (resultData.value.incorrectCharCount + resultData.value.correctCharCount))

    return correct + '/' + total
}

const errorRatioLevel = () => {
    let result = resultData.value
    let length = containerText.value.length
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

const resultSections = computed(() => {
    return {
        'accuracy': [accuracy.value + '%', accuracyBasedOnLevels()],
        'time': totalTime.value.toFixed(0) + 's',
        'wpm': [(WPM.value * (accuracy.value / 100)).toFixed(0), wpmBasedOnLevels()],
        'error ratio': [errorRatio(), errorRatioLevel() ? true : false]
    }
})

const testResult  = computed(() => {
    let timer = failedToBeatCountdown.value? 'timer' : 'no-timer'

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
</script>




















