<template>
    <div class="fixed w-full bottom-0 py-2 flex flex-col items-center space-y-5">
        <div class="w-fit mx-auto flex gap-10 flex-wrap justify-center">        
            <Next />     
        </div>
        <Theme />
    </div>
</template>

<script setup>
import Theme from './Theme.vue';
import Next from './Next.vue'
</script>