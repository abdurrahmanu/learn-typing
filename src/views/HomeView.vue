<template>
    <div :class="[focus && isMobileOS() ? 'pt-10' : 'pt-1']" class="m-auto max-w-[1500px] lg:flex"> 
      <div class="w-[100%] mx-auto flex-none">   
        <div @click="hideElements = !hideElements" v-if="hideElements && !focus" :class="!hideElements ? '' : ''" class="p-1 px-2 cursor-pointer font-[500] rounded-md m-auto text-xs uppercase border text-slate-500 border-slate-500 whitespace-nowrap w-fit hover:border-green-400 min-[1350px]:top-[60px] relative z-[1]">{{ 'show config' }}</div>   
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
import { isMobileOS } from '../composables/isMobileOS';

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
