<template>
    <div v-if="!isAuthenticated" class="gap-10 pt-12 m-auto text-xs font-cursive w-fit space-y-4">        
        <div class="flex justify-center">
            <p @click="signIn = false" :class="[signIn ? '' : 'ring-[1px]']" class="text-center px-3 cursor-pointer">SIGN UP</p>
            <p @click="signIn = true" :class="[signIn ? 'ring-[1px]' : '']" class="text-center px-3  cursor-pointer">SIGN IN</p>
        </div>
        <p @click="sign('email')" class="flex items-center gap-3 px-10 py-1 font-medium border-neutral-600 border rounded-md justify-center active:border-green-500 hover:bg-black cursor-pointer"><email class="w-4" />EMAIL</p>
        <p @click="sign('google')" class="flex items-center gap-3 px-10 py-1 font-medium border-neutral-600 border rounded-md justify-center active:border-green-500 hover:bg-black cursor-pointer"><google />GOOGLE</p>
        <!-- <p @click="sign('anon')" class="flex items-center gap-3 px-10 py-1 font-medium border-neutral-600 border rounded-md justify-center active:border-green-500 hover:bg-black cursor-pointer"><user class="w-4" />ANONYMOUS USER</p> -->
    </div>
    <div v-else>
        <p>user details are all in</p>
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
//         console.log(data);
//         // Signed in..
//     })
//     .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // ...
//         console.log(errorMessage);
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


