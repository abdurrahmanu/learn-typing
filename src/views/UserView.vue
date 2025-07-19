<template>
  <div class="mt-10">
    <div v-if="login">
      <p @click='logout' class="flex items-center justify-center gap-3 px-10 py-1 font-medium border rounded-md w-fit m-auto cursor-pointer border-neutral-600 active:border-green-500 hover:bg-black"><google />LOGOUT</p>
    </div>
    <div v-else>
      <div class="gap-10 m-auto space-y-4 font-cursive w-fit rounded-md p-10">
          <div class="flex justify-center font-bold">
              <p class="px-3 text-center cursor-pointer">SIGN IN</p>
          </div>
          <p @click='loginWithGoogle' class="flex items-center justify-center gap-3 px-10 py-1 font-medium border rounded-md cursor-pointer border-neutral-600 active:border-green-500"><google />GOOGLE</p>
      </div>
    </div>
  </div>
{{ data }}
  <div class="text-center p-5">
    <p>{{ user?.email }}</p>
    <p>{{ user?.displayName }}</p>
    <p>{{ customizers }}</p>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import google from '../components/svg/google.vue'
import { useAuth } from '../composables/useAuth';
import { authStore } from '../store/authStore';
import { customizeStore } from '../store/customizeStore';

const authstore = authStore()
const {login, user, data} = storeToRefs(authstore)

const customizestore = customizeStore()
const {customizers} = storeToRefs(customizestore)

const {loginWithGoogle, logout} = useAuth()
</script>


