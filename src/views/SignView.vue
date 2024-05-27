<template>
    <div :class="[appTheme]" class="flex flex-col items-center space-y-2 font-cursive">
        <Eye class="opacity-30 scale-60" />
        
        <div class="flex gap-2 font-mono max-w-fit">
            <p @click="signUp = !signUp" :class="[signUp ? 'border-green-500' : '']" class="px-4 border rounded-sm">SIGN UP</p>
            <p @click="signUp = !signUp" :class="[!signUp ? 'border-green-400' : '']" class="px-4 border rounded-sm">SIGN IN</p>
        </div>

        <p class="text-2xl">Coming soon...</p>
        
        <div class="max-w-[400px] w-[90%]  space-y-3 m-auto  min-w-[350px] shadow shadow-black p-1 rounded-md px-2" >            
            <div class="flex items-center justify-between gap-3 m-auto">
                <label  dir="rtl" class="font-mono w-fit" for="username">USERNAME</label>
                <input id="username" placeholder="Username" type="text" class="inline-block w-full px-2 py-1 bg-transparent border-none outline-none appearance-none placeholder:text-sm placeholder:text-slate-400 text-slate-200">
            </div>
            <div class="flex items-center justify-between gap-3 m-auto">
                <label dir="rtl" class="font-mono w-fit" for="email">EMAIL</label>
                <input id="email" placeholder="example@email.com" type="email" class="inline-block w-full px-2 py-1 bg-transparent border-none outline-none appearance-none placeholder:text-sm placeholder:text-slate-400 text-slate-200">
            </div>
            <div class="flex items-center justify-between gap-3 m-auto">
                <label dir="rtl" class="font-mono w-fit" for="password">PASSWORD</label>
                <input id="password" placeholder="Password" type="password" class="inline-block w-full px-2 py-1 bg-transparent border-none outline-none appearance-none placeholder:text-sm placeholder:text-slate-400 text-slate-200">
            </div>
            
            <div class="py-3 text-center">
                <button class="px-10 py-1 font-mono border border-black rounded-full hover:bg-black hover:border-white hover:text-white">LOGIN</button>
            </div>
        </div>
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
