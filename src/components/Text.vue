<template>
    <div @click="getMobileOS() ? inputEl.focus() : ''" class="text-slate-100 w-[90%] min-h-[150px] p-3 py-3 space-y-1 relative transition-all duration-200  max-w-[900px] m-auto">
        <div v-if="getMobileOS()" class="opacity-0 w-fit">
            <input 
            @paste.prevent
            ref="inputEl"
            type="text" 
            class="text-sm text-center rounded-md appearance-none outline-none max-w-[100px] text-slate-500 bg-zinc-900 mx-auto" 
            :maxlength="containerText.length" >
    </div>
        <div  class="flex justify-between max-w-[600px] m-auto">
            <Clock />
            <CustomText />
            <Blind />
        </div>
        <div v-if="containerText" class="leading-6 md:leading-[30px] transition-all duration-100 relative border-l-3 border-l-neutral-800 m-auto max-w-[600px] w-full  text-[18px]" >
            <div :class="[noSpace ? 'break-all' : '']" class="min-h-[100px] h-fit overflow-y-auto border-4 border-neutral-800 p-1 relative pb-7">
                <Alphabet
                v-for="(alphabet, index) in containerText"
                :index="index"
                :key="index"
                :currentIndex ="playerInputLength === index" 
                :equality="playerInput[index] === alphabet"
                :alphabet="alphabet"/>
                <p @click="enableRepeat = !enableRepeat" :class="[enableRepeat ? 'text-green-500' : 'text-slate-400']" class="absolute bottom-0 right-0 p-[1px] px-2 bg-zinc-800 hover:bg-zinc-700">Repeat</p>
            </div>
            <RangeInput />
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import CustomText from './CustomText.vue';
import Blind from './Blind.vue';
import Clock from './Clock.vue'
import Alphabet from './Alphabet.vue'
import RangeInput from './RangeInput.vue'
import {storeToRefs} from 'pinia'
import { customizeStore } from '../store/customizeStore';
import {mainStore} from '../store/mainStore'

const inputEl = ref(null)
const store = mainStore()
const { containerText, timerID, inputEquality, typingCountdown, pauseTyping, howToUseCustomText, useCustomText, timedTyping, countdown, customTexts, beginCountdown, enableRepeat, storedTextForRepeat, backspaceIsPressed, playerInputLength, correctCount, wrongCount, playerInput} = storeToRefs(store)
const {generateText, playerTyping, switchNext, getMobileOS, sessionComplete} = store

const customize = customizeStore()
const {configChange, customizers, typeBlindly, noSpace} = storeToRefs(customize)

watch(timedTyping, (newVal) => {
    customizers.value[11] = newVal
})

watch(beginCountdown, (newVal, oldVal) => {
    if (newVal) {
        countdown.value = typingCountdown.value
        timerID.value = setInterval(() => {
            countdown.value = countdown.value - 1
        }, 1000);
    }
})

watch(countdown, (newVal, oldVal) => {
    if (newVal === 0) {
        sessionComplete()
    }
})

watch(playerInput, () => {
    if (inputEquality.value) correctCount.value ++
    else {        
        if (backspaceIsPressed.value) return
        else wrongCount.value++
    }
})

watch(containerText, (newVal, oldVal) => {
    storedTextForRepeat.value = newVal
})

watch(customTexts, (newVal) => {
    if (newVal) {
        localStorage.setItem('custom-text', JSON.stringify(newVal))
    }
}, {deep: true})

onMounted(() => {
    generateText(customizers.value)
    if (getMobileOS()) inputEl.value.focus()
    if (getMobileOS()) window.addEventListener('input', playerTyping)
    else window.addEventListener('keypress', configChange.value ? null : playerTyping)
    window.addEventListener('keydown', playerTyping)
}) 
</script>