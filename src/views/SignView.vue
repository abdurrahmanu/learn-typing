<template>
    <div :class="[appTheme]" class="flex flex-col items-center h-[100dvh] justify-center space-y-5">
        <div class="max-w-fit flex font-mono">
            <p @click="signUp = !signUp" :class="[signUp ? 'border-green-500' : '']" class="px-4 border rounded-sm">SIGN UP</p>
            <p @click="signUp = !signUp" :class="[!signUp ? 'border-green-400' : '']" class="px-4 border rounded-sm">SIGN IN</p>
        </div>

        <div>
            <p class="text-center text-xs border-b border-b-slate-600 hover:border-b-green-500">Forgot Password</p>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import {storeToRefs} from 'pinia'
import {mainStore} from './../store/mainStore'
import {useRouter, useRoute} from 'vue-router'

const router  = useRouter()
const route = useRouter()

const main = mainStore()
const { toggleSidebar, appTheme, theme} = storeToRefs(main)

const signUp = ref(true)
</script>