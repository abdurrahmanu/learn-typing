<template>
    <div :class="[appTheme]" class="flex items-center m-auto text-xs text-black rounded-md w-fit">
        <div @click="prev" class="font-mono text-2xl font-bold hover:text-green-500" :class="[hasPrev ? 'cursor-pointer' : 'opacity-40 cursor-not-allowed']" >&lt;</div>
        <div class="px-3 font-mono font-medium transition-all duration-100 rounded-md cursor-pointer w-fit">{{ pagesArray[currentPage] }}</div>
        <div @click="next" class="font-mono text-2xl font-bold hover:text-green-500" :class="[hasNext ? 'cursor-pointer' : 'opacity-40 cursor-not-allowed']" >&gt;</div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { storeToRefs } from 'pinia';
import {pagesStore}  from '../../store/pagesStore'
import { themeStore } from '../../store/themeStore';

const pages = pagesStore()
const {currentPage } = storeToRefs(pages)
const emit = defineEmits(['page'])

const theme_ = themeStore()
const {appTheme} = storeToRefs(theme_)

const props = defineProps({
    pagesArray: {
        type: Array,
    }
})

const positionPage = (pageNumber, page) => {
    currentPage.value = pageNumber
}

const hasNext = computed(() =>  props.pagesArray[currentPage.value + 1])
const hasPrev = computed(() => props.pagesArray[currentPage.value - 1])

const next = () => {   
    if (hasNext.value) currentPage.value++
    else return
}

const prev = () => {
    if (hasPrev.value) currentPage.value--
    else return
}

onMounted(() => {
    if (Array.isArray(props.pagesArray)) {        
        positionPage(currentPage.value)
    } else {
        return
    }
})

watch(currentPage, (newVal, oldVal) => {
    emit('page', currentPage.value)
})
</script>


