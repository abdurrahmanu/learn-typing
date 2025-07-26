<template>
    <div class="text-lg space-y-2">
        <label class="font-bold uppercase w-fit flex items-center">
            <div>{{ name }}</div>
            <div class="px-3 leading-normal rounded-full text-[10px] text-green-500">easy</div>
        </label>
        <p>{{ desc }}</p>
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