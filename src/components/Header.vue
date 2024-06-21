<template>
    <header :class="[appTheme]" class="sticky top-0 mx-auto flex items-center justify-between py-2 pl-3 pr-2 h-[50px] max-w-[1300px] lg:mb-6 mb-3 xl:fixed xl:w-full xl:left-[50%] xl:translate-x-[-50%] z-[2]">
        <Logo />
        <div class="flex gap-4 rounded-full w-fit items-center">
            <div v-if="route.name === 'home'"class="flex items-center gap-4">
                <Clock />
                <Blind />
                <repeat class="w-4"/>
                <TextAlign  />
            </div>
            <div @click="routeToPage('about')" v-if="route.name !== 'about'" :class="route.name === 'about' ? 'text-green-500' : ''" class="font-black font-serif text-xl hover:text-green-400 rounded-full cursor-pointer">i</div>
            <user @click="routeToPage('auth')"  v-if="route.name !== 'auth'" class="w-4" />
            <home @click="routeToPage('home')" v-if="route.name !== 'home'" class="w-4" />
            <settings class="w-5" />
        </div>
        <CompletionRange :class="[hideElements ? 'block' : 'hidden max-[460px]:block']" v-if="isBlindMode" />
        <CompletionRangeWithErrors :class="[hideElements ? 'block' : 'hidden max-[460px]:block']" v-else/>
    </header>
</template>

<script setup>
import Logo from './Logo.vue'
import user from './svg/user.vue'
import home from './svg/home.vue'
import settings from './svg/settings.vue';
import TextAlign from './TextAlign.vue';
import repeat from './svg/repeat.vue';
import Blind from './Blind.vue'
import Clock from './Clock.vue'
import CompletionRangeWithErrors from './CompletionRangeWithErrors.vue';
import CompletionRange from './CompletionRange.vue';
import {storeToRefs} from 'pinia'
import {themeStore}  from '../store/themeStore'
import { customizeStore } from '../store/customizeStore';
import {useRoute, useRouter} from 'vue-router'

const route = useRoute()
const router = useRouter()

const theme_ = themeStore()
const { appTheme } = storeToRefs(theme_)

const customize = customizeStore()
const { hideElements, isBlindMode } = storeToRefs(customize)

const routeToPage = (route) => {
    router.push({name: route})
}
</script>