<template>
    <Cookies />
    <Settings />
    <CustomTestModal />
    <!-- <Animate /> -->
    <CapsLockToast 
    top 
    :toggle="toggleCapsToast" 
    :text="capsText" />
</template>

<script setup>
import Cookies from './Cookies.vue';
import Settings from './Settings/Settings.vue'
import Animate from './Animate.vue';
import CapsLockToast from './Toast.vue';
import CustomTestModal from './CustomTestModal.vue';

const capsText = 'CapsLock is on, you cannot use it while it is disabled, enable in settings.'

import {customizeStore} from '../store/customizeStore'
import {storeToRefs} from 'pinia'

const customize = customizeStore()
const { toggleCapsToast } = storeToRefs(customize)
</script>