<script setup>
const props = defineProps({
    color: String
})
</script>

<template>
    <div class="animate-spin inline-block border-[6px] border-green-500 border-current border-t-transparent rounded-full" role="status" aria-label="loading"></div>
</template>