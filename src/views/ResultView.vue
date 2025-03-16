<template>
    <div :class="appTheme" class="min-h-[200px] text-center cursor-default result">
        <p class="py-3 text-2xl text-center text-slate-500 stats">STATISTICS</p>
        <div class="flex py-1 m-auto gap-x-2 w-fit text-slate-300">            
            <div class="relative w-fit">       
                <div 
                class="relative px-3 ring-[1px] hover:ring-[3px] m-auto font-black text-[15px] drop-shadow-md uppercase rounded-full cursor-pointer w-fit peer"  
                :class="[difficulty === 'beginner' ? 'ring-[#44b0d3] text-[#44b0d3]' : difficulty === 'amateur' ? 'ring-[#ffa07a] text-[#ffa07a]' : difficulty === 'expert' ? 'ring-[#4d5f43] text-[#4d5f43]' : '']">why are you black ?? {{ difficulty }}</div>
                
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
            <div class="flex justify-center p-3 m-auto border border-transparent  text-[13px] rounded-md w-fit hover:border-zinc-600">
                <div class="relative px-2  text-center border-r border-r-teal-700">
                    <pass v-if="accuracyBasedOnLevels" class="absolute bottom-0 right-[2px] w-4" />
                    <fail v-else class="absolute bottom-0 right-[2px] w-4" />
                    <div class="relative">                        
                        <div class="px-2 border  border-transparent rounded-full peer hover:border-black font-[400]">ACCURACY</div>
                        <div class="absolute text-sm rounded-md top-[115%] left-[0%] z-[1] text-left p-1 hidden peer-hover:block shadow-sm shadow-black bg-neutral-900 min-w-[185px]  max-w-[300px] text-slate-400">
                            <p>The percentage of correctly typed characters out of the total number of characters.</p>
                        </div>
                    </div>
                    <div class="config font-[500]">{{ accuracy() }}%</div>
                </div>
                <div class="relative px-2 text-center border-r border-r-teal-700">
                    <div class="relative">                        
                        <div class="px-2 border border-transparent rounded-full peer hover:border-black font-[400]">TIME</div>
                        <div class="absolute text-sm rounded-md top-[115%] left-[50%] translate-x-[-50%] z-[1] text-left p-1 hidden peer-hover:block shadow-sm shadow-black bg-neutral-900 min-w-[185px]  max-w-[300px] text-slate-400">
                            <p>The total time taken to complete the typing test.</p>
                        </div>
                    </div>
                    <div class="config font-[500]">{{ resultData.totalTime }}s</div>
                </div>
                <div class="relative px-2 text-center border-r border-r-teal-700">
                    <pass v-if="wpmBasedOnLevels" class="absolute bottom-0 right-[2px] w-4" />
                    <fail v-else class="absolute bottom-0 right-[2px] w-4" />
                    <div class="relative">                        
                        <div class="px-2 border border-transparent rounded-full peer hover:border-black font-[400]">WPM</div>
                        <div class="absolute rounded-md top-[115%] left-[50%] translate-x-[-50%] z-[1] text-left p-1 text-sm hidden peer-hover:block shadow-sm shadow-black bg-neutral-900 min-w-[185px]  max-w-[300px] text-slate-400">
                            <p>Words Per Minute is the number of words typed correctly per minute. One word is defined as five characters.</p>
                        </div>
                    </div>
                    <div class="config font-[500]">{{ (resultData.WPM * (accuracy() / 100)).toFixed(0) }}</div>
                </div>
                <div class="relative px-2 border-r border-r-teal-700"> 
                    <pass v-if="ErrorRatioBasedOnLevels" class="absolute bottom-0 right-[2px] w-4" />
                    <fail v-else class="absolute bottom-0 right-[2px] w-4" />
                    <div class="relative">                        
                        <div class="px-2 border border-transparent rounded-full peer hover:border-black font-[400]">ERROR RATIO</div>
                        <div class="absolute text-sm rounded-md top-[115%] right-[0%] z-[1] text-left p-1 hidden peer-hover:block shadow-sm shadow-black bg-neutral-900 min-w-[185px]  max-w-[300px] text-slate-400">
                            <p>Incorrectly typed characters / Total number of characters</p>
                        </div>
                    </div>
                    <div class="config font-[500]">{{ errorRatio() }}<span class="text-[11px] font-cursive font-bold"></span></div>
                </div>
            </div>
        </div>
        <LineChart :x="time" :y="wpm" />
        {{ time }}
        {{ wpm }}
        <div class="space-y-1 text-lg font-[400] roboto-font py-4 my-3 border-y border-slate-500 max-w-[300px] w-full m-auto">            
            <div v-if="customizers['timer']">                
                <div v-if="beatCountdown && testResult === 'you passed the test'" class="text-green-700 uppercase ">
                    <!-- <span>You passed the test</span> -->
                    <span class="px-2 text-lg">&#128526;</span> 
                </div>
                <div v-else class="text-red-400 uppercase ">
                    <!-- <span>{{!beatCountdown ? 'You failed to beat the time' : 'You failed the test' }}</span>  -->
                    <span class="text-lg">&#128551;</span>
                </div>
                <!-- <div v-if="level !== difficulty && beatCountdown && testResult === 'you passed the test' && (((difficulty === 'beginner' || difficulty === 'amateur') && level === 'expert') || (difficulty === 'beginner' && level === 'amateur'))" class="text-green-700 uppercase"> 
                    {{ ((difficulty === 'beginner' || difficulty === 'amateur') && level === 'expert') || (difficulty === 'beginner' && level === 'amateur') ? 'Wow!!' : ''  }} As a {{difficulty}}, This is {{ level }} pace
                </div> -->
            </div>
            <div v-else  :class="[testResult === 'you passed the test' ? 'text-green-700' : 'text-red-400']" class="text-center uppercase">
                <!-- <span>{{ testResult }}</span> -->
                <span class="px-3 text-5xl">{{ testResult === 'you failed the test' ? '&#128551;' : '&#128526;' }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import {computed} from 'vue'
import {storeToRefs} from 'pinia'
import {mainStore} from '../store/mainStore'
import {themeStore}  from '../store/themeStore'
import { customizeStore } from '../store/customizeStore'
import { countdownStore } from '../store/countdownStore'
import pass from '../components/svg/pass.vue'
import fail from '../components/svg/fail.vue'
import LineChart from '../components/LineChart.vue'

const count = countdownStore()
const {level}  = storeToRefs(count)

const customize = customizeStore()
const {customizers, difficulty} = storeToRefs(customize)

const theme_ = themeStore()
const { appTheme } = storeToRefs(theme_)

const store = mainStore()
const {resultData, beatCountdown} = storeToRefs(store)

const testType = computed(() => {
    if (customizers.value['timer']) {
        if (customizers.value['modes'] === 'word-test') {
            return `TEST MODE - COUNTDOWN `
        } else if (customizers.value['modes'] === 'alphabet-test') {
            return `ALPHABETS MODE - COUNTDOWN`
        }
    } else {
        if (customizers.value['modes'] === 'word-test') {
            return `TEST MODE`
        } else if (customizers.value['modes'] === 'alphabet-test') {
            return `ALPHABETS MODE `
        }
    }
})

const accuracy = () => {
    return Math.round((resultData.value.correctCount/(resultData.value.containerText.length) * 100))
}

const errorRatio = () => {
    if (customizers.value['timer'] && !beatCountdown.value) {
        return (resultData.value.wrongCount) + (resultData.value.containerText.length - (resultData.value.wrongCount + resultData.value.correctCount)) + '/' + (resultData.value.containerText.length)
    } else {        
        return (resultData.value.wrongCount) + '/' + (resultData.value.containerText.length)
    }
}

const errorRatioLevel = () => {
    if (customizers.value['timer'] && !beatCountdown.value) {
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
    if (customizers.value['timer']) {
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

const ErrorRatioBasedOnLevels = computed(() => errorRatioLevel() ? true : false)

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

const wpm =  computed(() => Array.from({length: Math.ceil(resultData.value.WPM / 20) > 1 || Math.ceil(resultData.value.WPM / 20) === 1 ? Math.ceil(resultData.value.WPM / 20) + 1 : 1 }, (value, index) => index * 20))

const time = computed(() => Array.from({length: wpm.value.length}, (value, index) => index * Math.ceil(resultData.value.totalTime / wpm.value.length)))


</script>




















