<template>
    <div :class="[theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-zinc-200']" class="py-2 pl-5">
        <div class="flex justify-between w-full p-1 border border-transparent rounded-sm ">
            <div @click="onError" class="flex gap-4 w-fit">
                <div class="relative w-4 h-4">
                    <input name="stoponerror" :checked="customizers['stop-on-error']"  type="checkbox" class="appearance-none shadow-sm shadow-black w-4 h-4 peer ring-blue-500 rounded-full hover:ring-[2px] ring-[1px] hover:ring-blue-500" id="">
                    <good />
                </div>
                <label class="text-[13px] font-bold uppercase w-fit flex items-center">
                    <div>Stop on error</div>
                    <div class="px-3 leading-normal rounded-full text-[10px]" :class="[customizers['stop-on-error'] ? 'text-[#0f766e]' : 'text-[#4d7c0f]']">{{ customizers['stop-on-error'] ? 'hard' : 'easy' }}</div>
                </label>
            </div>
        </div>
        <p class="px-3 font-[400]">With this toggled, you will not be able to go forward until you clear your error. Only works while backspace is enabled</p>
    </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {customizeStore} from '../../store/customizeStore'
import { themeStore } from '../../store/themeStore';
import good from '../svg/good.vue';

const theme_ = themeStore()
const {theme} = theme_

const store = customizeStore()
const {customizers, backspace} = storeToRefs(store)
const {changeSettings} = store

const onError = () => {
    if (!backspace.value) customizers.value['stop-on-error'] = false
    else changeSettings('stop-on-error', customizers.value['stop-on-error'])
}
</script>








