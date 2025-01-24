<template>
    <div :class="[theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-zinc-200']" class="py-2 pl-5">
        <div class="flex justify-between w-full p-1 border border-transparent  rounded-sm ">
            <div @click="customizers['all-caps'] = !customizers['all-caps'], changeSettings('all-caps', customizers['all-caps'])" class="flex items-center gap-3 items-center w-fit">
                <div class="relative w-4 h-4">
                    <input name="caps" :checked="customizers['all-caps']"  type="checkbox" class="appearance-none shadow-sm shadow-black w-4 h-4 peer ring-blue-500 rounded-full hover:ring-[2px] ring-[1px] hover:ring-blue-500" id="">
                    <good />
                </div>
                <label class="text-[13px] font-bold uppercase w-fit flex items-center">
                    <div>uppercase</div>
                    <div class="px-3 leading-normal rounded-full text-[10px]" :class="[customizers['all-caps'] ? 'text-[#a16207]' : 'text-[#4d7c0f]' ]">{{ customizers['all-caps'] ? 'medium' : 'easy' }}</div>
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
import good from '../svg/good.vue'

const theme_ = themeStore()
const {theme} = theme_

const store = customizeStore()
const {customizers} = storeToRefs(store)
const {changeSettings} = store
</script>
