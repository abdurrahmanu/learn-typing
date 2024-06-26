<template>
    <div class="max-w-[800px] m-auto min-h-[calc(100dvh_-_75px)] overflow-y-auto pt-6">
        <div class="pt-10 m-auto font-mono font-normal w-fit">
            <div class="relative m-auto font-mono font-medium cursor-default w-fit h-fit">
                    <span class="absolute top-0 left-[50%] translate-x-[-50%] text-sm font-bold"><span class="hover:text-red-500">K</span><span class="hover:text-green-500">E</span><span class="hover:text-blue-500">Y</span></span>
                    <board class="w-9"/>
                </div>
            <p class="pt-3 m-auto text-center w-fit">IS A TYPING APP CREATED BY AHMED ABDULRAHMAN</p>
            <div class="justify-center flex max-w-[700px] gap-5 m-auto py-5 pt-10 flex-wrap text-sm">
                <div class="px-2 py-[1px] border-gray-500 border rounded-sm transition-all duration-100 hover:shadow-md hover:border-green-500 flex items-center gap-2"><github class="w-4" /> GITHUB</div>
                <div class="px-2 py-[1px] border-gray-500 border rounded-sm transition-all duration-100 hover:shadow-md hover:border-green-500 flex items-center gap-2"><linkedin class="w-6" /> LINKEDIN</div>
                <div class="px-2 py-[1px] border-gray-500 border rounded-sm transition-all duration-100 hover:shadow-md hover:border-green-500 flex items-center gap-2"><email class="w-4" /> EMAIL</div>
                <div class="px-2 py-[1px] border-gray-500 border rounded-sm transition-all duration-100 hover:shadow-md hover:border-green-500 flex items-center gap-2"><resume class="w-4" /> RESUME</div>
            </div>
        </div>
        <div class="m-auto font-normal w-fit">
            <p class="pb-5 text-center underline">CREDITS</p>
            <p class="pb-5 text-center underline">SUPPORTERS</p>
            <p class="pb-5 text-center underline">CONTRIBUTORS</p>
        </div>
    </div>
</template>

<script setup>
import board from '../components/svg/board.vue';
import resume from '../components/svg/resume.vue';
import email from '../components/svg/email.vue';
import linkedin from '../components/svg/linkedin.vue';
import github from '../components/svg/github.vue';
</script>
