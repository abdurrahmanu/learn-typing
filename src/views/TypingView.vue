<template>
    <TypingContainerComponent 
    @sessionCompleted="$emit('sessionCompleted')"
    :textAlign="textAlign" 
    :customizeSettingsProp="customizeSettingsProp" 
    :next="next" />
</template>

<script setup>
import { defineProps, watch, watchEffect, defineEmits } from 'vue';
import TypingContainerComponent from '@/components/typingContainerComponent.vue';

const emit = defineEmits(['sessionCompleted'])
const props = defineProps({
    next: Boolean,
    customizeSettingsProp: Array,
    textAlign: Boolean,
})

</script>