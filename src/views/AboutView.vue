<template>
    <Teach v-if="demo" />
    <div v-else class="max-w-[800px] pt-40 m-auto overflow-y-auto relative font-[400] min-h-[calc(100dvh_-_200px)] space-y-5">
        <p class="m-auto text-lg text-center w-fit">DEVELOPED BY AHMED ABDULRAHMAN</p>
        <div class="text-center text-lg text-slate-500"><div class="text-3xl">⚠️</div> This website is still under development. Please share your feedback to help make it better.</div>
        <div class="flex gap-5 w-fit m-auto">
            <!-- <div @click="demo = true, pauseTyping = true" class="m-auto w-fit font-medium border-[1px] border-gray-500 hover:border-green-600 px-6 py-[1px] opacity-80 shadow-sm cursor-pointer text-center">HELP</div> -->
            <div @click="name='email'" class="px-2 py-[1px] border-gray-500 border rounded-sm m-auto flex items-center gap-2 w-fit hover:border-green-500"><email class="w-4" />EMAIL</div>
        </div>
    </div>
</template>

<script setup>
import {ref, watch} from 'vue'
import Teach from '../components/Teach.vue';
import email from '../components/svg/email.vue';
import { mainStore } from '../store/mainStore';
import { storeToRefs } from 'pinia';

const toggle = ref(false)
const name = ref('')

const store = mainStore()
const {demo} = storeToRefs(store)

watch(name, (newVal) => {
    if (newVal) {
        if (newVal === 'email') {
            window.open(`mailto:ahmadabdulrahman103@gmail.com`)
        }
        if (newVal === 'github') {
            window.open('https://github.com/abdurrahmanu', '_blank')
        }
        if (newVal === 'linkedin') {
            window.open('https://linkedin.com/in/ahmed-abdulrahman-dorayi', '_blank')
        }
        if (newVal === 'portfolio') {
            // window.open('https://abduldorayi.netlify.app')
        }
    } 
    else {
        toggle.value = false
    }
})
</script>