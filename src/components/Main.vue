<template>
    <main :class="[appTheme]" class="page main-font">
        <div class="main bg-inherit flex flex-col h-screen">
            <Navbar />
            <div class="bg-inherit overflow-auto flex-1">
                <RouterView />
                <Modals_Popups_Toasts/>
                <Footer />
            </div>
        </div>
    </main>
</template>

<script setup>
import Modals_Popups_Toasts from './Modals_Popups_Toasts.vue'
import Navbar from './Navbar.vue'
import Footer from './Footer.vue';

import {themeStore}  from '../store/themeStore'
import {storeToRefs} from 'pinia'

const themestore = themeStore()
const { appTheme } = storeToRefs(themestore)
</script>

<style scoped>
.page {
    @apply font-light max-w-[2000px] mx-auto select-none min-h-[100dvh] container transition-all duration-300
}
</style>