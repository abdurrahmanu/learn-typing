<template>
    <div class="px-1 border-t border-neutral-900 p-2 hover:bg-neutral-900">
        <div class="flex justify-between p-1 border border-transparent rounded-sm hover:border-neutral-300 text-zinc-300 w-full">
            <div class="flex gap-4">
                <input :checked="allCaps" @click="allCaps = !allCaps" type="checkbox">
                <p>All Caps</p>
            </div>
            <div class="font-mono">></div>
        </div>
        <p class="text-zinc-400">All texts and quotes will be converted to Uppercase</p>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>