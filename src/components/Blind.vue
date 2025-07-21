<template>
    <div @click="customize" class="relative">
        <div class="flex w-fit peer">
            <closedEye v-if="blind" id="focus" class="w-5" />
            <openEye v-else id='focus' class="w-5" />
        </div>
    </div>
</template>

<script setup>
import closedEye from './svg/closedEye.vue';
import openEye from './svg/openEye.vue';
import { customizeStore } from '../store/customizeStore';
import { storeToRefs } from 'pinia';

const customizestore = customizeStore()
const {blind, settingsToUpdate} = storeToRefs(customizestore)

const customize = () => {
    blind.value = !blind.value
    settingsToUpdate.value.push({
        name: Object.keys({blind})[0],
        value: blind.value
    })
}
</script>
