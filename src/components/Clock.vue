<template>
    <div class="relative">
        <div class="peer">
            <div class="flex items-center" v-if="beginCountdown">
                <Countdown 
                id="focus"
                class="hidden"
                :length="countdown" 
                :start="beginCountdown" 
                :cancel="customizers['timer']" />
                <pauseTimer @click="timer" class="w-6" />
            </div>

            <pauseTimer id="focus" v-if="!customizers['timer']" @click="timer" class="w-5 mr-[-4px]" />

            <div v-if="customizers['timer'] && !beginCountdown" class="relative flex items-center gap-1 w-fit">  
                <playTimer id="focus" @click="timer" class="w-5 mr-2" />
                <div :class="[theme === 'dark' ? 'ring-slate-100' : 'ring-black']" class="flex text-[13px] font-[600] rounded-lg ring-[1px] h-fit scale-105 max-[410px]:absolute max-[410px]:top-[calc(100%_+_2px)] max-[410px]:left-[50%] max-[410px]:translate-x-[-50%] cursor-pointer config">
                    <div class="px-2 border-r rounded-l-lg w-fit" :class="[level === 'beginner' ? difficultyBg : '', theme === 'dark' ? 'border-slate-200' : 'border-black']" @click="changeLevel('beginner')">{{timeForBeginner}}<span class="text-[9px]">s</span></div>
                    <div class="px-2 w-fit" :class="[level === 'amateur' ? difficultyBg : '', theme === 'dark' ? 'border-slate-200' : 'border-black']" @click="changeLevel('amateur')">{{timeForAmateur}}<span class="text-[9px]">s</span></div>
                    <div class="px-2 border-l-[1px] rounded-r-lg w-fit" :class="[level === 'expert' ? difficultyBg : '', theme === 'dark' ? 'border-slate-200' : 'border-black']" @click="changeLevel('expert')">{{ timeForExpert }}<span class="text-[9px]">s</span></div>
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
import {nextStore} from '../store/nextStore'
import {timerStore} from '../store/timerStore'

const timerstore = timerStore()
const {beginCountdown, timerID} = storeToRefs(timerstore)

const count = countdownStore()
const {countdown, timeForAmateur, timeForBeginner, timeForExpert, level} = storeToRefs(count)

const theme_ = themeStore()
const {theme} = storeToRefs(theme_)

const nextstore = nextStore()
const {goNext} = storeToRefs(nextstore)

const store = mainStore()
const { hasCompletedSession} = storeToRefs(store)

const customize = customizeStore()
const {customizers, difficulty} = storeToRefs(customize)


const difficultyBg = computed(() => {
    return level.value === 'beginner' ? 'text-black bg-[#44b0d3]' : level.value === 'amateur' ? 'text-black bg-[#ffa07a]' : level.value === 'expert' ? 'text-black bg-[#4d5f43]' : ''
})

const countdownTimer = computed(() => {
    const time = {
        'beginner': timeForBeginner.value,
        'amateur': timeForAmateur.value,
        'expert': timeForExpert.value,
    }

    return time[level.value]
})

const go = () => goNext.value = true

const changeLevel = (lvl) => {
    level.value = lvl
    countdown.value = countdownTimer.value
}

const timer = () => {
    customizers.value['timer'] = !customizers.value['timer']
    go()
}

watch([timeForBeginner, timeForAmateur, timeForExpert], ([newBeginner, newAmateur, newExpert]) => {
    if (level.value === 'beginner') countdown.value = newBeginner
    if (level.value === 'amateur') countdown.value = newAmateur
    if (level.value === 'expert') countdown.value = newExpert
})

watch(countdown, newVal => {
    if (newVal === 0) {
        clearInterval(timerID.value)
        if (beginCountdown.value) hasCompletedSession.value = true
        else {
            const time = {
                'beginner': timeForBeginner.value,
                'amateur': timeForAmateur.value,
                'expert': timeForExpert.value,
            }
            countdown.value = time[level.value]
        }
    }
})

watch(difficulty, newVal => changeLevel(difficulty.value))
onMounted(() => changeLevel(difficulty.value))
</script>