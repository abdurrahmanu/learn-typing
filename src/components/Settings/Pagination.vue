<template>
    <div class="flex items-center m-auto rounded-md p-[2px] w-fit text-black text-xs py-4">
        <div @click="prev" :class="[hasPrev ? 'bg-green-700' : 'bg-green-400 opacity-60']" class="p-1 font-mono text-center text-white rounded-md text-sm px-5"><</div>

        <div class="flex items-center gap-1 px-1 overflow-hidden transition-all duration-200 w-fit">
            <div @click="positionPage(index, page)" :class="index === currentPage ? 'bg-neutral-700 py-1 px-3' : ' opacity-50'" class="p-1 font-mono text-center transition-all duration-100 border rounded-md bg-zinc-100 whitespace-nowrap border-neutral-600" v-for="(page, index) in paginationArray" :key="index">
                <span :class="[index === currentPage ? 'w-fit' : 'w-12 overflow-clip text-sm']" class="inline-block">{{ page }}</span>{{ index !== currentPage ? '..' : '' }}
            </div>
        </div>
        
        <div @click="next" :class="[hasNext ? 'bg-green-700' : 'bg-green-400 opacity-60']" class="p-1 px-5 font-mono text-sm text-center text-white rounded-md">></div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';

const paginationArray = ref([])
const currentPage = ref(1)
const emit = defineEmits(['page'])

const props = defineProps({
    currentPage: {
        type: Number,
        default: 0
    },
    showLength: {
        type: Number,
        default: 3
    },
    allPages: {
        type: Array,
        // type: (value) => typeof value === 'string' ? String : Array
    }
})

const positionPage = (pageNumber, page) => {
    if (!paginationArray.value) return
    currentPage.value = pageNumber
}

const hasNext = computed(() => paginationArray.value[currentPage.value + 1])
const hasPrev = computed(() => paginationArray.value[currentPage.value - 1])

const next = () => {   
    if (hasNext.value) currentPage.value++
    else return
}

const prev = () => {
    if (hasPrev.value) currentPage.value--
    else return
}

onMounted(() => {
    if (Array.isArray(props.allPages)) {        
        paginationArray.value = props.allPages
    } else if (typeof +props.allPages === 'number' && !isNaN(+props.allPages)) {
        for (let index = 0; index < props.allPages; index++) {
            paginationArray.value.push(index + 1)
        }
    }
    positionPage(props.currentPage)
})

watch(currentPage, (newVal, oldVal) => {
    emit('page', currentPage.value)
})
</script>


