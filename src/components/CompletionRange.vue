<template>
    <div v-show="!testCompleted && completionLevel" class="max-w-[700px] m-auto">
        <div :class="theme === 'dark' ? 'bg-white' : 'bg-black'" :style="{'width': completionLevel + '%'}" class="h-1"></div>
    </div>
</template>

<script setup>
import { themeStore } from '../store/themeStore';
import { typingStateStore } from '../store/typingStateStore';
import { storeToRefs } from 'pinia';

const typingstatestore = typingStateStore()
const {completionLevel, testCompleted} = storeToRefs(typingstatestore)

const theme_ = themeStore()
const {theme} = storeToRefs(theme_)
</script>