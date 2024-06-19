<template>
  <div class="py-[3px] m-auto rounded-md w-fit relative max-w-[90%] xl:right-[130px] bg-inherit">
    <div :style="{'width': completionLevel + '%'}" :class="[theme === 'dark' ? 'bg-blue-200 after:bg-blue-400' : 'bg-blue-600 after:bg-blue-600', !completionLevel ? 'after:w-0 after:hidden' : 'after:w-[15px] after:right-0 after:absolute after:top-0 after:bottom-0 after:blur-[5px]']" class="absolute left-0 bottom-0 top-0 m-auto rounded-md max-[460px]:hidden"></div>
    <div v-if="!hasCompletedSession && !alphabetsMode_" :class="[appTheme]" class="rounded-md m-auto max-w-fit ring-1 ring-blue-600 xl:ring-0 relative xl:z-[3]">
        <div class="text-[12px] items-center font-mono p-1 flex max-w-[1000px] justify-center flex-wrap relative">
            <div class="p-1" v-for="(optionArr, key, listIndex) in option" :key="listIndex">          
                <div 
                :class="[hoverIndex === listIndex ? 'border-zinc-400' : 'border-transparent']" class="relative flex gap-2 py-[2px] px-1 border rounded-lg cursor-pointer flex-wrap justify-center"
                @mouseenter="mouseEnter(listIndex)"
                @mouseleave="mouseLeave(listIndex)" >
                    <div 
                    class="px-[5px] hover:scale-105 rounded-md whitespace-nowrap" 
                    :class="[disableOption[key] ? 'opacity-50 cursor-not-allowed' : '', customizers[key] === option && !disableOption[key]  ? 'text-green-500' : '']"
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

    <div v-if="!hasCompletedSession && alphabetsMode_" :class="[appTheme]" class="rounded-md  w-[90%] min-w-fit m-auto max-w-fit ring-1 ring-blue-600 xl:ring-0 relative xl:z-[3] flex gap-1 py-2 px-3 font-normal text-[12px] flex-wrap justify-center">
          <div :class="[alphabetsConfig.uppercase ? 'text-green-500' : '']" @click="changeMode('uppercase')" class="px-[5px] hover:scale-105 rounded-md">uppercase</div>
          <div :class="[alphabetsConfig.customCase ? 'text-green-500' : '']" @click="changeMode('customCase')" class="px-[5px] hover:scale-105 rounded-md">randomcase</div>
          <div :class="[alphabetsConfig.spaced ? 'text-green-500' : '']" @click="changeMode('spaced')" class="px-[5px] hover:scale-105 rounded-md">space</div>
          <div :class="[alphabetsConfig.backwards ? 'text-green-500' : '']" @click="changeMode('backwards')" class="px-[5px] hover:scale-105 rounded-md">reverse</div>
          <div :class="[alphabetsConfig.random ? 'text-green-500' : '']" @click="changeMode('random')" class="px-[5px] hover:scale-105 rounded-md">random</div>
      </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import {customizeStore} from '../store/customizeStore.js'
import {storeToRefs} from 'pinia'
import { mainStore } from '../store/mainStore.js';
import {alphabetsStore}  from '../store/alphabetsModeStore';
import { themeStore } from '../store/themeStore';

const theme_ = themeStore()
const {appTheme, theme}  = storeToRefs(theme_)

const alphabets_ = alphabetsStore()
const { alphabetsMode_, alphabetsConfig } = storeToRefs(alphabets_)

const store = mainStore()
const { hasCompletedSession, completionLevel} = storeToRefs(store)
const {switchNext} = store

const customize = customizeStore()
const { allOptions, configs, customizers, disableOption, next,} = storeToRefs(customize)
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

    const localStorageSettings = ref(JSON.parse(localStorage.getItem('dorayi-typing')))
    localStorageSettings.value.alphabets.mode = alphabetsConfig.value
    localStorage.setItem('dorayi-typing', JSON.stringify(localStorageSettings.value))
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

