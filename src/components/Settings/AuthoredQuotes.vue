<template>
    <div :class="[theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-slate-100']" class="py-2 pl-5">
        <div  class="flex justify-between w-full p-1 border border-transparent rounded-sm">
            <div @click="customizers['author-quotes'] = !customizers['author-quotes'], customize('author-quotes', customizers['author-quotes'])" class="flex gap-4 w-fit">
                <input name="authored" :checked="customizers['author-quotes']" type="checkbox" class="accent-green-500">
                <label class="text-sm font-medium w-fit">Quotes with Authors</label>
            </div>
        </div>
        <p class="px-2 font-[400]">This is only available for quotes mode with auto-length. On-select, it automatically enables both modes</p>
        <div v-if="customizers['author-quotes']"class="p-2 font-[400]">
            <div class="py-1 space-x-2 w-fit">         
                <input id="only-authored" :value="true" @click="setQuotes(true)" v-model="onlyAuthoredQuotes" class="w-7 accent-green-500" type="radio"></input>
                <label for="only-authored">Authored quotes only</label>       
            </div>
            <div class="py-1 space-x-2 w-fit">      
                <input id="mix-authored" :value="false" @click="setQuotes(false)" v-model="onlyAuthoredQuotes" class="w-7 accent-green-500" type="radio"></input>
                <label for="mix-authored">Authored quotes with other quotes</label>          
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
const {customizers, onlyAuthoredQuotes, onlyMovieQuotes} = storeToRefs(store)
const {customize} = store

    const setQuotes = (boolean) => {
        onlyMovieQuotes.value = false
        if (boolean) {
            customizers.value['movie-quotes'] = false
            onlyAuthoredQuotes.value = true
        } else onlyAuthoredQuotes.value = false
        switchNext(customizers.value)
    }
</script>
