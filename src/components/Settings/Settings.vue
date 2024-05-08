<template>
    <div :class="{'z-[999]' : !(showMoreSettings && !getMobileOS())}" class="absolute top-0 bottom-0 right-0 left-0 z-[99]" v-if="showMoreSettings">
        <div @click="toggleSettings" class="opacity-40 absolute bg-white w-full top-0 bottom-0 right-0 left-0 z-[999] blur-lg"></div>
        <div class="overflow-y-auto" :class="[showMoreSettings ? 'fixed top-0 right-0 bottom-0 h-[100dvh] max-w-[500px] w-fit z-[9999]' : '', appTheme ]">
            <div class="relative text-sm leading-5 lg:text-base md:text-sm lg:min-w-fit">
                <Header />
                <Fonts />
                <MovieQuotes />
                <BlindMode />
                <BackSpace />
                <Countdown />
                <AllCaps />
                <CustomCamelCase />
                <NoSpaceText />
                <CustomText />
            </div>
        </div>
    </div>
</template>

<script setup>
import Fonts from './Fonts.vue'
import Header from './Header.vue'
import AllCaps from './AllCaps.vue'
import CustomCamelCase from './CustomCamelCase.vue'
import NoSpaceText from './NoSpaceText.vue'
import BlindMode from './BlindMode.vue'
import BackSpace from './BackSpace.vue';
import CustomText from './CustomText.vue';
import Countdown from './CountDown.vue';
import MovieQuotes from './MovieQuotes.vue'
import {storeToRefs} from 'pinia'
import { mainStore } from '../../store/mainStore.js';
import {customizeStore} from '../../store/customizeStore'

const store = mainStore()
const {appTheme, pauseTyping} = storeToRefs(store)
const {getMobileOS} = store

const customize = customizeStore()
const {showMoreSettings} = storeToRefs(customize)

const toggleSettings = () => {
    showMoreSettings.value = !showMoreSettings.value
    if (showMoreSettings.value) pauseTyping.value = true
    else pauseTyping.value = false
}
</script>