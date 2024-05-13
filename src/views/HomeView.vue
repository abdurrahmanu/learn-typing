<template>
    <Header />
    <div class="m-auto max-w-[1300px] lg:flex pt-3"> 
      <div class="w-[100%] mx-auto flex-none">      
        <Customize v-if="!hideElements" />
        <Text />
      </div>
      <Settings />
    </div>
</template>

<script setup>
import Text from '../components/Text.vue'
import Settings from '../components/Settings/Settings.vue'
import Header from '../components/Header.vue';
import Customize from '../components/Customize.vue'
import { ref, watch } from 'vue';
import { mainStore } from '../store/mainStore';
import { storeToRefs } from 'pinia';
import { customizeStore } from '../store/customizeStore';
import { useRouter } from 'vue-router';

const router = useRouter()
const store = mainStore()
const { hasCompletedSession } = storeToRefs(store)

const customize = customizeStore()
const { hideElements } = storeToRefs(customize)
const screenWidth = ref(window.innerWidth)

watch(hasCompletedSession, (newVal) => {
    if (newVal) router.push({path: 'result'})
}, {deep: true})

window.addEventListener('resize', () => {
  screenWidth.value = window.innerWidth
})
</script>
