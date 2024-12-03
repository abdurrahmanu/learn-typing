<template>
    <div @click="customize" class="relative">
        <div class="flex w-fit peer">
            <closedEye v-if="blind" class="w-5" />
            <openEye v-else class="w-5" />
        </div>
    </div>
</template>

<script setup>
import closedEye from './svg/closedEye.vue';
import openEye from './svg/openEye.vue';
import { customizeStore } from '../store/customizeStore';
import { storeToRefs } from 'pinia';
import {updateDB} from '../composables/updateDB'

const custom = customizeStore()
const {blind} = storeToRefs(custom)

const customize = () => {
    blind.value = !blind.value
    updateDB(Object.keys({blind})[0], blind.value)
}
</script>