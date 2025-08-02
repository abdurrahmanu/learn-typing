<template>
    <div class="text-lg space-y-2">
        <label class="font-bold uppercase w-fit flex items-center">
            <div>{{ name }}</div>
        </label>
        <p class="text-justify">{{ desc }}</p>
    </div>
</template>

<script setup>
defineProps({
    desc: {
        default: null,
        value: String
    },
    name: {
        default: 'Mode',
        value: String
    }
})
</script>