<template>
    <div class="max-w-[600px] bg-neutral-700 text-white dark:bg-neutral-800 p-4 px-6">
        <p class="p-3 text-center uppercase md:text-lg">THIS WILL OPEN {{ site }} IN A NEW TAB </p>
        <div class="flex gap-10 p-1 m-auto w-fit">
            <div class="text-center">
                <button @click="$emit('toggle', true)" class="px-6 rounded-full p-[2px] text-white bg-green-500">YES</button>
            </div>
            <div class="text-center">
                <button @click="$emit('toggle', false)" class="px-6 rounded-full p-[2px] text-white bg-red-400">NO</button>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    site: String,
})
</script>