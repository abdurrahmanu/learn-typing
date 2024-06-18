<template>
        <div :class="[theme === 'dark' ? 'hover:bg-neutral-700' : 'hover:bg-slate-100']" class="py-2 pl-5">
            <div class="flex justify-between w-full p-1 border border-transparent rounded-sm  ">
                <div @click="timedTyping = !timedTyping" class="flex gap-4 w-fit">
                    <input name="countdown" :checked="timedTyping" type="checkbox">
                    <p class="font-medium w-fit">Countdown Typing</p>
                </div>
            </div>
            <p class="px-3">Play with countdown, tests automatically end at the end of countdown, untyped alphabets are considered as errors</p>
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