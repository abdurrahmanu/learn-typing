<template>
    <div class="min-h-[200px] text-center text-white">
        <p class="py-5 font-mono text-2xl text-center text-slate-500">STATISTICS</p>
        <div class="w-fit p-[1px] hover:bg-gradient-to-tr transition-all duration-500 from-teal-300 via-green-500 to-blue-500 rounded-md m-auto">            
            <div class="flex justify-center p-3 m-auto font-mono border border-transparent rounded-md bg-neutral-900 text-slatext-slate-400 w-fit hover:border-zinc-600">
                <div class="relative px-4 text-center border-r">
                    <div :class="[accuracy() > 85 ? 'bg-green-600' : 'bg-red-300']" class="w-[10px] absolute bottom-0 right-0 h-[10px]"></div>
                    <div class="text-xs">ACCURACY</div>
                    <div class="">{{ accuracy() }}%</div>
                </div>
                <div class="relative px-4 text-center border-r">
                    <div class="text-xs">TIME</div>
                    <div class="">{{ elapsedTime() }}s</div>
                </div>
                <div class="relative px-4 text-center border-r">
                    <div :class="[wordsPerMinute() > 50 ? 'bg-green-600' : 'bg-red-300']" class="w-[10px] absolute bottom-0 right-0 h-[10px]"></div>
                    <div class="text-xs">WPM</div>
                    <div class="">{{ wordsPerMinute() }}</div>
                </div>
                <div class="relative px-4"> 
                    <div :class="[errorRatioLevel ? 'bg-red-300' : 'bg-green-500']" class="w-[10px] absolute bottom-0 right-0 h-[10px]"></div>
                    <div class="text-xs">ERROR RATIO</div>
                    <div class="">{{ errorRatio() }}</div>
                </div>
            </div>
            <div class="text-zinc-600 py-1">{{ resultData.testType }}</div>
        </div>

        <!-- <Scatter  class="bg-white m-auto" /> -->

    </div>
</template>

<script setup>
import { Scatter } from 'vue-chartjs';
import {storeToRefs} from 'pinia'
import {mainStore} from '../store/mainStore'

const store = mainStore()
const {resultData} = storeToRefs(store)

const accuracy = () => {
    return Math.round((resultData.value.correctCount/(resultData.value.containerText.length) * 100))
}

const elapsedTime = () => {
    return Math.round(resultData.value.totalTime / 1000)
}

const wordsPerMinute = () => {
    return Math.round((resultData.value.correctCount / 5) * (60 / elapsedTime()))
}

const errorRatio = () => {
    return (resultData.value.containerText.length - resultData.value.correctCount) + '/' + (resultData.value.containerText.length)
}

const errorRatioLevel = () => {
    return (resultData.value.containerText.length - resultData.value.correctCount) + '/' + (resultData.value.containerText.length)
}

</script>