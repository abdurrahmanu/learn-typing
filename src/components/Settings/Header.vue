<template>
    <div class=" sticky z-[99999] top-[0] bg-neutral-800 text-slate-200">
        <div  class="flex items-center w-full px-2 relative justify-between">
            <div class="p-2 text-lg font-bold">SETTINGS</div>
            <SearchBar />
            <div class="text-white font-bold  text-lg p-2 hover:cursor-default" @click="settingsPage">
                <p class="font-mono  w-fit hover:text-red-500 hover:cursor-pointer">X</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { customizeStore } from '../../store/customizeStore';
import SearchBar from './SearchBar.vue';

const customizestore = customizeStore()
const {settingsPage} = customizestore
</script>
