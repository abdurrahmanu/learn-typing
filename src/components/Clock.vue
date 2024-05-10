<template>
    <div class="relative">
        <div class="peer">
            <playTimer v-if="!timedTyping" @click="timer" class="h-7" />
            <div v-if="timedTyping && !beginCountdown" class="flex items-center font-mono w-fit">  
                    <playTimer @click="timer" class="h-7" />
                    <div class="flex text-xs border border-black h-fit">
                        <div class="px-2 border-r border-r-black w-fit" :class="[savedCountdown === 10 ? 'text-green-700 bg-white font-black' : '']" @click="selectCountDown(10)">10s</div>
                        <div class="px-2 border-r border-r-black w-fit" :class="[savedCountdown === 20 ? 'text-green-700 bg-white font-black' : '']" @click="selectCountDown(20)">20s</div>
                        <div class="px-2 border-l border-l-black w-fit" :class="[savedCountdown === 30 ? 'text-green-700 bg-white font-black' : '']" @click="selectCountDown(30)">30s</div>
                    </div>
            </div>
            <div class="flex items-center gap-2" v-if="beginCountdown">
                <pauseTimer @click="timer" class="h-7" />
                <Countdown 
                v-show="timedTyping && beginCountdown" 
                :length="countdown" 
                :start="beginCountdown" 
                :cancel="timedTyping"
                :animate="true"
                :interval="1000" />
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
const {countdown} = storeToRefs(count)
const {clearCounter} = count

const store = mainStore()
const {  timedTyping, beginCountdown, alphabets, timerID, savedCountdown,} = storeToRefs(store)
const {sessionComplete, switchNext} = store

const customize = customizeStore()
const {customizers} = storeToRefs(customize)

const selectCountDown = (count) => {
    savedCountdown.value = count
    countdown.value = count
    switchNext(customizers.value)
}

const timer = () => {
    timedTyping.value = !timedTyping.value
    if (!timedTyping.value) clearCounter()
    if (beginCountdown.value) {
        clearInterval(timerID.value)
    }
    switchNext(customizers.value)
}

watch(countdown, (newVal) => {
    if (newVal === 0) {
        setTimeout(() => {            
            sessionComplete()
        }, 100);
    }
})
</script>
