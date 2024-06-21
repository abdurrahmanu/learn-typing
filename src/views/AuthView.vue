<template>
    <div :class="[appTheme]" class="pt-40 font-cursive w-fit gap-10 m-auto text-sm">        
        <p :class="[theme === 'dark' ? 'border-slate-300 hover:bg-slate-100 hover:text-black' : 'border-neutral-800 hover:text-white hover:bg-neutral-700']" class="px-10 py-1 border rounded-md flex items-center gap-3 font-medium" @click="createAccount"><google /> SIGN IN WITH GOOGLE</p>
    </div>
</template>

<script setup>
import {ref, watch, onMounted} from 'vue'
import {storeToRefs} from 'pinia'
import {themeStore}  from '../store/themeStore'
import {authStore} from '../store/authStore'
import google from '../components/svg/google.vue'
import {mainStore} from '../store/mainStore'
import {db}  from '../firebase.js';
import {useRouter} from 'vue-router'
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, getAuth } from 'firebase/auth'
import { setDoc, getDoc, doc} from 'firebase/firestore'

const auth_ = authStore()
const {isAuthenticated, userID, userData } = storeToRefs(auth_)

const auth = getAuth()
const provider = new GoogleAuthProvider();

// const createAccount = () => {
//     provider.addScope('https://www.googleapis.com/auth/user.emails.read');

//     signInWithPopup(auth, provider)
//         .then( async (result) => {
//             const credential = GoogleAuthProvider.credentialFromResult(result);
//             const token = credential.accessToken;
//             const user = result.user;
//             userID.value = user.uid
//             await setDoc(doc(db, "users", userID.value), {
//                 userDetails: {
//                     name: user.name,
//                     email: user.email,
//                 }
//             });
//             console.log(user);
//             router.push({path: '/'})
//         }).catch((error) => {
//             // Handle Errors here.
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             // The email of the user's account used.
//             const email = error.customData.email;
//             // The AuthCredential type that was used.
//             const credential = GoogleAuthProvider.credentialFromError(error);
//             // ...
//         });
// }

const theme_ = themeStore()
const { appTheme, theme } = storeToRefs(theme_)

const signUp = ref(false)

watch(signUp, (newVal) => {
        formData.value = {
        username: '',
        email: '',
        password: ''
    }
})
</script>


