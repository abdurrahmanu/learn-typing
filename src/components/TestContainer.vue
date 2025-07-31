<template>
    <div class="pt-16 w-[90%] max-w-[1500px] mx-auto">
        <div class="flex pb-2 justify-between">
            <p v-if="!customizers['timer']"></p>
            <Countdown v-else :start="beginCountdown"/>
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
import { customizeStore } from '../store/customizeStore';
import {timerStore} from '../store/timerStore'
import { typingStateStore } from '../store/typingStateStore';
import AllCharacters from './AllCharacters.vue';
import useWatchers from '../composables/useWatchers';
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

const canRestart = computed(() => {
    return !testCompleted.value && playerInputLength.value
})

useWatchers({
    scrollTextContainer,
})

onMounted(() => {
    focus.value = true
})
</script>