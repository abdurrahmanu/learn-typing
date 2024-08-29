<template>
    <div :class="[theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-zinc-200']" class="py-2 pl-5">
        <div class="flex justify-between w-full p-1 border border-transparent rounded-sm ">
            <div @click="customize" class="flex gap-4 w-fit">
                <input name="backspace" :disabled="isMobileOS() ? true : false" :checked="isMobileOS() ? true : backspace"  type="checkbox" class="accent-green-500">
                <label class="text-sm font-medium w-fit">
                    <span>Backspace</span>
                    <span v-if="backspace" class="px-3 text-white uppercase rounded-full py-[1px] text-[10px] bg-lime-800 ml-1">easy</span>
                    <span v-else class="px-3 text-white uppercase rounded-full py-[1px] text-[10px] bg-yellow-800 ml-1">medium</span>
                </label>
            </div>
        </div>
        <p v-if="isMobileOS()"  class="px-3 font-[400]"><span class="text-red-600">**</span>Always enabled on mobile devices</p>
        <p  class="px-3 font-[400]">This enables or disables the backspace or delete key.</p>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import {storeToRefs} from 'pinia';
import {customizeStore} from '../../store/customizeStore';
import { mainStore } from '../../store/mainStore';
import { isMobileOS } from '../../composables/isMobileOS';
import { themeStore } from '../../store/themeStore';

const theme_ = themeStore()
const {theme} = theme_

const custom = customizeStore()
const {backspace, customizers} = storeToRefs(custom)

const main = mainStore()
const {switchNext} = main

const localStorageSettings = ref(JSON.parse(localStorage.getItem('kiboard')))

const customize = () => {
    backspace.value = !backspace.value
    localStorageSettings.value.backspace = backspace.value
    switchNext(customizers.value, 'restart')
    localStorage.setItem('kiboard', JSON.stringify(localStorageSettings.value))
}
</script>