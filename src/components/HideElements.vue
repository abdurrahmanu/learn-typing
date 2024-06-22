<template>
    <div @click="hideElements = !hideElements"  v-if="!hasCompletedSession && route.name === 'home'" :class="[appTheme]" class="absolute bottom-3 group whitespace-nowrap left-4 text-xs bg-neutral-900 border rounded-md px-2 py-[2px] transition-all duration-100 border-neutral-700 items-center space-x-1">
        <span class="hidden group-hover:inline">{{!hideElements ? 'HIDE' : 'SHOW'}} ELEMENTS</span>
        <span class="pl-2 font-mono font-bold">></span>
        </div>
</template>

<script setup>
import {ref, watch} from 'vue'
import { storeToRefs } from 'pinia';
import { customizeStore } from '../store/customizeStore';
import {mainStore} from '../store/mainStore'
import {themeStore}  from '../store/themeStore'
import {useRoute} from 'vue-router'

const route = useRoute()
const localStorageSettings = ref(JSON.parse(localStorage.getItem('dorayi-typing')))

const theme_ = themeStore()
const { appTheme } = storeToRefs(theme_)

const main = mainStore()
const { hasCompletedSession } = storeToRefs(main)

const customize = customizeStore()
const {hideElements} = storeToRefs(customize)

watch(hideElements, (newVal) => {
    localStorageSettings.value.hide = newVal
    localStorage.setItem('dorayi-typing', JSON.stringify(localStorageSettings.value))
})
</script>