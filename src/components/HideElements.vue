<template>
    <div @click="hideElements = !hideElements"  v-if="!hasCompletedSession && route.name === 'home'" :class="[appTheme]" class="absolute flex items-center px-2 py-2 text-xs transition-all duration-100 border rounded-md bottom-3 group whitespace-nowrap left-4 bg-neutral-900 border-neutral-700">
        <span class="hidden pr-2 text-[10px] font-medium group-hover:inline">{{!hideElements ? 'HIDE' : 'SHOW'}} ELEMENTS</span>
        <next class="w-2" />
    </div>
</template>

<script setup>
import {ref, watch} from 'vue'
import { storeToRefs } from 'pinia';
import { customizeStore } from '../store/customizeStore';
import {mainStore} from '../store/mainStore'
import {themeStore}  from '../store/themeStore'
import {useRoute} from 'vue-router'
import next from './svg/next.vue';

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