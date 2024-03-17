<template>
    <Header />
    <div :class="[showMoreSettings ? 'lg:flex h-[100%]' : '']" class="m-auto max-w-[1100px] pt-3 min-h-[calc(100vh_-_50px)] lg:flex">      

      <div :class="{'z-[999] lg:z-[1]' : !(showMoreSettings && !getMobileOS())}" class="w-full fixed top-0 bottom-0 right-0 left-0 lg:relative z-[999] lg:z-[1] lg:h-[100%]" v-if="showMoreSettings">
        <div class="opacity-30 absolute bg-black w-full lg:hidden top-0 bottom-0 right-0 left-0 lg:relative z-[999] lg:z-[1]"></div>
        <div class="bg-zinc-800" :class="{'block lg:relative w-[300px] top-[50%] translate-y-[-50%] lg:translate-y-0 lg:top-0 max-w-[100%] absolute left-[50%] translate-x-[-50%] lg:relative lg:left-0 lg:translate-x-[0] z-[999] lg:z-[1]' : showMoreSettings && !getMobileOS(), 'absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]' : showMoreSettings && getMobileOS()}">
          <Search class="m-auto"/>
        </div>
      </div>

      <div class="lg:w-[70%] w-[100%] mx-auto flex-none">      
        <Customize v-if="!resultData.totalTime" />
        <RouterView />
        <Restart />
      </div>

    </div>
</template>

<script setup>
import Search from '../components/Search.vue'
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
const {resultData, showMoreSettings,  pauseTyping, customTexts} = storeToRefs(store)

const customize = customizeStore()
const {config} = storeToRefs(customize)

const screenWidth = ref(window.innerWidth)

window.addEventListener('resize', () => {
  screenWidth.value = window.innerWidth
})

watch(resultData, (newVal, oldVal) => {
  if (newVal.totalTime) router.push({path: 'result'})
  else router.push({name: 'typing'})
}, {deep: true})

watch(config, (newConfig, oldConfig) => {
  switchNext(newConfig)
}, {deep: true})

watch(showMoreSettings, (newVal, oldVal) => {
  if (newVal) pauseTyping.value = true
  else pauseTyping.value = false
})

onMounted(() => {
  if (localStorage.getItem('custom-text') ) {
    customTexts.value = localStorage.getItem('custom-text')
  }
})
</script>
