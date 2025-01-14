<template>
    <div v-show="!hasCompletedSession && completionLevel" class="w-full max-w-[700px] absolute top-[100%] left-[50%] translate-x-[-50%]">
        <div :class="theme === 'dark' ? 'bg-white' : 'bg-black'" :style="{'width': completionLevel + '%'}" class="absolute h-[2px] top-0 bottom-0 left-0"></div>
    </div>
</template>

<script setup>
import { mainStore } from '../store/mainStore';
import { themeStore } from '../store/themeStore';
import { storeToRefs } from 'pinia';

const theme_ = themeStore()
const {theme} = storeToRefs(theme_)

const store = mainStore()
const { completionLevel, hasCompletedSession} = storeToRefs(store)
</script>