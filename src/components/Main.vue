<template>
    <main :class="[appTheme]" class="page home noscrollbar">
        <Connectivity />
        <div class="main">
            <Navbar />
            <RouterView />
            <Next />
            <Theme />
            <Modals_Popups_Toasts/>
        </div>
    </main>
</template>

<script setup>
import Modals_Popups_Toasts from './Modals_Popups_Toasts.vue'
import Connectivity from './Connectivity.vue'
import Navbar from './Navbar.vue'
import Theme from './Theme.vue'
import Next from './Next.vue';

import {themeStore}  from '../store/themeStore'
import {storeToRefs} from 'pinia'

const theme_ = themeStore()
const { appTheme } = storeToRefs(theme_)
</script>

<style scoped>
.page {
    @apply font-light selection:bg-none select-none max-w-[1500px] m-auto relative min-h-[100dvh] container overflow-y-auto scroll-smooth transition-all duration-300
}
</style>