<template>
    <div class="m-auto max-w-[1500px] lg:flex pt-1"> 
      <div class="w-[100%] mx-auto flex-none relative">   
        <div @click="hideElements = !hideElements" v-if="hideElements && !focus" class="p-1 font-light text-slate-500 px-2 border border-slate-500 z-[1] whitespace-nowrap uppercase w-fit m-auto text-xs hover:border-green-400">{{ 'show config' }}</div>   
        <Customize v-if="!hideElements" />
        <TestContainer />
      </div>
      <Settings />
    </div>
</template>

<script setup>
import TestContainer from '../components/TestContainer.vue'
import Settings from '../components/Settings/Settings.vue'
import Customize from '../components/Customize.vue'
import { ref, watch, onMounted } from 'vue';
import { mainStore } from '../store/mainStore';
import { storeToRefs } from 'pinia';
import { customizeStore } from '../store/customizeStore';
import { useRouter } from 'vue-router';

const router = useRouter()
const store = mainStore()
const { hasCompletedSession, focus} = storeToRefs(store)

const customize = customizeStore()
const { hideElements } = storeToRefs(customize)
const screenWidth = ref(window.innerWidth)

watch(hasCompletedSession, (newVal) => {
    if (newVal) router.push({path: 'result'})
}, {deep: true})

window.addEventListener('resize', () => screenWidth.value = window.innerWidth )

watch(hideElements, newVal => {
  const localStorageSettings = ref(JSON.parse(localStorage.getItem('kiboard')))
  localStorageSettings.value.hide = newVal
  localStorage.setItem('kiboard', JSON.stringify(localStorageSettings.value))
})

watch(focus, newVal => {
  if (newVal) hideElements.value = true
})
</script>
