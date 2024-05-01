<template>
    <div @click="typeBlindly = !typeBlindly" class="relative">
        <div class="flex w-fit peer">
            <closedEye v-if="typeBlindly" class="h-7" />
            <openEye v-else class="h-7" />
        </div>
    </div>
</template>

<script setup>
import closedEye from './svg/closedEye.vue';
import openEye from './svg/openEye.vue';
import { customizeStore } from '../store/customizeStore';
import { storeToRefs } from 'pinia';
import { mainStore } from '../store/mainStore';

const store = mainStore()
const { getMobileOS } = store

const customize = customizeStore()
const { typeBlindly} = storeToRefs(customize)
</script>