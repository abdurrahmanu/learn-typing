<template>
    <header class="sticky mx-auto flex items-center justify-between pl-3 pt-5 pb-2 pr-2 max-w-[1500px] mb-3 text-[11px] uppercase font-medium min-w-[360px] transition-all duration-300" :class="[focus && isMobile() ? 'h-0 p-0 mb-0' : 'h-[50px]', theme === 'dark' ? 'hover:bg-[#503c3c]' : 'hover:bg-zinc-200']">
        <Logo @click="routeToPage('about')" v-show="!(focus && isMobile())" class="flex hover:shadow-md hover:shadow-black hover:ring-[1px] hover:ring-green-500 cursor-pointer" />
        <div v-show="(!focus && isMobile()) || !isMobile()" class="absolute flex items-center gap-4 w-fit" :class="[!hideElements ? 'right-[50%] translate-x-[50%]' : 'left-[50%] translate-x-[-50%]']">
            <div v-show="route.name === 'home'" class="flex items-center gap-4 text-[9px]">
                <div class="relative w-fit">
                    <Clock class="peer" />
                </div>
                <div class="relative hidden w-fit min-[505px]:block" v-if="mode !== 'alphabets' && !isMobile()">
                    <TextAlign class="peer"/>
                </div>
                <div class="relative w-fit">
                    <Blind class="peer"/>
                </div>
                <div class="relative w-fit" v-if="route.name === 'home' && mode !== 'alphabets'" >
                    <repeat class="w-5 peer"/>
                </div>
                <div class="relative w-fit" v-if="mode !== 'alphabets'" >
                    <add @click="customTestModal = true, pauseTyping = true" class="w-6 peer"/>
                </div>
            </div>
            <div class="relative w-fit" v-if="route.name !== 'home'" >                
                <home @click="routeToPage('home')" class="w-5 peer" />
            </div>
            <div class="relative w-fit" v-if="route.name === 'home'" >
                <settings class="w-6 peer" />
            </div>
            <div class="relative w-fit" v-if="route.name !== 'user'" @click="routeToPage('user')" >
                <user class="w-5 peer" />
            </div>
        </div>
        <CompletionRange :class="[hideElements ? 'block' : 'hidden max-[460px]:block']" v-if="blind && route.name === 'home'" />
        <CompletionRangeWithErrors :class="[hideElements ? 'block' : 'hidden max-[460px]:block']" v-if="!blind && route.name === 'home'"/>
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
import Clock from './Clock.vue';
import CompletionRangeWithErrors from './CompletionRangeWithErrors.vue';
import { isTouchScreenDevice } from '../composables/isTouchScreenDevice';
import CompletionRange from './CompletionRange.vue';
import {storeToRefs} from 'pinia';
import { customizeStore } from '../store/customizeStore';
import {authStore} from '../store/authStore'
import { mainStore } from '../store/mainStore';
import {useRoute, useRouter} from 'vue-router'
import { isMobile } from '../composables/isMobile';
import { themeStore } from '../store/themeStore';

const route = useRoute()
const router = useRouter()

const theme_ = themeStore()
const {theme} = storeToRefs(theme_)

const auth = authStore()
const {showUser} = storeToRefs(auth)

const main = mainStore()
const {focus} = storeToRefs(main)

const customize = customizeStore()
const { hideElements, blind, mode, customTestModal, pauseTyping} = storeToRefs(customize)

const routeToPage = (route) => {
    router.push({name: route})
}
</script>