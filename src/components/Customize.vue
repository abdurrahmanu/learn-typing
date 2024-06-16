<template>
    <div v-if="!hasCompletedSession && !alphabetsMode_" class="bg-transparent rounded-md  w-[90%] m-auto max-w-fit ring-1 ring-green-600 xl:ring-0 relative lg:z-[3]">
        <div class="text-[12px] items-center font-mono p-1 flex max-w-[1000px] justify-center flex-wrap relative">
            <div class="p-1" v-for="(optionArr, key, listIndex) in option" :key="listIndex">          
                <div 
                :class="[hoverIndex === listIndex ? 'border-zinc-400' : 'border-transparent']" class="relative flex gap-2 py-[2px] px-1 border rounded-lg cursor-pointer"
                @mouseenter="mouseEnter(listIndex)"
                @mouseleave="mouseLeave(listIndex)" >
                    <div 
                    class="px-[5px] hover:scale-105 rounded-md" 
                    :class="[disableOption[key] ? 'opacity-50 cursor-not-allowed' : '', customizers[key] === option && !disableOption[key]  ? 'text-green-400 bg-neutral-900' : '']"
                    @click="changeConfig(option, key)" 
                    v-for="(option, index) in optionArr" 
                    :key="index">
                        {{ option }} 
                    </div>
                    <div v-if="listIndex === hoverIndex" class="absolute z-10 left-0 text-black bottom-[-100%] shadow-sm shadow-black px-[6px] bg-neutral-100 rounded-full whitespace-nowrap">{{optionsTooltip[listIndex]}}</div>
                </div>
            </div>
        </div>
    </div>

    <div v-if="!hasCompletedSession && alphabetsMode_" class="flex flex-wrap justify-center gap-3 text-sm w-fit rounded-md px-5 py-2 m-auto lg:z-[3] relative">
          <div :class="[alphabetsConfig.uppercase ? 'border-green-500 text-green-500' : 'border-slate-600']" @click="changeMode('uppercase')" class="px-3 py-1 uppercase border hover:border-green-500 rounded-md w-fit">uppercase</div>
          <div :class="[alphabetsConfig.customCase ? 'border-green-500 text-green-500' : 'border-slate-600']" @click="changeMode('customCase')" class="px-3 py-1 border hover:border-green-500 rounded-md w-fit">cUstoMCaSE</div>
          <div :class="[alphabetsConfig.spaced ? 'border-green-500 text-green-500' : 'border-slate-600']" @click="changeMode('spaced')" class="px-3 py-1 uppercase border hover:border-green-500 rounded-md w-fit">spaced</div>
          <div :class="[alphabetsConfig.backwards ? 'border-green-500 text-green-500' : 'border-slate-600']" @click="changeMode('backwards')" class="px-3 py-1 uppercase border hover:border-green-500 rounded-md w-fit">backwards</div>
          <div :class="[alphabetsConfig.random ? 'border-green-500 text-green-500' : 'border-slate-600']" @click="changeMode('random')" class="px-3 py-1 uppercase border hover:border-green-500 rounded-md w-fit">random</div>
      </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import {customizeStore} from '../store/customizeStore.js'
import {storeToRefs} from 'pinia'
import { mainStore } from '../store/mainStore.js';
import {alphabetsStore}  from '../store/alphabetsModeStore';

const alphabets_ = alphabetsStore()
const { alphabetsMode_, alphabetsConfig } = storeToRefs(alphabets_)

const store = mainStore()
const { hasCompletedSession} = storeToRefs(store)
const {switchNext} = store

const customize = customizeStore()
const { allOptions, configs, customizers, disableOption, next} = storeToRefs(customize)
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
      if (alphabetsConfig.value.customCase && !alphabetsConfig.value.uppercase) alphabetsConfig.value.customCase = false
      alphabetsConfig.value.uppercase = !alphabetsConfig.value.uppercase
    }

    if (mode === 'customCase') {
      if (alphabetsConfig.value.uppercase && !alphabetsConfig.value.customCase) alphabetsConfig.value.uppercase = false
      alphabetsConfig.value.customCase = !alphabetsConfig.value.customCase
    }
  
    
      if (mode === 'spaced') {
        alphabetsConfig.value.spaced = !alphabetsConfig.value.spaced
      }

      if (mode === 'backwards') {
        if (alphabetsConfig.value.random && !alphabetsConfig.value.backwards) alphabetsConfig.value.random = false
        alphabetsConfig.value.backwards = !alphabetsConfig.value.backwards
      }
      
    if (mode === 'random') {
      if (alphabetsConfig.value.backwards && !alphabetsConfig.value.random) alphabetsConfig.value.backwards = false
      alphabetsConfig.value.random = !alphabetsConfig.value.random
    } 

    localStorage.setItem('alphabets-mode', JSON.stringify(alphabetsConfig.value))
    switchNext(customizers.value )
}  

const changeConfig = (key, option) => {
  if (!disableOption.value[option]) {
    configs.value = [option, key]
    useConfig()
  } 
}

watch(next, (newVal) => {
  if (newVal) {
    setTimeout(() => {      
      switchNext(customizers.value)
      next.value = !next.value
    }, 100);
  }
})
</script>

