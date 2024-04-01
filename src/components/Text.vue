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
            <div class="relative">
                <div class="peer">
                    <img v-if="!timedTyping" @click="timedTyping = !timedTyping" class="h-7" src="/playTimer.svg" alt="">
                    <div v-if="timedTyping && !beginCountdown" class="flex w-fit font-mono items-center">  
                            <img @click="timedTyping = !timedTyping" class="h-7" src="/playTimer.svg" alt="">
                            <div class="border flex text-xs h-fit">
                                <div class="w-fit px-2 border-r" :class="[typingCountdown === 10 ? 'text-green-500' : 'text-slate-300']" @click="typingCountdown = 10">10s</div>
                                <div class="w-fit px-2 border-r" :class="[typingCountdown === 20 ? 'text-green-500' : 'text-slate-300']" @click="typingCountdown = 20">20s</div>
                                <div class="w-fit px-2 border-l" :class="[typingCountdown === 30 ? 'text-green-500' : 'text-slate-300']" @click="typingCountdown = 30">30s</div>
                            </div>
                    </div>
                    <div class="flex items-center gap-2" v-if="beginCountdown">
                        <img @click="timedTyping = !timedTyping" class="h-7" src="/playTimer.svg" alt="">
                        <div v-if="timedTyping && beginCountdown" class="text-lg font-mono">{{  countdown  }}</div>
                    </div>
                </div>
                <div class="absolute bottom-[-20px] left-[50%] translate-x-[-50%] text-[9px] bg-black p-[3px] whitespace-nowrap z-[9] uppercase invisible peer-hover:visible">timer mode</div>
            </div>
            
            <div class="flex gap-4 items-center">
                <div v-if="useCustomText" class="relative">
                    <div v-if="howToUseCustomText === 'use only custom'" class="text-[10px] p-[2px] px-3 border border-neutral-500 rounded-md uppercase text-green-500">use only custom text</div>
                    <div v-if="howToUseCustomText === 'use both system and custom'" class="text-[10px] p-[2px] px-3 border border-neutral-500 rounded-md uppercase text-green-500">use custom text with system text</div>
                    <div v-if="howToUseCustomText === 'select text using options'" @click="toggleSelect = !toggleSelect" class="text-[10px] p-[2px] px-3 border border-neutral-500 rounded-md uppercase">
                        <span>select custom text</span>
                        <div class="inline-block pl-4">
                            <div class=" text-white rotate-90 inline-block font-mono">></div>
                        </div>
                    </div>
                    <div class="absolute top-[110%] z-[9] left-[50%] translate-x-[-50%] bg-neutral-700 text-xs overflow-y-auto max-h-[200px]" v-if="Object.keys(customTexts).length && toggleSelect">
                        <div @click="startUsingCustomText(value)" class="hover:bg-neutral-800 px-3 p-1 whitespace-nowrap border-b border-b-neutral-900" v-for="(value, key, index) in customTexts" :key="index">{{ key }}</div>
                    </div>
                </div>

                <div @click="typeBlindly = !typeBlindly" class="relative">
                    <div class="w-fit flex peer">
                        <img v-if="typeBlindly" class="h-7" src="/closedEye.svg" alt="">
                        <img v-else class="h-7" src="/openEye.svg" alt="">
                    </div>
                    <div class="absolute bottom-[-15px] left-[50%] translate-x-[-50%] text-[9px] whitespace-nowrap z-[9] uppercase bg-black px-[3px] invisible peer-hover:visible">blind mode</div>
                </div>
            </div>
        </div>
        <div v-if="containerText" class="leading-6 md:leading-[30px] transition-all duration-100 relative md:text-lg border-l-3 border-l-neutral-800 m-auto max-w-[600px] w-full  text-base" >
            <div :class="[noSpace ? 'break-all' : '']" class="min-h-[100px] h-fit overflow-y-auto border-4 border-neutral-800 p-1 relative pb-7">
                <div  v-if="configChange"  class="absolute top-0 bottom-0 left-0 w-full">                    
                    <div class="flex h-[100%]">                        
                        <div @click="useConfig(true)" class="w-[50%] h-[100%] flex items-center justify-center z-[2] text-black  hover:bg-white">Use new config?</div>
                        <div @click="useConfig(false)" class="w-[50%] h-[100%] flex items-center justify-center text-black hover:bg-white z-[2]">Continue</div>
                    </div>
                    <div class="absolute top-0 bottom-0 left-0 w-full z-[1] opacity-60 h-[100%] flex  bg-white"></div>
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
import { onMounted, ref, watch } from 'vue';
import Alphabet from './Alphabet.vue'
import RangeInput from './RangeInput.vue'
import {storeToRefs} from 'pinia'
import { customizeStore } from '../store/customizeStore';
import {mainStore} from '../store/mainStore'

const toggleSelect = ref(false)
const inputEl = ref(null)
const store = mainStore()
const { containerText, timerID, inputEquality, typingCountdown, pauseTyping, howToUseCustomText, useCustomText, timedTyping, countdown, customTexts, beginCountdown, enableRepeat, storedTextForRepeat, backspaceIsPressed, playerInputLength, correctCount, wrongCount, playerInput} = storeToRefs(store)
const {generateText, playerTyping, switchNext, getMobileOS, sessionComplete} = store

const customize = customizeStore()
const {configChange, selectedCustomizers, typeBlindly, noSpace} = storeToRefs(customize)
const {useConfig} = customize

const startUsingCustomText =  (text) => {
    storedTextForRepeat.value = text
    toggleSelect.value = !toggleSelect.value
    switchNext(selectedCustomizers.value, undefined, 'options')
}

watch(timedTyping, (newVal) => {
    selectedCustomizers.value[11] = newVal
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

watch(toggleSelect, (newVal, oldVal) => {
    if (newVal) pauseTyping.value = true
    else pauseTyping.value = false
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
    generateText(selectedCustomizers.value)
    if (getMobileOS()) inputEl.value.focus()
    if (getMobileOS()) window.addEventListener('input', playerTyping)
    else window.addEventListener('keypress', configChange.value ? null : playerTyping)
    window.addEventListener('keydown', playerTyping)
}) 
</script>