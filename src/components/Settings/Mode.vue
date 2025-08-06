<template>
    <div class="text-[16px]">
        <label class="font-bold uppercase w-fit flex items-center">
            <div>{{ name }}</div> 
        </label>
        <p class="text-justify max-w-[700px] leading-7">{{ desc }}</p>
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