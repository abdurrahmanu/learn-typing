<template>
    <div v-if="!demo" :class="[appTheme]" class="font-light selection:bg-none home max-w-[1500px] m-auto relative min-h-[100dvh] container overflow-y-auto scroll-smooth noscrollbar transition-all duration-300">
        <Connectivity />
        <Header />
        <RouterView />
        <Next />
        <Footer />
        <Modals_Popups_Toasts/>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import {storeToRefs} from 'pinia'
import {themeStore}  from '../store/themeStore'
import { mainStore } from '../store/mainStore';
import Modals_Popups_Toasts from './Modals_Popups_Toasts.vue'
import Main from './Main.vue'
import Connectivity from './Connectivity.vue'
import Footer from './Footer.vue'
import Header from './Header.vue'
import Next from './Next.vue';

const theme_ = themeStore()
const { appTheme } = storeToRefs(theme_)

const main = mainStore()
const { demo } = storeToRefs(main)
</script>