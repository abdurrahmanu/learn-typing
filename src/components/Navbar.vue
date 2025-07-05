<template>
    <header class="sticky mx-auto flex items-center justify-between pl-3 pt-5 pb-2 pr-2 max-w-[1500px] min-w-[360px] transition-all duration-300" :class="[theme === 'dark' ? 'hover:bg-zinc-700' : 'hover:bg-zinc-200']">
        <Logo @click="routeToPage('about')" v-show="!(focus && isMobile())" class="flex cursor-pointer" />
        <div v-show="(!focus && isMobile()) || !isMobile()" class="absolute flex items-center gap-4 w-fit" :class="[!hideElements ? 'right-[50%] translate-x-[50%]' : 'left-[50%] translate-x-[-50%]']">
            <div v-show="route.name === 'home'" class="flex items-center gap-4 text-[9px]">
                <div id="focus" class="relative w-fit">
                    <Clock class="peer" />
                </div>
                <div id="focus" class="relative hidden w-fit min-[505px]:block" v-if="!isMobile()">
                    <TextAlign class="peer"/>
                </div>
                <div class="relative w-fit">
                    <Blind class="peer"/>
                </div>
                <div id="focus" class="relative w-fit" v-if="route.name === 'home'" >
                    <repeat class="w-4 peer"/>
                </div>
                <div class="relative w-fit" v-if="customizers['modes'] !== 'alphabet-test'" >
                    <add @click="openCustomTestModal" class="w-5 peer"/>
                </div>
                <div class="relative w-fit">
                    <feedback @click="routeToPage('about')" class="w-5 peer"/>
                </div>
            </div>
            <div class="relative w-fit" v-if="route.name !== 'home'" >                
                <home @click="routeToPage('home')" class="w-4 peer" />
            </div>
            <div class="relative w-fit" v-if="route.name === 'home'" >
                <settings class="w-5 peer" />
            </div>
            <div class="relative w-fit" v-if="route.name !== 'user'" @click="routeToPage('user')" >
                <user class="w-5 peer" />
            </div>
        </div>
        <CompletionRange v-if="blind && route.name === 'home'" class="block" />
        <CompletionRangeWithErrors v-if="!blind && route.name === 'home'" class="block" />
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
import CompletionRangeWithErrors from './CompletionRangeWithErrors.vue';
import CompletionRange from './CompletionRange.vue';
import {storeToRefs} from 'pinia';
import { customizeStore } from '../store/customizeStore';
import {authStore} from '../store/authStore'
import {useRoute, useRouter} from 'vue-router'
import { isMobile } from '../composables/isMobile';
import { themeStore } from '../store/themeStore';
import { typingStateStore } from '../store/typingStateStore';
import focusInputElement from '../composables/focusInputElement';

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