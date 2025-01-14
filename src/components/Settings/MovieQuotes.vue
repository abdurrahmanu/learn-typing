<template>
    <div :class="[theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-zinc-200']" class="py-2 pl-5">
        <div class="flex justify-between w-full p-1 border border-transparent rounded-sm ">
            <div @click="customizers['movie-quotes'] = !customizers['movie-quotes'], customize('movie-quotes', customizers['movie-quotes'])"  class="flex gap-4 w-fit">
                <div class="relative w-4 h-4">
                        <input name="movie" :checked="customizers['movie-quotes']"  type="checkbox" class="appearance-none shadow-sm shadow-black w-4 h-4 peer ring-blue-500 rounded-full hover:ring-[2px] ring-[1px] hover:ring-blue-500" id="">
                        <good />
                    </div>
                <label class="text-[13px] font-bold uppercase w-fit">Quotes from movies</label>
            </div>
        </div>
        <p class="px-2 font-[400]">When toggled, it enables quotes mode and auto length.</p>
    </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {customizeStore} from '../../store/customizeStore'
import { themeStore } from '../../store/themeStore';
import good from '../svg/good.vue';

const theme_ = themeStore()
const {theme} = theme_

const store = customizeStore()
const {customizers} = storeToRefs(store)
const {customize} = store
</script>
