<template>
    <div :class="[theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-zinc-200']" class="py-2 pl-5">
        <div  class="flex justify-between w-full p-1 border border-transparent rounded-sm ">
            <div @click="customizers['custom-camel-case'] = !customizers['custom-camel-case'], customize('custom-camel-case', customizers['custom-camel-case'])" class="flex gap-4 w-fit">
                <input name="camelcase" :checked="customizers['custom-camel-case']" type="checkbox" class="accent-green-500">
                <label class="text-sm font-medium w-fit">
                    <span>Custom case</span> 
                    <span v-if="customizers['custom-camel-case']" class="px-3 text-white uppercase rounded-full py-[1px] text-[10px] bg-teal-800 ml-1">hard</span>
                    <span v-else class="px-3 text-white uppercase rounded-full py-[1px] text-[10px] bg-lime-800 ml-1">easy</span>
                </label>
            </div>
        </div>
        <p class="px-3 font-[400]">Toggle to randomize positons of uppercase and lowercase alphabets. eg. tHiS is An EXaMplE</p>
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