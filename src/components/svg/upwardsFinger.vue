<template>
<svg :fill="svgFill" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 747.138 747.138" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M613.683,291.34l-0.025-0.053c0.031,0.007,0.062,0.015,0.096,0.019C613.732,291.32,613.705,291.326,613.683,291.34z"></path> <path d="M604.361,275.91c-0.004-0.001-0.006-0.001-0.006-0.001c0-0.016,0.006-0.032,0.006-0.047V275.91z"></path> </g> <path d="M475.529,433.709V265.675c0.191-5.895-1.023-21.798-24.734-24.501c-17.023-1.94-30.926,3.769-34.777,16.956l0.021-13.319 c0-19.372-15.723-23.846-35.086-23.846c-19.063,0-34.069,4.363-35.015,19.075v-4.456c0-19.375-16.35-23.671-35.721-23.671 c-19.373,0-34.442,4.295-34.442,23.671L275.49,35.075C275.49,15.714,259.791,0,240.419,0c-19.379,0-35.092,15.714-35.092,35.075 l-0.444,310.806c0,4.063-2.892,7.306-6.7,8.175l-0.193,0.39c-0.15-0.1-0.352-0.15-0.509-0.25c-0.394,0.058-0.737,0.233-1.146,0.233 c-2.642,0-4.467-1.769-6.485-3.168c-7.961-5.526-17.01-5.33-23.209-5.004c-18.04,0.945-34.162,9.833-33.217,27.879l4.181,86.078 c0,0,66.025,151.205,89.492,157.086v84.785c0,1.46,0.121,2.906,0.286,4.334c-0.071,0.283-0.157,0.559-0.229,0.845 c2.85,22.482,22.007,39.874,45.266,39.874h109.064c25.221,0,40.439-20.445,40.439-45.666v-86.807 C471.261,577.709,475.529,436.869,475.529,433.709z"></path> </g> </g></svg>
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
