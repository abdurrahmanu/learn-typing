<template>
    <div class="flex items-center m-auto rounded-md p-[2px] w-fit text-black text-xs py-4">
        <div @click="prev" :class="[hasPrev ? 'cursor-pointer' : 'opacity-40 cursor-not-allowed']" class="p-1 font-mono text-center text-slate-500 rounded-md text-4xl px-5"><</div>
        <div class="bg-neutral-700 py-1 px-3 w-fit text-sm transition-all duration-100 rounded-md text-green-500 cursor-pointer">{{ pagesArray[currentPage] }}</div>
        <div @click="next" :class="[hasNext ? 'cursor-pointer' : 'opacity-40 cursor-not-allowed']" class="p-1 px-5 font-mono text-4xl text-center text-slate-500 rounded-md">></div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { mainStore } from '../../store/mainStore';

const store = mainStore()
const { currentPage} = storeToRefs(store)
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


