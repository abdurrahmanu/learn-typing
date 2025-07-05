<template>
        <div :class="[theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-zinc-200']" class="py-2 pl-5">
            <div class="flex justify-between w-full p-1 border border-transparent rounded-sm ">
                <div @click="customize"  class="gap-3 flex items-center w-fit">
                    <div class="relative w-4 h-4">
                        <input name="blind" :checked="blind"  type="checkbox" class="appearance-none shadow-sm shadow-black w-4 h-4 peer ring-blue-500 rounded-full hover:ring-[2px] ring-[1px] hover:ring-blue-500" id="">
                        <good />
                    </div>
                    <label class="text-[13px] font-bold uppercase w-fit flex items-center">
                        <div>Blind mode</div>
                        <div class="px-3 leading-normal rounded-full text-[10px]" :class="[!blind ? 'text-[#4d7c0f]' : 'text-[#a16207]']">{{ !blind ? 'easy' : 'medium' }}</div>
                    </label>
                </div>
            </div>
            <p class="px-3 font-[400]">Toggle to type while fully trusting your muscle memory. </p>
        </div>
</template>

<script setup>
import {storeToRefs} from 'pinia';
import {customizeStore} from '../../store/customizeStore';
import {updateDB} from '../../composables/updateDB'
import { themeStore } from '../../store/themeStore';
import good from '../svg/good.vue';

const theme_ = themeStore()
const {theme} = theme_

const store = customizeStore()
const {blind} = storeToRefs(store)

const customize = () => {
    blind.value = !blind.value
    updateDB(Object.keys({blind})[0], blind.value)
}
</script>