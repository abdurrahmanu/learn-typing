<template>
    <div class="flex flex-col items-center h-[100dvh] justify-center space-y-5">
        <div class="max-w-fit flex font-mono">
            <p @click="toggle = !toggle" :class="[signUp ? 'text-green-500' : '']" class="hover:bg-neutral-900 border border-transparent hover:border-neutral-600 bg-neutral-700 px-4 py-1 border-r border-r-neutral-400">SIGN UP</p>
            <p @click="toggle = !toggle" :class="[!signUp ? 'text-green-500' : '']" class="hover:bg-neutral-900 border-transparent hover:border-neutral-600 bg-neutral-700 px-4 py-1 border">SIGN IN</p>
        </div>
        <div class="min-h-[220px] border">
            <div :class="[toggle ? 'opacity-0' : 'opacity-100']" class="max-w-[400px] w-fit rounded-md p-2 transition-all duration-300">
                <form  class="space-y-5 text-black">
                    <div class="flex space-x-3 justify-between">
                        <label class="w-fit text-slate-200" for="username">USERNAME</label>
                        <input autocomplete class="outline-none caret-black bg-slate-100 px-3 py-1 placeholder:text-neutral-600 appearance-none" id="username" type="text">
                    </div>
                    <div v-if="signUp" class="flex space-x-3 justify-between">
                        <label class="w-fit text-slate-200" for="email">EMAIL</label>
                        <input autocomplete class="outline-none caret-black bg-slate-100 px-3 py-1 placeholder:text-neutral-600 appearance-none" id="email" type="email">
                    </div>
                    <div class="flex space-x-3 justify-between">
                        <label class="w-fit text-slate-200" for="password">PASSWORD</label>
                        <input autocomplete class="outline-none caret-black bg-slate-100 px-3 py-1 placeholder:text-neutral-600 appearance-none" id="password" type="password">
                    </div>
                </form>
                <div class="text-center pt-6">
                    <button class="rounded-full px-6 py-1 bg-blue-600 text-white">SUBMIT</button>
                </div>
            </div>
        </div>
        <div>
            <p class="text-center text-slate-400 text-sm underline hover:text-white">Forgot Password</p>
        </div>
    </div>
</template>

<script setup>
import {ref, watch} from 'vue'

const toggle = ref(false)
const signUp = ref(true)

watch(toggle, (newVal) => {    
        setTimeout(() => {
            toggle.value = false
            signUp.value = !signUp.value
        }, 400);
})

</script>