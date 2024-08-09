<template>
    <div :class="[theme === 'dark' ? 'hover:bg-neutral-700' : 'hover:bg-slate-100']" class="py-2 pl-5">
        <div  class="flex justify-between w-full p-1 border border-transparent rounded-sm ">
            <div @click="customizers['blur'] = !customizers['blur'], customize('blur', customizers['blur'])" class="flex gap-4 w-fit">
                <input name="caps" :checked="customizers['blur']" type="checkbox">
                <label class="font-medium w-fit">Blur test <span class="px-3 text-white uppercase font-mono rounded-full py-[1px] text-[12px] bg-yellow-800 ml-1">medium</span> </label>
            </div>
        </div>
        <p class="px-3">Only typed and current words will not be blurred out</p>
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