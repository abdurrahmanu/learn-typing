<template>
    <header 
    :class="[theme === 'dark' ? 'bg-[#2c2e31] hover:bg-zinc-700' : 'bg-gray-300 hover:bg-zinc-200']"
    class="header">

        <Logo 
        @click="routeToPage('about')" 
        v-show="!(focus && isMobile())" 
        class="flex cursor-pointer" />

        <div 
        v-show="(!focus && isMobile()) || !isMobile()" 
        :class="[!hideElements ? 'right-[50%] translate-x-[50%]' : 'left-[50%] translate-x-[-50%]']"
        class="absolute flex items-center gap-4 w-fit" 
        >
            <div 
            v-show="route.name === 'home'" 
            class="flex items-center gap-4 text-[9px]">
                <div class="relative w-fit">
                    <feedback 
                    @click="routeToPage('about')" 
                    class="w-5 peer"/>
                </div>
            </div>
            <div 
            v-if="route.name !== 'home'"             
            class="relative w-fit" >
                <home 
                @click="routeToPage('home')" 
                class="w-5 peer" />
            </div>
            <div 
            v-if="route.name === 'home'"
            class="relative w-fit" >
                <settingsSVG
                @click="routeToPage('settings')"
                class="w-5 peer" />
            </div>
            <div 
            @click="routeToPage('user')"
            v-if="route.name !== 'user'" 
            class="relative w-fit rounded-full p-1" :class="[login ? 'ring-green-600 ring-[2px]' : 'ring-blue-500 ring-[1px]']" >
                <user class="w-3 peer" />
            </div>
        </div>
    </header>
</template>

<script setup>
import Logo from './Logo.vue'
import home from './svg/home.vue'
import settingsSVG from './svg/settings.vue';
import user from './svg/user.vue'
import feedback from './svg/feedback.vue'
import {useRoute, useRouter} from 'vue-router'
import { isMobile } from '../composables/isMobile';
import { settingsStore } from '../store/settingsStore';
import {authStore} from '../store/authStore'
import { themeStore } from '../store/themeStore';
import { typingStateStore } from '../store/typingStateStore';
import {storeToRefs} from 'pinia';

const typingstatestore = typingStateStore()
const {focus} = storeToRefs(typingstatestore)

const route = useRoute()
const router = useRouter()

const theme_ = themeStore()
const {theme} = storeToRefs(theme_)

const authstore = authStore()
const {login} = storeToRefs(authstore)

const customize = settingsStore()
const { hideElements} = storeToRefs(customize)

const routeToPage = (route) => {
    router.push({name: route})
}
</script>   

<style scoped>
.header {
    @apply sticky mx-auto flex items-center justify-between pl-3 pt-5 pb-2 pr-2 max-w-[1000px] min-w-[360px] transition-all duration-300 top-0
}
</style>