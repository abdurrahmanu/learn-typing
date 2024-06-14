<template>
    <div :class="[appTheme]" class="flex flex-col items-center pt-10 space-y-2 font-cursive">        
        <div class="flex gap-2 py-5 font-mono max-w-fit">
            <p @click="signUp = false" :class="[!signUp ? 'border-green-400' : '']" class="px-4 border rounded-sm">LOGIN</p>
            <p @click="signUp = true" :class="[signUp ? 'border-green-500' : '']" class="px-4 border rounded-sm">CREATE ACCOUNT</p>
        </div>
        
        <form @submit.prevent="submitForm" :class="[appTheme]" class="space-y-3 m-auto  max-w-[450px] rounded-md px-2 border border-neutral-600 py-3 w-[90%] transition-all duration-300" > 
                <div v-if="signUp" class="flex items-center justify-between gap-3 m-auto transition">
                    <label  dir="rtl" class="font-mono w-[150px]" for="username">USERNAME</label>
                    <input autocomplete="true" id="username" placeholder="Username" v-model="formData.username" type="text" class="inline-block w-full px-2 py-1 text-sm bg-transparent border-none outline-none appearance-none placeholder:text-sm">
                </div>
                <div class="flex items-center justify-between gap-3 m-auto">
                    <label dir="rtl" class="font-mono w-[150px]" for="email">EMAIL</label>
                    <input autocomplete="true" id="email" placeholder="example@email.com" v-model="formData.email" type="email" class="inline-block w-full px-2 py-1 text-sm bg-transparent border-none outline-none appearance-none placeholder:text-sm">
                </div>
                <div class="flex items-center justify-between gap-3 m-auto">
                    <label dir="rtl" class="font-mono w-[150px]" for="password">PASSWORD</label>
                    <input autocomplete="true" id="password" placeholder="password" v-model="formData.password" type="password" class="inline-block w-full px-2 py-1 text-sm bg-transparent border-none outline-none appearance-none placeholder:text-sm">
                </div>
                <div class="text-center ">
                    <button :class="[formValidity ? 'hover:border-green-500 hover:text-green-500' : 'hover:border-red-500 hover:text-red-400 cursor-not-allowed']" @mouseover="checkValidity" @submit="submitForm" class="flex items-center gap-3 px-10 py-1 m-auto font-mono border border-black rounded-full md:px-20 hover:bg-neutral-700">
                        <span>{{ signUp ? 'CREATE' : 'LOGIN'}}</span>
                        <Spinner v-if="validate" /> 
                    </button>
                    <p v-if="res.error || res.success" :class="[res.error ? 'text-red-500' : 'text-green-500' ]" class="py-1">{{ res.message }}</p>
                    <p v-if="!signUp" class="py-2 text-sm center text- hover:underline text-slate-500" @click="reset">Forgot Password</p>
                </div>
        </form>
    </div>
    <p class="px-10 m-auto w-fit text-2xl py-1 my-10 border hover:border-slate-600" @click="redirect">GO BACK HOME</p>
</template>

<script setup>
import {ref, watch} from 'vue'
import {storeToRefs} from 'pinia'
import {themeStore}  from '../store/themeStore'
import {authStore} from '../store/authStore'
import {mainStore} from '../store/mainStore'
import { customizeStore } from '../store/customizeStore'
import {app, db}  from '../firebase.js';
import {useRouter} from 'vue-router'
import Spinner from '../components/Spinner.vue'
import {test} from '../composables/test'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, sendEmailVerification } from "firebase/auth";
import { setDoc, getDoc, doc} from 'firebase/firestore'

const auth = getAuth()

const customize = customizeStore()
const {customizers} = storeToRefs(customize)

const auth_ = authStore()
const {isAuthenticated, userID, userData } = storeToRefs(auth_)

const store = mainStore()
const {} = storeToRefs(store)
const {switchNext} = store

const theme_ = themeStore()
const {theme, appTheme } = storeToRefs(theme_)

const signUp = ref(false)
const router = useRouter()
const formValidity = ref(false)
const validate = ref(false)

const res = ref({
    error: false,
    success: false,
    message: ''
})


const formData = ref({
    username: '',
    email: '',
    password: ''
})

const redirect = () => {
    router.push({path: '/'})
}

const checkValidity = () => {
    const {username, email, password} = formData.value
    if (signUp.value) {
        if ( !email || !password) {
            formValidity.value = false
        } else {
            formValidity.value = true
        }
    } else {
        if (!email || !password) {
            formValidity.value = false
        } else {
            formValidity.value = true
        }
    }
}

const submitForm = async () => {
    if (formValidity.value) {      
        validate.value = true
        if (signUp.value) {
            await createUserWithEmailAndPassword(auth, formData.value.email, formData.value.password)
            .then( async (userCredentials) => {
                userID.value = userCredentials.user.uid
                await setDoc(doc(db, "users", userID.value), {
                    username: formData.value.username,
                    email: formData.value.email,
                    data: []
                })

                res.value.success = true
                res.value.message = 'account created'
                validate.value = false

                setTimeout( async () => {
                    res.value.success = false
                    res.value.message = ''
                    await signOut(auth).then(() => {
                    signUp.value = false
                })
                }, 1000);

            })
            .catch(error => {
                res.value.error = true
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        res.value.message = 'user already exists'
                        break
                    case 'auth/credential-already-in-use' :
                        res.value.message = 'user already exists'
                        break
                    case "auth/invalid-email":
                        res.value.message = 'invalid email'
                        break
                    case 'auth/weak-password':
                        res.value.message = 'weak password'
                        break
                    case "auth/timeout":
                        res.value.message = 'timeout'
                        break
                    default:
                        res.value.message = 'check your connection'
                        break
                }
                validate.value = false
                setTimeout(() => {
                    res.value.error = false
                    res.value.message = ''
                }, 2000);
            });
        } else {
            await signInWithEmailAndPassword(auth, formData.value.email, formData.value.password)
            .then( async (userCredentials) => {
                userID.value = userCredentials.user.uid
                isAuthenticated.value = true
                validate.value = false
                switchNext(customizers.value, null, test().res.value)
                router.push('/')
                await getDoc(doc(db, "users", userID.value)).then((data) => userData.value = data)
            })
            .catch(error => {
                res.value.error = true
                switch (error.code) {
                    case 'auth/invalid-email':
                        res.value.message = 'Invalid email'
                        break
                    case "auth/timeout":
                        res.value.message = 'timeout'
                        break
                    case 'auth/user-not-found':
                        res.value.message = 'No account with that email was found'
                        break
                    case 'auth/wrong-password':
                        res.value.message = 'Incorrect password'
                        break
                    case "auth/invalid-credential":
                        res.value.message = 'invalid login details'
                        break
                    case "auth/null-user":
                        res.value.message = `user doesn't exist`
                        break
                    default:
                        res.value.message = 'check your connection'
                        break
                }
                validate.value = false
                setTimeout(() => {
                    res.value.error = false
                    res.value.message = ''
                }, 1000);
            });
        }
    }
}

const reset = () => {
    // sendPasswordResetEmail(auth, formData.email)
    // .then(() => {
    // })
    // .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    // });
}

watch(signUp, (newVal) => {
        formData.value = {
        username: '',
        email: '',
        password: ''
    }
})
</script>


