<template>
<svg @mouseover="hoverbg = '#ed3a3a'" @mouseleave="hoverbg = ''"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.75 13.25C20.75 18.08 16.83 22 12 22C7.17 22 3.25 18.08 3.25 13.25C3.25 8.42 7.17 4.5 12 4.5C16.83 4.5 20.75 8.42 20.75 13.25Z" :stroke="hoverbg || svgFill" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 8V13" :stroke="hoverbg || svgFill" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 2H15" :stroke="hoverbg || svgFill" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
</template>

<script setup>
import {ref} from 'vue'
import {storeToRefs} from 'pinia'
import {themeStore} from '../../store/themeStore'

const hoverbg  = ref('')
const theme_ = themeStore()
const { svgFill } = storeToRefs(theme_)
</script>
