<template>
    <svg @mouseover="hoverbg = '#4299e1'" @mouseleave="hoverbg = ''" :fill="hoverbg || svgFill" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M49.1044 164.338C90.2421 164.391 137.262 164.093 190.165 163.443C269.519 162.468 370.45 159.986 370.45 165.247C370.45 170.509 370.45 176.167 370.45 180.924C370.45 185.68 370.45 213.366 370.45 217.812C370.45 222.258 370.45 230.135 370.45 233.649C370.45 237.162 361.75 237.162 339.646 237.162C317.542 237.162 50.1572 238.591 38.2436 237.162C26.3299 235.733 29.3389 191.822 29.3389 187.862C29.3389 183.902 29.3389 178.568 29.3389 175.582" stroke="#000000" stroke-opacity="0.9" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M314.49 188.14C315.497 188.129 316.504 188.171 317.512 188.183C318.2 188.191 318.889 188.179 319.577 188.187C320.549 188.198 331.906 188.284 333.19 188.245C334.898 188.193 335.457 188.131 337.165 188.069C338.193 188.032 338.359 187.98 339.387 187.951C340.13 187.93 340.874 187.91 341.616 187.935C342.836 187.977 345.348 187.752 346.29 187.935C346.569 187.99 344.025 193.133 340.735 198.874C339.111 201.707 336.993 205.829 335.335 208.578C333.18 212.15 331.091 215.015 329.069 217.172C328.341 217.172 322.022 206.682 321.549 205.899C320.208 203.68 314.626 193.295 313.887 192.008C313.229 190.864 312.593 189.709 311.948 188.558C311.905 188.48 311.875 188.395 311.828 188.29" stroke="#000000" stroke-opacity="0.9" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
</template>

<script setup>
import {ref} from 'vue'
import {storeToRefs} from 'pinia'
import {themeStore} from '../../store/themeStore'

const hoverbg = ref('')
const theme_ = themeStore()
const { svgFill } = storeToRefs(theme_)
</script>