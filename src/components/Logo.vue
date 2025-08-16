<template>
    <div class="relative cursor-default w-fit h-fit p-[1px]">
        <span class="absolute top-0 left-[50%] translate-x-[-50%] text-[9px] font-black pt-[1px]"><span class="hover:text-green-500">K</span><span class="hover:text-blue-500">I</span></span>
        <board :class="[mobile ? 'w-5' : 'w-6']" />
    </div>
</template>

<script setup>
const mobile = isMobile()
</script>



















































