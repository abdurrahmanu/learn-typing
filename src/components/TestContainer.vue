<template>
    <div :class="[isMobile() ? 'pt-6' : 'pt-14']">
        <div :style="containerStyle" class="flex items-center pb-2 justify-between m-auto">
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
import { isMobile } from '../composables/isMobile';

const typingstatestore = typingStateStore()
const { focus, testCompleted, playerInputLength} = storeToRefs(typingstatestore)

const timerstore = timerStore()
const { beginCountdown} = storeToRefs(timerstore)

const nextstore = nextStore()
const {goNext} = storeToRefs(nextstore)

const mainstore = mainStore()
const { scrollTextContainer } = storeToRefs(mainstore)

const settingstore = settingsStore()
const { settings, testStyle} = storeToRefs(settingstore)

const font = computed(() => settings.value['fontsize'])

const halfTestFontSize = computed(() => {
    return font.value < 40 ? font.value : font.value / 2
})

const canRestart = computed(() => {
    return !testCompleted.value && playerInputLength.value
})

const containerStyle = computed(() => ({
    ...testStyle.value,
    'font-size': (font.value < 40 ? font.value : font.value / 2) + 'px'
}))

useWatchers({
    scrollTextContainer,
})

onMounted(() => {
    focus.value = true
})
</script>