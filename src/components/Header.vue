<template>
    <header :class="[appTheme]" class="sticky top-0 mx-auto flex items-center justify-between py-2 pl-3 pr-2 h-[50px] max-w-[1300px] lg:mb-6 mb-3 xl:fixed xl:w-full xl:left-[50%] xl:translate-x-[-50%] z-[2]">
        <div class="font-mono font-medium cursor-default w-fit h-fit relative">
            <span class="absolute top-0 left-[50%] translate-x-[-50%] text-[12px] font-black"><span class="hover:text-red-500">K</span><span class="hover:text-green-500">E</span><span class="hover:text-blue-500">Y</span></span>
            <keyboard class="w-8"/>
        </div>
        <div class="flex gap-4 rounded-full w-fit items-center">
            <div v-if="route.name === 'home'"class="flex items-center gap-4">
                <Clock />
                <Blind />
                <repeat class="w-4"/>
                <TextAlign  />
            </div>
            <div class="font-black font-serif text-xl hover:text-green-400 rounded-full cursor-pointer">i</div>
            <user class="w-4" />
            <settings class="w-5" />
        </div>
        <CompletionRange :class="[hideElements ? 'block' : 'hidden max-[460px]:block']" v-if="isBlindMode" />
        <CompletionRangeWithErrors :class="[hideElements ? 'block' : 'hidden max-[460px]:block']" v-else/>
    </header>
</template>

<script setup>
import keyboard from './svg/keyboard.vue'
import user from './svg/user.vue'
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
import { mainStore } from '../store/mainStore';
import {useRoute} from 'vue-router'

const route = useRoute()

const theme_ = themeStore()
const { appTheme } = storeToRefs(theme_)

const customize = customizeStore()
const { hideElements, isBlindMode } = storeToRefs(customize)

</script>