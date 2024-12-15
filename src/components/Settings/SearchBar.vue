<template>
    <div class="flex items-center max-w-[50%]">
        <input v-model="searchValue" type="text" placeholder="search" class="outline-none text-xs appearance-none px-3 py-1 bg-transparent border-b border-b-white w-full">
        <div @click="searchSettings(searchValue)" class="w-3 h-3 rounded-full bg-green-400"></div>
    </div>
</template>

<script setup>
import {ref} from 'vue'

const searchValue = ref('')
const allSettings = [

]

const searchSettings = (val) => {
    
}
</script>

<style scoped>

</style>