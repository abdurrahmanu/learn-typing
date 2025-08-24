<template>
    <div class="space-y-1 md:w-[57%] px-3">
        <label :class="[mobile ? 'text-sm' : 'text-base']" class="font-bold uppercase w-fit flex items-center">
            <div>{{ name }}</div>
        </label>
        <p v-if="desc.length" class="text-justify text-[17px] leading-7 font-extralight">{{ desc }}</p>
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
