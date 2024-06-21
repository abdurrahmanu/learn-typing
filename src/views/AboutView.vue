<template>
    <div class="max-w-[800px] m-auto min-h-[calc(100dvh_-_75px)] overflow-y-auto">
        <div class="w-fit font-normal m-auto pt-10 font-mono">
            <div class="font-mono font-medium cursor-default w-fit h-fit relative m-auto">
                    <span class="absolute top-0 left-[50%] translate-x-[-50%] text-sm font-bold"><span class="hover:text-red-500">K</span><span class="hover:text-green-500">E</span><span class="hover:text-blue-500">Y</span></span>
                    <board class="w-9"/>
                </div>
            <p class="pt-3 w-fit m-auto">IS A TYPING APP CREATED BY AHMED ABDULRAHMAN</p>
            <div class="justify-center flex max-w-[700px] gap-5 m-auto py-5 pt-10 flex-wrap">
                <div class="px-3 py-[2px] border-gray-500 border rounded-sm transition-all duration-100 hover:shadow-md hover:border-green-500">GITHUB</div>
                <div class="px-3 py-[2px] border-gray-500 border rounded-sm transition-all duration-100 hover:shadow-md hover:border-green-500">LINKEDIN</div>
                <div class="px-3 py-[2px] border-gray-500 border rounded-sm transition-all duration-100 hover:shadow-md hover:border-green-500">EMAIL</div>
                <div class="px-3 py-[2px] border-gray-500 border rounded-sm transition-all duration-100 hover:shadow-md hover:border-green-500">RESUME</div>
            </div>
        </div>
        <div class="w-fit m-auto font-normal">
            <p class="text-center underline pb-5">CREDITS</p>
            <p class="text-center underline pb-5">SUPPORTERS</p>
            <p class="text-center underline pb-5">CONTRIBUTORS</p>
        </div>
    </div>
</template>

<script setup>
import board from '../components/svg/board.vue';
</script>
