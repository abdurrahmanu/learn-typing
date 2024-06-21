<template>
    <header :class="[appTheme]" class="sticky top-0 mx-auto flex items-center justify-between py-2 pl-3 pr-2 h-[50px] max-w-[1300px] lg:mb-6 mb-3 xl:fixed xl:w-full xl:left-[50%] xl:translate-x-[-50%] z-[2] text-[11px] uppercase font-medium">
        <Logo />
        <div class="flex gap-4 rounded-full w-fit items-center">
            <div v-if="route.name === 'home'"class="flex items-center gap-4">
                <div class="w-fit relative">
                    <Clock class="peer" />
                    <div class="absolute z-5 left-[50%] translate-x-[-50%] bottom-[-100%] rounded-full whitespace-nowrap peer-hover:block hidden pt-1">countdown</div>
                </div>
                <div class="w-fit relative">
                    <TextAlign  class="peer"/>
                    <div class="absolute z-5 left-[50%] translate-x-[-50%] bottom-[-100%] rounded-full whitespace-nowrap peer-hover:block hidden">text align</div>
                </div>
                <div class="w-fit relative">
                    <Blind  class="peer"/>
                    <div class="absolute z-5 left-[50%] translate-x-[-50%] bottom-[-100%] rounded-full whitespace-nowrap peer-hover:block hidden">view</div>
                </div>
                <div class="w-fit relative">
                    <repeat class="w-4 peer"/>
                    <div class="absolute z-5 left-[50%] translate-x-[-50%] bottom-[-120%] rounded-full whitespace-nowrap peer-hover:block hidden">repeat</div>
                </div>
            </div>
            <div class="w-fit relative" v-if="route.name !== 'about'">
                <div @click="routeToPage('about')" :class="route.name === 'about' ? 'text-green-500' : ''" class="font-black font-serif hover:text-green-400 rounded-full cursor-pointer peer text-base lowercase pt-[2px] leading-[20px]">i</div>
                <div class="absolute z-5 left-[50%] translate-x-[-50%] bottom-[-100%] rounded-full whitespace-nowrap peer-hover:block hidden">about</div>
            </div>
            <div class="w-fit relative"  v-if="route.name !== 'auth'">                
                <user @click="routeToPage('auth')" class="w-4 peer" />
                <div class="absolute z-5 left-[50%] translate-x-[-50%] bottom-[-120%] rounded-full whitespace-nowrap peer-hover:block hidden">account</div>
            </div>
            <div class="w-fit relative" v-if="route.name !== 'home'" >                
                <home @click="routeToPage('home')" class="w-4 peer" />
            </div>
            <div class="w-fit relative">
                <settings class="w-5 peer" />
            </div>
        </div>
        <CompletionRange :class="[hideElements ? 'block' : 'hidden max-[460px]:block']" v-if="blind" />
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
const { hideElements, blind } = storeToRefs(customize)

const routeToPage = (route) => {
    router.push({name: route})
}
</script>
