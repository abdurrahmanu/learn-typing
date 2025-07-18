<template>
    <div v-show="!hasCompletedSession && completionLevel" class="max-w-[700px] m-auto">
        <div :class="theme === 'dark' ? 'bg-white' : 'bg-black'" :style="{'width': completionLevel + '%'}" class="h-[2px]"></div>
    </div>
</template>

<script setup>
import { mainStore } from '../store/mainStore';
import { themeStore } from '../store/themeStore';
import { typingStateStore } from '../store/typingStateStore';
import { storeToRefs } from 'pinia';

const typingstatestore = typingStateStore()
const {completionLevel} = storeToRefs(typingstatestore)

const theme_ = themeStore()
const {theme} = storeToRefs(theme_)

const store = mainStore()
const { hasCompletedSession} = storeToRefs(store)
</script>