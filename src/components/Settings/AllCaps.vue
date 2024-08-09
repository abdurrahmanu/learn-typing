<template>
    <div :class="[theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-slate-100']" class="py-2 pl-5">
        <div  class="flex justify-between w-full p-1 border border-transparent rounded-sm ">
            <div @click="customizers['all-caps'] = !customizers['all-caps'], customize('all-caps', customizers['all-caps'])" class="flex gap-4 w-fit">
                <input name="caps" :checked="customizers['all-caps']" type="checkbox">
                <label class="font-medium w-fit">All Caps</label>
            </div>
        </div>
        <p class="px-3">All tests will be converted to CAPS</p>
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
