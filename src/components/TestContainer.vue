<template>
    <main class="w-[90%] min-h-[150px] space-y-[2px] relative transition-none max-w-[1200px] m-auto" :class="[isMobile() && focus ? 'pt-8' : '']">
        <div class="relative max-w-[700px] h-fit flex text-[16px] justify-between min-h-[30px] m-auto py-1 px-3">      
            <MobileInput />
            <div class="space-x-[50px]">
                <Countdown 
                    v-show="(isTouchScreenDevice() && focus && customizers['timer']) || customizers['timer']"
                    class="absolute left-[20px]"
                    :length="countdown" 
                    :start="beginCountdown" />
            </div>
            <div class="w-fit h-fit"> 
                <restart v-show="!hasCompletedSession && playerInputLength" @click="goNext = true" class="absolute w-6 left-[50%] translate-x-[-50%] "/>
            </div>
            <WordCount />
        </div>
        <AllCharacters />
        <NextButton @focusInputEl="focusInputElement()" />
    </main>
</template>

<script setup>
import { onMounted } from 'vue';
import { isTouchScreenDevice } from '../composables/isTouchScreenDevice';
import { isMobile } from '../composables/isMobile';
import Countdown from './Countdown.vue';
import WordCount from './WordCount.vue';
import MobileInput from'./MobileInput.vue'
import restart from './svg/restart.vue'
import NextButton from './NextButton.vue';
import {storeToRefs} from 'pinia'
import {mainStore} from '../store/mainStore'
import {nextStore} from '../store/nextStore'
import { countdownStore } from '../store/countdownStore';
import { customizeStore } from '../store/customizeStore';
import {timerStore} from '../store/timerStore'
import { typingStateStore } from '../store/typingStateStore';
import { generateTest } from '../composables/generateTest';
import AllCharacters from './AllCharacters.vue';
import focusInputElement from '../composables/focusInputElement';
import useWatchers from '../composables/useWatchers';
import { textBoxHeight } from '../composables/textBox';

const typingstatestore = typingStateStore()
const { focus, playerInputLength, playerInput} = storeToRefs(typingstatestore)

const timerstore = timerStore()
const { beginCountdown} = storeToRefs(timerstore)

const nextstore = nextStore()
const {goNext} = storeToRefs(nextstore)

const mainstore = mainStore()
const { hasCompletedSession, scrollTextContainer} = storeToRefs(mainstore)

const customize = customizeStore()
const { customizers} = storeToRefs(customize)

const count = countdownStore()
const {countdown} = storeToRefs(count)

useWatchers({
    playerInput,
    scrollTextContainer,
})

onMounted(() => {
    textBoxHeight()
    generateTest(customizers.value)
    isTouchScreenDevice() && focusInputElement()
})
</script>

<style scoped>
.noscrollbar::-webkit-scrollbar {
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