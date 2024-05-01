<template>
    <div @click="getMobileOS() ? inputEl.focus() : ''" class="w-[90%] min-h-[150px] space-y-1 relative transition-all duration-200  max-w-[900px] m-auto">
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
            <div :class="[noSpace ? 'break-words' : '', alphabets ? 'text-center py-5 break-words leading-10': 'text-left border-none pt-4 md:border-2 md:border-neutral-800 pb-7 min-h-[100px]', getMobileOS() ? 'border-none' : '', !alphabets && textPosition=== 'center' ? 'text-center' : !alphabets && textPosition=== 'right' ? 'text-right' : 'text-left']" class="relative p-1 overflow-y-auto h-fit">
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
                <repeat class="w-4" v-if="!alphabets" @click="enableRepeat = !enableRepeat" />
            </div>
        </div>
    </div>
    <TextAlign @align="textPosition = $event" :textPosition="textPosition" v-if="!getMobileOS() && !alphabets"/>
    <div class="my-6 w-fit m-auto h-fit">
        <p @click="alphabets = !alphabets" class="m-auto font-mono md:text-xl text-center rounded-md border-opacity-80 hover:border-opacity-100 opacity-60 hover:opacity-100 w-fit hover:border-slate-400 p-1 border">
            <span v-if="!alphabets">THE ENGLISH ALPHABETS</span>
            <span v-else>TYPING TESTS</span>
        </p>
    </div>
</template>

<script setup>
import { onMounted, ref, watch, computed } from 'vue';
import repeat from './svg/repeat.vue';
import TextAlign from './TextAlign.vue'
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
const { containerText, timerID, completionLevel, alphabets, typingCountdown, timedTyping, countdown, customTexts, beginCountdown, enableRepeat, storedTextForRepeat, playerInputLength, correctCount, wrongCount, playerInput, playerLastInput} = storeToRefs(store)
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