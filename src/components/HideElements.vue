<template>
    <div v-if="!hasCompletedSession" :class="[appTheme]" class="fixed bottom-3 group whitespace-nowrap left-4 text-xs bg-neutral-900 border rounded-md px-2 py-[2px] transition-all duration-100 border-neutral-700 items-center space-x-1">
        <span class="hidden group-hover:inline">{{!hideElements ? 'HIDE' : 'SHOW'}} ELEMENTS</span>
        <RightArrow class="inline w-4 h-fit" />
        </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { customizeStore } from '../store/customizeStore';
import RightArrow from './svg/RightArrow.vue'
import {mainStore} from '../store/mainStore'
import {themeStore}  from '../store/themeStore'

const theme_ = themeStore()
const { appTheme } = storeToRefs(theme_)

const main = mainStore()
const { hasCompletedSession } = storeToRefs(main)

const customize = customizeStore()
const {hideElements} = storeToRefs(customize)

</script>