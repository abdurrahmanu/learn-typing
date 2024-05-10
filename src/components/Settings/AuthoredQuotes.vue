<template>
    <div class="p-2 px-1 border-t border-neutral-900">
        <div @click="customize('author-quotes', !customizers['author-quotes'])"  class="flex justify-between w-full p-1 border border-transparent rounded-sm hover:border-neutral-300">
            <div class="flex gap-4">
                <input :checked="customizers['author-quotes']" type="checkbox">
                <p>Authored quotes</p>
            </div>
        </div>
        <p class="px-2">Enable Movies quotes. Only avaible for quotes mode, auto length</p>
        <div v-if="customizers['author-quotes']"class="p-2">
            <div class="py-1 space-x-2 w-fit">      
                <input id="mix-authored" :value="false" v-model="onlyAuthoredQuotes" class="w-7" type="radio"></input>
                <label for="mix-authored">Authored quotes with Unauthored quotes</label>          
            </div>
            <div class="py-1 space-x-2 w-fit">         
                <input id="only-authored" :value="true" v-model="onlyAuthoredQuotes" class="w-7" type="radio"></input>
                <label for="only-authored">Only authored quotes</label>       
            </div>
        </div>
    </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {customizeStore} from '../../store/customizeStore'

const store = customizeStore()
const {customizers, onlyAuthoredQuotes} = storeToRefs(store)
const {customize} = store
</script>
