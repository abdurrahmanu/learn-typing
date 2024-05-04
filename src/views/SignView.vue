<template>
    <div class="flex flex-col items-center h-[100dvh] justify-center space-y-5 ">
        <div class="max-w-fit flex font-mono">
            <p @click="signUp = !signUp" :class="[signUp ? 'text-green-500' : '']" class="hover:bg-neutral-900 border border-transparent hover:border-neutral-600 bg-neutral-700 px-4 py-1 border-r border-r-neutral-600">SIGN UP</p>
            <p @click="signUp = !signUp" :class="[!signUp ? 'text-green-500' : '']" class="hover:bg-neutral-900 border-transparent hover:border-neutral-600 bg-neutral-700 px-4 py-1 border">SIGN IN</p>
        </div>

        <div>
            <p class="text-center text-slate-400 text-xs underline hover:text-white">Forgot Password</p>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'

const signUp = ref(true)
</script>