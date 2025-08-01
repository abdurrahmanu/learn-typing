<template>
    <div @click="settings['repeat'] = !settings['repeat']">
        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path :fill="settings['repeat'] ? '#4299e1' : theme === 'dark' ? '#d4d4d4' : 'black'" d="M11.238.68a.75.75 0 10-.976 1.14l1.96 1.68H4.418A3.417 3.417 0 001 6.917v.833a.75.75 0 001.5 0v-.833A1.917 1.917 0 014.417 5h7.806l-1.961 1.68a.75.75 0 00.976 1.14l3.5-3a.75.75 0 000-1.14l-3.5-3z"></path> <path :fill="settings['repeat'] ? '#4299e1' : theme  === 'dark' ? '#d4d4d4' : 'black'" d="M5.82 8.262a.75.75 0 01-.082 1.057L3.778 11h7.805A1.916 1.916 0 0013.5 9.083V8.25a.75.75 0 011.5 0v.833a3.417 3.417 0 01-3.417 3.417H3.777l1.961 1.68a.75.75 0 11-.976 1.14l-3.5-3a.75.75 0 010-1.14l3.5-3a.75.75 0 011.057.082z"></path> </g> </g></svg>
    </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {settingsStore} from '../../store/settingsStore'
import {themeStore} from '../../store/themeStore'

const settingstore = settingsStore()
const { settings } = storeToRefs(settingstore)

const theme_ = themeStore()
const { theme } = storeToRefs(theme_)
</script>

