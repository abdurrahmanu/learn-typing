<template>
    <div :class="[theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-zinc-200']" class="py-2 pl-5">
        <div  class="flex justify-between w-full p-1 border border-transparent items-center rounded-sm ">
            <div @click="customizers['blur'] = !customizers['blur'], customize('blur', customizers['blur'])" class="flex items-center gap-3 w-fit">
                <div class="relative w-4 h-4">
                    <input name="blur" :checked="customizers['blur']"  type="checkbox" class="appearance-none shadow-sm shadow-black w-4 h-4 peer ring-blue-500 rounded-full hover:ring-[2px] ring-[1px] hover:ring-blue-500" id="">
                    <good />
                </div>
                <label class="text-[13px] font-bold uppercase w-fit flex items-center">
                    <div>Blur</div>
                    <div class="px-3 leading-normal rounded-full text-[10px]" :class="[!customizers['blur'] ? 'text-[#4d7c0f]' : 'text-[#a16207]']">{{ !customizers['blur'] ? 'easy' : 'medium' }}</div>
            </label>
            </div>
        </div>
        <p class="px-3 font-[400]">Toggle to blur out all words excluding the current and next words. Only works with spaced test.</p>
    </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {customizeStore} from '../../store/customizeStore'
import good from '../svg/good.vue';
import { themeStore } from '../../store/themeStore';

const theme_ = themeStore()
const {theme} = theme_

const store = customizeStore()
const {customizers} = storeToRefs(store)
const {customize} = store
</script>