<template>
    <div :class="[theme === 'dark' ? 'hover:bg-neutral-700' : 'hover:bg-slate-100']" class="py-2 pl-5">
        <div class="flex justify-between w-full p-1 border border-transparent rounded-sm  ">
            <div @click="customize('no-space', !customizers['no-space'])" class="flex gap-4 w-fit">
                <input name="nospace" :checked="customizers['no-space']" type="checkbox">
                <p class="font-medium w-fit">NoSpace</p>
            </div>
        </div>
        <p class="px-3">All white spaces are cleared between words</p>
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








