<template>
    <div class="relative leading-6 text-[15px] max-w-[1500px] mx-auto">
        <!-- <Fonts  v-if="!useValue || searchResult.includes('font')"/>
        <TextLines v-if="!useValue  || searchResult.includes('test lines')"/>
        <Cursor  v-if="!useValue  || searchResult.includes('cursor')"/>
        <Difficulty  v-if="!useValue  || searchResult.includes('difficulty')"/> -->
    </div>
</template>

<script setup>
import Cursor from './Cursor.vue'
import Fonts from './Fonts.vue'
import LetterCombinations from './CharCombination.vue'
import {storeToRefs} from 'pinia'
import {customizeStore} from '../../store/customizeStore'
import Difficulty from './Difficulty.vue'
import TextLines from './TextLines.vue'
import { searchStore } from '../../store/searchStore'
import { computed } from 'vue'

const searchstore = searchStore()
const {searchResult, useValue} = storeToRefs(searchstore)

const customizestore = customizeStore()
const {customizers, } = storeToRefs(customizestore)

const isAlphabetTest = computed(() => {
    return customizers.value['modes'] === 'alphabet-test'
})
</script>

<style scoped>
.slide-enter-from {
    transform: translateX(100%)
}

.slide-leave-to {
    transform: translateX(100%)
}

.slide-enter-active,
.slide-leave-active {
    transition: all .5s ease;
}
</style>