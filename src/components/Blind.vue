<template>
    <div @click="customize" class="relative">
        <div class="flex w-fit peer">
            <closedEye v-if="customizers['blind-mode']" class="h-7" />
            <openEye v-else class="h-7" />
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import closedEye from './svg/closedEye.vue';
import openEye from './svg/openEye.vue';
import { customizeStore } from '../store/customizeStore';
import { storeToRefs } from 'pinia';

const custom = customizeStore()
const { customizers, disableOption} = storeToRefs(custom)
const localStorageSettings = ref(JSON.parse(localStorage.getItem('dorayi-typing')))

const customize = () => {
    customizers.value['blind-mode'] = !customizers.value['blind-mode']
    localStorageSettings.value.config = [customizers.value, disableOption.value]
    localStorage.setItem('dorayi-typing', JSON.stringify(localStorageSettings.value))
}
</script>