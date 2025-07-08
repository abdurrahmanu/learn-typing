<template>
    <input 
    class=""
    ref="inputEl"
    type="text">
    <!-- class="max-w-[1px] outline-none appearance-none z-[-1] opacity-0 max-h-[1px]" -->
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { typingStateStore } from '../store/typingStateStore';

const typingstatestore = typingStateStore()
const {inputEl} = storeToRefs(typingstatestore)
</script>
