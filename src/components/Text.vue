<template>
    <div @click="getMobileOS() ? inputEl.focus() : ''" class="w-[90%] min-h-[150px] p-3 py-3 space-y-1 relative transition-all duration-200  max-w-[900px] m-auto">
        <div v-if="getMobileOS()"class="w-fit">
            <input
            @paste.prevent="paste"
            v-model="playerInput"
            ref="inputEl"
            type="text" 
            class="text-sm text-center rounded-md appearance-none outline-none max-w-[100px] text-slate-100 bg-zinc-900 mx-auto opacity-0" 
            :maxlength="containerText.length">
        </div>
        <div :class="[alphabets ? 'px-2 py-1 max-w-[300px]' : 'max-w-[600px]']"  class="flex justify-between m-auto pt-10">
            <Clock />
            <CustomText v-if="!alphabets" />
            <Blind />
        </div>
        <div v-if="containerText" class="leading-6 md:leading-[30px] transition-all duration-100 relative m-auto max-w-[600px] w-full  text-[15px] md:text-[18px]">
            <div :class="[noSpace ? 'break-words' : '', alphabets ? 'text-center py-5 break-words leading-10': 'text-left border-none pt-4 md:border-2 md:border-neutral-800 pb-7 min-h-[100px]', getMobileOS() ? 'border-none' : '', textPosition === 'center' ? 'text-center' : textPosition === 'right' ? 'text-right' : 'text-left']" class="relative p-1 overflow-y-auto h-fit">
                <Alphabet
                v-for="(alphabet, index) in containerText"
                :index="index"
                :key="index"
                :currentIndex ="playerInputLength === index" 
                :equality="playerInput[index] === alphabet"
                :alphabet="alphabet"/>
            </div>
            <div class="flex items-center py-3 m-auto">
                <RangeInput />
                <img class="w-4" src="/repeat.svg" alt="" v-if="!alphabets && !enableRepeat" @click="enableRepeat = !enableRepeat">
                <img class="w-4" src="/green-repeat.svg" alt="" v-if="enableRepeat" @click="enableRepeat = !enableRepeat">
            </div>
        </div>
    </div>
    <div v-if="!getMobileOS() && !alphabets"class="flex gap-7 opacity-50 justify-center text-xs">
        <div >
            <p :class="[textPosition === 'left' ? 'text-green-500' : 'text-slate-400']" class="text-center">LEFT</p>
            <img src="/alignLeft.svg" :class="[textPosition === 'left' ? 'border-green-400' : '']" @click="textPosition = 'left'" class="w-7 m-auto">
        </div>
        <div>
            <p :class="[textPosition === 'center' ? 'text-green-500' : 'text-slate-400']" class="text-center">CENTER</p>
            <img src="/alignCenter.svg" :class="[textPosition === 'center' ? 'border-green-400' : '']" @click="textPosition = 'center'" class="w-7 m-auto">
        </div>
        <div>
            <p :class="[textPosition === 'right' ? 'text-green-500' : 'text-slate-400']" class="text-center">RIGHT</p>
            <img src="/alignRight.svg" :class="[textPosition === 'right' ? 'border-green-400' : '']" @click="textPosition = 'right'" class="w-7 m-auto">
        </div>
    </div>
    <div class="my-6 w-fit m-auto h-fit">
        <p @click="alphabets = !alphabets" class="m-auto font-mono md:text-xl text-center rounded-md border-opacity-20 hover:border-opacity-100 text-slate-400 opacity-30 hover:opacity-100 w-fit hover:border-slate-400 p-1 border">
            <span v-if="!alphabets">TEST TYPING THE ENGLISH ALPHABETS</span>
            <span v-else>TYPING TESTS</span>
        </p>
    </div>
</template>

<script setup>
import { onMounted, ref, watch, computed } from 'vue';
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
const { containerText, currentColor, timerID, completionLevel, alphabets, typingCountdown, timedTyping, countdown, customTexts, beginCountdown, enableRepeat, storedTextForRepeat, backspaceIsPressed, playerInputLength, correctCount, wrongCount, playerInput, playerLastInput} = storeToRefs(store)
const {generateText, getMobileOS, playerInputTyping, sessionComplete, resetToDefault, playerTyping} = store

const customize = customizeStore()
const {customizers, noSpace} = storeToRefs(customize)

const textPosition = ref('left')
const paste = () => {
    e.preventDefault()
    return
}

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

watch(playerInput, (newVal, oldVal) => {
    if (getMobileOS()) playerLastInput.value = newVal[newVal.length - 1]
    if (!playerInput.value) {
        if (oldVal === containerText.value[0]) correctCount.value--
        else wrongCount.value--
    }
    else {
        if (oldVal.length > newVal.length) {
            if (containerText.value[oldVal.length - 1] === oldVal[oldVal.length - 1]) correctCount.value--
            else wrongCount.value--
        }
        else {
            if (playerLastInput.value === containerText.value[newVal.length - 1]) correctCount.value ++
            else wrongCount.value++
        }
    }

    playerInputLength.value = playerInput.value.length
    completionLevel.value = ((playerInputLength.value) / containerText.value.length) * 100     
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
        window.addEventListener('keypress', playerTyping)
        window.addEventListener('keydown', playerTyping)
    }
}) 

watch(alphabets, (newVal) => {
    resetToDefault()
    generateText(customizers.value)
})
</script>