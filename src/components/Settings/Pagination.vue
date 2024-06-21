<template>
    <div :class="[appTheme]" class="flex items-center m-auto rounded-md w-fit text-black text-xs">
        <leftArrow @click="prev" :class="[hasPrev ? 'cursor-pointer' : 'opacity-10 cursor-not-allowed']" />
        <div class="px-3 transition-all duration-100 font-mono rounded-md cursor-pointer w-fit font-medium">{{ pagesArray[currentPage] }}</div>
        <rightArrow @click="next" :class="[hasNext ? 'cursor-pointer' : 'opacity-40 cursor-not-allowed']"  />
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { storeToRefs } from 'pinia';
import LeftArrow from '../svg/leftArrow.vue';
import RightArrow from '../svg/rightArrow.vue';
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


