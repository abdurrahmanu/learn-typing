<template>
  <Transition name="test">
      <div v-if="!hasCompletedSession" :class="[isMobile() && focus ? 'hidden' : 'block', appTheme]" class="relative m-auto items-center p-1 flex font-[500] pb-7 config text-[13px] max-w-[900px] gap-2 justify-center flex-wrap relative z-[1]">
        <div class="flex items-center gap-3 p-[1px] parent" v-for="(optionArr, key, listIndex) in option" :key="listIndex">          
            <div 
            class="relative ring-zinc-700 hover:ring-blue-800 flex py-[2px] px-1 ring-[1px] rounded-lg cursor-pointer flex-wrap justify-center items-center"
            @mouseenter="mouseEnter(listIndex)"
            @mouseleave="mouseLeave(listIndex)" >
                <div 
                class="px-[5px] rounded-md whitespace-nowrap" 
                :class="[disableOption[key] ? 'hide' : '', customizers[key] === option && !disableOption[key]  ? 'text-blue-500' : '', option === 'custom']"
                @click="checkSelection(option, key)" 
                v-for="(option, index) in optionArr" 
                :key="index">
                    {{ option }}
                </div>
                <div v-if="listIndex === hoverIndex" class="absolute z-10 left-0 text-black top-[105%] shadow-sm shadow-slate-500 px-[6px] bg-neutral-100 rounded-full whitespace-nowrap text-xs font-normal">{{optionsTooltip[listIndex]}}</div>
            </div>
        </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import {customizeStore} from '../store/customizeStore.js'
import {storeToRefs} from 'pinia'
import { mainStore } from '../store/mainStore.js';
import { themeStore } from '../store/themeStore';
import { isMobile } from '../composables/isMobile.js';

const theme_ = themeStore()
const {appTheme}  = storeToRefs(theme_)

const store = mainStore()
const { hasCompletedSession, focus} = storeToRefs(store)

const customize = customizeStore()
const { allOptions, configs, customizers, disableOption, repeat} = storeToRefs(customize)
const {changeConfig} = customize
const optionsTooltip = ['words', 'words', 'type', 'format', 'format', 'format']

const {
    'test-length' : textLength,
    'words-type':  wordType,
    'test-type': testType,
    'caps': includeCaps,
    'punctuation':  includePunctuations,
    'numbers': includeNumbers,
    'modes': modes,
    'reverse': reverse,
    'randomcase': randomCase,
    'spaced': space,
    'jumble': random,
    'uppercase': uppercase,
    } = allOptions.value

const option = ref({
    'test-length' : textLength,
    'words-type': wordType, 
    'test-type': testType,
    'caps': includeCaps, 
    'punctuation': includePunctuations,
    'numbers': includeNumbers,
    'modes': modes,
    'reverse': reverse,
    'randomcase': randomCase,
    'spaced': space,
    'jumble': random,
    'uppercase': uppercase,
})

const hoverIndex = ref(null)
const mouseEnter = (index) => hoverIndex.value = index
const mouseLeave = (index) => hoverIndex.value = null

const checkSelection = (key, option) => {
  if ((option === 'test-type' && key !== customizers.value['test-type']) || (option === 'modes' && key !== customizers.value['modes'])) repeat.value = false
  configs.value = [option, key]

  let selection = +configs.value[1] || configs.value[1]
  let currentWordType = customizers.value['words-type']
  let currentTestType = customizers.value['test-type']
  let currentTextLength = customizers.value['test-length']
  let currentMode = customizers.value['modes']

  if (selection === currentWordType || selection === currentTestType || selection === currentTextLength || selection === currentMode) return
  changeConfig()
}
</script>

<style scoped>
    .parent:has(.hide) {
      display: none;
      visibility: hidden;
    }

    .alphabet-enter-from {
      opacity: 0;
      transform: translateY(-50%);
    }

    .test-enter-from {
      opacity: 0;
      transform: translateY(50%);
    }

    .alphabet-enter-active,
    .test-enter-active {
      transition: all 0.3s ease;
    }

    .alphabet-leave-active, 
    .test-leave-active {
      position: absolute;
      opacity: 0;
    }
</style>