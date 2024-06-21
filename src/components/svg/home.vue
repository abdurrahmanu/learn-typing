<template>
    <div>
        <svg viewBox="0 0 32 32" id="i-home" xmlns="http://www.w3.org/2000/svg" :fill="svgFill" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
        <path d="M12 20 L12 30 4 30 4 12 16 2 28 12 28 30 20 30 20 20 Z" />
    </svg>
    </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {themeStore}  from '../../store/themeStore'

const theme_ = themeStore()
const { svgFill } = storeToRefs(theme_)
</script>