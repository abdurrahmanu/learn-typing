<template>
    <div>
        <svg @mouseover="hoverbg = '#4299e1'" @mouseleave="hoverbg = ''" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" enable-background="new 20 32 32 32" xml:space="preserve" :fill="hoverbg || bg"><g id="SVGRepo_bgCarrier"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="square" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path stroke-width="2" :fill="hoverbg || bg" d="M32,19.5v-18C32,0.673,31.327,0,30.5,0h-29C0.673,0,0,0.673,0,1.5v18C0,20.327,0.673,21,1.5,21h4.002 L0.549,31.283c-0.12,0.249-0.015,0.547,0.234,0.667C0.853,31.984,0.927,32,1,32c0.186,0,0.365-0.104,0.451-0.283l5-10.382 C6.503,21.226,6.506,21.109,6.479,21h20.038c-0.024,0.096-0.028,0.198,0.01,0.297l4,10.382c0.077,0.199,0.266,0.32,0.467,0.32 c0.06,0,0.121-0.011,0.18-0.033c0.258-0.1,0.386-0.389,0.287-0.646L27.484,21H30.5C31.327,21,32,20.327,32,19.5z M1,19.5v-18 C1,1.224,1.224,1,1.5,1h29C30.776,1,31,1.224,31,1.5v18c0,0.276-0.224,0.5-0.5,0.5h-29C1.224,20,1,19.776,1,19.5z">
        </path> </g> </g></svg>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import {computed} from 'vue'
import { themeStore } from '../../store/themeStore';
import { storeToRefs } from 'pinia';

const theme_ = themeStore()
const {theme} = storeToRefs(theme_)
const hoverbg = ref('')

const bg = computed(() => {
    return theme.value === 'dark' ? 'white' : 'black'
})
</script>