<template>
    <svg
        class="
        absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
        hidden peer-checked:block"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        :fill="theme === 'dark' ? 'white' : 'black'"
        stroke="currentColor"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
</template>

<script setup>
import { themeStore } from '../../store/themeStore';
import { storeToRefs } from 'pinia';

const themestore = themeStore()
const {theme} = storeToRefs(themestore)
</script>