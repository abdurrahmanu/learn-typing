<template>
  <Transition name="customizer-transition">
      <div ref="customizeElement"  v-if="!hasCompletedSession" :class="[isMobile() && focus ? 'hidden' : 'block', appTheme]" class="relative m-auto items-center p-1 flex font-[500] pb-7 config text-[13px] max-w-[900px] gap-2 justify-center flex-wrap relative z-[1]">
        <div class="flex items-center gap-3 p-[1px] parent" v-for="(optionArr, key, listIndex) in quickSettingsGroups" :key="listIndex">          
            <div 
            class="relative ring-zinc-700 hover:ring-blue-800 flex py-[2px] px-1 ring-[1px] rounded-lg cursor-pointer flex-wrap justify-center items-center"
            @mouseenter="mouseEnter(listIndex)"
            @mouseleave="mouseLeave(listIndex)" >
                <div 
                class="px-[5px] rounded-md whitespace-nowrap hover-state" 
                :class="[disableOption[key] ? 'hide' : '', customizers[key] === option && !disableOption[key]  ? 'text-blue-500' : '', option === 'custom']"
                @click="checkSelection(option, key)" 
                v-for="(option, index) in optionArr" 
                :key="index">
                    {{ option }}
                </div>
            </div>
        </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch } from 'vue'
import {customizeStore} from '../store/customizeStore.js'
import {storeToRefs} from 'pinia'
import { mainStore } from '../store/mainStore.js';
import { themeStore } from '../store/themeStore';
import { isMobile } from '../composables/isMobile.js';

const theme_ = themeStore()
const {appTheme}  = storeToRefs(theme_)

const store = mainStore()
const { hasCompletedSession, focus, customizeElement} = storeToRefs(store)

const customize = customizeStore()
const { quickSettingsGroups, configs, customizers, disableOption, repeat} = storeToRefs(customize)
const {checkQuickSettings} = customize

const alphabetModeOptions = ['no-space', 'case', 'arrangement', 'spaced']

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
  checkQuickSettings()
}
</script>

<style scoped>
  .parent:has(.hide) {
    display: none;
    visibility: hidden;
  }

  .customizer-transition-enter-from {
    opacity: 0;
    transform: translateY(50%);
  }
</style>