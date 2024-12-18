<template>
    <div :class="[theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-zinc-200']" class="py-2 pl-5">
        <div class="flex justify-between w-full p-1 border border-transparent rounded-sm ">
            <div @click="customize" class="flex gap-4 w-fit">
                <input name="capslock" type="checkbox" :checked="capslock" class="checked:accent-green-500 hover:accent-green-700">
                <label class="text-sm font-medium w-fit">
                    Caps lock 
                    <span v-if="capslock" class="px-3 text-white uppercase rounded-full py-[1px] text-[10px] bg-lime-800 ml-1">easy</span>
                    <span v-else class="px-3 text-white uppercase rounded-full py-[1px] text-[10px] bg-yellow-800 ml-1">medium</span>
                </label>
            </div>
        </div>
        <p  class="px-3 font-[400]">Toggle to enable Caps lock. Untoggle to use <span class="px-3 text-xs text-white bg-green-800 rounded-sm">Shift</span> + <span class="px-3 text-xs text-white bg-green-800 rounded-sm">Key</span> instead of Caps lock.</p>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import {storeToRefs} from 'pinia';
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