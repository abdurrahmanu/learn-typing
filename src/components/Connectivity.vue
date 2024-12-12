<template>
    <div v-if="!isOnline" class="text-sm text-center text-white bg-orange-700 py-2">You are offline</div>
</template>

<script setup>
import { connectStore } from '../store/connectStore';
import { storeToRefs } from 'pinia';

const connect = connectStore()
const {isOnline} = storeToRefs(connect)
</script>