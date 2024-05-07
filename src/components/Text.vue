<template>
    <div :class="[hideElements ? 'pt-32' : 'pt-0']" class="w-[90%] min-h-[150px] space-y-1 relative transition-none  max-w-[900px] m-auto">
        <div v-if="getMobileOS()"class="w-fit">
            <input
            @paste.prevent="paste"
            v-model="playerInput"
            ref="inputEl"
            type="text" 
            class="text-sm text-center rounded-md appearance-none outline-none max-w-[100px] text-slate-100 bg-zinc-900 mx-auto opacity-0" 
            :maxlength="containerText.length">
        </div>
        <div v-if="!hideElements" :class="[alphabets ? 'px-2 py-1 max-w-[300px]' : 'max-w-[600px]']"  class="flex justify-between pt-10 m-auto">
            <Clock />
            <Blind />
        </div>
        <div v-if="containerText" :class="[hideElements ? 'text-[20px] md:text-[24px]' : 'text-[17px] md:text-[19px]']" class="leading-6 md:leading-[30px] transition-all duration-100 relative m-auto max-w-[600px] w-full ">
            <Countdown 
            v-if="timedTyping && beginCountdown && hideElements" 
            :start="beginCountdown" 
            :cancel="timedTyping"
            :length="countdown" 
            :animate="true" 
            :interval="1000" />
            <div @click="getMobileOS() ? inputEl.focus() : ''" :class="[customizers['no-space'] ? 'break-words' : '', alphabets ? 'text-center py-5 break-words leading-10': 'text-left border-none pt-4 md:border-2 md:border-neutral-800 pb-7 min-h-[100px]', getMobileOS() ? 'border-none' : '', !alphabets && textPosition=== 'center' ? 'text-center' : !alphabets && textPosition=== 'right' ? 'text-right' : 'text-left']" class="relative p-1 overflow-y-auto h-fit">
                <Alphabet
                v-for="(alphabet, index) in containerText"
                :index="index"
                :key="index"
                :currentIndex ="playerInputLength === index" 
                :equality="playerInput[index] === alphabet"
                :alphabet="alphabet"/>
            </div>
            <div v-if="!hideElements" class="flex items-center py-3 m-auto">
                <RangeInput />
                <repeat class="w-4" v-if="!alphabets" @click="enableRepeat = !enableRepeat" />
            </div>
        </div>
    </div>
    <TextAlign @align="textPosition = $event" :textPosition="textPosition" v-if="!getMobileOS() && !alphabets && !hideElements"/>
    <div class="m-auto my-6 w-fit h-fit">
        <p class="p-1 m-auto font-mono text-center border rounded-md md:text-xl border-opacity-80 hover:border-opacity-100 opacity-60 hover:opacity-100 w-fit hover:border-slate-400">
            <span @click="toggleMode('alphabets')" v-if="!alphabets">THE ENGLISH ALPHABETS</span>
            <span @click="toggleMode('test')" v-else>TYPING TESTS</span>
        </p>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import repeat from './svg/repeat.vue';
import TextAlign from './TextAlign.vue'
import Countdown from './Countdown.vue'
import Blind from './Blind.vue';
import Clock from './Clock.vue'
import Alphabet from './Alphabet.vue'
import RangeInput from './RangeInput.vue'
import {storeToRefs} from 'pinia'
import { customizeStore } from '../store/customizeStore';
import {mainStore} from '../store/mainStore'
import { countdownStore } from '../store/countdownStore';

const inputEl = ref(null)
const store = mainStore()
const { containerText, previousPlayerInput, resultData, alphabets, timedTyping, beginCountdown, enableRepeat, playerInputLength, playerInput} = storeToRefs(store)
const {generateText, getMobileOS, playerInputTyping, managePlayerInput, sessionComplete, resetToDefault, playerTyping} = store

const textPosition = ref('left')
const customize = customizeStore()
const { customizers, hideElements} = storeToRefs(customize)

const count = countdownStore()
const {countdown} = storeToRefs(count)

const toggleMode = (mode) => {
    alphabets.value = !alphabets.value
    if (mode === 'alphabets') {
        localStorage.setItem('dorayi-typing-mode', 'alphabets')
    } else {
        localStorage.setItem('dorayi-typing-mode', 'test')
    }

    resetToDefault()
    generateText(customizers.value)
}

const paste = () => {
    e.preventDefault()
    return
}

watch(countdown, (newVal, oldVal) => {
    if (newVal === 0 && resultData.value.totalTime) {
        sessionComplete()
    }
})

watch(playerInput, (newVal, oldVal) => {
    previousPlayerInput.value = oldVal
    managePlayerInput()
})

onMounted(() => {
    generateText(customizers.value)
    if (getMobileOS()) {
        inputEl.value.focus()
        window.addEventListener('input', playerInputTyping)
    }
    else {
        window.addEventListener('keypress', playerTyping)
        window.addEventListener('keydown', playerTyping)
    }
})
</script>