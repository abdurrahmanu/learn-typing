<template>
    <div :class="[theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-zinc-200']" class="py-2 pl-5">
        <div  class="flex justify-between w-full p-1 border border-transparent rounded-sm ">
            <div @click="changeSettings('double-words', customizers['double-words'])" class="flex gap-3 items-center w-fit">
                <div class="relative w-4 h-4">
                    <input name="double" :checked="customizers['double-words']"  type="checkbox" class="appearance-none shadow-sm shadow-black w-4 h-4 peer ring-blue-500 rounded-full hover:ring-[2px] ring-[1px] hover:ring-blue-500" id="">
                    <good />
                </div>
                <label class="text-[13px] font-bold uppercase w-fit flex items-center">
                    <div>Double words</div>
                    <div class="px-3 leading-normal rounded-full text-[10px]" :class="[customizers['double-words'] ? 'text-[#a16207]' : 'text-[#4d7c0f]']">{{ customizers['double-words'] ? 'medium' : 'easy' }}</div>
                </label>
            </div>
        </div>
        <p class="px-3 font-[400]">Toggle to repeat every word twice. Can only work with spaced test.</p>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import {customizeStore} from '../../store/customizeStore'
import { themeStore } from '../../store/themeStore';
import good from '../svg/good.vue';

const theme_ = themeStore()
const {theme} = theme_

const customize = customizeStore()
const {customizers} = storeToRefs(customize)
const {changeSettings} = customize
</script>
