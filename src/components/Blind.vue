<template>
    <div @click="customize" class="relative">
        <div class="flex w-fit peer">
            <closedEye v-if="blind" class="w-5" />
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
const {blind} = storeToRefs(custom)
const localStorageSettings = ref(JSON.parse(localStorage.getItem('kiboard')))

const customize = () => {
    blind.value = !blind.value
    localStorageSettings.value.blind = blind.value
    localStorage.setItem('kiboard', JSON.stringify(localStorageSettings.value))
}
</script>