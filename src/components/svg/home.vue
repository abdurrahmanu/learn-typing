<template>
    <div>
        <svg @mouseover="hoverbg = '#4299e1'" @mouseleave="hoverbg = ''" viewBox="0 0 32 32" id="i-home" xmlns="http://www.w3.org/2000/svg" :fill="hoverbg || svgFill" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1">
        <path d="M12 20 L12 30 4 30 4 12 16 2 28 12 28 30 20 30 20 20 Z" />
    </svg>
    </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {themeStore}  from '../../store/themeStore'
import {ref} from 'vue'

const hoverbg = ref('')
const themestore = themeStore()
const { svgFill } = storeToRefs(themestore)
</script>