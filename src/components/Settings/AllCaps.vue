<template>
    <div :class="[theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-zinc-200']" class="py-2 pl-5">
        <div  class="flex justify-between w-full p-1 border border-transparent rounded-sm ">
            <div @click="customizers['all-caps'] = !customizers['all-caps'], customize('all-caps', customizers['all-caps'])" class="flex gap-4 w-fit">
                <input name="caps" :checked="customizers['all-caps']" type="checkbox" class="checked:accent-green-500 hover:accent-green-700">
                <label class="text-[15px] font-bold uppercase w-fit">
                    <span>Uppercase</span>
                    <span v-if="customizers['all-caps'] && capslock" class="px-3 text-white uppercase rounded-full py-[1px] text-[10px] bg-teal-800 ml-1">hard</span>
                    <span v-else-if="customizers['all-caps'] && !capslock" class="px-3 text-white uppercase rounded-full py-[1px] text-[10px] bg-yellow-800 ml-1">medium</span>
                    <span v-else-if="!customizers['all-caps']" class="px-3 text-white uppercase rounded-full py-[1px] text-[10px] bg-lime-800 ml-1">easy</span>
                </label>
            </div>
        </div>
        <p class="px-3 font-[400]">Toggle to capitalize test.</p>
    </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {customizeStore} from '../../store/customizeStore'
import { themeStore } from '../../store/themeStore';

const theme_ = themeStore()
const {theme} = theme_

const store = customizeStore()
const {customizers, capslock} = storeToRefs(store)
const {customize} = store
</script>
