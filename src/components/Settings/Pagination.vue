<template>
    <div class="flex items-center m-auto rounded-md w-fit text-black text-xs">
        <LeftArrow @click="prev" :class="[hasPrev ? 'cursor-pointer' : 'opacity-10 cursor-not-allowed']" class="w-9 h-fit" />
        <div class="px-3 py-1 text-sm text-blue-700 transition-all border border-transparent hover:border-blue-700 duration-100 rounded-md cursor-pointer w-fit">{{ pagesArray[currentPage] }}</div>
        <RightArrow @click="next" :class="[hasNext ? 'cursor-pointer' : 'opacity-40 cursor-not-allowed']" class="w-9 h-fit" />
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { storeToRefs } from 'pinia';
import LeftArrow from '../svg/LeftArrow.vue';
import RightArrow from '../svg/RightArrow.vue';
import {pagesStore}  from '../../store/pagesStore'

const pages = pagesStore()
const {currentPage } = storeToRefs(pages)
const emit = defineEmits(['page'])

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


