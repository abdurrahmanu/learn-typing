<template>
    <header :class="[appTheme]" class="header">
        <div 
        @click="routeToPage('about')" 
        class="flex items-center gap-1">
            <Logo class="flex cursor-pointer" /> 
            <p class="text-sm font-bold">KiBoard</p>
        </div>

        <div class="nav-container center-x ">
            <div 
            @click="routeToPage(key)" 
            :class="[currentRouteStyle(key)]" 
            class="nav-item"
            v-for="(NavItem, key, index) in navItems" 
            :key="index">
                <component :is="NavItem" class="w-5"/>
            </div>
        </div>

        <div 
        @click="routeToPage('user')" 
        :class="[currentRouteStyle('user')]" 
        class="nav-item">
            <userSVG class="w-5" />
        </div>
    </header>
</template>

<script setup>
import Logo from './Logo.vue'
import homeSVG from './svg/home.vue'
import settingsSVG from './svg/settings.vue';
import userSVG from './svg/user.vue'
import feedbackSVG from './svg/feedback.vue'
import {useRouter} from 'vue-router'
import { themeStore } from '../store/themeStore';
import {storeToRefs} from 'pinia';
import { ref, computed } from 'vue';
import { mainStore } from '../store/mainStore';

const navItems = {
    'home': homeSVG,
    'about': feedbackSVG,
    'settings': settingsSVG,
}
const router = useRouter()

const mainstore = mainStore()
const {route} = storeToRefs(mainstore)

const currentRoute = ref(route.value)

const theme_ = themeStore()
const {appTheme} = storeToRefs(theme_)

const routeToPage = (route) => {
    currentRoute.value = route
    router.push({name: route})
}

const currentRouteStyle = (r) => {
    return route.value === r ? 'border-b-blue-500 shadow-blue-800 shadow' : 'border-b-transparent'
}
</script>   

<style scoped>
.header {
    @apply sticky mx-auto flex items-center justify-between px-5 pt-5 max-w-[1500px] min-w-[360px] transition-all duration-300 top-0 z-10
}

.nav-item {
    @apply relative pb-1 px-1 w-fit border-b-[2px] relative pb-1 px-1 w-fit border-b-[2px]
}

.nav-container {
    @apply absolute flex items-center gap-5 w-fit transition-all duration-75
}
</style>