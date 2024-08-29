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
            <playTimer v-if="!timedTyping" @click="timer" class="w-5" />
            <div v-if="timedTyping && !beginCountdown" class="relative flex items-center gap-1 w-fit">  
                    <playTimer @click="timer" class="w-5" />
                    <div :class="[theme === 'dark' ? 'border-slate-200' : 'border-black']" class="flex text-xs border h-fit scale-105 max-[410px]:absolute max-[410px]:top-[calc(100%_+_2px)] max-[410px]:left-[50%] max-[410px]:translate-x-[-50%] cursor-pointer config">
                        <div class="px-2 border-r w-fit" :class="[theme === 'dark' ? 'border-slate-200' : 'border-black', level === 'easy' ? 'text-green-700 bg-white' : '']" @click="selectCountDown(timeForBeginner, 'easy')">{{timeForBeginner}}<span class="text-[9px]">s</span></div>
                        <div class="px-2 border-r w-fit" :class="[theme === 'dark' ? 'border-slate-200' : 'border-black', level === 'mid' ? 'text-green-700 bg-white' : '']" @click="selectCountDown(timeForAmateur, 'mid')">{{timeForAmateur}}<span class="text-[9px]">s</span></div>
                        <div class="px-2 border-l w-fit" :class="[theme === 'dark' ? 'border-slate-200' : 'border-black', level === 'hard' ? 'text-green-700 bg-white' : '']" @click="selectCountDown(timeForExpert, 'hard')">{{ timeForExpert }}<span class="text-[9px]">s</span></div>
                    </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {watch, ref, onUpdated} from 'vue'
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
const {customizers} = storeToRefs(customize)

const selectCountDown = (count, lvl) => {
    level.value = lvl
    switchNext(customizers.value, 'restart' )
}

const countdownFunc = (level) => {
    if (level === 'easy') return timeForBeginner.value
    if (level === 'mid') return timeForAmateur.value
    if (level === 'hard') return timeForExpert.value
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
    if (level.value === 'easy') countdown.value = newVal
})

watch(timeForAmateur, newVal => {
    if (level.value === 'mid') countdown.value = newVal
})

watch(timeForExpert, newVal => {
    if (level.value === 'hard') countdown.value = newVal
})

watch(countdown, (newVal, oldVal) => {
    if (newVal === 0) clearInterval(timerID.value)
    if (newVal === 0 && beginCountdown.value) sessionComplete()
    if (newVal === 0 && !beginCountdown.value ) {
        if (level.value === 'easy')  countdown.value = timeForBeginner.value
        if (level.value === 'mid') countdown.value = timeForAmateur.value
        if (level.value === 'hard') countdown.value = timeForExpert.value
    }
})
</script>