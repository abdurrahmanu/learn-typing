<template>
    <Header />
    <div class="m-auto max-w-[1300px] lg:flex pt-3"> 
      <div class="w-[100%] mx-auto flex-none">      
        <Customize />
        <RouterView />
        <div class="pt-5">
          <Restart />
        </div>
      </div>
      <Settings />
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
const {resultData,  pauseTyping, customTexts, alphabets, alphabetsMode, appTheme} = storeToRefs(store)

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
