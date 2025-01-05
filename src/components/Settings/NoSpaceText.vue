<template>
    <div :class="[theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-zinc-200']" class="py-2 pl-5">
        <div class="flex justify-between w-full p-1 border border-transparent rounded-sm ">
            <div @click="customizers['no-space'] = !customizers['no-space'], customize('no-space', customizers['no-space'])" class="flex gap-4 w-fit">
                <input name="nospace" :checked="customizers['no-space']" type="checkbox" class="checked:accent-green-500 hover:accent-green-700">
                <label class="text-[15px] font-bold uppercase w-fit">
                    <span>No space </span>
                    <span v-if="customizers['no-space']" class="px-3 text-white uppercase rounded-full py-[1px] text-[10px] bg-teal-800 ml-1">hard</span>
                    <span v-else class="px-3 text-white uppercase rounded-full py-[1px] text-[10px] bg-lime-800 ml-1">easy</span>
                </label>
            </div>
        </div>
        <p class="px-3 font-[400]">Toggle to remove all spaces in test. e.g. thisisanexample</p>
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








