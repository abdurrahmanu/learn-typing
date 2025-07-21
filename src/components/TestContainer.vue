<template>
    <div class="pt-20">
        <div class="flex pb-2 justify-between w-[80%] mx-auto">
            <p v-if="!customizers['timer']"></p>
            <Countdown
            v-else
            :length="countdown" 
            :start="beginCountdown"/>

            <restart 
            v-if="canRestart" 
            @click="goNext = true" 
            class="w-6"/>

            <WordCount />
        </div>
        <OnScreenInput />
        <AllCharacters />
    </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import Countdown from './Countdown.vue';
import WordCount from './WordCount.vue';
import restart from './svg/restart.vue'
import {storeToRefs} from 'pinia'
import {mainStore} from '../store/mainStore'
import {nextStore} from '../store/nextStore'
import { countdownStore } from '../store/countdownStore';
import { customizeStore } from '../store/customizeStore';
import {timerStore} from '../store/timerStore'
import { typingStateStore } from '../store/typingStateStore';
import AllCharacters from './AllCharacters.vue';
import useWatchers from '../composables/useWatchers';
import { textBoxHeight } from '../composables/textBox';
import OnScreenInput from './onScreenInput.vue';

const typingstatestore = typingStateStore()
const { focus, testCompleted, playerInputLength} = storeToRefs(typingstatestore)

const timerstore = timerStore()
const { beginCountdown} = storeToRefs(timerstore)

const nextstore = nextStore()
const {goNext} = storeToRefs(nextstore)

const mainstore = mainStore()
const { scrollTextContainer} = storeToRefs(mainstore)

const customize = customizeStore()
const { customizers} = storeToRefs(customize)

const count = countdownStore()
const {countdown} = storeToRefs(count)

const canRestart = computed(() => {
    return !testCompleted.value && playerInputLength.value
})

useWatchers({
    scrollTextContainer,
})

onMounted(() => {
    textBoxHeight()
    focus.value = true
})
</script>