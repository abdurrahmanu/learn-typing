<template>
    <div :class="[theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-zinc-200']" class="py-2 pl-5">
        <div class="flex justify-between w-full p-1 border border-transparent rounded-sm ">
            <div @click="customize" class="flex items-center gap-3 w-fit">
                <div class="relative w-4 h-4">
                        <input name="capslock" :checked="capslock"  type="checkbox" class="appearance-none shadow-sm shadow-black w-4 h-4 peer border-blue-500 rounded-full hover:ring-[2px] ring-[1px] hover:ring-blue-500" id="">
                        <good />
                    </div>
                <label class="text-[13px] font-bold uppercase w-fit flex items-center">
                    <div>Caps Lock</div>
                    <div class="px-3 text-white leading-normal rounded-full text-[10px]" :class="[!capslock ? 'text-lime-700' : 'text-yellow-700']">{{ capslock ? 'medium' : 'easy' }}</div>
                </label>
            </div>
        </div>
        <p  class="px-3 font-[400]">Toggle to enable Caps lock. Untoggle to use <span class="px-3 text-[13px] text-white bg-black rounded-sm">Shift</span> + <span class="px-3 text-[13px] text-white bg-black rounded-sm">Key</span> instead of Caps lock.</p>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import {storeToRefs} from 'pinia';
import good from '../svg/good.vue';
import {customizeStore} from '../../store/customizeStore';
import { themeStore } from '../../store/themeStore';
import {updateDB} from '../../composables/updateDB'

const theme_ = themeStore()
const {theme} = theme_

const custom = customizeStore()
const {capslock} = storeToRefs(custom)

const customize = () => {
    capslock.value = !capslock.value
    updateDB(Object.keys({capslock})[0], capslock.value, 'restart', true)
}
</script>