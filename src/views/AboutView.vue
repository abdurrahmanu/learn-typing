<template>
    <div class="max-w-[800px] m-auto min-h-[calc(100dvh_-_70px)] overflow-y-auto">
        <div class="w-fit font-normal m-auto pt-10 font-mono">
            <div class="m-auto border rounded-md px-2 py-1 border-green-500 w-fit">
                <p class="text-center text-lg font-bold">KEYBOARD</p>
                <div class="font-mono font-medium cursor-default w-fit h-fit relative m-auto">
                        <span class="absolute top-0 left-[50%] translate-x-[-50%] text-sm font-bold"><span class="hover:text-red-500">K</span><span class="hover:text-green-500">E</span><span class="hover:text-blue-500">Y</span></span>
                        <keyboard class="w-9"/>
                    </div>
            </div>
            <p class="pt-3 w-fit m-auto">IS A TYPING APP CREATED BY AHMED ABDULRAHMAN</p>
            <div class="justify-center flex max-w-[500px] w-[90%] gap-5 m-auto py-5 pt-10">
                <div class="px-6 py-1 border-gray-500 border rounded-sm">GITHUB</div>
                <div class="px-6 py-1 border-gray-500 border rounded-sm">LINKEDIN</div>
                <div class="px-6 py-1 border-gray-500 border rounded-sm">EMAIL</div>
                <div class="px-6 py-1 border-gray-500 border rounded-sm">RESUME</div>
            </div>
        </div>
        <div class="w-fit m-auto font-normal">
            <p class="text-center">CREDITS</p>
            <p class="text-center">SUPPORTERS</p>
            <p class="text-center">CONTRIBUTORS</p>
        </div>
    </div>
</template>

<script setup>
import Keyboard from '../components/svg/keyboard.vue';


</script>
