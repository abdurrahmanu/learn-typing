<template>
    <div class="p-2 px-1 border-t border-neutral-900">
        <div @click="customize('no-space', !customizers['no-space'])" class="flex justify-between w-full p-1 border border-transparent rounded-sm hover:border-neutral-300 ">
            <div class="flex gap-4">
                <input name="nospace" :checked="customizers['no-space']" type="checkbox">
                <p>NoSpace</p>
            </div>
        </div>
        <p class="px-3">All white spaces are cleared between words</p>
    </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {customizeStore} from '../../store/customizeStore'

const store = customizeStore()
const {customizers} = storeToRefs(store)
const {customize} = store
</script>








