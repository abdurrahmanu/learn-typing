<template>
    <div v-if="!hasCompletedSession" class="fixed bottom-3 group whitespace-nowrap left-5 text-slate-600 text-xs hover:text-neutral-200 bg-neutral-900 border rounded-md hover:py-1 px-2 py-[5px] transition-all duration-100 border-neutral-700 items-center space-x-1">
        <span class="hidden group-hover:inline">{{!hideElements ? 'HIDE' : 'SHOW'}} ELEMENTS</span>
        <RightArrow class="w-4 h-fit inline" />
        </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { customizeStore } from '../store/customizeStore';
import RightArrow from './svg/RightArrow.vue'
import {mainStore} from '../store/mainStore'

const main = mainStore()
const { hasCompletedSession } = storeToRefs(main)

const customize = customizeStore()
const {hideElements} = storeToRefs(customize)

</script>