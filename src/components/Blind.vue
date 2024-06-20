<template>
    <div @click="customize" class="relative">
        <div class="flex w-fit peer">
            <closedEye v-if="customizers['blind-mode']" class="w-5" />
            <openEye v-else class="w-5" />
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
const { customizers, disableOption, isBlindMode} = storeToRefs(custom)
const localStorageSettings = ref(JSON.parse(localStorage.getItem('dorayi-typing')))

const customize = () => {
    customizers.value['blind-mode'] = !customizers.value['blind-mode']
    isBlindMode.value = customizers.value['blind-mode']
    localStorageSettings.value.config = [customizers.value, disableOption.value]
    localStorage.setItem('dorayi-typing', JSON.stringify(localStorageSettings.value))
}
</script>