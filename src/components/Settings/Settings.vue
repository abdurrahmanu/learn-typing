<template>
    <Transition name="slide" appear mode="in-out">
        <div :class="{'z-[999]' : !(showMoreSettings && !isMobileOS())}" class="absolute top-0 bottom-0 right-0 left-0 z-[99] font-light settings-font" v-if="showMoreSettings">
            <div @click="toggleSettings" class="opacity-40 absolute bg-black w-full top-0 bottom-0 right-0 left-0 z-[999]"></div>
            <div v-if="!alphabetsMode_" class="overflow-y-auto outline-none" :class="[showMoreSettings ? 'absolute top-0 right-0 bottom-0 h-[100dvh] max-w-[800px] w-fit z-[9999]' : '', appTheme ]">
                <div class="relative leading-5 text-[15px]">
                    <Header />
                    <div @click="demo = true, pauseTyping = true" :class="[demo ? 'hidden' : '']" class="my-3 m-auto w-fit font-medium caveat hover:animate-none transition-all duration-500 hover:px-20 ring-[1px] ring-green-500 px-10 py-1 opacity-50 shadow-sm cursor-pointer hover:shadow-green-500 text-center hover:shadow-md hover:opacity-100 z-[1]">HELP</div>
                    <Fonts />
                    <Caret />
                    <Difficulty />
                    <BackSpace />
                    <BlindMode />
                    <BlurTest />
                    <CapsLock v-if="!isMobileOS()" />
                    <Countdown />
                    <CustomCamelCase />
                    <DoubleEachWord />
                    <NoSpaceText />
                    <MovieQuotes />
                    <StopOnError />
                    <AuthoredQoutes />
                    <AllCaps />
                </div>
            </div>
            <div v-if="alphabetsMode_">
                <div class="overflow-y-auto outline-none" :class="[showMoreSettings ? 'absolute top-0 right-0 bottom-0 h-[100dvh] max-w-[800px] w-fit z-[9999]' : '', appTheme]">
                    <div class="relative leading-5 text-[15px]">
                        <Header />
                        <div @click="demo = true, pauseTyping = true" :class="[demo ? 'hidden' : '']" class="my-3 m-auto w-fit font-medium caveat hover:animate-none transition-all duration-500 hover:px-20 ring-[1px] ring-green-500 px-10 py-1 opacity-50 shadow-sm cursor-pointer hover:shadow-green-500 text-center hover:shadow-md hover:opacity-100 z-[1]">HELP</div>
                        <Fonts />
                        <Caret />
                        <Difficulty />
                        <BlindMode />
                        <BackSpace />
                        <BlurTest />
                        <CapsLock v-if="!isMobileOS()" />
                        <Countdown />
                        <DoubleEachWord />
                        <LetterCombinations />
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import Caret from './Caret.vue'
import Fonts from './Fonts.vue'
import AuthoredQoutes from './AuthoredQuotes.vue'
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
import {alphabetsStore}  from '../../store/alphabetsModeStore';
import { isMobileOS } from '../../composables/isMobileOS'
import BlurTest from './BlurTest.vue'
import Difficulty from './Difficulty.vue'
import CapsLock from './CapsLock.vue'
import StopOnError from './StopOnError.vue'
import {mainStore} from '../../store/mainStore'
import DoubleEachWord from './DoubleEachWord.vue'

const alphabets_ = alphabetsStore()
const { alphabetsMode_, } = storeToRefs(alphabets_)

const theme_ = themeStore()
const { appTheme } = storeToRefs(theme_)

const main = mainStore()
const {demo} = storeToRefs(main)

const customize = customizeStore()
const {showMoreSettings, pauseTyping} = storeToRefs(customize)

const toggleSettings = () => {
    showMoreSettings.value = !showMoreSettings.value
    if (showMoreSettings.value) pauseTyping.value = true
    else pauseTyping.value = false
}
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