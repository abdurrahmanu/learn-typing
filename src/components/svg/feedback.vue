<template>
<svg @mouseover="hoverbg = '#4299e1'" @mouseleave="hoverbg = ''" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" :fill="hoverbg || svgFill"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M415.808 755.2L512 851.392 608.192 755.2H883.2V204.8H704V128h256v704h-320l-128 128-128-128H64V128h256v76.8H140.8v550.4h275.008zM473.6 64h76.8v448H473.6V64z m0 512h76.8v76.8H473.6V576z" :fill="hoverbg || svgFill"></path></g></svg>
</template>

<script setup>
const hoverbg = ref('')
const themestore = themeStore()
const { svgFill } = storeToRefs(themestore)
</script>