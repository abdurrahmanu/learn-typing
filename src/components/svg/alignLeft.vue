<template>
<svg @mouseover="hoverbg = '#4299e1'" @mouseleave="hoverbg = ''" viewBox="0 0 24 24" :fill="hoverbg || bg" xmlns="http://www.w3.org/2000/svg">
<g id="SVGRepo_bgCarrier" stroke-width="0"/>
<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
<g id="SVGRepo_iconCarrier"> <path d="M3 5C2.44772 5 2 5.44772 2 6C2 6.55228 2.44772 7 3 7H21C21.5523 7 22 6.55228 22 6C22 5.44772 21.5523 5 21 5H3Z" :fill="hoverbg || bg"/> <path d="M3 13C2.44772 13 2 13.4477 2 14C2 14.5523 2.44772 15 3 15H21C21.5523 15 22 14.5523 22 14C22 13.4477 21.5523 13 21 13H3Z" :fill="hoverbg || bg"/> <path d="M2 10C2 9.44772 2.44772 9 3 9H15C15.5523 9 16 9.44772 16 10C16 10.5523 15.5523 11 15 11H3C2.44772 11 2 10.5523 2 10Z" :fill="hoverbg || bg"/> <path d="M3 17C2.44772 17 2 17.4477 2 18C2 18.5523 2.44772 19 3 19H15C15.5523 19 16 18.5523 16 18C16 17.4477 15.5523 17 15 17H3Z" :fill="hoverbg || bg"/> </g>

</svg>
</template>

<script setup>
import {ref} from 'vue'
import {computed} from 'vue'
import {storeToRefs} from 'pinia'
import {themeStore} from '../../store/themeStore'

const hoverbg = ref('')
const theme_ = themeStore()
const {theme, svgFill } = storeToRefs(theme_)

const props = defineProps({
    position: Boolean
})

const bg = computed(() => {
    return props.position ? '#4299e1 ' : theme.value === 'dark' && !props.position ? '#d4d4d4' : theme.value !== 'dark' && !props.position ? 'black' : ''
})
</script>
