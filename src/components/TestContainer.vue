<template>
    <main class="w-[90%] min-h-[150px] space-y-[2px] relative transition-none max-w-[1200px] m-auto" :class="[isMobile() && focus ? 'pt-8' : '']">
        <div class="relative max-w-[700px] h-fit flex text-[16px] justify-between min-h-[30px] m-auto py-1 px-3">      
            <div class="space-x-[50px]">
                <Countdown 
                v-show="(isTouchScreenDevice() && focus && customizers['timer']) || customizers['timer']"
                class="absolute left-[20px]"
                :length="countdown" 
                :start="beginCountdown"/>
            </div>
            <div class="w-fit h-fit"> 
                <restart v-show="!hasCompletedSession && playerInputLength" @click="goNext = true" class="absolute w-6 left-[50%] translate-x-[-50%] "/>
            </div>
            <WordCount />
        </div>
        <OnScreenInput />
        <AllCharacters />
        <focusButton />
    </main>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { isTouchScreenDevice } from '../composables/isTouchScreenDevice';
import { isMobile } from '../composables/isMobile';
import Countdown from './Countdown.vue';
import WordCount from './WordCount.vue';
import restart from './svg/restart.vue'
import focusButton from './focusButton.vue';
import {storeToRefs} from 'pinia'
import {mainStore} from '../store/mainStore'
import {nextStore} from '../store/nextStore'
import { countdownStore } from '../store/countdownStore';
import { customizeStore } from '../store/customizeStore';
import {timerStore} from '../store/timerStore'
import { typingStateStore } from '../store/typingStateStore';
import { generateTest } from '../composables/generateTest';
import AllCharacters from './AllCharacters.vue';
import useWatchers from '../composables/useWatchers';
import { textBoxHeight } from '../composables/textBox';
import OnScreenInput from './onScreenInput.vue';

const typingstatestore = typingStateStore()
const { focus, playerInputLength} = storeToRefs(typingstatestore)

const timerstore = timerStore()
const { beginCountdown} = storeToRefs(timerstore)

const nextstore = nextStore()
const {goNext} = storeToRefs(nextstore)
const {generateNewTest} = nextstore

const mainstore = mainStore()
const { hasCompletedSession, scrollTextContainer} = storeToRefs(mainstore)

const customize = customizeStore()
const { customizers} = storeToRefs(customize)

const count = countdownStore()
const {countdown} = storeToRefs(count)

useWatchers({
    scrollTextContainer,
})

onMounted(() => {
    textBoxHeight()
    // if network.............use network to generate test
    generateNewTest()
    focus.value = true
})
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none
}

.container-enter-from {
    transform: translateY(10%)
}

.container-enter-active,
.container-leave-active {
    transition: all 0.1s ease;
    opacity: .8
}
</style>