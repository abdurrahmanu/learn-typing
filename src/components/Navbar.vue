<template>
    <header 
    :class="[theme === 'dark' ? 'hover:bg-zinc-700' : 'hover:bg-zinc-200']"
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
                <div id="focus" class="relative w-fit">
                    <Clock class="peer" />
                </div>
                <div 
                id="focus" 
                v-if="!isMobile()" 
                class="relative hidden w-fit min-[505px]:block">
                    <TextAlign class="peer"/>
                </div>
                <div class="relative w-fit">
                    <Blind class="peer"/>
                </div>
                <div 
                id="focus" 
                v-if="route.name === 'home'" 
                class="relative w-fit" >
                    <repeat class="w-4 peer"/>
                </div>
                <div 
                v-if="customizers['modes'] !== 'alphabet-test'"
                class="relative w-fit" >
                    <add 
                    @click="openCustomTestModal" 
                    class="w-4 peer"/>
                </div>
                <div class="relative w-fit">
                    <feedback 
                    @click="routeToPage('about')" 
                    class="w-4 peer"/>
                </div>
            </div>
            <div 
            v-if="route.name !== 'home'"             
            class="relative w-fit" >
                <home 
                @click="routeToPage('home')" 
                class="w-4 peer" />
            </div>
            <div 
            v-if="route.name === 'home'"
            class="relative w-fit" >
                <settings class="w-4 peer" />
            </div>
            <div 
            @click="routeToPage('user')"
            v-if="route.name !== 'user'" 
            class="relative w-fit" >
                <user class="w-4 peer" />
            </div>
        </div>
    </header>
</template>

<script setup>
import Logo from './Logo.vue'
import home from './svg/home.vue'
import settings from './svg/settings.vue';
import add from './svg/add.vue'
import TextAlign from './TextAlign.vue';
import repeat from './svg/repeat.vue';
import user from './svg/user.vue'
import Blind from './Blind.vue';
import feedback from './svg/feedback.vue'
import Clock from './Clock.vue';
import {useRoute, useRouter} from 'vue-router'
import { isMobile } from '../composables/isMobile';
import { customizeStore } from '../store/customizeStore';
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

const auth = authStore()
const {showUser} = storeToRefs(auth)

const customize = customizeStore()
const { hideElements, blind, customizers, toggleCustomTestModal, pauseTyping} = storeToRefs(customize)

const routeToPage = (route) => {
    router.push({name: route})
}

const openCustomTestModal = () => {
    toggleCustomTestModal.value = true
    pauseTyping.value = true
}
</script>   

<style scoped>
.header {
    @apply sticky mx-auto flex items-center justify-between pl-3 pt-5 pb-2 pr-2 max-w-[1500px] min-w-[360px] transition-all duration-300
}
</style>