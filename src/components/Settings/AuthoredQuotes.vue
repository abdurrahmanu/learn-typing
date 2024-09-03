<template>
    <div :class="[theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-zinc-200']" class="py-2 pl-5">
        <div  class="flex justify-between w-full p-1 border border-transparent rounded-sm">
            <div @click="customizers['author-quotes'] = !customizers['author-quotes'], customize('author-quotes', customizers['author-quotes'])" class="flex gap-4 w-fit">
                <input name="authored" :checked="customizers['author-quotes']" type="checkbox" class="accent-green-500">
                <label class="text-sm font-medium w-fit">Quotes with Authors</label>
            </div>
        </div>
        <p class="px-2 font-[400]">When toggled, it toggles quotes mode and auto length</p>
    </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {customizeStore} from '../../store/customizeStore'
import { themeStore } from '../../store/themeStore';

const theme_ = themeStore()
const {theme} = theme_

const store = customizeStore()
const {customizers} = storeToRefs(store)
const {customize} = store
</script>
