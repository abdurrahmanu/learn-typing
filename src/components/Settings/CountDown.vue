<template>
        <div :class="[theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-slate-100']" class="py-2 pl-5">
            <div class="flex justify-between w-full p-1 border border-transparent rounded-sm ">
                <div @click="timedTyping = !timedTyping" class="flex gap-4 w-fit">
                    <input name="countdown" :checked="timedTyping" type="checkbox">
                    <label class="text-sm font-medium w-fit">Countdown Typing </label> <!-- <span class="px-3 text-white uppercase font-mono rounded-full py-[1px] text-[12px] bg-yellow-800 ml-1">medium</span> -->
                </div>
            </div>
            <p class="px-3 font-[400]">Play with countdown, tests automatically end at the end of countdown, untyped alphabets are considered as errors</p>
        </div>
</template>

<script setup>
import {storeToRefs} from 'pinia';
import {mainStore} from '../../store/mainStore';
import { themeStore } from '../../store/themeStore';

const theme_ = themeStore()
const {theme} = theme_

const main = mainStore()
const { timedTyping} = storeToRefs(main)
</script>