<template>
    <div class="fixed bottom-3 group whitespace-nowrap left-5 text-slate-600 text-xs hover:text-neutral-200 bg-neutral-900 border rounded-md hover:py-1 px-2 py-[5px] transition-all duration-100 border-neutral-700">
        <span class="font-mono group-hover:hidden text-slate-500">></span>
        <span class="hidden group-hover:inline">{{!hideElements ? 'HIDE' : 'SHOW'}} ELEMENTS</span>
        </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { customizeStore } from '../store/customizeStore';

const customize = customizeStore()
const {hideElements} = storeToRefs(customize)
</script>