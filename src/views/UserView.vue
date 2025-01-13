<template>
    <div v-if="!isAuthenticated" class="gap-10 pt-12 m-auto space-y-4 font-cursive w-fit">
        <div class="flex justify-center font-bold">
            <p @click="signIn = false" :class="[signIn ? '' : 'ring-[2px]']" class="px-3 text-center cursor-pointer">SIGN UP</p>
            <p @click="signIn = true" :class="[signIn ? 'ring-[2px]' : '']" class="px-3 text-center cursor-pointer">SIGN IN</p>
        </div>
        <p @click="sign('email')" class="flex items-center justify-center gap-3 px-10 py-1 font-medium border rounded-md cursor-pointer border-neutral-600 active:border-green-500 hover:bg-black"><email class="w-4" />EMAIL</p>
        <p @click="sign('google')" class="flex items-center justify-center gap-3 px-10 py-1 font-medium border rounded-md cursor-pointer border-neutral-600 active:border-green-500 hover:bg-black"><google />GOOGLE</p>
        <!-- <p @click="sign('anon')" class="flex items-center justify-center gap-3 px-10 py-1 font-medium border rounded-md cursor-pointer border-neutral-600 active:border-green-500 hover:bg-black"><user class="w-4" />ANONYMOUS USER</p> -->
    </div>
    <div v-else>
        <div>
            <p>Leader Boards</p>
            <div v-for="item in 10" :key="item + 1">
                {{ man }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { authStore } from '../store/authStore';
import { storeToRefs } from 'pinia';
import user from '../components/svg/user.vue';
import google from '../components/svg/google.vue'
import email from '../components/svg/email.vue'
import { ref } from 'vue';
import { getAuth, signInAnonymously } from "firebase/auth";

const auth_ = authStore()
const {isAuthenticated} = storeToRefs(auth_)

const auth = getAuth();
const signIn = ref(true)

const sign = async (method) => {
//     await signInAnonymously(auth)
//     .then((data) => {
//         // Signed in..
//     })
//     .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // ...
//     });

//     onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/auth.user
//     const uid = user.uid;
//     // ...
//   } else {
//     // User is signed out
//     // ...
//   }
// });
}
</script>


