<template>
    <Header />
    <div class="m-auto max-w-[1300px] lg:flex pt-3"> 
      <div class="w-[100%] mx-auto flex-none">      
        <Customize v-if="!resultData.totalTime && !alphabets" />
        <div v-else-if="!resultData.totalTime && alphabets" class="flex flex-wrap justify-center gap-3 pt-10 text-sm text-slate-300">
          <div :class="[alphabetsMode.uppercase ? 'bg-neutral-700' : '']" @click="changeMode('uppercase')" class="px-3 py-1 uppercase border rounded-md hover:text-white border-slate-600 w-fit">uppercase</div>
          <div :class="[alphabetsMode.customCase ? 'bg-neutral-700' : '']" @click="changeMode('customCase')" class="px-3 py-1 border rounded-md hover:text-white border-slate-600 w-fit">cUstoMCaSE</div>
          <div :class="[alphabetsMode.spaced ? 'bg-neutral-700' : '']" @click="changeMode('spaced')" class="px-3 py-1 uppercase border rounded-md hover:text-white border-slate-600 w-fit">spaced</div>
          <div :class="[alphabetsMode.backwards ? 'bg-neutral-700' : '']" @click="changeMode('backwards')" class="px-3 py-1 uppercase border rounded-md hover:text-white border-slate-600 w-fit">backwards</div>
          <div :class="[alphabetsMode.jumbo ? 'bg-neutral-700' : '']" @click="changeMode('jumbo')" class="px-3 py-1 uppercase border rounded-md hover:text-white border-slate-600 w-fit">jumbo</div>
          <div :class="[alphabetsMode.styled ? 'bg-neutral-700' : '']" @click="changeMode('styled')" class="px-3 py-1 uppercase border rounded-md hover:text-white border-slate-600 w-fit">styled</div>
        </div>
        <RouterView />
        <div class="pt-10">
          <Restart />
        </div>
      </div>

      <div :class="{'z-[999] lg:z-[1]' : !(showMoreSettings && !getMobileOS())}" class="absolute lg:relative top-0 bottom-0 right-0 left-0 z-[99] lg:w-[30%]" v-if="showMoreSettings">
        <div @click="showMoreSettings = !showMoreSettings" class="opacity-30 absolute bg-black w-full lg:hidden top-0 bottom-0 right-0 left-0 z-[999] lg:z-[1]"></div>
        <div class="bg-zinc-800 overflow-y-auto" :class="{'fixed top-0 right-0 bottom-0 h-[100dvh] max-w-[500px] w-fit z-[9999]' : showMoreSettings}">
          <Settings />
        </div>
      </div>
    </div>
</template>

<script setup>
import Settings from '../components/Settings/Settings.vue'
import Header from '../components/Header.vue';
import Customize from '../components/Customize.vue'
import Restart from '../components/Restart.vue';
import { watch, ref, onMounted } from 'vue';
import {useRouter} from 'vue-router';
import { mainStore } from '../store/mainStore';
import { storeToRefs } from 'pinia';
import { customizeStore } from '../store/customizeStore';

const router = useRouter()
const store = mainStore()
const {switchNext, getMobileOS, resetToDefault, generateText} = store
const {resultData,  pauseTyping, customTexts, alphabets, alphabetsMode} = storeToRefs(store)

const customize = customizeStore()
const {customizers, showMoreSettings} = storeToRefs(customize)

const changeMode = (mode) => {
  if (mode === 'uppercase') {
    if (alphabetsMode.value.customCase && !alphabetsMode.value.uppercase) alphabetsMode.value.customCase = false
    alphabetsMode.value.uppercase = !alphabetsMode.value.uppercase
  }

  if (mode === 'customCase') {
    if (alphabetsMode.value.uppercase && !alphabetsMode.value.customCase) alphabetsMode.value.uppercase = false
    alphabetsMode.value.customCase = !alphabetsMode.value.customCase
  }

  if (mode === 'jumbo') {
    if (alphabetsMode.value.backwards && !alphabetsMode.value.jumbo) alphabetsMode.value.backwards = false
    alphabetsMode.value.jumbo = !alphabetsMode.value.jumbo
  }

  if (mode === 'backwards') {
    if (alphabetsMode.value.jumbo && !alphabetsMode.value.backwards) alphabetsMode.value.jumbo = false
    alphabetsMode.value.backwards = !alphabetsMode.value.backwards
  }

  if (mode === 'styled') {
    alphabetsMode.value.styled = !alphabetsMode.value.styled
  }

  if (mode === 'spaced') {
    alphabetsMode.value.spaced = !alphabetsMode.value.spaced
  }
}

const screenWidth = ref(window.innerWidth)

window.addEventListener('resize', () => {
  screenWidth.value = window.innerWidth
})

watch(resultData, (newVal, oldVal) => {
  if (newVal.totalTime) router.push({path: 'result'})
  else router.push({name: 'typing'})
}, {deep: true})

watch(customizers, (newConfig, oldConfig) => {
  switchNext(newConfig)
}, {deep: true})

watch(showMoreSettings, (newVal, oldVal) => {
  if (newVal) pauseTyping.value = true
  else pauseTyping.value = false
})

watch(alphabetsMode, (newVal) => {
  if (newVal) {
    resetToDefault()
    generateText(customizers.value)
  }
}, {deep: true})

onMounted(() => {
  if (localStorage.getItem('custom-text') ) {
    customTexts.value = JSON.parse(localStorage.getItem('custom-text'))
  }
})
</script>
