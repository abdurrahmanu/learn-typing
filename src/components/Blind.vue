<template>
    <div @click="customize" class="relative">
        <div class="flex w-fit peer">
            <closedEye v-if="settings['blind-mode']" :id="!isMobile() && 'focus'" class="w-5" />
            <openEye v-else :id="!isMobile() && 'focus'" class="w-5" />
        </div>
    </div>
</template>

<script setup>
import closedEye from './svg/closedEye.vue';
import openEye from './svg/openEye.vue';
import { settingsStore } from '../store/settingsStore';
import { isMobile } from '../composables/isMobile';
import { storeToRefs } from 'pinia';

const settingstore = settingsStore()
const {settings} = storeToRefs(settingstore)

const customize = () => {
    settings.value['blind-mode'] = !settings.value['blind-mode']
}
</script>
