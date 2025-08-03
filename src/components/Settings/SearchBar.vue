<template>
    <div class="shadow-md py-4 sticky top-[46px] z-[1]" :class="[appTheme]">
        <div class="w-[80%] rounded-md ring-[1px] ring-black px-2">
            <input v-model="searchValue" @input="debounce" type="text" placeholder="Search" class="outline-none appearance-none px-3 py-1 bg-transparent w-full">
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import { searchStore } from '../../store/searchStore'
import { storeToRefs } from 'pinia'
import { themeStore } from '../../store/themeStore'

const themestore = themeStore()
const {appTheme} = storeToRefs(themestore)

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