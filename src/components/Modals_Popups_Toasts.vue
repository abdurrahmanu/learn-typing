<template>
    <CustomTestModal />
    <!-- <Animate /> -->
    <CapsLockToast 
    top 
    :toggle="toggleCapsToast" 
    :text="capsText" />
</template>

<script setup>
import Animate from './Animate.vue';
import CapsLockToast from './Toast.vue';
import CustomTestModal from './CustomTestModal.vue';

const capsText = 'CapsLock is on, you cannot use it while it is disabled, enable in settings.'

import {settingsStore} from '../store/settingsStore'
import {storeToRefs} from 'pinia'

const customize = settingsStore()
const { toggleCapsToast } = storeToRefs(customize)
</script>