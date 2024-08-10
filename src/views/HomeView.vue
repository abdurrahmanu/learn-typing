<template>
    <div class="m-auto max-w-[1500px] lg:flex pt-1"> 
      <div class="w-[100%] mx-auto flex-none relative">      
        <Customize v-if="!hideElements" />
        <TestContainer />
      </div>
      <!-- <div class="absolute top-[80%] w-full bg-red-300">
        <p class="absolute px-3 font-black border border-slate-800 shadow-sm shadow-black -rotate-12 w-fit hover:shadow-none left-[30%] z-[1]">HELP</p>
        <p class="absolute px-3 font-black border border-slate-800 shadow-sm shadow-black rotate-[26deg] w-fit hover:shadow-none top-[15%] left-[10%] z-[1]">DEMO</p>
      </div> -->
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
const { hasCompletedSession} = storeToRefs(store)

const customize = customizeStore()
const { hideElements } = storeToRefs(customize)
const screenWidth = ref(window.innerWidth)

watch(hasCompletedSession, (newVal) => {
    if (newVal) router.push({path: 'result'})
}, {deep: true})

window.addEventListener('resize', () => screenWidth.value = window.innerWidth )
</script>
