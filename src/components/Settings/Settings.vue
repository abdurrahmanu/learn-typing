<template>
    <Transition name="slide" appear mode="in-out">
        <div :class="{'z-[999]' : !(allSettings && !isTouchScreenDevice())}" class="absolute top-0 bottom-0 right-0 left-0 z-[99] font-light redit-font" v-if="allSettings">
            <div @click="toggleSettings" class="opacity-40 absolute bg-black w-full top-[-100px] bottom-0 right-0 left-0 z-[999]"></div>
            <div class="overflow-y-auto outline-none" :class="[allSettings ? 'absolute right-0 bottom-0 h-[100dvh] max-w-[800px] w-fit z-[9999]' : '', appTheme ]">
                <div class="relative leading-5 text-[17px] pb-5">
                    <Header />
                    <Fonts />
                    <TextLines />
                    <Cursor />
                    <Difficulty />
                    <BackSpace />
                    <BlindMode />
                    <BlurTest />
                    <CapsLock v-if="!isTouchScreenDevice()" />
                    <Countdown />
                    <CustomCamelCase />
                    <DoubleEachWord v-if="mode !== 'alphabets'" />
                    <NoSpaceText v-if="mode !== 'alphabets'" />
                    <MovieQuotes v-if="mode !== 'alphabets'" />
                    <StopOnError v-if="!isTouchScreenDevice()" />
                    <AuthoredQoutes v-if="mode !== 'alphabets'" />
                    <AllCaps />
                    <LetterCombinations v-if="mode === 'alphabets'"/>
                    <Cookies />
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
// import SettingsUI from './SettingsUI.vue'
import Cursor from './Cursor.vue'
import Fonts from './Fonts.vue'
import AuthoredQoutes from './AuthoredQuotes.vue'
import Cookies from './Cookies.vue'
import Header from './Header.vue'
import AllCaps from './AllCaps.vue'
import CustomCamelCase from './CustomCamelCase.vue'
import NoSpaceText from './NoSpaceText.vue'
import BlindMode from './BlindMode.vue'
import BackSpace from './BackSpace.vue';
import Countdown from './CountDown.vue';
import MovieQuotes from './MovieQuotes.vue'
import LetterCombinations from './LetterCombinations.vue'
import {storeToRefs} from 'pinia'
import {customizeStore} from '../../store/customizeStore'
import {themeStore}  from '../../store/themeStore'
import { isTouchScreenDevice } from '../../composables/isTouchScreenDevice'
import BlurTest from './BlurTest.vue'
import Difficulty from './Difficulty.vue'
import CapsLock from './CapsLock.vue'
import StopOnError from './StopOnError.vue'
import {mainStore} from '../../store/mainStore'
import { countdownStore } from '../../store/countdownStore'
import DoubleEachWord from './DoubleEachWord.vue'
import {watch} from 'vue'
import TextLines from './TextLines.vue'

const theme_ = themeStore()
const { appTheme } = storeToRefs(theme_)

const main = mainStore()
const {demo, timedTyping} = storeToRefs(main)
const {switchNext} = main

const counter = countdownStore()
const {clearCounter} = counter

const store = customizeStore()
const {customizers, capslock, backspace, font, mode, switchMode, userSelectedTest, customTestLength, customTestModal, disableOption, range, repeat, testType_, textPosition, toggleCapsToast, useCustomLength,  count, allOptions, allSettings, blind, configs, cursorType, difficulty, doubleEachWord, hideElements, pauseTyping, } = storeToRefs(store)

const toggleSettings = () => {
    if (timedTyping.value) clearCounter()
    switchNext(customizers.value, 'restart')
    allSettings.value = !allSettings.value
    if (allSettings.value) pauseTyping.value = true
    else pauseTyping.value = false
}

watch(demo, newVal => {
    if (newVal && allSettings.value) allSettings.value = false
})
</script>

<style scoped>
.slide-enter-from {
    transform: translateX(100%)
}

.slide-leave-to {
    transform: translateX(100%)
}

.slide-enter-active,
.slide-leave-active {
    transition: all .5s ease;
}
</style>