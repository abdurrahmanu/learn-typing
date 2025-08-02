<template>
    <main :class="[appTheme]" class="page main-font">
        <Connectivity />
        <div class="main">
            <Navbar />
            <RouterView />
            <Modals_Popups_Toasts/>
            <Footer />
        </div>
    </main>
</template>

<script setup>
import Modals_Popups_Toasts from './Modals_Popups_Toasts.vue'
import Connectivity from './Connectivity.vue'
import Navbar from './Navbar.vue'
import Footer from './Footer.vue';

import {themeStore}  from '../store/themeStore'
import {storeToRefs} from 'pinia'

const themestore = themeStore()
const { appTheme } = storeToRefs(themestore)
</script>


<style scoped>
.page {
    @apply font-light max-w-[2000px] mx-auto select-none relative min-h-[100dvh] container overflow-y-auto scroll-smooth transition-all duration-300
}
</style>