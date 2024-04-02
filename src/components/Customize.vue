<template>
    <div class="bg-neutral-800 text-slate-300 rounded-md  w-[90%] m-auto">
        <div class="text-[10px] font-mono items-center p-2 flex max-w-[950px] justify-center flex-wrap relative">
            <div class="p-1" v-for="(optionArr, key, listIndex) in option" :key="listIndex">          
                <div 
                :class="[hoverIndex === listIndex ? 'border-zinc-400' : 'border-transparent']" class="relative flex gap-2 py-1 border rounded-lg"
                @mouseenter="mouseEnter(listIndex)"
                @mouseleave="mouseLeave(listIndex)" >
                    <div 
                    class="px-1 hover:bg-neutral-900" 
                    :class="[configChange && tempCustomizers[key] === option || !configChange && customizers[key] === option ? 'text-green-400 bg-neutral-900' : '']"
                    @click="configurationArgs = [option, key]" 
                    v-for="(option, index) in optionArr" 
                    :key="index">
                        {{ option }} 
                    </div>
                    <div v-if="listIndex === hoverIndex" class="absolute z-10 left-0 text-black bottom-[-100%] shadow-sm shadow-black px-[6px] bg-neutral-100 rounded-full whitespace-nowrap">{{optionsTooltip[listIndex]}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, watchEffect } from 'vue'
import {customizeStore} from '../store/customizeStore.js'
import {storeToRefs} from 'pinia'
import {mainStore} from '../store/mainStore'

const main = mainStore()
const {pauseTyping} = storeToRefs(main)

const store = customizeStore()
const { allOptions, configurationArgs, configChange, tempCustomizers, customizers} = storeToRefs(store)

const optionsTooltip = ['length', 'words', 'test-type', 'format', 'test-type', 'test-type']

const {'text-length' : textLength, 'words-type':  wordType, 'test-type': testType, 'include-caps': includeCaps,'include-punctuations':  includePunctuations, 'include-numbers': includeNumbers} = allOptions.value
const option = ref({
    'text-length' : textLength,
    'words-type': wordType, 
    'test-type': testType,
    'include-caps': includeCaps, 
    'include-punctuations': includePunctuations,
    'include-numbers': includeNumbers
})

const hoverIndex = ref(null)
const mouseEnter = (index) => hoverIndex.value = index
const mouseLeave = (index) => hoverIndex.value = null

watch(configurationArgs, (newVal) => {
    configChange.value = true    
    if (tempCustomizers.value[newVal[1]] === newVal[0] && allOptions.value[newVal[1]].length === 1) tempCustomizers.value[newVal[1]] = ''
    else tempCustomizers.value[newVal[1]] = newVal[0]
})

watch(configChange, (newVal, oldVal) => {
    if (newVal) pauseTyping.value = true
    else pauseTyping.value = false
})
</script>

