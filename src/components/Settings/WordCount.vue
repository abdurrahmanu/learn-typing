<template>
    <div :class="[theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-zinc-200']" class="py-2 pl-5">
        <div class="flex justify-between w-full p-1 border border-transparent rounded-sm ">
            <div @click="customize"  class="gap-4 w-fit">
                <input name="count" :checked="count"  type="checkbox" class="checked:accent-green-500 hover:accent-green-700" id="">
                <label class="text-[15px] font-bold uppercase w-fit pl-3">
                    <span>Word Count</span>
                    <span v-if="!count" class="px-3 text-white uppercase rounded-full text-[10px] bg-lime-800 ml-1 py-[1px] relative bottom-[2px]">easy</span>
                    <span v-else class="px-3 text-white uppercase rounded-full text-[10px] bg-yellow-800 ml-1 py-[1px] relative bottom-[2px]">medium</span>
                </label>
            </div>
        </div>
        <p class="px-3 font-[400]">Toggle to include word count. (typed words/total words). Only available for spaced words </p>
    </div>
</template>

<script setup>
import {storeToRefs} from 'pinia';
import {customizeStore} from '../../store/customizeStore';
import {updateDB} from '../../composables/updateDB'
import { themeStore } from '../../store/themeStore';

const theme_ = themeStore()
const {theme} = theme_

const store = customizeStore()
const {count} = storeToRefs(store)

const customize = () => {
count.value = !count.value
updateDB(Object.keys({count})[0], count.value)
}
</script>
