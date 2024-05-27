<template>
    <div v-if="!hasCompletedSession && !alphabets && !dictionaryMode && !gameMode" class="bg-transparent rounded-md  w-[90%] m-auto max-w-fit ring-1" :class="secTheme">
        <div class="text-[12px] font-mono items-center p-[1px] flex max-w-[1000px] justify-center flex-wrap relative">
            <div class="p-1" v-for="(optionArr, key, listIndex) in option" :key="listIndex">          
                <div 
                :class="[hoverIndex === listIndex ? 'border-zinc-400' : 'border-transparent']" class="relative flex gap-2 py-[2px] border rounded-lg cursor-pointer"
                @mouseenter="mouseEnter(listIndex)"
                @mouseleave="mouseLeave(listIndex)" >
                    <div 
                    class="px-[5px] hover:scale-110 rounded-md" 
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

    <div v-if="!hasCompletedSession && alphabets && !dictionaryMode" class="flex flex-wrap justify-center gap-3 pt-10 text-sm">
          <div :class="[alphabetsMode.uppercase ? 'bg-neutral-500' : '']" @click="changeMode('uppercase')" class="px-3 py-1 uppercase border rounded-md border-slate-600 w-fit">uppercase</div>
          <div :class="[alphabetsMode.customCase ? 'bg-neutral-500' : '']" @click="changeMode('customCase')" class="px-3 py-1 border rounded-md hover:font-medium border-slate-600 w-fit">cUstoMCaSE</div>
          <div :class="[alphabetsMode.spaced ? 'bg-neutral-500' : '']" @click="changeMode('spaced')" class="px-3 py-1 uppercase border rounded-md hover:font-medium border-slate-600 w-fit">spaced</div>
          <div :class="[alphabetsMode.backwards ? 'bg-neutral-500' : '']" @click="changeMode('backwards')" class="px-3 py-1 uppercase border rounded-md hover:font-medium border-slate-600 w-fit">backwards</div>
          <div :class="[alphabetsMode.random ? 'bg-neutral-500' : '']" @click="changeMode('random')" class="px-3 py-1 uppercase border rounded-md hover:font-medium border-slate-600 w-fit">random</div>
      </div>

      <div v-if="dictionaryMode" class="text-center">
        DICTIONARY WORDS
        <div class="py-4 text-center">
          <input :class="[theme === 'neutral' ? 'text-slate-300 caret-slate-400 placeholder:text-neutral-600' : 'text-slate-700 caret-slate-800 placeholder:text-slate-500']" @keyup.enter="fetchWordDefinitions(searchWord)" @focus="searchFieldIsFocused = true" @blur="searchFieldIsFocused = false" ref="searchInputEl" type="text" v-model="searchWord" class="px-1 py-[3px] text-xs max-w-[400px] outline-none border-b border-b-green-600 bg-transparent w-[80%]" placeholder="Type in a word to search definition">
          <button  @click="fetchWordDefinitions(searchWord)" class="px-2 py-1 text-xs text-white bg-green-800 rounded-md rounded-l-none hover:bg-green-600">Search</button>
        </div>
      </div>

      <div v-if="gameMode">
        <div class="flex justify-center py-3 space-x-2">
          <div  @click="" class="px-3 py-1 uppercase border rounded-md hover:font-medium border-slate-600 w-fit">GAME 1</div>
            <div @click="" class="px-3 py-1 uppercase border rounded-md hover:font-medium border-slate-600 w-fit">GAME 2</div>
        </div>
          <div class="py-10 text-xl text-center">
            COMING SOON...
          </div>
      </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import {customizeStore} from '../store/customizeStore.js'
import {storeToRefs} from 'pinia'
import { mainStore } from '../store/mainStore.js';
import {fetchWord} from '../composables/UseDictionary.js'

const store = mainStore()
const {alphabets, alphabetsMode, hasCompletedSession, theme, secondaryTheme, dictionaryMode, searchWord, searchFieldIsFocused, dictionaryData, gameMode, searchInputEl} = storeToRefs(store)
const {switchNext, resetToDefault, generateText} = store

const customize = customizeStore()
const { allOptions, configs, customizers, disableOption, next} = storeToRefs(customize)
const {useConfig} = customize
const optionsTooltip = ['length', 'words', 'test-type', 'format', 'test-type', 'test-type']

const secTheme = computed(() => {
  return secondaryTheme.value === 'green' ? 'ring-green-500' :
            secondaryTheme.value === 'blue' ? 'ring-blue-500' :
            secondaryTheme.value === 'yellow' ? 'ring-yellow-500' :
            secondaryTheme.value === 'red' ? 'ring-red-500' :
            secondaryTheme.value === 'teal' ? 'ring-teal-500' :
            secondaryTheme.value === 'pink' ? 'ring-pink-300' : 'ring-black'
})

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
  
    
      if (mode === 'spaced') {
        alphabetsMode.value.spaced = !alphabetsMode.value.spaced
      }

      if (mode === 'backwards') {
        if (alphabetsMode.value.random && !alphabetsMode.value.backwards) alphabetsMode.value.random = false
        alphabetsMode.value.backwards = !alphabetsMode.value.backwards
      }
      
    if (mode === 'random') {
      if (alphabetsMode.value.backwards && !alphabetsMode.value.random) alphabetsMode.value.backwards = false
      alphabetsMode.value.random = !alphabetsMode.value.random
    } 

    localStorage.setItem('alphabets-mode', JSON.stringify(alphabetsMode.value))

    resetToDefault()
    generateText(customizers.value)
}  

async function fetchWordDefinitions(word) {
  if (word) {
    const {data} = await fetchWord(word)
    dictionaryData.value = data.value
    resetToDefault()
    generateText(customizers.value)
  }
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

