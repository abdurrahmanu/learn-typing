<template>
    <div class="p-2 px-1 border-t border-neutral-900">
        <div @click="customize('all-caps', !customizers['all-caps'])"  class="flex justify-between w-full p-1 border border-transparent rounded-sm hover:border-neutral-300">
            <div class="flex gap-4">
                <input name="caps" :checked="customizers['all-caps']" type="checkbox">
                <p>All Caps</p>
            </div>
        </div>
        <p class="px-3">All texts and quotes are converted to CAPS</p>
    </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {customizeStore} from '../../store/customizeStore'

const store = customizeStore()
const {customizers} = storeToRefs(store)
const {customize} = store
</script>
