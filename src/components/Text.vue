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
            <div v-if="timedTyping && !beginCountdown" class="flex w-fit font-mono items-center">  
                    <img @click="timedTyping = !timedTyping" class="h-7" src="/playTimer.svg" alt="">
                    <div class="border flex text-xs h-fit">
                        <div class="w-fit px-2 border-r" :class="[typingCountdown === 10 ? 'text-green-500' : 'text-slate-300']" @click="typingCountdown = 10">10s</div>
                        <div class="w-fit px-2 border-r" :class="[typingCountdown === 20 ? 'text-green-500' : 'text-slate-300']" @click="typingCountdown = 20">20s</div>
                        <div class="w-fit px-2 border-l" :class="[typingCountdown === 30 ? 'text-green-500' : 'text-slate-300']" @click="typingCountdown = 30">30s</div>
                    </div>
            </div>
            <div class="w-fit" @click="timedTyping = !timedTyping" v-else>
                <img class="h-7" src="/pauseTimer.svg" alt="">
            </div>

            <div @click="typeBlindly = !typeBlindly" class="flex w-fit">
                <img v-if="typeBlindly" class="h-7" src="/closedEye.svg" alt="">
                <img v-else class="h-7" src="/openEye.svg" alt="">
            </div>
        </div>
        <div v-if="timedTyping && beginCountdown">{{  countdown  }}</div>
        <div v-if="containerText" class="leading-6 md:leading-[30px] text-sm transition-all duration-100 relative md:text-lg border-l-3 border-l-neutral-800 m-auto max-w-[600px] w-full " >
            <div class="min-h-[100px] h-fit overflow-y-auto border-4 border-neutral-800 p-1 relative pb-5">
                <div  v-if="configChange"  class="absolute top-0 bottom-0 left-0 w-full">                    
                    <div class="flex h-[100%]">                        
                        <div @click="useConfig(true)" class="w-[50%] h-[100%] flex items-center justify-center z-[99] text-black  hover:bg-white">Use new config?</div>
                        <div @click="useConfig(false)" class="w-[50%] h-[100%] flex items-center justify-center text-black hover:bg-white z-[99]">Continue</div>
                    </div>
                    <div class="absolute top-0 bottom-0 left-0 w-full z-[9] opacity-60 h-[100%] flex  bg-white"></div>
                </div>
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
import { onMounted, ref, watch, watchEffect } from 'vue';
import Alphabet from './Alphabet.vue'
import RangeInput from './RangeInput.vue'
import {storeToRefs} from 'pinia'
import { customizeStore } from '../store/customizeStore';
import {mainStore} from '../store/mainStore'

const intervalID = ref()
const inputEl = ref(null)
const store = mainStore()
const { containerText, inputEquality, typeBlindly, typingCountdown, timedTyping, countdown, beginCountdown, enableRepeat, storedTextForRepeat, backspaceIsPressed, playerInputLength, correctCount, wrongCount, playerInput} = storeToRefs(store)
const {generateText, playerTyping, getMobileOS, sessionComplete} = store

const customize = customizeStore()
const {configChange, config} = storeToRefs(customize)
const {useConfig} = customize

watch(beginCountdown, (newVal, oldVal) => {
    if (newVal) {
        countdown.value = typingCountdown.value
        intervalID.value = setInterval(() => {
            countdown.value = countdown.value - 1
        }, 1000);
    }    
})

watch(countdown, (newVal, oldVal) => {
    if (newVal === 0 && beginCountdown.value) {
        clearInterval(intervalID.value)
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

onMounted(() => {
    generateText(config.value)
    if (getMobileOS()) inputEl.value.focus()
    if (getMobileOS()) window.addEventListener('input', playerTyping)
    else window.addEventListener('keypress', configChange.value ? null : playerTyping)
    window.addEventListener('keydown', playerTyping)
}) 
</script>