<template>
    <div class="xl:pt-20 pt-32">
        <!-- <UserProgress /> -->
        <div @click="logout" class="w-fit px-10 py-1 bg-red-500 rounded-full m-auto text-white hover:ring">
            LOGOUT
        </div>
    </div>
</template>

<script setup>
import UserProgress from "../components/UserProgress.vue";
import { getAuth, signOut } from "firebase/auth";
import {useRouter} from 'vue-router'

const auth = getAuth()
const router = useRouter()

const logout = async () => {
	await signOut(auth).then(() => {
		router.push({path: 'auth'})
	})
}
</script>
