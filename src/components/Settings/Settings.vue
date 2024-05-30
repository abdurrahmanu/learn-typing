<template>
    <div :class="{'z-[999]' : !(showMoreSettings && !getMobileOS())}" class="absolute top-0 bottom-0 right-0 left-0 z-[99] transition-all duration-150 font-sans font-light" v-if="showMoreSettings">
        <div @click="toggleSettings" class="opacity-40 absolute bg-green-200 w-full top-0 bottom-0 right-0 left-0 z-[999] blur-lg"></div>
        <div v-if="!alphabetsMode_ && !dictionaryMode_" class="overflow-y-auto" :class="[showMoreSettings ? 'fixed top-0 right-0 bottom-0 h-[100dvh] max-w-[550px] w-fit z-[9999]' : '', appTheme ]">
            <div class="relative leading-5" :class="[theme === 'neutral' ? 'text-slate-300' : 'text-slate-800']">
                <Header />
                <Fonts />
                <MovieQuotes />
                <AuthoredQoutes />
                <BlindMode />
                <BackSpace />
                <Countdown />
                <AllCaps />
                <CustomCamelCase />
                <NoSpaceText />
                <CustomText />
            </div>
        </div>
        <div v-if="alphabetsMode_">
            <div class="overflow-y-auto" :class="[showMoreSettings ? 'fixed top-0 right-0 bottom-0 h-[100dvh] max-w-[500px] w-fit z-[9999]' : '', appTheme ]">
                <div class="relative leading-5" :class="[theme === 'neutral' ? 'text-slate-300' : 'text-slate-800']">
                    <Header />
                    <Fonts />
                    <BlindMode />
                    <BackSpace />
                    <Countdown />
                    <LetterCombinations />
                </div>
            </div>
        </div>
        <div v-if="dictionaryMode_">
            <div class="overflow-y-auto" :class="[showMoreSettings ? 'fixed top-0 right-0 bottom-0 h-[100dvh] max-w-[500px] w-fit z-[9999]' : '', appTheme ]">
                <div class="relative leading-5 lg:min-w-fit" :class="[theme === 'neutral' ? 'text-slate-300' : 'text-slate-800']">
                    <Header />
                    <Fonts />
                    <BlindMode />
                    <!-- <BackSpace />
                    <Countdown />
                    <AllCaps />
                    <CustomCamelCase />
                    <NoSpaceText /> -->
                </div>
            </div>
        </div>
        <!-- <div v-if="gamemode">
            <div class="overflow-y-auto" :class="[showMoreSettings ? 'fixed top-0 right-0 bottom-0 h-[100dvh] max-w-[500px] w-fit z-[9999]' : '', appTheme ]">
                <div class="relative leading-5 lg:min-w-fit" :class="[theme === 'neutral' ? 'text-slate-300' : 'text-slate-800']">
                    <Header />
                </div>
            </div>
        </div> -->
    </div>
</template>

<script setup>
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
import {dictionaryStore}  from '../../store/dictionaryModeStore';

const alphabets_ = alphabetsStore()
const { alphabetsMode_, alphabetsConfig, alphabetsCombination, useAlphabetCombination } = storeToRefs(alphabets_)
const {generateAlphabetsTest} = alphabets_

const dictionary = dictionaryStore()
const { dictionaryMode_, dictionaryData, } = storeToRefs(dictionary)
const {generateDictionaryTest} = dictionary

const theme_ = themeStore()
const {theme, appTheme } = storeToRefs(theme_)

const store = mainStore()
const { pauseTyping} = storeToRefs(store)
const {getMobileOS} = store

const customize = customizeStore()
const {showMoreSettings} = storeToRefs(customize)

const toggleSettings = () => {
    showMoreSettings.value = !showMoreSettings.value
    if (showMoreSettings.value) pauseTyping.value = true
    else pauseTyping.value = false
}
</script>