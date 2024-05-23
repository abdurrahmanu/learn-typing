<template>
    <div :class="[appTheme]" class="flex flex-col items-center space-y-5">
        <!-- <Eye /> -->

        <div class="flex font-mono max-w-fit">
            <p @click="signUp = !signUp" :class="[signUp ? 'border-green-500' : '']" class="px-4 border rounded-sm">SIGN UP</p>
            <p @click="signUp = !signUp" :class="[!signUp ? 'border-green-400' : '']" class="px-4 border rounded-sm">SIGN IN</p>
        </div>

        <div class="max-w-[500px] w-[90%]  space-y-1 m-auto" >            
            <div class="flex items-center gap-3 m-auto w-fit">
                <label for="username">USERNAME</label>
                <input id="username" type="text">
            </div>

            <div class="py-3 text-center">
                <button class="py-1 border border-black rounded-full px-7">LOGIN</button>
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
