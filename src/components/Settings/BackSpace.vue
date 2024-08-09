<template>
    <div :class="[theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-slate-100']" class="py-2 pl-5">
        <div class="flex justify-between w-full p-1 border border-transparent rounded-sm ">
            <div @click="customize" class="flex gap-4 w-fit">
                <input name="backspace" :disabled="isMobileOS() ? true : false" :checked="isMobileOS() ? true : backspace"  type="checkbox">
                <label class="font-medium w-fit">Backspace <span class="px-3 text-white uppercase rounded-full py-[1px] text-[10px] bg-lime-600 ml-1">easy</span></label>
            </div>
        </div>
        <p v-if="isMobileOS()"  class="px-3">**Cannot be disabled on Mobile devices</p>
        <p  class="px-3">This enables or disables player ability to utilize the backspace key while typing.</p>
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

const localStorageSettings = ref(JSON.parse(localStorage.getItem('dorayi-typing')))

const customize = () => {
    backspace.value = !backspace.value
    localStorageSettings.value.backspace = backspace.value
    switchNext(customizers.value, 'restart')
    localStorage.setItem('dorayi-typing', JSON.stringify(localStorageSettings.value))
}
</script>