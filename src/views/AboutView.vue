<template>
    <div class="max-w-[800px] m-auto min-h-[calc(100dvh_-_90px)] overflow-y-auto relative font-[400] space-y-4">
        <div class="p-3 mt-1 rounded-sm space-y-4 ring w-fit m-auto hover:ring-green-600 group">
            <div class="m-auto w-fit top-[15px] relative scale-125">                
                <Logo />
            </div>
            <p class="text-center text-[30px] leading-0 opacity-95 roboto-mono exo-ital"><span class="group-hover:text-blue-500">Ki</span><span class="group-hover:text-green-500">Board</span></p>
        </div>
        <p class="m-auto text-center w-fit exo hover: text-sm caveat">DESIGNED AND DEVELOPED BY AHMED ABDULRAHMAN</p>
        <div @click="name='email'" class="px-2 py-[1px] border-gray-500 border rounded-sm transition-all duration-100 hover:shadow-md m-auto hover:border-green-500 flex items-center gap-2 pacifico text-xs w-fit hover:px-5"><email class="w-4" />EMAIL</div>
        <div @click="demo = true, pauseTyping = true" :class="[demo ? 'hidden' : '']" class="mt-8 m-auto w-fit font-medium caveat hover:animate-none transition-all duration-500 hover:px-20 ring-[1px] ring-green-500 px-10 py-1 opacity-50 shadow-sm cursor-pointer hover:shadow-green-500 text-center hover:shadow-md hover:opacity-100">HELP</div>
    </div>
</template>

<script setup>
import {ref, watch} from 'vue'
import Logo from '../components/Logo.vue'
import email from '../components/svg/email.vue';
import linkedin from '../components/svg/linkedin.vue';
import github from '../components/svg/github.vue';
import { customizeStore } from '../store/customizeStore';
import { mainStore } from '../store/mainStore';
import { storeToRefs } from 'pinia';

const toggle = ref(false)
const name = ref('')

const customize = customizeStore()
const {pauseTyping } = storeToRefs(customize)

const main = mainStore()
const {demo} = storeToRefs(main)

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
