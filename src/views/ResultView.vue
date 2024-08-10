<template>
    <div :class="appTheme" class="min-h-[200px] text-center xl:pt-20 cursor-default">
        <p class="py-3 font-mono text-2xl text-center text-slate-500">STATISTICS</p>
        <div class="flex py-1 m-auto gap-x-2 w-fit text-slate-300">            
            <div class="relative">                        
                        <div class="px-3 m-auto text-xs uppercase rounded-full peer bg-slate-800 w-fit">{{testType}}</div>
                        <div class="absolute rounded-md top-[115%] left-[50%] translate-x-[-50%] z-[1] text-left p-1 hidden peer-hover:block shadow-sm shadow-black bg-slate-800 max-w-[300px] text-[13px] min-w-[195px]">
                            <p class="font-medium underline">TWO MODES</p>
                            <p>* Test mode - quotes, random words and custom tests.</p>
                            <p>* Alphabet mode - Aphabets and letter combination mode</p>
                        </div>
                    </div>
            <div class="relative w-fit">                
                <div class="relative px-3 m-auto text-xs uppercase rounded-full cursor-pointer w-fit peer"  :class="[difficulty === 'beginner' ? 'bg-blue-500' : difficulty === 'amateur' ? 'bg-green-500' : difficulty === 'expert' ? 'bg-amber-700' : '']">{{ difficulty }}</div>
                <div :class="[difficulty === 'beginner' ? 'bg-blue-500' : difficulty === 'amateur' ? 'bg-green-500' : difficulty === 'expert' ? 'bg-amber-700' : '']" class="absolute rounded-md top-[115%] right-0 z-[1] text-left p-1 hidden peer-hover:block shadow-sm shadow-black text-[13px]">
                    <p class="font-mono font-bold underline uppercase">TO PASS {{ difficulty }} TEST</p>
                    <p class="whitespace-nowrap">* Accuracy more than - {{  difficulty === 'beginner' ? '70%' : difficulty === 'amateur' ? '80%' : difficulty === 'expert' ? '95%' : '' }} </p>
                    <p class="whitespace-nowrap">* Words Per Minute (WPM) more than - {{ difficulty === 'beginner' ? '50' : difficulty === 'amateur' ? '65' : difficulty === 'expert' ? '85' : '' }} </p>
                    <p class="whitespace-nowrap">* Error Percentage less than - {{  difficulty === 'beginner' ? '30%' : difficulty === 'amateur' ? '20%' : difficulty === 'expert' ? '10%' : '' }} </p>
                    <p>* Beat Countdown</p>
                </div>
            </div>
        </div>
        <div class="w-fit p-[1px] hover:bg-gradient-to-tr transition-all duration-500rounded-md m-auto py-3">            
            <div class="flex justify-center p-3 m-auto font-mono border border-transparent rounded-md w-fit hover:border-zinc-600">
                <div class="relative px-4 text-center border-r border-r-teal-700">
                    <div :class="[accuracy() > 85 ? 'bg-green-500' : 'bg-red-400']" class="w-[10px] absolute bottom-0 right-0 h-[10px]"></div>
                    <div class="relative">                        
                        <div class="px-2 text-xs border border-transparent rounded-full peer hover:border-black">ACCURACY</div>
                        <div class="absolute rounded-md top-[115%] left-[0%] z-[1] text-left p-1 hidden peer-hover:block shadow-sm shadow-black bg-neutral-800 min-w-[185px] text-[13px] max-w-[300px] text-slate-400">
                            <p>The percentage of correctly typed characters out of the total number of characters.</p>
                        </div>
                    </div>
                    <div class="">{{ accuracy() }}%</div>
                </div>
                <div class="relative px-4 text-center border-r border-r-teal-700">
                    <div class="relative">                        
                        <div class="px-2 text-xs border border-transparent rounded-full peer hover:border-black">TIME</div>
                        <div class="absolute rounded-md top-[115%] left-[50%] translate-x-[-50%] z-[1] text-left p-1 hidden peer-hover:block shadow-sm shadow-black bg-neutral-800 min-w-[185px] text-[13px] max-w-[300px] text-slate-400">
                            <p>The total time taken to complete the typing test.</p>
                        </div>
                    </div>
                    <div class="">{{ resultData.totalTime }}s</div>
                </div>
                <div class="relative px-4 text-center border-r border-r-teal-700">
                    <div :class="[resultData.WPM > 50 ? 'bg-green-500' : 'bg-red-400']" class="w-[10px] absolute bottom-0 right-0 h-[10px]"></div>
                    <div class="relative">                        
                        <div class="px-2 text-xs border border-transparent rounded-full peer hover:border-black">WPM</div>
                        <div class="absolute rounded-md top-[115%] left-[50%] translate-x-[-50%] z-[1] text-left p-1 hidden peer-hover:block shadow-sm shadow-black bg-neutral-800 min-w-[185px] text-[13px] max-w-[300px] text-slate-400">
                            <p>Words Per Minute is the number of words typed correctly per minute. One word is defined as five characters.</p>
                        </div>
                    </div>
                    <div class="">{{ (resultData.WPM * (accuracy() / 100)).toFixed(0) }}</div>
                </div>
                <div class="relative px-4 border-r border-r-teal-700"> 
                    <div :class="[errorRatioLevel() ? 'bg-green-500' : 'bg-red-400']" class="w-[10px] absolute bottom-0 right-0 h-[10px]"></div>
                    <div class="relative">                        
                        <div class="px-2 text-xs border border-transparent rounded-full peer hover:border-black">ERROR RATIO</div>
                        <div class="absolute rounded-md top-[115%] right-[0%] z-[1] text-left p-1 hidden peer-hover:block shadow-sm shadow-black bg-neutral-800 min-w-[185px] text-[13px] max-w-[300px] text-slate-400">
                            <p>Incorrectly typed characters / Total number of characters</p>
                        </div>
                    </div>
                    <div class="">{{ errorRatio() }}<span class="text-[11px] font-cursive font-bold"></span></div>
                </div>
            </div>
        </div>
        <div class="space-y-1 font-mono text-lg">            
            <div v-if="timedTyping" :class="[timedTypingTestResult === 'you passed the test' ? 'text-green-700' : 'text-red-400']" class="text-center uppercase">{{ timedTypingTestResult }}</div>
            <div v-else  :class="[testResult === 'you passed the test' ? 'text-green-700' : 'text-red-400']" class="text-center uppercase">{{ testResult }}</div>
            <div v-if="beatCountdown" class="py-2 text-green-700 uppercase">You beat the time, you left {{ remainingTime() }}<span class="lowercase">s</span></div>
            <div v-if="timedTyping && !beatCountdown" class="py-2 text-red-500 uppercase">You were unable to beat the time</div>
        </div>
    </div>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue'
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
const {mode, difficulty} = storeToRefs(customize)

const theme_ = themeStore()
const { appTheme } = storeToRefs(theme_)

const store = mainStore()
const {resultData, beatCountdown, timedTyping, savedCountdown} = storeToRefs(store)

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
        if (difficulty.value === 'beginner') {
            return ((resultData.value.wrongCount) + (resultData.value.containerText.length - resultData.value.correctCount) / (resultData.value.containerText.length)) * 100 < 30
        }
        if (difficulty.value === 'amateur') {
            return ((resultData.value.wrongCount) + (resultData.value.containerText.length - resultData.value.correctCount) / (resultData.value.containerText.length)) * 100 < 20
        }
        if (difficulty.value === 'expert') {
            return ((resultData.value.wrongCount) + (resultData.value.containerText.length - resultData.value.correctCount) / (resultData.value.containerText.length)) * 100 < 10
        }
    } else {     
        if (difficulty.value === 'beginner') {
            return (resultData.value.wrongCount / resultData.value.containerText.length) * 100 < 30
        }   
        if (difficulty.value === 'amateur') {
            return (resultData.value.wrongCount / resultData.value.containerText.length) * 100 < 20
        }
        if (difficulty.value === 'expert') {
            return (resultData.value.wrongCount / resultData.value.containerText.length) * 100 < 10
        }
    }
}

const testResult  = computed(() => {
    if (difficulty.value === 'beginner') {        
        return accuracy() > 70 && (resultData.value.WPM * (accuracy() / 100)).toFixed(0) > 50 && errorRatioLevel() ? 'you passed the test' : 'you failed the test'
    } 
    else if (difficulty.value === 'amateur') {
        return accuracy() > 80 && (resultData.value.WPM * (accuracy() / 100)).toFixed(0) > 65 && errorRatioLevel() ? 'you passed the test' : 'you failed the test'
    } 
    else if (difficulty.value === 'expert') {
        return accuracy() > 95 && (resultData.value.WPM * (accuracy() / 100)).toFixed(0) > 85 && errorRatioLevel() ? 'you passed the test' : 'you failed the test'
    }
})

const timedTypingTestResult = computed(() => {
    if (difficulty.value === 'beginner') {        
        return  beatCountdown.value && accuracy() > 70 && (resultData.value.WPM * (accuracy() / 100)).toFixed(0) > 50 && errorRatioLevel() ? 'you passed the test' : 'you failed the test'
    } 
    else if (difficulty.value === 'amateur') {
        return  beatCountdown.value && accuracy() > 80 && (resultData.value.WPM * (accuracy() / 100)).toFixed(0) > 65 && errorRatioLevel() ? 'you passed the test' : 'you failed the test'
    } 
    else if (difficulty.value === 'expert') {
        return  beatCountdown.value && accuracy() > 95 && (resultData.value.WPM * (accuracy() / 100)).toFixed(0) > 85 && errorRatioLevel() ? 'you passed the test' : 'you failed the test'
    }
})
</script>






















