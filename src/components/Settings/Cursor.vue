<template>
    <div class="flex gap-2">
        <div 
        v-for="(value, cursor, index) in allCursors" 
        :key="index" 
        @click="changeCursor(cursor)" 
        class="flex px-5 py-1 ring-[2px] cursor-pointer rounded-md" 
        :class="[cursorStyle(cursor)]">
            <p class="w-fit border-blue-500" :class="value">A</p>
        </div>
    </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {settingsStore} from '../../store/settingsStore'

const settingstore = settingsStore()
const { settings} = storeToRefs(settingstore)

const allCursors = {
    border: "border-[1px] border-blue-500",
    cursor: "border-l-[1px] border-l-blue-500",
    underline: "border-b-[1px] border-b-blue-500",
    pulse: 'animate-pulse'
}

const cursorStyle = (cursor) => {
    return settings.value['cursor'] === cursor ? 'ring-blue-500' : 'hover:ring-blue-800 hover:ring-[1px] ring-slate-500'
}

const changeCursor = (cursor) => {
    settings.value['cursor'] = cursor
}
</script>

<style scoped>
.pulse {
    transition: all 2s ease;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% {
        opacity: 80%
    }
    50% {
        opacity: 30%;
    }
    100% {
        opacity: 80%;
    }
}

</style>