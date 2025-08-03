<template>
    <div class="space-y-2 text-[15px]">
        <label class="font-bold uppercase w-fit flex items-center">
            <div>{{ name }}</div> 
        </label>
        <p class="text-justify pb-2">{{ desc }}</p>
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