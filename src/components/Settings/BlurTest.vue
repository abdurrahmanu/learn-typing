<template>
    <div :class="[theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-slate-100']" class="py-2 pl-5">
        <div  class="flex justify-between w-full p-1 border border-transparent rounded-sm ">
            <div @click="customizers['blur'] = !customizers['blur'], customize('blur', customizers['blur'])" class="flex gap-4 w-fit">
                <input name="caps" :checked="customizers['blur']" type="checkbox" class="accent-green-500">
                <label class="text-sm font-medium w-fit">
                    <span>Blur</span> 
                    <span v-if="customizers['blur']" class="px-3 text-white uppercase rounded-full py-[1px] text-[10px] bg-yellow-800 ml-1">medium</span> 
                    <span v-else class="px-3 text-white uppercase rounded-full text-[10px] bg-lime-600 ml-1 py-[1px] relative bottom-[2px]">easy</span>
                </label>
            </div>
        </div>
        <p class="px-3 font-[400]">Only already typed and current words will not be blurred out. Only works with space inbetween words.</p>
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