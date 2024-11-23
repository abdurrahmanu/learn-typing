<template>
    <div class="p-3 m-auto rounded-sm w-fit max-w-[500px] bg-neutral-900 text-slate-400 space-y-3 text-sm  my-2">
        <p class="text-center">This website uses cookies to enhance your experience by saving your preferred typing settings.</p>
        <div class="flex justify-center hover:text-white">
            <div @click="useCookies = true" class="px-4 ring-[1px] hover:bg-green-500 py-1">ACCEPT COOKIES</div>
            <div @click="useCookies = false" class="px-4 ring-[1px] hover:bg-green-500 py-1">REJECT COOKIES</div>
        </div>
    </div>
</template>

<script setup>
import {cookiesStore} from '../../store/cookiesStore'
import { storeToRefs } from 'pinia';

const cookies = cookiesStore()
const {useCookies} = storeToRefs(cookies)
</script>