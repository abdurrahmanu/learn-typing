<template>
    <div :class="[theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-slate-100']" class="py-2 pl-5">
        <div class="flex justify-between w-full p-1 border border-transparent rounded-sm ">
            <div @click="customizers['movie-quotes'] = !customizers['movie-quotes'], customize('movie-quotes', customizers['movie-quotes'])"  class="flex gap-4 w-fit">
                <input name="movie" :checked="customizers['movie-quotes']" type="checkbox" class="accent-green-500">
                <label class="text-sm font-medium w-fit">Quotes from movies</label>
            </div>
        </div>
        <p class="px-2 font-[400]">This is only available for quotes mode with auto-length. On-select, it automatically enables both modes</p>
        <div v-if="customizers['movie-quotes']"class="p-2 font-[400]">
            <div class="py-1 space-x-2 w-fit">         
                <input id="only" :value="true" @click="setQoutes(true)" v-model="onlyMovieQuotes" class="w-7 accent-green-500" type="radio"></input>
                <label for="only">Movie quotes only</label>       
            </div>
            <div class="py-1 space-x-2 w-fit">      
                <input id="mix" :value="false" @click="setQoutes(false)" v-model="onlyMovieQuotes" class="w-7 accent-green-500" type="radio"></input>
                <label for="mix">Movie quotes with other quotes</label>          
            </div>
        </div>
    </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {customizeStore} from '../../store/customizeStore'
import { themeStore } from '../../store/themeStore';
import {mainStore} from '../../store/mainStore'

const main = mainStore()
const {switchNext} = main

const theme_ = themeStore()
const {theme} = theme_

const store = customizeStore()
const {customizers, onlyMovieQuotes, onlyAuthoredQuotes} = storeToRefs(store)
const {customize} = store

const setQoutes = (boolean) => {
    onlyAuthoredQuotes.value = false
    if (boolean) {
        onlyMovieQuotes.value = true
        customizers.value['author-quotes'] = false
    } else onlyMovieQuotes.value = false
    switchNext(customizers.value)
}
</script>
