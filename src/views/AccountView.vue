<template>
    <div @click="logout">
        logout
    </div>
</template>

<script setup>
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
