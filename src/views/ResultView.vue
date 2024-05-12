<template>
    <div class="min-h-[200px] text-center text-white">
        <p class="py-3 font-mono text-2xl text-center text-slate-500">STATISTICS</p>
        <div class="w-fit p-[1px] hover:bg-gradient-to-tr transition-all duration-500rounded-md m-auto">            
            <div class="flex justify-center p-3 m-auto font-mono border border-transparent rounded-md bg-neutral-900 text-slatext-slate-400 w-fit hover:border-zinc-600">
                <div class="relative px-4 text-center border-r">
                    <div :class="[accuracy() > 85 ? 'bg-green-500' : 'bg-red-400']" class="w-[10px] absolute bottom-0 right-0 h-[10px]"></div>
                    <div class="text-xs">ACCURACY</div>
                    <div class="">{{ accuracy() }}%</div>
                </div>
                <div class="relative px-4 text-center border-r">
                    <div class="text-xs">TIME</div>
                    <div class="">{{ elapsedTime() }}s</div>
                </div>
                <div class="relative px-4 text-center border-r">
                    <div :class="[wordsPerMinute() > 50 ? 'bg-green-500' : 'bg-red-400']" class="w-[10px] absolute bottom-0 right-0 h-[10px]"></div>
                    <div class="text-xs">WPM</div>
                    <div class="">{{ wordsPerMinute() }}</div>
                </div>
                <div class="relative px-4"> 
                    <div :class="[errorRatioLevel() ? 'bg-green-500' : 'bg-red-400']" class="w-[10px] absolute bottom-0 right-0 h-[10px]"></div>
                    <div class="text-xs">ERROR RATIO</div>
                    <div class="">{{ errorRatio() }}</div>
                </div>
            </div>
            <div class="py-1 text-zinc-600">{{ resultData.testType }}</div>
        </div>
        <div v-if="beatCountdown" class="text-green-700 uppercase">You beat the time, you left {{ remainingTime() }}</div>
        <div v-if="timedTyping && !beatCountdown" class="text-red-500">You were unable to beat the time</div>
        <!-- <Bar :data="chartData" class="w-[600px] max-w-[90%] bg-neutral-700 m-auto relative p-2"/> -->
        <div class="py-16 font-mono text-2xl text-black uppercase">
            STATISTICS GRAPH COMING SOON...
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
// import {Bar} from 'vue-chartjs'
// import {Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js'
import {storeToRefs} from 'pinia'
import {mainStore} from '../store/mainStore'

// ChartJS.register( Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const store = mainStore()
const {resultData, alphabetsInputTime, beatCountdown, timedTyping, savedCountdown} = storeToRefs(store)

// const chartData = ref({
//     labels: Object.keys(alphabetsInputTime.value).reverse(),
//     datasets: [ {data: Object.values(alphabetsInputTime.value), label: 'SESSION RESULT', borderWidth: 1, borderColor: '#69e869', color: '#97a3b8'} ]
// })

const remainingTime = () => {
    return (savedCountdown.value - resultData.value.totalTime).toFixed(2)
}

const accuracy = () => {
    return Math.round((resultData.value.correctCount/(resultData.value.containerText.length) * 100))
}

const elapsedTime = () => {
    return resultData.value.totalTime
}

const wordsPerMinute = () => {
    return Math.round((resultData.value.correctCount / 5) * (60 / elapsedTime()))
}

const errorRatio = () => {
    if (timedTyping.value && !beatCountdown.value) {
        return (resultData.value.wrongCount) + (resultData.value.containerText.length - resultData.value.correctCount) + '/' + (resultData.value.containerText.length)
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
</script>