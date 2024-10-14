<template>
<div ref="containerEl" :class="[isMobileOS() && focus ? 'hidden' : 'block']" class="m-auto rounded-md w-fit relative max-w-[90%] bg-inherit text-[12px] config min-w-[300px] font-semibold">
    <div :style="{'width': completionLevel + '%'}" :class="[!playerInput.length ? 'h-0' : '', theme === 'dark' ? 'bg-green-400 after:bg-green-400' : 'bg-green-600 after:bg-green-600', !completionLevel || playerInput.length < 2 ? 'after:w-0 after:hidden' : 'after:w-[3%] after:right-0 after:absolute after:top-0 after:bottom-0 after:blur-[5px]']" class="absolute left-0 bottom-[-3px] top-[-3px] m-auto rounded-md max-[460px]:hidden p-1" v-if="blind" ></div>
    <div :style="{'width': completionLevel + '%'}" class="absolute left-0 bottom-[-3px] top-[-3px] m-auto rounded-md max-[460px]:hidden flex" v-else>
        <div v-show="index <= playerInput.length - 1" :class="[ index === 0 ? 'rounded-l-[10px]' : '' ,playerInput[index] === alphabet && index <= playerInput.length - 1 ? 'bg-green-500 after:bg-green-500' : 'bg-red-500 after:bg-red-500', index === playerInput.length - 1 ? 'after:w-[100%] after:right-0 after:top-0 after:bottom-0 after:blur-[5px]' : 'after:w-0 after:hidden', !completionLevel || index < 2 ? 'after:hidden' : 'after:absolute']" class="h-[100%] relative" :style="{'width': singleDivWidth + 'px'}" v-for="(alphabet, index) in containerText" :key="index"></div>
    </div>

    <div v-if="!hasCompletedSession && !alphabetsMode_" :class="[appTheme]" class="relative m-auto rounded-md max-w-fit ring-1 ring-green-500">
      <div class="absolute right-[-5px] top-[-5px] z-[2] hover:text-red-500 text-slate-200 h-5 w-5 rounded-full flex items-center justify-center bg-neutral-600 text-center cursor-pointer" @click="hideElements = !hideElements">X</div>
        <div class=" items-center p-1 flex max-w-[1000px] justify-center flex-wrap relative z-[1]">
            <div class="flex items-center p-1 parent" v-for="(optionArr, key, listIndex) in option" :key="listIndex">          
                <div 
                :class="[hoverIndex === listIndex ? 'border-zinc-400' : 'border-transparent']" class="relative flex gap-2 py-[2px] px-1 border rounded-lg cursor-pointer flex-wrap justify-center items-center"
                @mouseenter="mouseEnter(listIndex)"
                @mouseleave="mouseLeave(listIndex)" >
                    <div 
                    class="px-[5px] hover:scale-105 rounded-md whitespace-nowrap" 
                    :class="[disableOption[key] ? 'hide' : '', customizers[key] === option && !disableOption[key]  ? 'text-green-600' : '', option === 'custom']"
                    @click="changeConfig(option, key)" 
                    v-for="(option, index) in optionArr" 
                    :key="index">
                        {{ option }}
                    </div>
                    <div v-if="listIndex === hoverIndex" class="absolute z-10 left-0 text-black top-[105%] shadow-sm shadow-slate-500 px-[6px] bg-neutral-100 rounded-full whitespace-nowrap text-xs font-normal">{{optionsTooltip[listIndex]}}</div>
                </div>
            </div>
        </div>
    </div>
    
    <div v-if="!hasCompletedSession && alphabetsMode_" :class="[appTheme]" class="rounded-md w-[90%] min-w-fit m-auto max-w-fit ring-1 ring-green-600 relative py-3 px-10">
      <div class="absolute right-[-3px] top-[-3px] z-[1] hover:text-red-500  text-slate-200 h-5 w-5 rounded-full flex items-center justify-center bg-neutral-600 text-center cursor-pointer" @click="hideElements = !hideElements">X</div>
      <div class="flex flex-wrap items-center justify-center gap-[8px] rounded-md min-w-fit m-auto max-w-fit hover:ring-[1px] hover:ring-slate-500 group p-[2px] relative z-[1]">        
        <div :class="[alphabetsConfig.uppercase ? 'text-green-600' : '']" @click="changeMode('uppercase')" class="px-[5px] hover:scale-105 rounded-md">uppercase</div>
        <div :class="[alphabetsConfig.customCase ? 'text-green-600' : '']" @click="changeMode('customCase')" class="px-[5px] hover:scale-105 rounded-md">random-case</div>
        <div :class="[alphabetsConfig.spaced ? 'text-green-600' : '']" @click="changeMode('spaced')" class="px-[5px] hover:scale-105 rounded-md">space</div>
        <div :class="[alphabetsConfig.backwards ? 'text-green-600' : '']" @click="changeMode('backwards')" class="px-[5px] hover:scale-105 rounded-md">reverse</div>
        <div :class="[alphabetsConfig.random ? 'text-green-600' : '']" @click="changeMode('random')" class="px-[5px] hover:scale-105 rounded-md">random</div>
        <!-- <div :class="[alphabetsConfig.demo ? 'text-green-600' : '']" @click="changeMode('demo')" class="px-[5px] hover:scale-105 rounded-md">keyboard-demo</div> -->
        <div class="absolute left-0 text-black top-[115%] shadow-sm shadow-slate-500 px-[6px] bg-neutral-100 rounded-full whitespace-nowrap group-hover:block hidden text-xs font-normal">format</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import {customizeStore} from '../store/customizeStore.js'
import {storeToRefs} from 'pinia'
import { mainStore } from '../store/mainStore.js';
import {alphabetsStore}  from '../store/alphabetsModeStore';
import { themeStore } from '../store/themeStore';
import { isMobileOS } from '../composables/isMobileOS';

const containerEl = ref(null)
const singleDivWidth = ref(0)

const theme_ = themeStore()
const {appTheme, theme}  = storeToRefs(theme_)

const alphabets_ = alphabetsStore()
const { alphabetsMode_, alphabetsConfig } = storeToRefs(alphabets_)

const store = mainStore()
const { hasCompletedSession, completionLevel, containerText, playerInput, focus} = storeToRefs(store)
const {switchNext} = store

const customize = customizeStore()
const { allOptions, configs, customizers, disableOption, blind, repeat, hideElements} = storeToRefs(customize)
const {useConfig} = customize
const optionsTooltip = ['words', 'words', 'type', 'format', 'format', 'format']

onMounted(() => {
    watchEffect(() => {
        if (containerText.value.length) {
            const cssObject = getComputedStyle(containerEl.value.parentElement)
            const width = +cssObject.getPropertyValue('width').slice(0, -2)
            singleDivWidth.value = +(width / containerText.value.length).toFixed(2)
        }
    })
})

const {
    'test-length' : textLength,
    'words-type':  wordType,
    'test-type': testType,
    'caps': includeCaps,
    'punctuation':  includePunctuations,
    'numbers': includeNumbers
    } = allOptions.value

const option = ref({
    'test-length' : textLength,
    'words-type': wordType, 
    'test-type': testType,
    'caps': includeCaps, 
    'punctuation': includePunctuations,
    'numbers': includeNumbers
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
  
    if (mode === 'demo') {
      alphabetsConfig.value.demo = !alphabetsConfig.value.demo
    }
      
    const localStorageSettings = ref(JSON.parse(localStorage.getItem('kiboard')))
    localStorageSettings.value.alphabets.mode = alphabetsConfig.value
    localStorage.setItem('kiboard', JSON.stringify(localStorageSettings.value))
    switchNext(customizers.value)
}  

const changeConfig = (key, option) => {
  if (option === 'test-type' && key !== customizers.value['test-type'] && repeat.value) repeat.value = false
  
  if (!disableOption.value[option]) {
    configs.value = [option, key]
      useConfig()
    }
}
</script>

<style scoped>
    .parent:has(.hide) {
      display: none;
      visibility: hidden;
    }
</style>