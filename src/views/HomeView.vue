<template>
    <div  class="m-auto max-w-[1500px] lg:flex"> 
      <div class="w-[100%] mx-auto flex-none space-y-3">   
        <div @click="hideElements = !hideElements" v-if="hideElements && !(focus && isMobile())" :class="!hideElements ? '' : ''" class="p-1 px-2 cursor-pointer font-[500] rounded-md m-auto text-[14px] uppercase border border-slate-500 whitespace-nowrap w-fit hover:border-green-400 relative z-[1]">quick settings </div>   
        <Customize v-if="!hideElements" />
        <TestContainer />
      </div>
    </div>
</template>

<script setup>
import TestContainer from '../components/TestContainer.vue'
import Customize from '../components/Customize.vue'
import { ref, watch } from 'vue';
import { mainStore } from '../store/mainStore';
import { storeToRefs } from 'pinia';
import { customizeStore } from '../store/customizeStore';
import { useRouter } from 'vue-router';
import { countdownStore } from '../store/countdownStore'
import { isMobile } from '../composables/isMobile';
import { isTouchScreenDevice } from '../composables/isTouchScreenDevice';

const count = countdownStore()
const {clearCounter} = count

const router = useRouter()
const store = mainStore()
const { hasCompletedSession, focus, timedTyping} = storeToRefs(store)

const customize = customizeStore()
const { hideElements } = storeToRefs(customize)

const main = mainStore()
const {inputEl} = storeToRefs(main)

const screenWidth = ref(window.innerWidth)

watch(hasCompletedSession, (newVal) => {
    if (timedTyping.value) clearCounter()
    if (newVal) router.push({path: 'result'})
}, {deep: true})

window.addEventListener('resize', () => screenWidth.value = window.innerWidth)
watch(focus, newVal => {
  newVal ? hideElements.value = true : ''
})
</script>
