<template>
    <div @click="customize" class="relative">
        <div class="flex w-fit peer">
            <closedEye v-if="customizers['blind-mode']" class="h-7" />
            <openEye v-else class="h-7" />
        </div>
    </div>
</template>

<script setup>
import closedEye from './svg/closedEye.vue';
import openEye from './svg/openEye.vue';
import { customizeStore } from '../store/customizeStore';
import { storeToRefs } from 'pinia';

const custom = customizeStore()
const { customizers, disableOption} = storeToRefs(custom)

const customize = () => {
    customizers.value['blind-mode'] = !customizers.value['blind-mode']

    localStorage.setItem('dorayi-typing-preferred-config', JSON.stringify([customizers.value, disableOption.value]))
}
</script>