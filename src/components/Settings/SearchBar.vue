<template>
    <div class="w-[80%] rounded-md ring-[1px] ring-black">
        <input v-model="searchValue" @input="debounce" type="text" placeholder="SEARCH" class="outline-none appearance-none px-3 py-1 bg-transparent w-full">
    </div>
</template>

<script setup>
import {ref} from 'vue'
import { searchStore } from '../../store/searchStore'
import { storeToRefs } from 'pinia'

const searchstore = searchStore()
const {useValue, searchResult} = storeToRefs(searchstore)

const timeout = ref(null)
const searchValue = ref('')

const debounce = () => {
    clearTimeout(timeout.value)
    timeout.value = setTimeout(() => {
        useValue.value = searchValue.value.toLowerCase()
    }, 500);
}
</script>