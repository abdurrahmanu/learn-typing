<template>
    <div :class="[theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-zinc-200']" class="pb-6 pt-4">
        <p class="font-medium pl-5">Reset</p>
        <div class="pl-5 space-y-2 w-fit flex items-center gap-3">
            <p>This action will reset all your saved settings</p>
            <button @click="clearSettings" class="outline-none border-none px-5 py-1 rounded-md bg-red-400 hover:bg-red-700 text-white text-center hover:ring-[1px] hover:ring-green-500">RESET</button>
        </div>
    </div>
</template>

<script setup>
import { themeStore } from '../../store/themeStore';
import { localStorageConfig } from '../../composables/getLocalStorageConfig';

const theme_ = themeStore()
const {theme} = theme_

const clearSettings = () => {
    localStorage.removeItem('kiboard')
    localStorageConfig()
}
</script>