<template>
    <Header />
    <div class="m-auto max-w-[1100px] lg:flex pt-3"> 
      <div class="w-[100%] lg:w-[70%] mx-auto flex-none">      
        <Customize v-if="!resultData.totalTime" />
        <RouterView />
        <div class="pt-10">
          <Restart />
        </div>
      </div>

      <div :class="{'z-[999] lg:z-[1]' : !(showMoreSettings && !getMobileOS())}" class="absolute lg:relative top-0 bottom-0 right-0 left-0 z-[99] lg:w-[30%]" v-if="showMoreSettings">
        <div @click="showMoreSettings = !showMoreSettings" class="opacity-30 absolute bg-black w-full lg:hidden top-0 bottom-0 right-0 left-0 z-[999] lg:z-[1]"></div>
        <div class="bg-zinc-800 h-[calc(100vh_-_62px)] overflow-y-auto" :class="{'block w-[600px] top-[50%] translate-y-[-50%] lg:translate-y-0 lg:top-0 lg:max-w-[100%] max-w-[90%] absolute left-[50%] translate-x-[-50%] lg:relative lg:left-0 lg:translate-x-[0] z-[999] lg:z-[1]' : showMoreSettings && !getMobileOS(), 'w-[90%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[999]' : showMoreSettings && getMobileOS()}">
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
import { watch, ref, watchEffect, computed, onMounted } from 'vue';
import {useRouter} from 'vue-router'
import { mainStore } from '../store/mainStore';
import { storeToRefs } from 'pinia';
import { customizeStore } from '../store/customizeStore';

const router = useRouter()
const store = mainStore()

const {switchNext, getMobileOS} = store
const {resultData,  pauseTyping, customTexts} = storeToRefs(store)

const customize = customizeStore()
const {customizers, showMoreSettings} = storeToRefs(customize)

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

onMounted(() => {
  if (localStorage.getItem('custom-text') ) {
    customTexts.value = JSON.parse(localStorage.getItem('custom-text'))
  }
})
</script>
