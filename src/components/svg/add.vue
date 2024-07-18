<template>
    <svg @mouseover="hoverbg = '#22c55e'" @mouseleave="hoverbg = ''"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <g>
        <path fill="transparent" d="M0 0h24v24H0z"/>
        <path :fill="hoverbg || svgFill" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"/>
    </g>
</svg>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {themeStore} from '../../store/themeStore'
import { customizeStore } from '../../store/customizeStore';
import {ref} from 'vue'

const hoverbg = ref('')
const theme_ = themeStore()
const { svgFill } = storeToRefs(theme_)

const customize = customizeStore()
const {blind} = storeToRefs(customize)
</script>