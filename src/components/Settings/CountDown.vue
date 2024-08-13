<template>
        <div :class="[theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-slate-100']" class="py-2 pl-5">
            <div class="flex justify-between w-full p-1 border border-transparent rounded-sm ">
                <div @click="timedTyping = !timedTyping" class="flex gap-4 w-fit">
                    <input name="countdown" :checked="timedTyping" type="checkbox" class="accent-green-500">
                    <label class="text-sm font-medium w-fit">
                        <span>Countdown</span> 
                        <PlayTimer v-if="timedTyping" class="inline-block w-5 mx-2" /> 
                        <PauseTimer v-if="!timedTyping" class="inline-block w-5 mx-2" />
                        <span v-if="timedTyping" class="px-3 text-white uppercase rounded-full text-[10px] bg-yellow-800 ml-1 py-[1px] relative bottom-[2px]">medium</span>
                        <span v-else class="px-3 text-white uppercase rounded-full text-[10px] bg-lime-600 ml-1 py-[1px] relative bottom-[2px]">easy</span>
                    </label>
                </div>
            </div>
            <p class="px-3 font-[400]">Tests automatically end at the end of countdown, untyped characters are considered as mistakes.</p>
        </div>
</template>

<script setup>
import {storeToRefs} from 'pinia';
import {mainStore} from '../../store/mainStore';
import { themeStore } from '../../store/themeStore';
import PauseTimer from '../svg/pauseTimer.vue';
import PlayTimer from '../svg/playTimer.vue';

const theme_ = themeStore()
const {theme} = theme_

const main = mainStore()
const { timedTyping } = storeToRefs(main)
</script>