<template>
    <div :class="[appTheme]" class="flex items-center m-auto text-black rounded-md w-fit">
        <previous  @click="prevMode" :class="[hasPrev ? 'cursor-pointer' : 'opacity-40 cursor-not-allowed']" class="w-4 h-4" />
        <div class="px-3 font-mono font-medium transition-all duration-100 rounded-md cursor-pointer w-fit">{{ pagesArray[currentPage] }}</div>
        <next @click="nextMode" class="w-4 h-4" :class="[hasNext ? 'cursor-pointer' : 'opacity-40 cursor-not-allowed']" />
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { storeToRefs } from 'pinia';
import {pagesStore}  from '../../store/pagesStore'
import { themeStore } from '../../store/themeStore';
import next from '../svg/next.vue';
import previous from '../svg/previous.vue';

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

const nextMode = () => {   
    if (hasNext.value) currentPage.value++
    else return
}

const prevMode = () => {
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


