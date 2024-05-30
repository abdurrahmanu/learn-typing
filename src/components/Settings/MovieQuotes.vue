<template>
    <div class="p-2 px-1 border-t border-neutral-900">
        <div @click="customize('movie-quotes', !customizers['movie-quotes'])"  class="flex justify-between w-full p-1 border border-transparent rounded-sm hover:border-neutral-300">
            <div class="flex gap-4">
                <input name="movie" :checked="customizers['movie-quotes']" type="checkbox">
                <p>Movie quotes</p>
            </div>
        </div>
        <p class="px-2">**This is only available for quotes mode with auto-length. On-select, it automatically enables both modes</p>
        <div v-if="customizers['movie-quotes']"class="p-2">
            <div class="py-1 space-x-2 w-fit">      
                <input id="mix" :value="false" @click="customize('movie-quotes',null, false)" v-model="onlyMovieQuotes" class="w-7" type="radio"></input>
                <label for="mix">Movie quotes with normal quotes</label>          
            </div>
            <div class="py-1 space-x-2 w-fit">         
                <input id="only" :value="true" @click="customize('movie-quotes',null,true)" v-model="onlyMovieQuotes" class="w-7" type="radio"></input>
                <label for="only">Only movie quotes</label>       
            </div>
        </div>
    </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {customizeStore} from '../../store/customizeStore'

const store = customizeStore()
const {customizers, onlyMovieQuotes} = storeToRefs(store)
const {customize} = store
</script>
