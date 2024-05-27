<template>
    <Transition appear mode="in-out">
        <div v-if="firstLoad" class="absolute bottom-[0] left-[50%] translate-x-[-50%] px-5 py-2 border rounded-md border-neutral-500">
            <p class="py-3 text-sm text-center">ALLOW COOKIES</p>
            <div class="flex gap-2 font-mono max-w-fit">
                <p class="px-4 border rounded-sm hover:border-green-500">ALLOW</p>
                <p class="px-4 border rounded-sm hover:border-red-500">REJECT</p>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import {ref} from 'vue'
import { mainStore } from '../store/mainStore';
import { storeToRefs } from 'pinia';

const main = mainStore()
const { firstLoad } = storeToRefs(main)
</script>

<style scoped>
.v-enter-from {
    transform: translateY(400px);
}

.v-leave-to {
    transform: translateY(-100%);
}

.v-leave-active,
.v-enter-active {
    transition: all .4 ease;
}
</style>