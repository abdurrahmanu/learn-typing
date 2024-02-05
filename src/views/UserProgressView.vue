<template>
    <div class="text-white">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur eius temporibus harum ratione excepturi esse quia totam mollitia debitis! Quibusdam?
    </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {typingStore} from '../store/typingStore'
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const store = typingStore()
const {next, customizeSettingsProp, textAlign} = storeToRefs(store)

</script>

<style lang="scss" scoped>
</style>