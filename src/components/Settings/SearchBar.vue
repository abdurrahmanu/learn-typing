<template>
    <div class="py-4 sticky top-0 z-[1] bg-inherit px-3">
        <div class="rounded-md ring-[2px] ring-black px-2">
            <input v-model="searchValue" @input="debounce" type="text" placeholder="Search" class="outline-none text-center appearance-none px-3 py-1 bg-transparent w-full">
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import { searchStore } from '../../store/searchStore'
import { storeToRefs } from 'pinia'

const searchstore = searchStore()
const {useValue} = storeToRefs(searchstore)

const timeout = ref(null)
const searchValue = ref('')

const debounce = () => {
    clearTimeout(timeout.value)
    timeout.value = setTimeout(() => {
        useValue.value = searchValue.value.toLowerCase()
    }, 500);
}
</script>