<template>
<svg @mouseover="hoverbg = '#4299e1'" @mouseleave="hoverbg = ''" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3.27489 15.2957C2.42496 14.1915 2 13.6394 2 12C2 10.3606 2.42496 9.80853 3.27489 8.70433C4.97196 6.49956 7.81811 4 12 4C16.1819 4 19.028 6.49956 20.7251 8.70433C21.575 9.80853 22 10.3606 22 12C22 13.6394 21.575 14.1915 20.7251 15.2957C19.028 17.5004 16.1819 20 12 20C7.81811 20 4.97196 17.5004 3.27489 15.2957Z" :stroke="hoverbg || svgFill" stroke-width="1.5"></path> <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" :stroke="hoverbg || svgFill" stroke-width="1.5"></path> </g></svg>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {themeStore} from '../../store/themeStore'

import {ref} from 'vue'
import { customizeStore } from '../../store/customizeStore';
const hoverbg = ref('')
const theme_ = themeStore()
const { svgFill } = storeToRefs(theme_)

const customize = customizeStore()
const {blind} = storeToRefs(customize)
</script>