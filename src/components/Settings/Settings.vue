<template>
    <div :class="{'z-[999] lg:z-[1]' : !(showMoreSettings && !getMobileOS())}" class="absolute lg:relative top-0 bottom-0 right-0 left-0 z-[99] lg:w-[30%]" v-if="showMoreSettings">
        <div @click="showMoreSettings = !showMoreSettings" class="opacity-40 absolute bg-black w-full lg:hidden top-0 bottom-0 right-0 left-0 z-[999] lg:z-[1] blur-lg"></div>
        <div class="overflow-y-auto" :class="[showMoreSettings ? 'fixed top-0 right-0 bottom-0 h-[100dvh] max-w-[500px] w-fit z-[9999]' : '', appTheme ]">
            <div class="relative text-xs leading-5 md:text-sm">
                <Header />
                <BlindMode />
                <BackSpace />
                <CustomText />
                <Countdown />
                <AllCaps />
                <CustomCamelCase />
                <NoSpaceText />
            </div>
        </div>
    </div>
</template>

<script setup>
import Header from './Header.vue'
import AllCaps from './AllCaps.vue'
import CustomCamelCase from './CustomCamelCase.vue'
import NoSpaceText from './NoSpaceText.vue'
import BlindMode from './BlindMode.vue'
import BackSpace from './BackSpace.vue';
import CustomText from './CustomText.vue';
import Countdown from './CountDown.vue'
import {storeToRefs} from 'pinia'
import { mainStore } from '../../store/mainStore.js';
import {customizeStore} from '../../store/customizeStore'

const store = mainStore()
const {alphabets, resultData, appTheme} = storeToRefs(store)
const {getMobileOS} = store

const customize = customizeStore()
const {customizers, showMoreSettings} = storeToRefs(customize)

const settings = [
    'Blind mode',
    'Backspace',
    'Custom Text',
    'Difficulty Level',
    'Countdown Typing',
    'All Caps',
    'Custom camel case',
    'NoSpace'
]
</script>