<template>
    <div :class="appTheme" class="min-h-[200px] text-center xl:pt-20">
        <p class="py-3 font-mono text-2xl text-center text-slate-500">STATISTICS</p>
        <div class="w-fit p-[1px] hover:bg-gradient-to-tr transition-all duration-500rounded-md m-auto py-3">            
            <div class="flex justify-center p-3 m-auto font-mono border border-transparent rounded-md w-fit hover:border-zinc-600">
                <div class="relative px-4 text-center border-r border-r-teal-700">
                    <div :class="[accuracy() > 85 ? 'bg-green-500' : 'bg-red-400']" class="w-[10px] absolute bottom-0 right-0 h-[10px]"></div>
                    <div class="text-xs">ACCURACY</div>
                    <div class="">{{ accuracy() }}%</div>
                </div>
                <div class="relative px-4 text-center border-r border-r-teal-700">
                    <div class="text-xs">TIME</div>
                    <div class="">{{ resultData.totalTime }}s</div>
                </div>
                <div class="relative px-4 text-center border-r border-r-teal-700">
                    <div :class="[resultData.WPM > 50 ? 'bg-green-500' : 'bg-red-400']" class="w-[10px] absolute bottom-0 right-0 h-[10px]"></div>
                    <div class="text-xs">WPM</div>
                    <div class="">{{ (resultData.WPM * (accuracy() / 100)).toFixed(0) }}</div>
                </div>
                <div class="relative px-4 border-r border-r-teal-700"> 
                    <div :class="[errorRatioLevel() ? 'bg-green-500' : 'bg-red-400']" class="w-[10px] absolute bottom-0 right-0 h-[10px]"></div>
                    <div class="text-xs">ERROR RATIO</div>
                    <div class="">{{ errorRatio() }}<span class="text-[11px] font-cursive font-bold"> letters</span></div>
                </div>
            </div>
            <div class="pt-3">{{ testType }}</div>
        </div>
        <div class="space-y-1">            
            <div v-if="timedTyping" :class="[testDetailsForTimedTyping ? 'text-green-700' : 'text-red-400']" class="text-center uppercase">{{ testDetailsForTimedTyping ? 'you passed the test' : 'you failed the test'}}</div>
            <div v-else  :class="[testDetails ? 'text-green-700' : 'text-red-400']" class="text-center uppercase">{{ testDetails ? 'you passed the test' : 'you failed the test' }}</div>
            <div v-if="beatCountdown" class="text-green-700 uppercase">You beat the time, you left {{ remainingTime() }}<span class="lowercase">s</span></div>
            <div v-if="timedTyping && !beatCountdown" class="text-red-500 uppercase">You were unable to beat the time</div>
        </div>
        
        <!-- <Bar :data="chartData" class="w-[600px] max-w-[90%] bg-neutral-700 m-auto relative p-2"/> -->
    </div>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue'
// import {Bar} from 'vue-chartjs'
// import {Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js'
import {storeToRefs} from 'pinia'
import {mainStore} from '../store/mainStore'
import {themeStore}  from '../store/themeStore'
import { setDoc, doc, updateDoc} from 'firebase/firestore'
import {db} from '../firebase'
import {authStore} from '../store/authStore'
import { customizeStore } from '../store/customizeStore'

const auth_ = authStore()
const { userID } = storeToRefs(auth_)

const customize = customizeStore()
const {mode} = storeToRefs(customize)

const theme_ = themeStore()
const { appTheme } = storeToRefs(theme_)

// ChartJS.register( Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)


const store = mainStore()
const {resultData, beatCountdown, timedTyping, savedCountdown} = storeToRefs(store)

// const chartData = ref({
//     labels: Object.keys(alphabetsInputTime.value).reverse(),
//     datasets: [ {data: Object.values(alphabetsInputTime.value), label: 'SESSION RESULT', borderWidth: 1, borderColor: '#69e869', color: '#97a3b8'} ]
// })

const remainingTime = () => {
    return (savedCountdown.value - resultData.value.totalTime).toFixed(2)
}

const testType = computed(() => {
    if (timedTyping.value) {
        if (mode.value === 'auto') {
            return `TEST MODE - COUNTDOWN `
        } else if (mode.value === 'alphabets') {
            return `ALPHABETS MODE - COUNTDOWN`
        }
    } else {
        if (mode.value === 'auto') {
            return `TEST MODE`
        } else if (mode.value === 'alphabets') {
            return `ALPHABETS MODE `
        }
    }
})

const accuracy = () => {
    return Math.round((resultData.value.correctCount/(resultData.value.containerText.length) * 100))
}

const errorRatio = () => {
    if (timedTyping.value && !beatCountdown.value) {
        return (resultData.value.wrongCount) + (resultData.value.containerText.length - (resultData.value.wrongCount + resultData.value.correctCount)) + '/' + (resultData.value.containerText.length)
    } else {        
        return (resultData.value.wrongCount) + '/' + (resultData.value.containerText.length)
    }
}

const errorRatioLevel = () => {
    if (timedTyping.value && !beatCountdown.value) {
        return ((resultData.value.wrongCount) + (resultData.value.containerText.length - resultData.value.correctCount) / (resultData.value.containerText.length)) * 100 < 10
    } else {        
    return (resultData.value.wrongCount / resultData.value.containerText.length) * 100 < 10
    }
}

const testDetails  = computed(() => {
    return accuracy() > 90 && (resultData.value.WPM * (accuracy() / 100)).toFixed(0) > 50 && errorRatioLevel() ? true : false
})

const testDetailsForTimedTyping = computed(() => {
    return beatCountdown.value && accuracy() > 85 && (resultData.value.WPM * (accuracy() / 100)).toFixed(0) > 60 && errorRatioLevel() ? true : false
})


// onMounted( async () => {
//     if (userID.value) {
//         await setDoc(doc(db, "users", userID.value), resultData.value);
//     }
// })
</script>






















