<template>
    <div @click="getMobileOS() ? inputEl.focus() : ''" class="text-slate-100 w-[90%] min-h-[150px] p-3 py-3 space-y-1 relative transition-all duration-200  max-w-[900px] m-auto">
        <div class="w-fit">
            <input
            @paste.prevent
            v-model="playerInput"
            ref="inputEl"
            type="text" 
            class="text-sm text-center rounded-md appearance-none outline-none max-w-[100px] text-slate-100 bg-zinc-900 mx-auto opacity-0" 
            :maxlength="containerText.length">
        </div>
        <div :class="[alphabets ? 'px-2 py-1 max-w-[300px]' : 'max-w-[600px]']"  class="flex justify-between m-auto">
            <Clock />
            <CustomText v-if="!alphabets" />
            <Blind />
        </div>
        <div v-if="containerText" class="leading-6 md:leading-[30px] transition-all duration-100 relative border-l-3 border-l-neutral-800 m-auto max-w-[600px] w-full  text-[18px]">
            <div :class="[noSpace ? 'break-words' : '', alphabets ? 'text-center py-5 break-words space-x-[1px]  space-y-[1px]': 'text-left border-4 border-neutral-800 pb-7 min-h-[100px]']" class="relative p-1 overflow-y-auto h-fit">
                <Alphabet
                v-for="(alphabet, index) in containerText"
                :index="index"
                :key="index"
                :currentIndex ="playerInputLength === index" 
                :equality="playerInput[index] === alphabet"
                :alphabet="alphabet"/>
                <p v-if="!alphabets" @click="enableRepeat = !enableRepeat" :class="[enableRepeat ? 'text-green-500' : 'text-slate-400']" class="absolute bottom-0 right-0 p-[1px] px-2 bg-zinc-800 hover:bg-zinc-700">Repeat</p>
            </div>
            <RangeInput />
        </div>
    </div>
    <div class="py-4">
        <p @click="alphabets = !alphabets" class="p-1 m-auto font-mono text-xl text-center rounded-md text-slate-400 opacity-30 hover:opacity-100 w-fit hover:border hover:border-slate-400">
            <span v-if="!alphabets">TEST TYPING THE ENGLISH ALPHABETS</span>
            <span v-else>TYPING TESTS</span>
        </p>
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
const { containerText, timerID, inputEquality, alphabets, typingCountdown, timedTyping, countdown, customTexts, beginCountdown, enableRepeat, storedTextForRepeat, backspaceIsPressed, playerInputLength, correctCount, wrongCount, playerInput, playerLastInput} = storeToRefs(store)
const {generateText, getMobileOS, playerInputTyping, sessionComplete, resetToDefault, playerTyping} = store

const customize = customizeStore()
const {customizers, noSpace} = storeToRefs(customize)

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
    playerLastInput.value = playerInput.value[playerInput.value.length - 1]
    
    if (inputEquality.value) {
        correctCount.value ++
    }
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
    if (getMobileOS()) {
        inputEl.value.focus()
        window.addEventListener('input', playerInputTyping)
    }
    else {
        // window.addEventListener('input', playerInputTyping)
        window.addEventListener('keypress', playerTyping)
        window.addEventListener('keydown', playerTyping)
    }
}) 

watch(alphabets, (newVal) => {
    resetToDefault()
    generateText(customizers.value)
})

</script>