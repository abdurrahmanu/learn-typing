<template>
    <svg @mouseover="hoverbg = '#22c55e'" @mouseleave="hoverbg = ''" :fill="hoverbg || svgFill"  viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g> <path d="M66,84H54V42a5.9966,5.9966,0,0,0-6-6H36a6,6,0,0,0,0,12h6V84H30a6,6,0,0,0,0,12H66a6,6,0,0,0,0-12Z"></path> <path d="M48,24A12,12,0,1,0,36,12,12.0119,12.0119,0,0,0,48,24Z"></path> </g> </g></svg>
</template>
        
<script setup>
import {ref} from 'vue'
import {storeToRefs} from 'pinia'
import {themeStore} from '../../store/themeStore'

const hoverbg = ref('')
const theme_ = themeStore()
const { svgFill } = storeToRefs(theme_)
</script>