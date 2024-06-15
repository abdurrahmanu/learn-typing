<template>
    <UserProgress />
    <div @click="logout" class="w-fit px-6 py-1 bg-blue-500 m-auto">
        logout
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
