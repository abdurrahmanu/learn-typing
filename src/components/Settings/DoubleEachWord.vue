<template>
    <div :class="[theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-zinc-200']" class="py-2 pl-5">
        <div  class="flex justify-between w-full p-1 border border-transparent rounded-sm ">
            <div @click="customize" class="flex gap-3 items-center w-fit">
                <div class="relative w-4 h-4">
                    <input name="double" :checked="doubleEachWord"  type="checkbox" class="appearance-none shadow-sm shadow-black w-4 h-4 peer border-blue-500 rounded-full hover:ring-[2px] ring-[1px] hover:ring-blue-500" id="">
                    <good />
                </div>
                <label class="text-[13px] font-bold uppercase w-fit flex items-center">
                    <div>Double every word</div>
                    <div class="px-3 text-white leading-normal rounded-full text-[10px]" :class="[doubleEachWord ? 'text-yellow-700' : 'text-lime-700']">{{ doubleEachWord ? 'medium' : 'easy' }}</div>
                </label>
            </div>
        </div>
        <p class="px-3 font-[400]">Toggle to repeat every word twice. Can only work with spaced test.</p>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import {storeToRefs} from 'pinia'
import {customizeStore} from '../../store/customizeStore'
import { themeStore } from '../../store/themeStore';
import {updateDB} from '../../composables/updateDB'
import good from '../svg/good.vue';

const theme_ = themeStore()
const {theme} = theme_

const store = customizeStore()
const {doubleEachWord} = storeToRefs(store)

const customize = () => {
    doubleEachWord.value = !doubleEachWord.value
    updateDB(Object.keys({doubleEachWord})[0], doubleEachWord.value)
}
</script>
