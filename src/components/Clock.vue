<template>
    <div class="relative">
        <div class="peer">
            <div class="flex items-center gap-2" v-if="beginCountdown">
                <Countdown 
                v-show="timedTyping && beginCountdown && start" 
                :length="countdown" 
                :start="beginCountdown" 
                :cancel="timedTyping"
                :animate="true"
                :interval="1000" />
                <pauseTimer @click="timer" class="h-7" />
            </div>
            <playTimer v-if="!timedTyping" @click="timer" class="w-5" />
            <div v-if="timedTyping && !beginCountdown" class="relative flex items-center gap-1 w-fit">  
                    <playTimer @click="timer" class="w-5" />
                    <div :class="[!hideElements  ? 'xl:absolute xl:top-[calc(100%_+_20px)] xl:left-[50%] xl:translate-x-[-50%]' : '']" class="flex text-xs border border-black h-fit scale-105 max-[410px]:absolute max-[410px]:top-[calc(100%_+_2px)] max-[410px]:left-[50%] max-[410px]:translate-x-[-50%] cursor-pointer config">
                        <div class="px-2 border-r border-r-black w-fit" :class="[savedCountdown === 10 ? 'text-green-700 bg-white font-black' : '']" @click="selectCountDown(10)">10</div>
                        <div class="px-2 border-r border-r-black w-fit" :class="[savedCountdown === 20 ? 'text-green-700 bg-white font-black' : '']" @click="selectCountDown(20)">20</div>
                        <div class="px-2 border-l border-l-black w-fit" :class="[savedCountdown === 30 ? 'text-green-700 bg-white font-black' : '']" @click="selectCountDown(30)">30</div>
                    </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {watch} from 'vue'
import Countdown from './Countdown.vue'
import pauseTimer from '../components/svg/pauseTimer.vue'
import playTimer from '../components/svg/playTimer.vue'
import {storeToRefs} from 'pinia'
import {mainStore} from '../store/mainStore'
import { customizeStore} from '../store/customizeStore'
import { countdownStore } from '../store/countdownStore'

const count = countdownStore()
const {countdown, start} = storeToRefs(count)
const {clearCounter} = count

const store = mainStore()
const {  timedTyping, beginCountdown, timerID, savedCountdown,} = storeToRefs(store)
const {sessionComplete, switchNext} = store

const customize = customizeStore()
const {customizers, hideElements} = storeToRefs(customize)

const selectCountDown = (count) => {
    savedCountdown.value = count
    countdown.value = count
    switchNext(customizers.value, 'restart' )
}

const timer = () => {
    timedTyping.value = !timedTyping.value
    if (!timedTyping.value) clearCounter()
    if (beginCountdown.value) {
        clearInterval(timerID.value)
    }
    switchNext(customizers.value, 'restart' )
}

watch(countdown, (newVal) => {
    if (newVal === 0) {
        sessionComplete()
    }
})
</script>
