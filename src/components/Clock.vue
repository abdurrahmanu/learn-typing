<template>
    <div class="relative">
        <div class="peer">
            <div class="flex items-center" v-if="beginCountdown">
                <Countdown 
                class="hidden"
                :length="countdown" 
                :start="beginCountdown" 
                :cancel="timedTyping" />
                <pauseTimer @click="timer" class="w-6" />
            </div>
            <playTimer v-if="!timedTyping" @click="timer" class="w-6" />
            <div v-if="timedTyping && !beginCountdown" class="relative flex items-center gap-1 w-fit">  
                    <playTimer @click="timer" class="w-6" />
                    <div :class="[theme === 'dark' ? 'border-slate-200' : 'border-black']" class="flex text-xs border h-fit scale-105 max-[410px]:absolute max-[410px]:top-[calc(100%_+_2px)] max-[410px]:left-[50%] max-[410px]:translate-x-[-50%] cursor-pointer config">
                        <div class="px-2 border-r w-fit" :class="[level === 'beginner' ? difficultyBg : '', theme === 'dark' ? 'border-slate-200' : 'border-black']" @click="selectCountDown(timeForBeginner, 'beginner')">{{timeForBeginner}}<span class="text-[9px]">s</span></div>
                        <div class="px-2 border-r w-fit" :class="[level === 'amateur' ? difficultyBg : '', theme === 'dark' ? 'border-slate-200' : 'border-black']" @click="selectCountDown(timeForAmateur, 'amateur')">{{timeForAmateur}}<span class="text-[9px]">s</span></div>
                        <div class="px-2 border-l w-fit" :class="[level === 'expert' ? difficultyBg : '', theme === 'dark' ? 'border-slate-200' : 'border-black']" @click="selectCountDown(timeForExpert, 'expert')">{{ timeForExpert }}<span class="text-[9px]">s</span></div>
                    </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {watch, ref, onMounted, computed} from 'vue'
import Countdown from './Countdown.vue'
import pauseTimer from '../components/svg/pauseTimer.vue'
import playTimer from '../components/svg/playTimer.vue'
import {storeToRefs} from 'pinia'
import {mainStore} from '../store/mainStore'
import { customizeStore} from '../store/customizeStore'
import { countdownStore } from '../store/countdownStore'
import { themeStore } from '../store/themeStore'

const count = countdownStore()
const {countdown, timeForAmateur, timeForBeginner, timeForExpert, level} = storeToRefs(count)
const {clearCounter} = count

const theme_ = themeStore()
const {theme} = storeToRefs(theme_)

const store = mainStore()
const { timedTyping, beginCountdown, timerID} = storeToRefs(store)
const {sessionComplete, switchNext} = store

const customize = customizeStore()
const {customizers, difficulty} = storeToRefs(customize)

const selectCountDown = (count, lvl) => {
    level.value = lvl
    switchNext(customizers.value, 'restart' )
}

const difficultyBg = computed(() => {
    return level.value === 'beginner' ? 'text-white bg-[#44b0d3]' : level.value === 'amateur' ? 'text-white bg-[#ffa07a]' : level.value === 'expert' ? 'text-white bg-[#2e4053]' : ''
})

const countdownFunc = (level) => {
    if (level === 'beginner') return timeForBeginner.value
    if (level === 'amateur') return timeForAmateur.value
    if (level === 'expert') return timeForExpert.value
}

const timer = () => {
    countdown.value = countdownFunc(level.value)
    timedTyping.value = !timedTyping.value
    if (!timedTyping.value) clearCounter()
    if (beginCountdown.value) {
        clearInterval(timerID.value)
    }
    switchNext(customizers.value, 'restart' )
}

watch(level, newVal => {
    countdown.value = countdownFunc(newVal)
})

watch(timeForBeginner, newVal => {
    if (level.value === 'beginner') countdown.value = newVal
})

watch(timeForAmateur, newVal => {
    if (level.value === 'amateur') countdown.value = newVal
})

watch(timeForExpert, newVal => {
    if (level.value === 'expert') countdown.value = newVal
})

watch(countdown, (newVal, oldVal) => {
    if (newVal === 0) clearInterval(timerID.value)
    if (newVal === 0 && beginCountdown.value) sessionComplete()
    if (newVal === 0 && !beginCountdown.value ) {
        if (level.value === 'beginner')  countdown.value = timeForBeginner.value
        if (level.value === 'amateur') countdown.value = timeForAmateur.value
        if (level.value === 'expert') countdown.value = timeForExpert.value
    }
})

const changeTimer = () => {
    if (difficulty.value === 'beginner') {
        countdown.value = timeForBeginner.value
    }
    if (difficulty.value === 'amateur') {
        countdown.value = timeForAmateur.value
    }
    if (difficulty.value === 'expert') {
        countdown.value = timeForExpert.value
    }
    level.value = difficulty.value
}

onMounted(() => {
    changeTimer()
})

watch(difficulty, newVal => {
    clearCounter()
    switchNext(customizers.value, 'restart')
    changeTimer()
})
</script>