<template>
    <div :class="appTheme" class="cursor-default py-10 text-lg">
        <p class="py-1 text-2xl text-center text-slate-500 stats">STATISTICS</p>
        <div class="px-3 ring-[1px] uppercase rounded-full cursor-pointer w-fit mx-auto" :class="[difficultyStyle]">{{ difficulty }}</div>

        <div class="flex justify-center my-10 w-fit mx-auto ring-[1px] ring-transparent hover:ring-zinc-600 rounded-md text-xl p-5">
            <div v-for="(sectionValue, sectionKey, index) in resultSections" :key="index" class="px-2 text-center last:border-r-transparent border-r-2 border-r-black">
                <div>                        
                    <div class="px-2 border border-transparent rounded-full uppercase font-[400]">{{ sectionKey }}</div>
                </div>
                <p>{{ Array.isArray(sectionValue) ? sectionValue[0]  : sectionValue}}</p>
            </div>
            <div v-if="Array.isArray(sectionValue)" class="w-fit bottom-right">
                <pass v-if="sectionValue[1]" class="w-4" />
                <fail v-else class="w-4" />
            </div>
        </div>
        <!-- <LineChart :wpm="wpmPerSecond" /> -->
    </div>
</template>

<script setup>
import {computed, ref} from 'vue'
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
const {currentTest} = storeToRefs(store)

const WPM = ref(Math.round(((currentTest.value.length / 5) - (incorrectCharCount.value / 5)) / (totalTime.value/60)))

const accuracy = ref(Math.round((resultData.value.correctCharCount/(currentTest.value.length) * 100)))

const failedToBeatCountdown = computed(() => customizers.value['timer'] && !beatCountdown.value)

const errorRatio = () => {
    const total = currentTest.value.length
    const correct = failedToBeatCountdown.value ? 
    resultData.value.incorrectCharCount : 
    (resultData.value.incorrectCharCount) + (currentTest.value.length - (resultData.value.incorrectCharCount + resultData.value.correctCharCount))

    return correct + '/' + total
}

const errorRatioLevel = () => {
    let result = resultData.value
    let length = currentTest.value.length
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

const difficultyStyle = computed(() => {
    return difficulty.value === 'beginner' ? 'ring-[#44b0d3] text-[#44b0d3]' : difficulty.value === 'amateur' ? 'ring-[#ffa07a] text-[#ffa07a]' : difficulty.value === 'expert' ? 'ring-[#4d5f43] text-[#4d5f43]' : ''
})
</script>




















