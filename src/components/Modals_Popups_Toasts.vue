<template>
    <Cookies />
    <Settings />
    <CustomTestModal />
    <Animate />
    <CapsLockToast top :toggle="toggleCapsToast" text="CapsLock is on, you cannot use it while it is disabled, enable in settings." />
</template>

<script setup>
import Cookies from './Cookies.vue';
import Settings from './Settings/Settings.vue'
import Animate from './Animate.vue';
import CapsLockToast from './Toast.vue';
import CustomTestModal from './CustomTestModal.vue';
import {storeToRefs} from 'pinia'
import {customizeStore} from '../store/customizeStore'

const customize = customizeStore()
const { toggleCapsToast } = storeToRefs(customize)
</script>