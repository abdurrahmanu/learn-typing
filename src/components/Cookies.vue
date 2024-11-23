<template>
    <div></div>
    <div v-if="showCookiesModal" :class="[]" class="fixed p-3 m-auto rounded-sm w-fit max-w-[500px] bg-neutral-900 text-slate-400 space-y-3 text-sm left-[50%] translate-x-[-50%]">
        <p class="text-center">This website uses cookies to enhance your experience by saving your preferred typing settings.</p>
        <div class="flex justify-center hover:text-white">
            <div @click="useCookies = true" class="px-4 ring-[1px] hover:bg-green-500 py-1 whitespace-nowrap">ACCEPT COOKIES</div>
            <div @click="useCookies = false" class="px-4 ring-[1px] hover:bg-green-500 py-1 whitespace-nowrap">REJECT COOKIES</div>
        </div>
    </div>
</template>

<script setup>
import {watch, ref} from 'vue'
import {localStorageConfig} from  '../composables/getLocalStorageConfig'
import { customizeStore } from '../store/customizeStore';
import {cookiesStore} from '../store/cookiesStore'
import { storeToRefs } from 'pinia';

const cookies = cookiesStore()
const {useCookies, showCookiesModal} = storeToRefs(cookies)

const customize = customizeStore()
const {cookies_, pauseTyping} = storeToRefs(customize)

watch(useCookies, newVal => {
    localStorage.setItem('kiboardcookies', newVal ? 'yes' : 'no')
    cookies_.value = newVal
    showCookiesModal.value = false
    localStorageConfig()

    if (!newVal) {
        localStorage.removeItem('kiboard')
    }
    console.log(useCookies.value);
})

watch(showCookiesModal, newVal => {
    if (newVal) {
        pauseTyping.value = true
    } else {
        pauseTyping.value = false
    }
})
</script>