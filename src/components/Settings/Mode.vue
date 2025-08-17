<template>
    <div class="space-y-1">
        <label :class="[mobile ? 'text-sm' : 'text-[18px]']" class="font-bold uppercase w-fit flex items-center">
            <div>{{ name }}</div> 
        </label>
        <p v-if="desc.length" :class="[mobile ? 'text-base' : 'text-[23px]']" class="text-justify leading-10">{{ desc }}</p>
    </div>
</template>

<script setup>
const mobile = isMobile()

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