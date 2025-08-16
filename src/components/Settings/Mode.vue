<template>
    <div class="space-y-2">
        <label class="font-bold uppercase w-fit flex items-center">
            <div>{{ name }}</div> 
        </label>
        <p v-if="desc.length" class="text-justify leading-10">{{ desc }}</p>
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