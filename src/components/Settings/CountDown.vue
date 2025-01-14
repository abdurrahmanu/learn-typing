<template>
        <div :class="[theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-zinc-200']" class="py-2 pl-5">
            <div class="flex justify-between w-full p-1 border border-transparent rounded-sm ">
                <div @click="timedTyping = !timedTyping" class="flex gap-3 items-center w-fit">
                    <div class="relative w-4 h-4">
                        <input name="countdown" :checked="timedTyping"  type="checkbox" class="appearance-none shadow-sm shadow-black w-4 h-4 peer ring-blue-500 rounded-full hover:ring-[2px] ring-[1px] hover:ring-blue-500" id="">
                        <good />
                    </div>
                    <label class="text-[13px] font-bold uppercase w-fit gap-2 flex items-center">
                        <div>Countdown</div>
                        <PlayTimer v-if="timedTyping" class="inline-block w-5" /> 
                        <PauseTimer v-if="!timedTyping" class="inline-block w-5" />
                        <div class="px-1 text-white leading-normal rounded-full text-[10px]" :class="[!timedTyping ? 'text-[#4d7c0f]' : 'text-[#a16207]']">{{ !timedTyping ? 'easy' : 'medium' }}</div>
                    </label>
                </div>
            </div>
            <p class="px-3 font-[400]">If toggled, countdown tests automatically end of the count, untyped characters are considered errors.</p>
        </div>
</template>

<script setup>
import {storeToRefs} from 'pinia';
import {mainStore} from '../../store/mainStore';
import { themeStore } from '../../store/themeStore';
import PauseTimer from '../svg/pauseTimer.vue';
import PlayTimer from '../svg/playTimer.vue';
import good from '../svg/good.vue';

const theme_ = themeStore()
const {theme} = theme_

const store = mainStore()
const { timedTyping } = storeToRefs(store)
</script>