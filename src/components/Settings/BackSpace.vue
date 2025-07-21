<template>
    <div :class="[theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-zinc-200']" class="py-2 pl-5">
        <div class="flex p-1 justify-between w-full border border-transparent rounded-sm w-fit">
            <div @click="customize" class="flex items-center gap-x-3 w-fit">
                <div class="relative w-4 h-4">
                    <input name="backspace" :checked="isTouchScreenDevice() ? true : backspace"  type="checkbox" class="appearance-none shadow-sm shadow-black w-4 h-4 peer disabled:ring-slate-600 rounded-full hover:ring-[2px] ring-[1px] disabled:hover:ring-yellow-900
                    hover:ring-blue-500" id="">
                    <good />
                </div>
                <label class="text-[13px] font-bold uppercase w-fit flex items-center">
                    <div>Backspace</div>
                    <div class="px-3 leading-normal rounded-full text-[10px]" :class="[backspace ? 'text-[#4d7c0f]' : 'text-[#a16207]']">{{ backspace ? 'easy' : 'medium' }}</div>
                </label>
            </div>
        </div>
        <p class="px-3 font-[400]">Toggle to enable Backspace or delete key.</p>
    </div>
</template>

<script setup>
import good from '../svg/good.vue';
import {storeToRefs} from 'pinia';
import {customizeStore} from '../../store/customizeStore';
import { isTouchScreenDevice } from '../../composables/isTouchScreenDevice';
import { themeStore } from '../../store/themeStore';
import { nextStore } from '../../store/nextStore';

const theme_ = themeStore()
const {theme} = theme_

const custom = customizeStore()
const {backspace, settingsToUpdate} = storeToRefs(custom)

const nextstore = nextStore()
const {goNext} = storeToRefs(nextstore)

const customize = () => {
    backspace.value = !backspace.value
    goNext.value = true

    settingsToUpdate.value.push({
        name: Object.keys({backspace})[0],
        value: backspace.value
    })
}
</script>



