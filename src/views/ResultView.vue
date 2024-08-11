<template>
    <div :class="appTheme" class="min-h-[200px] text-center xl:pt-20 cursor-default result">
        <p class="py-3 text-4xl text-center text-slate-500 stats">STATISTICS</p>
        <div class="flex py-1 m-auto gap-x-2 w-fit text-slate-300">            
            <div class="relative">                        
                        <div class="px-3 m-auto text-xs font-medium uppercase rounded-full peer bg-slate-800 w-fit">{{testType}}</div>
                        <div class="absolute rounded-md top-[115%] left-[100%] translate-x-[-50%] z-[1] text-left p-1 hidden peer-hover:block shadow-sm shadow-black bg-slate-800 max-w-[300px] text-[13px] min-w-[195px]">
                            <p class="font-medium underline">TWO MODES</p>
                            <p>* Test mode - quotes, random words and custom tests.</p>
                            <p>* Alphabet mode - Aphabets and letter combination mode</p>
                        </div>
                    </div>
            <div class="relative w-fit">                
                <div class="relative px-3 m-auto text-xs font-medium uppercase rounded-full cursor-pointer w-fit peer"  :class="[difficulty === 'beginner' ? 'bg-teal-700' : difficulty === 'amateur' ? 'bg-green-500' : difficulty === 'expert' ? 'bg-amber-700' : '']">{{ difficulty }}</div>
                <div :class="[difficulty === 'beginner' ? 'bg-teal-700' : difficulty === 'amateur' ? 'bg-green-500' : difficulty === 'expert' ? 'bg-amber-700' : '']" class="absolute rounded-md top-[115%] right-0 z-[1] text-left p-1 hidden peer-hover:block shadow-sm shadow-black text-[13px] max-w-[300px]">
                    <p class="font-bold underline uppercase">TO PASS {{ difficulty }} TEST</p>
                    <p class="min-w-[200px]">* Accuracy more than - {{  difficulty === 'beginner' ? '70%' : difficulty === 'amateur' ? '80%' : difficulty === 'expert' ? '95%' : '' }} </p>
                    <p class="min-w-[200px]">* Words Per Minute (WPM) more than - {{ difficulty === 'beginner' ? '50' : difficulty === 'amateur' ? '65' : difficulty === 'expert' ? '85' : '' }} </p>
                    <p class="min-w-[200px]">* Error Percentage less than - {{  difficulty === 'beginner' ? '30%' : difficulty === 'amateur' ? '20%' : difficulty === 'expert' ? '10%' : '' }} </p>
                    <p class="min-w-[200px]">* Beat Countdown</p>
                </div>
            </div>
        </div>
        <div class="w-fit p-[1px] hover:bg-gradient-to-tr transition-all duration-500rounded-md m-auto py-3">            
            <div class="flex justify-center p-3 m-auto border border-transparent rounded-md w-fit hover:border-zinc-600">
                <div class="relative px-2 text-center border-r border-r-teal-700">
                    <pass v-if="accuracyBasedOnLevels" class="absolute bottom-0 right-[2px] w-3" />
                    <fail v-else class="absolute bottom-0 right-[2px] w-3" />
                    <div class="relative">                        
                        <div class="px-2 text-xs border border-transparent rounded-full peer hover:border-black font-[400]">ACCURACY</div>
                        <div class="absolute rounded-md top-[115%] left-[0%] z-[1] text-left p-1 hidden peer-hover:block shadow-sm shadow-black bg-neutral-800 min-w-[185px] text-[13px] max-w-[300px] text-slate-400">
                            <p>The percentage of correctly typed characters out of the total number of characters.</p>
                        </div>
                    </div>
                    <div class="config">{{ accuracy() }}%</div>
                </div>
                <div class="relative px-2 text-center border-r border-r-teal-700">
                    <div class="relative">                        
                        <div class="px-2 text-xs border border-transparent rounded-full peer hover:border-black font-[400]">TIME</div>
                        <div class="absolute rounded-md top-[115%] left-[50%] translate-x-[-50%] z-[1] text-left p-1 hidden peer-hover:block shadow-sm shadow-black bg-neutral-800 min-w-[185px] text-[13px] max-w-[300px] text-slate-400">
                            <p>The total time taken to complete the typing test.</p>
                        </div>
                    </div>
                    <div class="config">{{ resultData.totalTime }}s</div>
                </div>
                <div class="relative px-2 text-center border-r border-r-teal-700">
                    <pass v-if="wpmBasedOnLevels" class="absolute bottom-0 right-[2px] w-3" />
                    <fail v-else class="absolute bottom-0 right-[2px] w-3" />
                    <div class="relative">                        
                        <div class="px-2 text-xs border border-transparent rounded-full peer hover:border-black font-[400]">WPM</div>
                        <div class="absolute rounded-md top-[115%] left-[50%] translate-x-[-50%] z-[1] text-left p-1 hidden peer-hover:block shadow-sm shadow-black bg-neutral-800 min-w-[185px] text-[13px] max-w-[300px] text-slate-400">
                            <p>Words Per Minute is the number of words typed correctly per minute. One word is defined as five characters.</p>
                        </div>
                    </div>
                    <div class="config">{{ (resultData.WPM * (accuracy() / 100)).toFixed(0) }}</div>
                </div>
                <div class="relative px-2 border-r border-r-teal-700"> 
                    <pass v-if="ErrorRatioBasedOnLevels" class="absolute bottom-0 right-[2px] w-3" />
                    <fail v-else class="absolute bottom-0 right-[2px] w-3" />
                    <div class="relative">                        
                        <div class="px-2 text-xs border border-transparent rounded-full peer hover:border-black font-[400]">ERROR RATIO</div>
                        <div class="absolute rounded-md top-[115%] right-[0%] z-[1] text-left p-1 hidden peer-hover:block shadow-sm shadow-black bg-neutral-800 min-w-[185px] text-[13px] max-w-[300px] text-slate-400">
                            <p>Incorrectly typed characters / Total number of characters</p>
                        </div>
                    </div>
                    <div class="config">{{ errorRatio() }}<span class="text-[11px] font-cursive font-bold"></span></div>
                </div>
            </div>
        </div>
        <div class="space-y-1 text-sm font-[400] roboto-font">            
            <div v-if="timedTyping" :class="[timedTypingTestResult === 'you passed the test' ? 'text-green-700' : 'text-red-400']" class="text-center uppercase">{{ timedTypingTestResult }}</div>
            <div v-else  :class="[testResult === 'you passed the test' ? 'text-green-700' : 'text-red-400']" class="text-center uppercase">{{ testResult }}</div>
            <div v-if="beatCountdown" class="text-green-700 uppercase ">You beat the time, you left {{ remainingTime() }}<span class="lowercase">s</span></div>
            <div v-if="timedTyping && !beatCountdown" class="text-red-400 uppercase ">You didn't beat the time</div>
        </div>
    </div>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue'
import {storeToRefs} from 'pinia'
import {mainStore} from '../store/mainStore'
import {themeStore}  from '../store/themeStore'
import {authStore} from '../store/authStore'
import { customizeStore } from '../store/customizeStore'
import pass from '../components/svg/pass.vue'
import fail from '../components/svg/fail.vue'

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

const accuracyBasedOnLevels = computed(() => {
    if (difficulty.value === 'beginner') {
        return accuracy() > 70 ? true : false
    }
    else if (difficulty.value === 'amateur') {
        return accuracy() > 80 ? true : false
    }
    else if (difficulty.value === 'expert') {
        return accuracy() > 95 ? true : false
    }
})

const wpmBasedOnLevels = computed(() => {
    if (timedTyping.value) {
        if (difficulty.value === 'beginner') {
        return beatCountdown.value && (resultData.value.WPM * (accuracy() / 100)).toFixed(0) > 50 ? true : false
        }
        else if (difficulty.value === 'amateur') {
            return beatCountdown.value && (resultData.value.WPM * (accuracy() / 100)).toFixed(0) > 65 ? true : false
        }
        else if (difficulty.value === 'expert') {
            return beatCountdown.value && (resultData.value.WPM * (accuracy() / 100)).toFixed(0) > 85 ? true : false
        }
    } else {        
        if (difficulty.value === 'beginner') {
            return (resultData.value.WPM * (accuracy() / 100)).toFixed(0) > 50 ? true : false
        }
        else if (difficulty.value === 'amateur') {
            return (resultData.value.WPM * (accuracy() / 100)).toFixed(0) > 65 ? true : false
        }
        else if (difficulty.value === 'expert') {
            return (resultData.value.WPM * (accuracy() / 100)).toFixed(0) > 85 ? true : false
        }
    }
})

const ErrorRatioBasedOnLevels = computed(() => {
    return errorRatioLevel() ? true : false
})

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






















