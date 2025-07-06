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
import { onMounted, watch, ref } from 'vue';
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
import {correctWrongCountStore} from '../store/correctWrongCountStore'
import {timerStore} from '../store/timerStore'
import { typingStateStore } from '../store/typingStateStore';
import { generateTest } from '../composables/generateTest';
import {managePlayerInput} from '../composables/managePlayerInput'
import {mobileInputEvent} from '../composables/mobileInputEvent'
import {inputEvent} from '../composables/inputEvent'
import AllCharacters from './AllCharacters.vue';
import focusInputElement from '../composables/focusInputElement';

const typingstatestore = typingStateStore()
const { previousPlayerInput, focus, playerInputLength, playerInput, inputEl} = storeToRefs(typingstatestore)

const timerstore = timerStore()
const { beginCountdown} = storeToRefs(timerstore)
const {wpmTime} = timerstore

const correctWrongCountstore = correctWrongCountStore()
const {wrongCount} = storeToRefs(correctWrongCountstore)

const nextstore = nextStore()
const {goNext} = storeToRefs(nextstore)

const mainstore = mainStore()
const { mobileBackspace, hasCompletedSession, testContainerEl, scrollTextContainer, zzz} = storeToRefs(mainstore)

const customize = customizeStore()
const { customizers, pauseTyping} = storeToRefs(customize)

const count = countdownStore()
const {countdown} = storeToRefs(count)

watch(scrollTextContainer, (newVal, oldVal)=> {
    if (testContainerEl.value instanceof HTMLElement) {
        if (Object.keys(newVal).length) {
            testContainerEl.value.scrollTo({
                top: newVal.top
            })
        } else {
            testContainerEl.value.scrollTo({
                top: 0
            })
        }
    }
    }, 
    {deep: true}
)

watch(playerInput, (newVal, oldVal) => {
    if (!oldVal) wpmTime(hasCompletedSession.value, playerInput.value, playerInputLength.value)
    if (pauseTyping.value) return
    if (mobileBackspace.value && wrongCount.value === 0) {
        playerInput.value = oldVal
        mobileBackspace.value = false
        return
    }
    previousPlayerInput.value = oldVal
    managePlayerInput()
})

onMounted(() => {
    generateTest(customizers.value)
    isTouchScreenDevice() && focusInputElement()
    inputEl.value.addEventListener('input', (event) => isTouchScreenDevice() && mobileInputEvent(event))
})

window.addEventListener('keypress', (event) => !isTouchScreenDevice() && inputEvent(event))
window.addEventListener('keydown', (event) => !isTouchScreenDevice() && inputEvent(event))

window.addEventListener('click', e => {
    if (!isTouchScreenDevice()) return
    const focusElement = e.srcElement.id === 'focus' || e.srcElement.closest('#focus')

    if (!focusElement) {
        inputEl.value.blur()
        focus.value = false
    } 
    else focusInputElement()   
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