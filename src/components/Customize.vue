<template>
  <div 
  v-if="!(focus && isMobile()) && isMobile()" 
  @click="hideElements = !hideElements" 
  :class="!hideElements ? '' : ''" 
  class="mobile-quick-settings">{{ hideElements ? 'Quick settings' : 'close settings' }}</div> 

  <div v-if="(!isMobile() && !hideElements) || (isMobile() && !hideElements)" :class="[(isMobile() && !hideElements) && 'mobile-quick-settings-modal']">
    <Transition name="customizer-transition">
      <div 
      v-if="!testCompleted" 
      :class="[toggleQuickSettings, appTheme]" 
      class="container config"
      >
        <div 
        class="parent" 
        v-for="(optionArr, key, listIndex) in quickSettingsGroups" 
        :key="listIndex"
        >          
            <div 
            :class="[!disableOption[key] && 'hover:ring-blue-800']"
            class="single-group"
            @mouseenter="mouseEnter(listIndex)"
            @mouseleave="mouseLeave(listIndex)" 
            >
                <div 
                id="focus"
                class="single-setting hover-state" 
                :class="[disableOption[key] && 'opacity-30', customizers[key] === option && 'text-blue-500']"
                @click="!disableOption[key] && checkSelection(option, key)" 
                v-for="(option, index) in optionArr" 
                :key="index">
                    {{ option }}
                </div>
            </div>
        </div>
        
        <div class="relative ring-[1px] rounded-lg cursor-pointer ring-zinc-700 hover:ring-blue-800 flex py-[2px] px-1">
          <div id="focus" class="relative w-fit">
              <Clock class="peer" />
          </div>
        </div>

        <div class="relative ring-[1px] rounded-lg cursor-pointer ring-zinc-700 hover:ring-blue-800 flex py-[2px] px-1">
          <div class="flex gap-3 px-2 items-center">
                <div 
                id="focus" 
                v-if="!isMobile()" 
                class="relative hidden w-fit min-[505px]:block">
                    <TextAlign class="peer"/>
                </div>
                <div class="relative w-fit">
                    <Blind class="peer"/>
                </div>
                <div 
                id="focus" 
                v-if="route.name === 'home'" 
                class="relative w-fit" >
                    <repeatSVG class="w-4 peer"/>
                </div>
                <div class="relative w-fit" >
                    <add 
                    @click="openCustomTestModal" 
                    class="w-4 peer"/>
                </div>
          </div>

        </div>
    </div>
  </Transition>
  </div>  
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { isMobile } from '../composables/isMobile.js';
import {customizeStore} from '../store/customizeStore.js'
import { typingStateStore } from '../store/typingStateStore.js';
import { themeStore } from '../store/themeStore';
import {storeToRefs} from 'pinia'
import { useRoute } from 'vue-router';
import Clock from './Clock.vue';
import TextAlign from './TextAlign.vue';
import Blind from './Blind.vue';
import add from './svg/add.vue';
import repeatSVG from './svg/repeat.vue';

const route = useRoute()

const typingstatestore = typingStateStore()
const {focus, testCompleted} = storeToRefs(typingstatestore)

const theme_ = themeStore()
const {appTheme}  = storeToRefs(theme_)

const customize = customizeStore()
const { quickSettingsGroups, toggleCustomTestModal, pauseTyping, hideElements, configs, customizers, disableOption, repeat} = storeToRefs(customize)
const {checkQuickSettings} = customize

const openCustomTestModal = () => {
    toggleCustomTestModal.value = true
    pauseTyping.value = true
}

const hoverIndex = ref(null)
const mouseEnter = (index) => hoverIndex.value = index
const mouseLeave = (index) => hoverIndex.value = null

const checkSelection = (key, option) => {
  const currentSelections = [customizers.value['words-type'], customizers.value['test-type'], customizers.value['test-length'], customizers.value['test-type'] ]
  const nextOptions = ['test-type', 'test-length', 'words-type', 'punctuations', 'numbers']
  configs.value = [option, key]

  // if (!nextOptions.includes(option)) repeat.value = true
  // else repeat.value = false

  let selection = +configs.value[1] || configs.value[1]
  if (currentSelections.includes(selection)) return
  checkQuickSettings()
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

  .customizer-transition-enter-from {
    opacity: 0;
    transform: translateY(50%);
  }

  .parent {
    @apply flex items-center gap-3 p-[1px]
  }

  .mobile-quick-settings {
    @apply p-1 px-2 cursor-pointer rounded-md m-auto text-[12px] uppercase border border-slate-500 whitespace-nowrap w-fit hover:border-green-400 relative z-[1]
  }

  .container {
    @apply m-auto items-center p-1 flex font-[500] pb-7 text-[13px] max-w-[900px] gap-2 justify-center flex-wrap relative z-[1]
  }

  .single-group {
    @apply relative ring-zinc-700 flex py-[2px] px-1 ring-[1px] rounded-lg cursor-pointer flex-wrap justify-center items-center
  }

  .single-setting {
    @apply px-[5px] rounded-md whitespace-nowrap
  }

  .mobile-quick-settings-modal {
    @apply fixed top-[40%] left-[50%] translate-x-[-50%] bg-black translate-y-[-50%] rounded-md py-5 z-[3] shadow-md shadow-black w-[80%] px-5
  }
</style>