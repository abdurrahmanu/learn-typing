<template>
        <div :class="[theme === 'dark' ? 'hover:bg-neutral-700' : 'hover:bg-slate-100']" class="py-2 pl-5">
            <div class="flex justify-between w-full p-1 border border-transparent rounded-sm ">
                <div @click="customize"  class="flex gap-4 w-fit">
                    <input name="blind" :checked="blind"  type="checkbox" id="">
                    <label class="font-medium w-fit">Blind mode <span class="px-3 text-white uppercase font-mono rounded-full py-[1px] text-[12px] bg-yellow-800 ml-1">hard</span></label>
                </div>
            </div>
            <p class="px-3">Type while fully trusting your muscle memory. </p>
        </div>
</template>

<script setup>
import {ref} from 'vue'
import {storeToRefs} from 'pinia';
import {customizeStore} from '../../store/customizeStore';
import { themeStore } from '../../store/themeStore';

const theme_ = themeStore()
const {theme} = theme_

const store = customizeStore()
const {blind} = storeToRefs(store)

const localStorageSettings = ref(JSON.parse(localStorage.getItem('dorayi-typing')))

const customize = () => {
    blind.value = !blind.value
    localStorageSettings.value.blind = blind.value
    localStorage.setItem('dorayi-typing', JSON.stringify(localStorageSettings.value))
}
</script>
