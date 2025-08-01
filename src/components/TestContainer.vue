<template>
    <div class="pt-16 w-[90%] max-w-[1500px] mx-auto">
        <div :style="computedStyle" class="flex items-center pb-2 justify-between m-auto">
            <p v-if="!settings['countdown']"></p>
            <Countdown v-else :start="beginCountdown"/>
            <restart 
            v-if="canRestart" 
            @click="goNext = true" 
            :style="{'width': halfTestFontSize + 'px'}"/>
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
import { settingsStore } from '../store/settingsStore';
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
const { scrollTextContainer, fontSize, testStyle} = storeToRefs(mainstore)

const customize = settingsStore()
const { settings} = storeToRefs(customize)

const halfTestFontSize = computed(() => {
    return fontSize.value < 40 ? fontSize.value : fontSize.value / 2
})

const canRestart = computed(() => {
    return !testCompleted.value && playerInputLength.value
})

const computedStyle = computed(() => ({
    ...testStyle.value,
    'font-size': (fontSize.value < 40 ? fontSize.value : fontSize.value / 2) + 'px'
}))


useWatchers({
    scrollTextContainer,
})

onMounted(() => {
    focus.value = true
})
</script>