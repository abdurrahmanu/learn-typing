<template>
    <div :class="[theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-zinc-200']" class="py-2 pl-5">
        <div class="flex justify-between w-full p-1 border border-transparent rounded-sm ">
            <div @click="customize" class="flex gap-4 w-fit">
                <input name="backspace" :disabled="isMobileOS() ? true : false" :checked="isMobileOS() ? true : backspace"  type="checkbox" class="checked:accent-green-500 hover:accent-green-700">
                <label class="text-[15px] font-bold uppercase w-fit">
                    <span>Backspace</span>
                    <span v-if="backspace" class="px-3 text-white uppercase rounded-full py-[1px] text-[10px] bg-lime-800 ml-1">easy</span>
                    <span v-else class="px-3 text-white uppercase rounded-full py-[1px] text-[10px] bg-yellow-800 ml-1">medium</span>
                </label>
            </div>
        </div>
        <p v-if="isMobileOS()"  class="px-3 font-[400]">Cannot be disabled on mobile.</p>
        <p v-else class="px-3 font-[400]">Toggle to enable Backspace or delete key.</p>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import {storeToRefs} from 'pinia';
import {customizeStore} from '../../store/customizeStore';
import {updateDB} from '../../composables/updateDB'
import { isMobileOS } from '../../composables/isMobileOS';
import { themeStore } from '../../store/themeStore';

const theme_ = themeStore()
const {theme} = theme_

const custom = customizeStore()
const {backspace} = storeToRefs(custom)

const customize = () => {
    if (isMobileOS()) return
    backspace.value = !backspace.value
    updateDB(Object.keys({backspace})[0], backspace.value, null, true)
}
</script>



