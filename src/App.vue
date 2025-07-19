<template>
  <Loader v-if="isConnectingServer" />
  <Main v-else />
</template>

<script setup>
import Main from './components/Main.vue'
import Loader from './components/Loader.vue'
import {onBeforeMount} from 'vue'
import { storeToRefs } from 'pinia';
import {connectStore} from './store/connectStore'
import { DB } from './composables/connectDB';

const connect = connectStore()
const {isConnectingServer} = storeToRefs(connect)

onBeforeMount(() => DB())
</script>

<style scoped>
.noscrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none
}
</style>