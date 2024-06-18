<template>
    <div :class="[theme === 'dark' ? 'hover:bg-neutral-700' : 'hover:bg-slate-100']" class="py-2 pl-5">
        <div class="flex justify-between w-full p-1 border border-transparent rounded-sm ">
            <div @click="customize('backspace', !customizers['backspace']), enableBackSpace = customizers['backspace']" class="flex gap-4 w-fit">
                <input name="backspace" :disabled="getMobileOS() ? true : false" :checked="getMobileOS() ? true :customizers['backspace']"  type="checkbox">
                <p class="font-medium w-fit">Backspace</p>
            </div>
        </div>
        <p v-if="getMobileOS()"  class="px-3">**Cannot be disabled on Mobile devices</p>
        <p  class="px-3">This enables or disables player ability to utilize the backspace key while typing.</p>
    </div>
</template>

<script setup>
import {storeToRefs} from 'pinia';
import {customizeStore} from '../../store/customizeStore';
import { mainStore } from '../../store/mainStore';
import { getMobileOS } from '../../composables/getMobileOS';
import { themeStore } from '../../store/themeStore';

const theme_ = themeStore()
const {theme} = theme_

const custom = customizeStore()
const { customizers} = storeToRefs(custom)
const {customize} = custom

const main = mainStore()
const {enableBackSpace} = storeToRefs(main)
</script>