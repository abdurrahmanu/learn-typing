<template>
    <div :class="[theme === 'neutral' ? 'hover:bg-neutral-700' : 'hover:bg-slate-100']" class="py-2 pl-5">
        <div class="flex justify-between w-full p-1 border border-transparent rounded-sm ">
            <div @click="customize('movie-quotes', !customizers['movie-quotes'])"  class="flex gap-4 w-fit">
                <input name="movie" :checked="customizers['movie-quotes']" type="checkbox">
                <p class="font-medium w-fit">Movie quotes</p>
            </div>
        </div>
        <p class="px-2">**This is only available for quotes mode with auto-length. On-select, it automatically enables both modes</p>
        <div v-if="customizers['movie-quotes']"class="p-2">
            <div class="py-1 space-x-2 w-fit">      
                <input id="mix" :value="false" @click="customize('movie-quotes', null, false)" v-model="onlyMovieQuotes" class="w-7" type="radio"></input>
                <label for="mix">Movie quotes with normal quotes</label>          
            </div>
            <div class="py-1 space-x-2 w-fit">         
                <input id="only" :value="true" @click="customize('movie-quotes', null, true)" v-model="onlyMovieQuotes" class="w-7" type="radio"></input>
                <label for="only">Only movie quotes</label>       
            </div>
        </div>
    </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {customizeStore} from '../../store/customizeStore'
import { themeStore } from '../../store/themeStore';

const theme_ = themeStore()
const {theme} = theme_

const store = customizeStore()
const {customizers, onlyMovieQuotes} = storeToRefs(store)
const {customize} = store
</script>
