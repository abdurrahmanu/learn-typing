<template>
    <div class="min-h-[200px] text-center text-white">
        <p class="py-2 font-mono text-center text-slate-500">STATISTICS</p>
        <div class="flex justify-center p-3 font-mono text-slate-400">
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
                <div :class="[errorRatio() > 1/3 ? 'bg-green-600' : 'bg-red-300']" class="w-[10px] absolute bottom-0 right-0 h-[10px]"></div>
                <div class="text-xs">ERROR RATIO</div>
                <div class="">{{ errorRatio() }}</div>
            </div>
        </div>
        <div class="pt-10">
            <div class="w-[80%] max-w-[600px] m-auto min-h-[200px] bg-teal-700"></div>
        </div>
    </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {useRouter} from 'vue-router'
import {mainStore} from '../store/mainStore'

const router = useRouter()
const store = mainStore()
const {resultData} = storeToRefs(store)
const {switchNext} = store

window.addEventListener('keydown', e => {
    if (e.key === 'Escape' || e.key === 'Enter') {
        switchNext()
    }
})

const accuracy = () => {
    return Math.round((resultData.value.correctCount/(resultData.value.correctCount + resultData.value.wrongCount) * 100))
}

const elapsedTime = () => {
    return Math.round(resultData.value.totalTime / 1000)
}

const wordsPerMinute = () => {
    return Math.round((resultData.value.correctCount / 5) * (60 / elapsedTime()))
}

const errorRatio = () => {
    return resultData.value.wrongCount + '/' + (resultData.value.wrongCount + resultData.value.correctCount)
}
</script>