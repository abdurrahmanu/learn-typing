<template>
    <div class="text-[10px] font-mono items-center w-[90%] bg-neutral-800 text-slate-300 rounded-md p-2 flex max-w-[750px] justify-center m-auto flex-wrap relative">
        <div class="p-1" v-for="(optionArr, listIndex) in options" :key="listIndex">            
            <div 
            :class="[hoverIndex === listIndex ? 'border-zinc-400' : 'border-transparent']" class="relative flex gap-2 py-1 border rounded-lg"
            @mouseenter="mouseEnter(listIndex)"
            @mouseleave="mouseLeave(listIndex)" >
                <div 
                class="px-1 hover:bg-neutral-900" 
                :class="[configChange && temporaryCustomizers[listIndex] === option || !configChange && selectedCustomizers[listIndex] === option ? 'text-green-400 bg-neutral-900' : '']"
                @click="configurationArgs = [option, listIndex]" 
                v-for="(option, index) in optionArr" 
                :key="index">
                    {{ option }} 
                </div>
                <div v-if="listIndex === hoverIndex" class="absolute z-10 left-0 text-black bottom-[-100%] shadow-sm shadow-black px-[6px] bg-neutral-100 rounded-full whitespace-nowrap">{{tooltip[listIndex]}}</div>
            </div>
        </div>
        <div class="flex gap-2 p-1 border border-transparent rounded-sm hover:border-neutral-300">
            <input @click="toggleBackSpace" type="checkbox" name="" id="">
            <p>use backspace</p>
        </div>
        <div class="flex gap-2 p-1 border border-transparent rounded-sm hover:border-neutral-300">
            <input @click="toggleTimedTyping" type="checkbox" name="" id="">
            <p>timer</p>
            <div v-if="timedTyping" class="space-x-2">                
                <span @click="typingCountdown = 10">10s</span>
                <span @click="typingCountdown = 20">20s</span>
                <span @click="typingCountdown = 30">30s</span>
            </div>
        </div>
        <div @click="showMoreSettings = !showMoreSettings" class="absolute w-3 h-3 bg-white rounded-full bottom-2 right-2"></div>
    </div>
</template>

<script setup>
import { ref, watch, watchEffect } from 'vue'
import {customizeStore} from '../store/customizeStore.js'
import {storeToRefs} from 'pinia'
import {mainStore} from '../store/mainStore'

const main = mainStore()
const {pauseTyping, enableBackSpace, timedTyping, typingCountdown, showMoreSettings} = storeToRefs(main)
const {getMobileOS} = main

const store = customizeStore()
const {selectedCustomizers, configurationArgs, configChange, temporaryCustomizers} = storeToRefs(store)

const tooltip = ['text-length', 'word-type', 'text-type', 'text-format', 'text-type', 'text-type']
const options = [
    ['auto', '10+', '20+', '40+'],
    ['most-used', 'seldom-used', 'rarely-used'],
    ['quotes', 'random-text'],
    ['caps'],
    ['punctuations'],
    ['numbers'],
]

const hoverIndex = ref(null)
const emit = defineEmits([ 'emitTextAlign']) 


const mouseEnter = (index) => hoverIndex.value = index
const mouseLeave = (index) => hoverIndex.value = null

const toggleBackSpace = (e) => {
    enableBackSpace.value = !enableBackSpace.value
}

const toggleTimedTyping = () => {
    timedTyping.value = !timedTyping.value
}

watch(configurationArgs, (newVal) => {
    configChange.value = true
    if (temporaryCustomizers.value[configurationArgs.value[1]] === configurationArgs.value[0]) temporaryCustomizers.value[configurationArgs.value[1]] = ''
    else temporaryCustomizers.value[configurationArgs.value[1]] = configurationArgs.value[0]
})

watch(configChange, (newVal, oldVal) => {
    if (newVal) pauseTyping.value = true
    else pauseTyping.value = false
})
</script>

