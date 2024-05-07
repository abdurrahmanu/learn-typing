<template>
    <div>
        <p class="font-bold text-xl px-2 py-1">FONTS</p>
        <div @click="selectFont(font)" v-for="(font, index) in allFonts " :key="index" class="p-1 py-3 border-b border-b-neutral-800 hover:bg-neutral-800">Dorayi typing test</div>
    </div>
</template>

<script setup>
import { mainStore } from '../../store/mainStore';
import { storeToRefs } from 'pinia';

const store = mainStore()
const {selectedFont, allFonts} = storeToRefs(store)

const selectFont  = (font) => {
    selectedFont.value = font
}
</script>

<style scoped>

</style>