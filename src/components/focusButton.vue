<template>
    <div id="focus" v-if="(isTouchScreenDevice() && !focus) || refocus" class="flex mx-auto text-[16px] bg-transparent w-fit whitespace-nowrap">
        <p class="blur-[1px] flex items-center" v-if="isMobile()">Click <upwardsFinger class="w-5" /> test to focus</p>
        <p class="absolute top-[100px] font-bold left-[50%] translate-x-[-50%]" v-if="isTouchScreenDevice() && !isMobile()">Click test or press any key to focus </p>
        <p class="absolute top-[100px] font-bold left-[50%] translate-x-[-50%]" v-if="!isTouchScreenDevice()">Press any key to focus</p>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import upwardsFinger from './svg/upwardsFinger.vue';
import { isTouchScreenDevice } from '../composables/isTouchScreenDevice';
import { isMobile } from '../composables/isMobile';
import { typingStateStore } from '../store/typingStateStore';

const typingstatestore = typingStateStore()
const {refocus, focus} = storeToRefs(typingstatestore)
</script>

