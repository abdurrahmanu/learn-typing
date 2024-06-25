<template>
    <div class="pt-32 xl:pt-20">
        <!-- <UserProgress /> -->
        <div @click="logout" class="px-10 py-1 m-auto text-white bg-red-500 rounded-full w-fit hover:ring">
            LOGOUT
        </div>
    </div>
</template>

<script setup>
// import UserProgress from "../components/UserProgress.vue";
// import { getAuth, signOut } from "firebase/auth";
// import {useRouter} from 'vue-router'

// const auth = getAuth()
// const router = useRouter()

const logout = async () => {
// 	await signOut(auth).then(() => {
// 		router.push({path: ''})
// 	})
}
</script>
