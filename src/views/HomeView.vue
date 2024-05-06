<template>
    <Header />
    <div class="m-auto max-w-[1300px] lg:flex pt-3"> 
      <div class="w-[100%] mx-auto flex-none">      
        <Customize v-if="!hideElements" />
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
const {switchNext, resetToDefault, generateText} = store
const {resultData,  pauseTyping, customTexts, alphabetsMode} = storeToRefs(store)

const customize = customizeStore()
const {customizers, showMoreSettings, disableOption, hideElements} = storeToRefs(customize)

const screenWidth = ref(window.innerWidth)

window.addEventListener('resize', () => {
  screenWidth.value = window.innerWidth
})

watch(resultData, (newVal, oldVal) => {
  if (newVal.totalTime) router.push({path: 'result'})
  else router.push({name: 'typing'})
}, {deep: true})

watch(customizers, (newConfig, oldConfig) => {
  localStorage.setItem('dorayi-typing-preferred-config', JSON.stringify([newConfig, disableOption.value]))
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

  if (localStorage.getItem('alphabets-mode')) {
    alphabetsMode.value = JSON.parse(localStorage.getItem('alphabets-mode'))
  }

  if (localStorage.getItem('dorayi-typing-preferred-config')) {
    let saved = JSON.parse(localStorage.getItem('dorayi-typing-preferred-config'))
    customizers.value = saved[0]
    disableOption.value = saved[1]
  } 
  else {
    localStorage.setItem('dorayi-typing-preferred-config', JSON.stringify([customizers.value, disableOption.value]))
  }

})
</script>
