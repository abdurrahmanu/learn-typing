<template>
<!-- <svg  @mouseenter="hoverbg = '#4299e1'" @mouseleave="hoverbg = ''" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>align-text-center1</title> <desc>Created with Sketch.</desc> <g id="align-text-center1" stroke="none" stroke-width="1" :fill="hoverbg || bg" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"> <rect width="48" height="48" fill="white" fill-opacity="0.01"></rect> <g id="编组" transform="translate(6.000000, 8.000000)" :stroke="hoverbg || bg" stroke-width="4"> <path d="M30,11 L6,11" id="路径"> </path> <path d="M36,1 L0,1" id="路径"> </path> <path d="M36,21 L0,21" id="路径"> </path> <path d="M30,31 L6,31" id="路径"> </path> </g> </g> </g></svg> -->

<svg @mouseenter="hoverbg = '#4299e1'" @mouseleave="hoverbg = ''" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 6H21" :stroke='hoverbg || bg' stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M3 10H21" :stroke='hoverbg || bg' stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M3 14H21" :stroke='hoverbg || bg' stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M3 18H21" :stroke='hoverbg || bg' stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
</template>

<script setup>
import {ref} from 'vue'
import {computed} from 'vue'
import {storeToRefs} from 'pinia'
import {themeStore}  from '../../store/themeStore'

const hoverbg = ref('')
const themestore = themeStore()
const {theme } = storeToRefs(themestore)

const props = defineProps({
    position: Boolean
})

const bg = computed(() => {
    return props.position ? '#4299e1 ' : theme.value === 'dark' && !props.position ? '#d4d4d4' : theme.value !== 'dark' && !props.position ? 'black' : ''
})
</script>
