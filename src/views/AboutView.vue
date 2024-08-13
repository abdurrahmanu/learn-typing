<template>
    <div class="max-w-[800px] m-auto min-h-[calc(100dvh_-_80px)] overflow-y-auto relative font-[400]">
        <div class="m-auto w-fit top-[15px] relative scale-125">                
            <Logo />
        </div>
        <p class="text-center text-[50px] leading-0 opacity-90 blur-[1px]">KiBoard</p>
        <div class="m-auto  font-normal w-fit z-[-1] text-sm border border-slate-500 p-1 border-x-0">
            <p class="m-auto text-center w-fit">A TYPING WEB APP DESIGNED AND DEVELOPED</p>
            <p class="m-auto text-center w-fit">BY</p>
            <p class="m-auto font-semibold text-center w-fit">AHMED ABDULRAHMAN</p>
        </div>
        <div>            
            <p class="p-2 pb-1 text-center underline">CONTACT ME</p>
            <div class="justify-center flex max-w-[700px] gap-5 m-auto py-5 pt-2 flex-wrap text-sm">
                <!-- <div @click="name='github'" class="px-2 py-[1px] border-gray-500 border rounded-sm transition-all duration-100 hover:shadow-md hover:border-green-500 flex items-center gap-2"><github class="w-4" /> GITHUB</div>
                <div @click="name='linkedin'" class="px-2 py-[1px] border-gray-500 border rounded-sm transition-all duration-100 hover:shadow-md hover:border-green-500 flex items-center gap-2"><linkedin class="w-6" /> LINKEDIN</div> -->
                <div @click="name='email'" class="px-2 py-[1px] border-gray-500 border rounded-sm transition-all duration-100 hover:shadow-md hover:border-green-500 flex items-center gap-2"><email class="w-4" />EMAIL</div>
            </div>
        </div>
        <div class="m-auto text-sm font-normal w-fit">
            <p class="pb-2 text-center underline">CREDITS</p>
            <p @click="name='portfolio'" class="pb-6 text-center hover:underline">Ahmed Abdulrahman</p>
            <p class="pb-5 text-center underline">SUPPORTERS</p>
            <p class="pb-6 text-center">---</p>
            <p class="pb-5 text-center underline">CONTRIBUTORS</p>
            <p class="text-center">---</p>
        </div>
    </div>
</template>

<script setup>
import {ref, watch} from 'vue'
import Logo from '../components/Logo.vue'
import email from '../components/svg/email.vue';
import linkedin from '../components/svg/linkedin.vue';
import github from '../components/svg/github.vue';

const toggle = ref(false)
const name = ref('')

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
