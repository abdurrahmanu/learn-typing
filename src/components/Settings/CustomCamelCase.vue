<template>
    <div :class="[theme === 'dark' ? 'hover:bg-neutral-700' : 'hover:bg-slate-100']" class="py-2 pl-5">
        <div  class="flex justify-between w-full p-1 border border-transparent rounded-sm  ">
            <div @click="customize('custom-camel-case', !customizers['custom-camel-case'])" class="flex gap-4 w-fit">
                <input name="camelcase" :checked="customizers['custom-camel-case']" type="checkbox">
                <p class="font-medium w-fit">CusTOm cAMeL caSE</p>
            </div>
        </div>
        <p class="px-3">Randomize the location of Caps and lowercase letters in tests</p>
    </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {customizeStore} from '../../store/customizeStore'
import { themeStore } from '../../store/themeStore';

const theme_ = themeStore()
const {theme} = theme_

const store = customizeStore()
const {customizers} = storeToRefs(store)
const {customize} = store
</script>