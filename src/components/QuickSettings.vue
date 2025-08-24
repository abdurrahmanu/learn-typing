<template>
  <div class="relative">

    <div
    :id="!showQuickSettings && 'focus'"
    v-show="(mobile && !focus) || isSmallScreen"
    @click="showQuickSettings = !showQuickSettings"
    :class="[showQuickSettings ? 'hover:ring-red-400' : 'hover:ring-blue-500']"
    class="mobile-quick-settings">{{ showQuickSettings ? 'close settings' : 'quick settings' }}</div>

    <div
    v-if="showQuickSettings"
    :class="[((mobile || isSmallScreen) && showQuickSettings) && 'mobile-quick-settings-modal relative ' + appTheme, (focus && beginTest) && 'invisible pointer-events-none']">
        <div class="container exo">
          <div
          v-if="!testCompleted"
          class="parent"
          v-for="(optionArr, key, listIndex) in quickSettingss"
          :key="listIndex">
              <div
              :class="[!disableOption[key] && 'hover:ring-blue-800']"
              class="single-group"
              @mouseenter="mouseEnter(listIndex)"
              @mouseleave="mouseLeave(listIndex)">
                  <div
                  :id="!mobile && 'focus'"
                  class="single-setting hover-state"
                  :class="[disableOption[key] && 'opacity-30', settings[key] === option && 'text-blue-500']"
                  @click="!disableOption[key] && checkQuickSettings(option, key)"
                  v-for="(option, index) in optionArr"
                  :key="index">
                      {{ option }}
                  </div>
              </div>
          </div>
          <div class="relative ring-[1px] rounded-lg cursor-pointer ring-zinc-700 hover:ring-blue-800 flex py-[2px] px-1">
            <div :id="!mobile && 'focus'" class="relative w-fit">
                <ClockSVG />
            </div>
          </div>
          <div class="relative ring-[1px] rounded-lg cursor-pointer ring-zinc-700 hover:ring-blue-800 flex py-[2px] px-1">
              <div class="flex gap-3 px-2 items-center w-fit">
                  <div :id="(!mobile && key !== 'add') && 'focus'" class="relative pb-1 px-1 w-fit" v-for="(settingsSVG, key, index) in settingsItems" :key="index">
                      <component :is="settingsSVG" @click="key === 'add' && openCustomModal(key)" class="w-4"/>
                  </div>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ClockSVG from './Clock.vue';
import TextAlign from './TextAlign.vue';
import BlindSVG from './Blind.vue';
import addSVG from './svg/add.vue';
import repeatSVG from './svg/repeat.vue';

const mobile = isMobile()

const settingsItems = {
  'textAlign': TextAlign,
  'blind': BlindSVG,
  'repeat': repeatSVG,
  'add': addSVG
}

const themestore = themeStore()
const {appTheme} = storeToRefs(themestore)

const typingstore = typingStore()
const {focus, testCompleted, beginTest} = storeToRefs(typingstore)

const screenWidth = ref(window.innerWidth)
const isSmallScreen = computed(() => screenWidth.value < 600)

window.addEventListener('resize', () => {
  screenWidth.value = window.innerWidth
})

const settingstore = settingsStore()
const { quickSettingss, toggleCustomModal, pauseTyping, showQuickSettings, settings, disableOption} = storeToRefs(settingstore)
const {checkQuickSettings} = settingstore

const openCustomModal = () => {
    toggleCustomModal.value = true
    pauseTyping.value = true
}

const hoverIndex = ref(null)
const mouseEnter = (index) => hoverIndex.value = index
const mouseLeave = (index) => hoverIndex.value = null

watch(showQuickSettings, newVal => {
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
    @apply flex items-center p-[1px]
  }

  .container {
    @apply m-auto items-center flex max-w-[900px] gap-3 justify-center flex-wrap relative z-[1] p-3 rounded-md w-full
  }

  .single-group {
    @apply relative ring-zinc-700 flex py-[2px] px-1 ring-[1px] rounded-lg cursor-pointer flex-wrap justify-center items-center
  }

  .single-setting {
    @apply px-[5px] rounded-md whitespace-nowrap selection:bg-none select-none
  }

  .mobile-quick-settings {
    @apply p-1 px-2 cursor-pointer rounded-md m-auto uppercase ring-[1px] ring-slate-500 whitespace-nowrap w-fit relative z-[3]
  }

  .mobile-quick-settings-modal {
    @apply absolute top-[100%] h-screen left-0 right-0 z-[2] w-full mx-auto p-10
  }
</style>
