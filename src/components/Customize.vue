<template>
    <div v-if="!resultData.totalTime && !alphabets" class="bg-transparent rounded-md  w-[90%] m-auto max-w-fit ring-1 ring-green-500">
        <div class="text-[12px] font-mono items-center p-[1px] flex max-w-[1000px] justify-center flex-wrap relative">
            <div class="p-1" v-for="(optionArr, key, listIndex) in option" :key="listIndex">          
                <div 
                :class="[hoverIndex === listIndex ? 'border-zinc-400' : 'border-transparent']" class="relative flex gap-2 py-[2px] border rounded-lg"
                @mouseenter="mouseEnter(listIndex)"
                @mouseleave="mouseLeave(listIndex)" >
                    <div 
                    class="px-[5px] hover:scale-110 rounded-md" 
                    :class="[disableOption[key] ? 'opacity-50 cursor-not-allowed' : '', customizers[key] === option && !disableOption[key]  ? 'text-green-400 bg-neutral-900' : '']"
                    @click="!disableOption[key] ? configs = [option, key] : ''" 
                    v-for="(option, index) in optionArr" 
                    :key="index">
                        {{ option }} 
                    </div>
                    <div v-if="listIndex === hoverIndex" class="absolute z-10 left-0 text-black bottom-[-100%] shadow-sm shadow-black px-[6px] bg-neutral-100 rounded-full whitespace-nowrap">{{optionsTooltip[listIndex]}}</div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="!resultData.totalTime && alphabets" class="flex flex-wrap justify-center gap-3 pt-10 text-sm">
          <div :class="[alphabetsMode.uppercase ? 'bg-neutral-700' : '']" @click="changeMode('uppercase')" class="px-3 py-1 uppercase border rounded-md border-slate-600 w-fit">uppercase</div>
          <div :class="[alphabetsMode.customCase ? 'bg-neutral-700' : '']" @click="changeMode('customCase')" class="px-3 py-1 border hover:font-medium rounded-md border-slate-600 w-fit">cUstoMCaSE</div>
          <div :class="[alphabetsMode.spaced ? 'bg-neutral-700' : '']" @click="changeMode('spaced')" class="px-3 py-1 uppercase border hover:font-medium rounded-md border-slate-600 w-fit">spaced</div>
          <div :class="[alphabetsMode.backwards ? 'bg-neutral-700' : '']" @click="changeMode('backwards')" class="px-3 py-1 uppercase border hover:font-medium rounded-md border-slate-600 w-fit">backwards</div>
          <div :class="[alphabetsMode.jumbo ? 'bg-neutral-700' : '']" @click="changeMode('jumbo')" class="px-3 py-1 uppercase border hover:font-medium rounded-md border-slate-600 w-fit">jumbo</div>
          <div :class="[alphabetsMode.styled ? 'bg-neutral-700' : '']" @click="changeMode('styled')" class="px-3 py-1 uppercase border hover:font-medium rounded-md border-slate-600 w-fit">styled</div>
        </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import {customizeStore} from '../store/customizeStore.js'
import {storeToRefs} from 'pinia'
import { mainStore } from '../store/mainStore.js';

const store = mainStore()
const {alphabets, resultData, alphabetsMode} = storeToRefs(store)
const customize = customizeStore()
const { allOptions, configs, customizers, disableOption} = storeToRefs(customize)
const {useConfig} = customize
const optionsTooltip = ['length', 'words', 'test-type', 'format', 'test-type', 'test-type']

const {
    'text-length' : textLength,
    'words-type':  wordType,
    'test-type': testType,
    'include-caps': includeCaps,
    'include-punctuations':  includePunctuations,
    'include-numbers': includeNumbers
    } = allOptions.value

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

const changeMode = (mode) => {
    if (mode === 'uppercase') {
      if (alphabetsMode.value.customCase && !alphabetsMode.value.uppercase) alphabetsMode.value.customCase = false
      alphabetsMode.value.uppercase = !alphabetsMode.value.uppercase
    }
  
    if (mode === 'customCase') {
      if (alphabetsMode.value.uppercase && !alphabetsMode.value.customCase) alphabetsMode.value.uppercase = false
      alphabetsMode.value.customCase = !alphabetsMode.value.customCase
    }
  
    if (mode === 'jumbo') {
      if (alphabetsMode.value.backwards && !alphabetsMode.value.jumbo) alphabetsMode.value.backwards = false
      alphabetsMode.value.jumbo = !alphabetsMode.value.jumbo
    }
  
    if (mode === 'backwards') {
      if (alphabetsMode.value.jumbo && !alphabetsMode.value.backwards) alphabetsMode.value.jumbo = false
      alphabetsMode.value.backwards = !alphabetsMode.value.backwards
    }
  
    if (mode === 'styled') {
      alphabetsMode.value.styled = !alphabetsMode.value.styled
    }
  
    if (mode === 'spaced') {
      alphabetsMode.value.spaced = !alphabetsMode.value.spaced
    }
  }

watch(configs, (newVal) => {
    useConfig()
})
</script>

