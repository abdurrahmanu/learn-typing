<template>
    <div class="p-2 px-1 border-t border-neutral-900 ">
        <div @click="customize('backspace', !customizers['backspace']), enableBackSpace = customizers['backspace']" class="flex justify-between w-full p-1 border border-transparent rounded-sm hover:border-neutral-300">
            <div class="flex gap-4">
                <input :checked="customizers['backspace']"  type="checkbox">
                <p>Backspace</p>
            </div>
        </div>
        <p> PC only, this enables or disables player ability to utilize the backspace key while typing.</p>
    </div>
</template>

<script setup>
import {storeToRefs} from 'pinia';
import {customizeStore} from '../../store/customizeStore';
import { mainStore } from '../../store/mainStore';

const custom = customizeStore()
const { customizers} = storeToRefs(custom)
const {customize} = custom

const main = mainStore()
const {enableBackSpace} = storeToRefs(main)
</script>