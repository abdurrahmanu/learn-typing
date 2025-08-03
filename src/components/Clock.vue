<template>
    <div class="relative">
        <div>
            <div class="flex items-center gap-2 px-1" :id="!isMobile() && 'focus'">  
                <div class="w-5">
                    <pauseTimer :id="!isMobile() && 'focus'" v-if="!isCountdown" @click="toggleTimer" />
                    <playTimer :id="!isMobile() && 'focus'" v-else @click="toggleTimer" />
                </div>

                <div 
                class="w-[30px] text-center"
                :class="[isCountdown && level === 'beginner' ? 'text-blue-500' : '' ]" 
                @click="changeLevel('beginner')">{{timer('beginner')}}s</div>

                <div 
                class="w-[30px] text-center"
                :class="[isCountdown && level === 'amateur' ? 'text-blue-500' : '' ]" 
                @click="changeLevel('amateur')">{{timer('amateur')}}s</div>

                <div 
                class="w-[30px] text-center"
                :class="[isCountdown && level === 'expert' ? 'text-blue-500' : '' ]" 
                @click="changeLevel('expert')">{{ timer('expert') }}s</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {watch, onMounted, computed, onUpdated, ref} from 'vue'
import { isMobile } from '../composables/isMobile'
import pauseTimer from '../components/svg/pauseTimer.vue'
import playTimer from '../components/svg/playTimer.vue'
import {storeToRefs} from 'pinia'
import { settingsStore} from '../store/settingsStore'
import { countdownStore } from '../store/countdownStore'
import {timerStore} from '../store/timerStore'
import { typingStateStore } from '../store/typingStateStore'

const level = ref('beginner')

const timerstore = timerStore()
const {beginCountdown, timerID} = storeToRefs(timerstore)

const countstore = countdownStore()
const {countdown} = storeToRefs(countstore)
const {timer} = countstore

const typingstatestore = typingStateStore()
const {testCompleted} = storeToRefs(typingstatestore)

const settingstore = settingsStore()
const {settings} = storeToRefs(settingstore)
const {updateSingleSetting} = settingstore

const difficulty = computed(() => settings.value.difficulty)

const go = () => {
    updateSingleSetting('repeat', true)
}

const isCountdown = computed(() => {
    return settings.value['countdown']
})

const toggleTimer = () => {
    settings.value['countdown'] = !settings.value['countdown']
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
    if (!isCountdown.value) settings.value['countdown'] = true
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