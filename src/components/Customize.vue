<template>
  <div 
  v-if="hideElements && !(focus && isMobile()) && isMobile()" 
  @click="hideElements = !hideElements" 
  :class="!hideElements ? '' : ''" 
  class="mobile-quick-settings">quick settings</div> 
  <div v-if="!hideElements">
    <Transition name="customizer-transition">
      <div v-if="!testCompleted" :class="[isMobile() && focus ? 'hidden' : 'block', appTheme]" class="relative m-auto items-center p-1 flex font-[500] pb-7 config text-[13px] max-w-[900px] gap-2 justify-center flex-wrap relative z-[1]">
        <div class="flex items-center gap-3 p-[1px] parent" v-for="(optionArr, key, listIndex) in quickSettingsGroups" :key="listIndex">          
            <div 
            class="relative ring-zinc-700 hover:ring-blue-800 flex py-[2px] px-1 ring-[1px] rounded-lg cursor-pointer flex-wrap justify-center items-center"
            @mouseenter="mouseEnter(listIndex)"
            @mouseleave="mouseLeave(listIndex)" >
                <div 
                id="focus"
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
  </div>  
</template>

<script setup>
import { ref } from 'vue'
import { isMobile } from '../composables/isMobile.js';
import {customizeStore} from '../store/customizeStore.js'
import { typingStateStore } from '../store/typingStateStore.js';
import { mainStore } from '../store/mainStore.js';
import { themeStore } from '../store/themeStore';
import {storeToRefs} from 'pinia'

const typingstatestore = typingStateStore()
const {focus, testCompleted} = storeToRefs(typingstatestore)

const theme_ = themeStore()
const {appTheme}  = storeToRefs(theme_)

const customize = customizeStore()
const { quickSettingsGroups, hideElements, configs, customizers, disableOption, repeat} = storeToRefs(customize)
const {checkQuickSettings} = customize

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

  .mobile-quick-settings {
    @apply p-1 px-2 cursor-pointer rounded-md m-auto text-[12px] uppercase border border-slate-500 whitespace-nowrap w-fit hover:border-green-400 relative z-[1]
  }
</style>