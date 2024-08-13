<template>
        <div :class="[theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-slate-100']" class="py-2 pl-5">
            <div class="flex justify-between w-full p-1 border border-transparent rounded-sm ">
                <div @click="customize"  class="flex gap-4 w-fit">
                    <input name="blind" :checked="blind"  type="checkbox" class="accent-green-500" id="">
                    <label class="text-sm font-medium w-fit">Blind mode <span class="px-3 text-white uppercase rounded-full py-[1px] text-[10px] bg-yellow-800 ml-1">medium</span></label>
                </div>
            </div>
            <p class="px-3 font-[400]">Type while fully trusting your muscle memory. </p>
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

const localStorageSettings = ref(JSON.parse(localStorage.getItem('kiboard')))

const customize = () => {
    blind.value = !blind.value
    localStorageSettings.value.blind = blind.value
    localStorage.setItem('kiboard', JSON.stringify(localStorageSettings.value))
}
</script>
