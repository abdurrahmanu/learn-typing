<template>
    <header class="sticky mx-auto flex items-center justify-between pl-3 pr-2 max-w-[1500px] lg:mb-6 mb-3 min-[1350px]:fixed min-[1350px]:w-full text-[11px] uppercase font-medium z-[1]" :class="[focus && (hideElements && isMobileOS()) ? 'h-0 p-0 mb-0' : 'pb-2 h-[50px]']">
        <Logo v-if="!focus" class="flex" />
        <div v-if="!focus" class="absolute flex items-center gap-4 w-fit" :class="[!hideElements ? 'min-[1350px]:right-3 min-[1350px]:translate-x-0 right-[50%] translate-x-[50%]' : 'left-[50%] translate-x-[-50%]']">
            <div v-if="route.name === 'home'" class="flex items-center gap-4 text-[9px] ">
                <div class="relative w-fit">
                    <Clock class="peer" />
                    <div class="absolute z-5 left-[50%] translate-x-[-50%] bottom-[-100%] rounded-full whitespace-nowrap peer-hover:block hidden pt-1">countdown</div>
                </div>
                <div class="relative hidden w-fit min-[505px]:block" v-if="!alphabetsMode_ && !isMobileOS()">
                    <TextAlign  class="peer"/>
                    <div class="absolute z-5 left-[50%] translate-x-[-50%] bottom-[-100%] rounded-full whitespace-nowrap peer-hover:block hidden">text align</div>
                </div>
                <div class="relative w-fit">
                    <Blind  class="peer"/>
                    <div class="absolute z-5 left-[50%] translate-x-[-50%] bottom-[-100%] rounded-full whitespace-nowrap peer-hover:block hidden">view</div>
                </div>
                <div class="relative w-fit" v-if="route.name === 'home' && !alphabetsMode_" >
                    <repeat class="w-4 peer"/>
                    <div class="absolute z-5 left-[50%] translate-x-[-50%] bottom-[-120%] rounded-full whitespace-nowrap peer-hover:block hidden">repeat</div>
                </div>
                <div class="relative w-fit" v-if="route.name !== 'about'">
                    <about @click="routeToPage('about')" class="w-[15px] peer" />
                    <div class="text-[9px] absolute z-5 left-[50%] translate-x-[-50%] bottom-[-150%] rounded-full whitespace-nowrap peer-hover:block hidden">about</div>
                </div>
                <div class="relative w-fit" v-if="!alphabetsMode_" >
                    <add @click="customTestModal = true, pauseTyping = true" class="w-4 peer"/>
                    <div class="absolute z-5 left-[50%] translate-x-[-50%] bottom-[-120%] rounded-full whitespace-nowrap peer-hover:block hidden">custom test</div>
                </div>
            </div>
            <div class="relative w-fit" v-if="route.name !== 'home'" >                
                <home @click="routeToPage('home')" class="w-4 peer" />
            </div>
            <div class="relative w-fit" v-if="route.name === 'home'" >
                <settings class="w-5 peer" />
            </div>
        </div>
        <div :class="[!hideElements ? 'min-[1350px]:hidden' : '']" class="hidden min-[500px]:block"></div>
        <CompletionRange :class="[hideElements ? 'block' : 'hidden max-[460px]:block']" v-if="blind" />
        <CompletionRangeWithErrors :class="[hideElements ? 'block' : 'hidden max-[460px]:block']" v-else/>
    </header>
</template>

<script setup>
import Logo from './Logo.vue'
import home from './svg/home.vue'
import settings from './svg/settings.vue';
import add from './svg/add.vue'
import TextAlign from './TextAlign.vue';
import repeat from './svg/repeat.vue';
import about from './svg/about.vue';
import Blind from './Blind.vue';
import Clock from './Clock.vue';
import CompletionRangeWithErrors from './CompletionRangeWithErrors.vue';
import CompletionRange from './CompletionRange.vue';
import {storeToRefs} from 'pinia';
import { customizeStore } from '../store/customizeStore';
import { mainStore } from '../store/mainStore';
import {useRoute, useRouter} from 'vue-router'
import { isMobileOS } from '../composables/isMobileOS';
import { alphabetsStore } from '../store/alphabetsModeStore';

const route = useRoute()
const router = useRouter()

const alphabets = alphabetsStore()
const {alphabetsMode_} = storeToRefs(alphabets)

const main = mainStore()
const {focus, route : route_} = storeToRefs(main)

const customize = customizeStore()
const { hideElements, blind, customTestModal, pauseTyping} = storeToRefs(customize)

const routeToPage = (route) => {
    router.push({name: route})
}
</script>