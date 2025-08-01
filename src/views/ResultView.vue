<template>
    <div :class="appTheme" class="cursor-default py-10 text-lg">
        <p class="py-1 text-2xl text-center text-slate-500 stats">STATISTICS</p>
        <div class="my-2 px-3 ring-[1px] uppercase rounded-full cursor-pointer w-fit mx-auto" :class="[difficultyStyle]">{{ difficulty }}</div>

        <div class="flex justify-center mt-10 w-fit mx-auto ring-[1px] ring-transparent hover:ring-zinc-600 rounded-md text-xl p-5">
            <div v-for="(sectionValue, sectionKey, index) in resultSections" :key="index" class="px-2 text-center last:border-r-transparent border-r-2 border-r-black">
                <div>                        
                    <div class="px-2 border border-transparent rounded-full uppercase font-[400]">{{ sectionKey }}</div>
                </div>
                <p>{{ Array.isArray(sectionValue) ? sectionValue[0]  : sectionValue}}</p>
                <div v-if="Array.isArray(sectionValue)" class="w-fit bottom-right">
                    <pass v-if="sectionValue[1]" class="w-4" />
                    <fail v-else class="w-4" />
                </div>
            </div>
        </div>

        <!-- <LineChart :wpm="wpmPerSecond" /> -->
    </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {themeStore}  from '../store/themeStore'
import { settingsStore } from '../store/settingsStore'
import pass from '../components/svg/pass.vue'
import fail from '../components/svg/fail.vue'
import LineChart from '../components/LineChart.vue'
import { resultStore } from '../store/resultStore'

const resultstore = resultStore()
const {resultSections, difficultyStyle} = storeToRefs(resultstore)

const customize = settingsStore()
const { difficulty} = storeToRefs(customize)

const theme_ = themeStore()
const { appTheme } = storeToRefs(theme_)
</script>




















