<template>
    <div @click="typeBlindly = !typeBlindly" class="relative">
        <div class="flex w-fit peer">
            <img v-if="typeBlindly" class="h-7" src="/closedEye.svg" alt="">
            <img v-else class="h-7" src="/openEye.svg" alt="">
        </div>
        <div v-if="!getMobileOS()" class="absolute bottom-[-15px] left-[50%] translate-x-[-50%] text-[9px] whitespace-nowrap z-[9] uppercase bg-black px-[3px] invisible peer-hover:visible">blind mode</div>
    </div>
</template>

<script setup>
import { customizeStore } from '../store/customizeStore';
import { storeToRefs } from 'pinia';
import { mainStore } from '../store/mainStore';

const store = mainStore()
const { getMobileOS } = store

const customize = customizeStore()
const { typeBlindly} = storeToRefs(customize)
</script>