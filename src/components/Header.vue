<template>
    <header class="sticky top-0 mx-auto flex items-center justify-between pl-3 pr-2 max-w-[1300px] lg:mb-6 mb-3 xl:fixed xl:w-full xl:left-[50%] xl:translate-x-[-50%] z-[2] text-[11px] uppercase font-medium h-[50px] py-2">
        <Logo class="flex" />
        <div class="flex items-center gap-4 rounded-full w-fit">
            <div v-if="route.name === 'home'"class="flex items-center gap-4">
                <div class="relative w-fit">
                    <Clock class="peer" />
                    <div class="absolute z-5 left-[50%] translate-x-[-50%] bottom-[-100%] rounded-full whitespace-nowrap peer-hover:block hidden pt-1">countdown</div>
                </div>
                <div class="relative hidden w-fit min-[500px]:block" v-if="!alphabetsMode_ && !isMobileOS()">
                    <TextAlign  class="peer"/>
                    <div class="absolute z-5 left-[50%] translate-x-[-50%] bottom-[-100%] rounded-full whitespace-nowrap peer-hover:block hidden">text align</div>
                </div>
                <div class="relative w-fit">
                    <Blind  class="peer"/>
                    <div class="absolute z-5 left-[50%] translate-x-[-50%] bottom-[-100%] rounded-full whitespace-nowrap peer-hover:block hidden">view</div>
                </div>
                <div class="relative w-fit" v-if="!alphabetsMode_" >
                    <repeat class="w-4 peer"/>
                    <div class="absolute z-5 left-[50%] translate-x-[-50%] bottom-[-120%] rounded-full whitespace-nowrap peer-hover:block hidden">repeat</div>
                </div>
            </div>
            <div class="relative w-fit" v-if="route.name !== 'about'">
                <about @click="routeToPage('about')" class="w-4 peer" />
            <div class="absolute z-5 left-[50%] translate-x-[-50%] bottom-[-100%] rounded-full whitespace-nowrap peer-hover:block hidden">about</div>
            </div>
            <div class="relative w-fit"  v-if="route.name !== 'auth'">                
                <user @click="routeToPage('auth')" class="w-4 peer" />
                <div class="absolute z-5 left-[50%] translate-x-[-50%] bottom-[-120%] rounded-full whitespace-nowrap peer-hover:block hidden">account</div>
            </div>
            <div class="relative w-fit" v-if="route.name !== 'home'" >                
                <home @click="routeToPage('home')" class="w-4 peer" />
            </div>
            <div class="relative w-fit" v-if="route.name === 'home'" >
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
import about from './svg/about.vue'
import Blind from './Blind.vue'
import Clock from './Clock.vue'
import CompletionRangeWithErrors from './CompletionRangeWithErrors.vue';
import CompletionRange from './CompletionRange.vue';
import {storeToRefs} from 'pinia'
import {themeStore}  from '../store/themeStore'
import { customizeStore } from '../store/customizeStore';
import {useRoute, useRouter} from 'vue-router'
import { isMobileOS } from '../composables/isMobileOS';
import { alphabetsStore } from '../store/alphabetsModeStore';
import { mainStore } from '../store/mainStore';

const route = useRoute()
const router = useRouter()

const main = mainStore()
const {focus} = storeToRefs(main)

const theme_ = themeStore()
const { appTheme } = storeToRefs(theme_)

const alphabets = alphabetsStore()
const {alphabetsMode_} = storeToRefs(alphabets)

const customize = customizeStore()
const { hideElements, blind } = storeToRefs(customize)

const routeToPage = (route) => {
    router.push({name: route})
}
</script>
