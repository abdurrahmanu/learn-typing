<template>
    <div class="relative">
        <div>
            <div class="flex items-center gap-2 px-1" id="focus">  
                <div class="w-5">
                    <pauseTimer id="focus" v-if="!isCountdown" @click="toggleTimer" />
                    <playTimer id="focus" v-else @click="toggleTimer" />
                </div>

                <div 
                :class="[isCountdown && level === 'beginner' ? 'text-blue-500' : '' ]" 
                @click="changeLevel('beginner')">{{timer('beginner')}}s</div>

                <div 
                :class="[isCountdown && level === 'amateur' ? 'text-blue-500' : '' ]" 
                @click="changeLevel('amateur')">{{timer('amateur')}}s</div>

                <div 
                :class="[isCountdown && level === 'expert' ? 'text-blue-500' : '' ]" 
                @click="changeLevel('expert')">{{ timer('expert') }}s</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {watch, onMounted, computed, onUpdated, ref} from 'vue'
import pauseTimer from '../components/svg/pauseTimer.vue'
import playTimer from '../components/svg/playTimer.vue'
import {storeToRefs} from 'pinia'
import { customizeStore} from '../store/customizeStore'
import { countdownStore } from '../store/countdownStore'
import {nextStore} from '../store/nextStore'
import {timerStore} from '../store/timerStore'
import { typingStateStore } from '../store/typingStateStore'

const level = ref('beginner')

const timerstore = timerStore()
const {beginCountdown, timerID} = storeToRefs(timerstore)

const countstore = countdownStore()
const {countdown} = storeToRefs(countstore)
const {timer} = countstore

const nextstore = nextStore()
const {goNext} = storeToRefs(nextstore)

const typingstatestore = typingStateStore()
const {testCompleted} = storeToRefs(typingstatestore)

const customize = customizeStore()
const {customizers, difficulty, repeat} = storeToRefs(customize)

const go = () => {
    repeat.value = true
    goNext.value = true
    setTimeout(() => {
        repeat.value = false
    }, 0);
}

const isCountdown = computed(() => {
    return customizers.value['timer']
})

const toggleTimer = () => {
    customizers.value['timer'] = !customizers.value['timer']
}

watch(countdown, newVal => {
    if (newVal === 0) {
        clearInterval(timerID.value)
        if (beginCountdown.value) testCompleted.value = true
        else countdown.value = timer(level.value)
    }
})

watch(difficulty, newVal => changeLevel(difficulty.value))

const changeLevel = (lvl) => {
    level.value = lvl
    if (!isCountdown.value) customizers.value['timer'] = true
    countdown.value = timer(lvl)
    go()
}

onMounted(() => {
    countdown.value = timer(level.value)
})

onUpdated(() => {
    countdown.value = timer(level.value)
    // go()
})
</script>