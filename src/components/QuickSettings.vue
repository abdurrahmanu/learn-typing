<template>
  <div
  :id="hideElements && 'focus'"
  v-show="isMobile() && !focus"
  @click="hideElements = !hideElements" 
  :class="[!hideElements ? 'hover:ring-red-400' : 'hover:ring-blue-500']" 
  class="mobile-quick-settings">{{ hideElements ? 'quick settings' : 'close settings' }}</div> 

  <div 
  v-if="(!isMobile() && !hideElements) || (isMobile() && !hideElements)" 
  :class="[(isMobile() && !hideElements) && 'mobile-quick-settings-modal relative']">
      <div 
      v-if="!testCompleted" 
      :class="[toggleQuickSettings, isMobile() && 'z-[10] bg-inherit top-[20%] w-[10%] absolute mx-auto ring-[1px] ring-black p-5']" 
      class="container config">
        <div 
        class="parent" 
        v-for="(optionArr, key, listIndex) in quickSettingss" 
        :key="listIndex"
        >         
            <div 
            :class="[!disableOption[key] && 'hover:ring-blue-800']"
            class="single-group"
            @mouseenter="mouseEnter(listIndex)"
            @mouseleave="mouseLeave(listIndex)" 
            >
                <div 
                :id="!isMobile() && 'focus'"
                class="single-setting hover-state" 
                :class="[disableOption[key] && 'opacity-30', settings[key] === option && 'text-blue-500']"
                @click="!disableOption[key] && checkSelection(option, key)" 
                v-for="(option, index) in optionArr" 
                :key="index">
                    {{ option }}
                </div>
            </div>
        </div>
        
        <div class="relative ring-[1px] rounded-lg cursor-pointer ring-zinc-700 hover:ring-blue-800 flex py-[2px] px-1">
          <div :id="!isMobile() && 'focus'" class="relative w-fit">
              <ClockSVG />
          </div>
        </div>

        <div class="relative ring-[1px] rounded-lg cursor-pointer ring-zinc-700 hover:ring-blue-800 flex py-[2px] px-1">
            <div class="flex gap-3 px-2 items-center w-fit">
                <div :id="(!isMobile() && key !== 'add') && 'focus'" class="relative pb-1 px-1 w-fit" v-for="(settingsSVG, key, index) in settingsItems" :key="index">
                    <component :is="settingsSVG" @click="key === 'add' && openCustomModal(key)" class="w-4"/>
                </div>
            </div>
        </div>

    </div>
  </div>  
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { isMobile } from '../composables/isMobile.js';
import {settingsStore} from '../store/settingsStore.js'
import { typingStateStore } from '../store/typingStateStore.js';
import { themeStore } from '../store/themeStore.js';
import {storeToRefs} from 'pinia'
import ClockSVG from './Clock.vue';
import TextAlign from './TextAlign.vue';
import BlindSVG from './Blind.vue';
import addSVG from './svg/add.vue';
import repeatSVG from './svg/repeat.vue';

const settingsItems = {
  'textAlign': TextAlign,
  'blind': BlindSVG,
  'repeat': repeatSVG,
  'add': addSVG
}

const typingstatestore = typingStateStore()
const {focus, testCompleted} = storeToRefs(typingstatestore)

const theme_ = themeStore()
const {appTheme}  = storeToRefs(theme_)

const customize = settingsStore()
const { quickSettingss, toggleCustomModal, pauseTyping, hideElements, settings, disableOption} = storeToRefs(customize)
const {checkQuickSettings} = customize

const openCustomModal = () => {
    toggleCustomModal.value = true
    pauseTyping.value = true
}

const hoverIndex = ref(null)
const mouseEnter = (index) => hoverIndex.value = index
const mouseLeave = (index) => hoverIndex.value = null

const checkSelection = (key, option) => {
  const currentSelections = [settings.value['words-type'], settings.value['test-type'], settings.value['test-length'], settings.value['test-type'] ]

  let selection = +key || key
  if (currentSelections.includes(selection)) return
  checkQuickSettings(option, key)
}

const toggleQuickSettings = computed(() => isMobile() && focus.value ? 'hidden' : 'block')

watch(hideElements, newVal => {
  if (newVal) pauseTyping.value = true
  else pauseTyping.value = false
})
</script>

<style scoped>
  .parent:has(.hide) {
    display: none;
    visibility: hidden;
  }

  .parent {
    @apply flex items-center gap-3 p-[1px]
  }

  
  .container {
    @apply m-auto items-center flex text-[14px] max-w-[900px] w-fit gap-2 justify-center flex-wrap relative z-[1] font-[400]
  }
  
  .single-group {
    @apply relative ring-zinc-700 flex py-[2px] px-1 ring-[1px] rounded-lg cursor-pointer flex-wrap justify-center items-center
  }
  
  .single-setting {
    @apply px-[5px] rounded-md whitespace-nowrap selection:bg-none select-none
  }

  .mobile-quick-settings {
    @apply p-1 px-2 cursor-pointer rounded-md m-auto text-[14px] uppercase ring-[1px] ring-slate-500 whitespace-nowrap w-fit relative z-[3]
  }

  .mobile-quick-settings-modal {
    @apply absolute top-0 left-0 right-0 bottom-0 ring-[1px] ring-black z-[2] w-[100%] mx-auto px-10 bg-[hsla(0,0%,6%,0.8)]
  }
</style>