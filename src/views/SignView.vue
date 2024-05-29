<template>
    <div :class="[appTheme]" class="flex flex-col items-center space-y-2 font-cursive">
        <Eye class="opacity-30 scale-60" />
        
        <div class="flex gap-2 py-5 font-mono max-w-fit">
            <p @click="signUp = !signUp" :class="[signUp ? 'border-green-500' : '']" class="px-4 border rounded-sm">SIGN UP</p>
            <p @click="signUp = !signUp" :class="[!signUp ? 'border-green-400' : '']" class="px-4 border rounded-sm">SIGN IN</p>
        </div>
        
        <form @submit.prevent :class="[appTheme]" class="space-y-3 m-auto  max-w-[450px] rounded-md px-2 border border-neutral-600 py-3 w-[90%] transition-all duration-300" > 
                <div v-if="signUp" class="flex items-center justify-between gap-3 m-auto transition">
                    <label  dir="rtl" class="font-mono w-[150px]" for="username">USERNAME</label>
                    <input autocomplete="true" id="username" placeholder="Username" type="text" class="inline-block w-full px-2 py-1 text-sm bg-transparent border-none outline-none appearance-none placeholder:text-sm">
                </div>
                <div class="flex items-center justify-between gap-3 m-auto">
                    <label dir="rtl" class="font-mono w-[150px]" for="email">EMAIL</label>
                    <input autocomplete="true" id="email" placeholder="example@email.com" type="email" class="inline-block w-full px-2 py-1 text-sm bg-transparent border-none outline-none appearance-none placeholder:text-sm">
                </div>
                <div class="flex items-center justify-between gap-3 m-auto">
                    <label dir="rtl" class="font-mono w-[150px]" for="password">PASSWORD</label>
                    <input autocomplete="true" id="password" placeholder="password" type="password" class="inline-block w-full px-2 py-1 text-sm bg-transparent border-none outline-none appearance-none placeholder:text-sm">
                </div>
                <div class="text-center ">
                    <p v-if="!signUp" class="py-2 text-xs text-center hover:underline text-slate-500">Forgot Password</p>
                    <button @submit.prevent="" class="px-20 py-1 font-mono border border-black rounded-full hover:bg-neutral-700 hover:border-slate-800 hover:text-white">{{ signUp ? 'SIGN UP' : 'LOGIN'}}</button>
                </div>
        </form>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import {storeToRefs} from 'pinia'
import Eye from '../components/Eye.vue'
import {mainStore} from './../store/mainStore'
import {useRouter, useRoute} from 'vue-router'

const router  = useRouter()
const route = useRouter()

const main = mainStore()
const { toggleSidebar, appTheme, theme} = storeToRefs(main)

const signUp = ref(true)
</script>