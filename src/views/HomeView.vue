<template>
    <Header />
    <div :class="[showMoreSettings ? 'lg:flex h-[100%]' : '']" class="m-auto max-w-[1000px] pt-3 min-h-[calc(100vh_-_50px)]">      
      <div v-if="showMoreSettings && !getMobileOS()" class="hidden overflow-auto lg:block w-fit max-w-[300px] bg-zinc-700 flex-none">
        <Search />
      </div>
      <div class="lg:w-[70%] w-[100%] mx-auto flex-none">      
        <Customize v-if="!resultData.totalTime" />
        <RouterView />
        <Restart />
      </div>
    </div>

  <div class="lg:hidden"  v-if="showMoreSettings">    
    <Modal 
      class="bg-zinc-900 overflow-y-auto"
      @close="showMoreSettings = !showMoreSettings"
      :toggle="toggleModal"
      >
        <Search />
      </Modal>
  </div>
</template>

<script setup>
import Modal from '../components/Modal.vue'
import Search from '../components/Search.vue'
import Header from '../components/Header.vue';
import Customize from '../components/Customize.vue'
import Restart from '../components/Restart.vue';
import { watch, ref, watchEffect, computed } from 'vue';
import {useRouter} from 'vue-router'
import { mainStore } from '../store/mainStore';
import { storeToRefs } from 'pinia';
import { customizeStore } from '../store/customizeStore';

const router = useRouter()
const store = mainStore()

const {switchNext, getMobileOS} = store
const {resultData, showMoreSettings, pauseTyping} = storeToRefs(store)

const customize = customizeStore()
const {config} = storeToRefs(customize)

const screenWidth = ref(window.innerWidth)

window.addEventListener('resize', () => {
  screenWidth.value = window.innerWidth
})

const toggleModal = computed(() => {
  return getMobileOS() == true ? showMoreSettings.value : screenWidth.value < 1023 && showMoreSettings.value
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
</script>
