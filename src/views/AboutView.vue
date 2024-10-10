<template>
    <div class="max-w-[800px] m-auto min-h-[calc(100dvh_-_90px)] overflow-y-auto relative font-[400] space-y-4">
        <div class="m-auto w-fit top-[15px] relative scale-125">                
            <Logo />
        </div>
        <p class="text-center text-[30px] leading-0 opacity-95 blur-[1px] roboto-mono exo-ital pt-2">KiBoard</p>
        <div class="m-auto max-w-[400px] z-[-1] text-sm border border-neutral-800 p-1 border-x-0 settings-font py-3">
            <p class="m-auto text-center w-fit">DESIGNED AND DEVELOPED</p>
            <p class="m-auto text-center w-fit">BY</p>
            <p class="m-auto text-center w-fit font-bold">ABDULRAHMAN</p>
        </div>
        <div class="p-1 m-auto border-b border-neutral-800 max-w-[400px]">  
            <p class="p-2 pb-1 font-bold text-center underline">CONTACT ME</p>
            <div class="justify-center flex max-w-[700px] gap-5 m-auto py-5 pt-2 flex-wrap text-sm">
                <!-- <div @click="name='github'" class="px-2 py-[1px] border-gray-500 border rounded-sm transition-all duration-100 hover:shadow-md hover:border-green-500 flex items-center gap-2"><github class="w-4" /> GITHUB</div>
                <div @click="name='linkedin'" class="px-2 py-[1px] border-gray-500 border rounded-sm transition-all duration-100 hover:shadow-md hover:border-green-500 flex items-center gap-2"><linkedin class="w-6" /> LINKEDIN</div> -->
                <div @click="name='email'" class="px-2 py-[1px] border-gray-500 border rounded-sm transition-all duration-100 hover:shadow-md hover:border-green-500 flex items-center gap-2 pacifico text-xs"><email class="w-4" />EMAIL</div>
            </div>
        </div>
        <div class="flex flex-wrap justify-between py-4 m-auto text-sm font-normal min-w-fit max-w-[500px] gap-y-5">
            <!-- <div class="m-auto w-fit min-w-[130px]">
                <p class="font-bold text-center underline">SUPPORTERS</p>
                <p class="text-center ">---</p>
            </div> -->
            <div class="m-auto w-fit min-w-[130px]">                
                <p class="mb-1 font-bold text-center underline">CREDITS</p>
                <p @click="name='portfolio'" class="text-2xl text-center hover:underline caveat">Ahmed Abdulrahman</p>
            </div>
            <!-- <div class="m-auto w-fit min-w-[130px]">                
                <p class="mb-1 font-bold text-center underline">CONTRIBUTORS</p>
                <p class="text-center">---</p>
            </div> -->
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
