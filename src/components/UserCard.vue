<template>
  <div class="w-[95%] max-w-[1000px] bg-white shadow-xl rounded-2xl p-6 md:p-8 mx-auto flex flex-col gap-6 transition-all duration-300">
    <EditUser @exitPage="editUser = false" v-if="editUser" />

    <div v-else>
      <div class="flex justify-between">
        <h2 class="text-xl font-semibold text-black tracking-wide">User</h2>
        <p @click='logout' class="flex items-center justify-center gap-3 px-10 py-1 font-medium border rounded-md cursor-pointer border-neutral-600 hover:text-white hover:bg-red-300">LOGOUT</p>
      </div>
      <!-- Header: Profile + Info -->
      <div class="flex flex-col md:flex-row items-center gap-6">
        <div class="rounded-full w-24 h-24 border-4 border-sky-500 relative">
            <img
              src="/kiboard.svg"
              alt="Profile"
              class="object-cover w-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
        </div>

        <div class="text-center md:text-left flex-1">
          <h2 class="text-2xl font-semibold text-neutral-600">
            @{{ userInfo.username }}
          </h2>
          <p class="text-neutral-600 text-sm">{{ userInfo.email }}</p>
          <p class="mt-1 text-sky-500 font-bold text-lg">
            Rank: {{ userInfo.ranking }}
          </p>
        </div>
  
        <button
          class="my-4 md:mt-0 bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-lg transition"
          @click="editUser = true"
        >
          Edit Profile
        </button>
      </div>
  
      <!-- Stats -->
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
        <div class="bg-neutral-100 p-4 rounded-xl">
          <p class="text-2xl font-bold text-black">{{ userInfo.testsStarted }}</p>
          <p class="text-sm text-neutral-600">Tests Started</p>
        </div>
  
        <div class="bg-neutral-100 p-4 rounded-xl">
          <p class="text-2xl font-bold text-black">{{ userInfo.testsFinished }}</p>
          <p class="text-sm text-neutral-600">Tests Finished</p>
        </div>
  
        <div class="bg-neutral-100 p-4 rounded-xl col-span-2 sm:col-span-1">
          <p class="text-2xl font-bold text-black">{{ Math.round(userInfo.secondsTyped % 60).toFixed(2) }}</p>
          <p class="text-sm text-neutral-600">Minutes Typed</p>
        </div>
      </div>
  
      <!-- Joined Time -->
      <div class="text-right text-sm pt-3 text-neutral-500">
        Joined {{ formatJoinDate(userInfo.joinedAt) }}
      </div>  
    </div>
  </div>
</template>

<script setup>
import { useAuth } from "../composables/useAuth";
import { storeToRefs } from "pinia";
import {ref} from 'vue'
import EditUser from "./EditUser.vue";
import {userDataStore} from '../store/userDataStore'

const userstore = userDataStore()
const {userInfo} = storeToRefs(userstore)

const {logout} = useAuth()

const editUser = ref(false)

const formatJoinDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const editProfile = () => {
  // emit or route to profile edit page
};
</script>
