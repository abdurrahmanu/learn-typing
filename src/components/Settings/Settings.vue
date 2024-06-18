<template>
    <Transition name="slide" appear mode="in-out">
        <div :class="{'z-[999]' : !(showMoreSettings && !getMobileOS())}" class="fixed top-0 bottom-0 right-0 left-0 z-[99] font-sans font-light" v-if="showMoreSettings">
            <div @click="toggleSettings" class="opacity-40 absolute bg-black w-full top-0 bottom-0 right-0 left-0 z-[999] blur-lg"></div>
            <div v-if="!alphabetsMode_" class="overflow-y-auto" :class="[showMoreSettings ? 'fixed top-0 right-0 bottom-0 h-[100dvh] max-w-[550px] w-fit z-[9999]' : '', appTheme ]">
                <div class="relative leading-5 text-[15px]" :class="[theme === 'dark' ? 'text-slate-400' : 'text-slate-800']">
                    <Header />
                    <MovieQuotes />
                    <AuthoredQoutes />
                    <BlindMode />
                    <BackSpace />
                    <Caret />
                    <Fonts />
                    <Countdown />
                    <AllCaps />
                    <CustomCamelCase />
                    <NoSpaceText />
                </div>
            </div>
            <div v-if="alphabetsMode_">
                <div class="overflow-y-auto" :class="[showMoreSettings ? 'fixed top-0 right-0 bottom-0 h-[100dvh] max-w-[500px] w-fit z-[9999]' : '', appTheme ]">
                    <div class="relative leading-5 text-[15px]" :class="[theme === 'dark' ? 'text-slate-400' : 'text-slate-800']">
                        <Header />
                        <BlindMode />
                        <BackSpace />
                        <Countdown />
                        <Caret />
                        <Fonts />
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
import CustomText from './CustomText.vue'
import BackSpace from './BackSpace.vue';
import Countdown from './CountDown.vue';
import MovieQuotes from './MovieQuotes.vue'
import LetterCombinations from './LetterCombinations.vue'
import {storeToRefs} from 'pinia'
import { mainStore } from '../../store/mainStore.js';
import {customizeStore} from '../../store/customizeStore'
import {themeStore}  from '../../store/themeStore'
import {alphabetsStore}  from '../../store/alphabetsModeStore';
import { getMobileOS } from '../../composables/getMobileOS'

const alphabets_ = alphabetsStore()
const { alphabetsMode_, } = storeToRefs(alphabets_)

const theme_ = themeStore()
const {theme, appTheme } = storeToRefs(theme_)

const store = mainStore()
const { pauseTyping} = storeToRefs(store)

const customize = customizeStore()
const {showMoreSettings} = storeToRefs(customize)

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