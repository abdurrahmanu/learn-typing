<template>
  <Loader v-if="connectStore().loadingApp" />
  <Main v-else />
</template>

<script setup>
import Main from './components/Main.vue'
import Loader from './components/Loader.vue'
import { onMounted, onUnmounted, watch} from 'vue'
import {connectStore} from './store/connectStore'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { storeToRefs } from 'pinia';
import { authStore } from './store/authStore';
import { fetchData } from './composables/fetchData';
import { generateTest } from './composables/generateTest';
import { getSingleDoc, addSingleDoc } from './composables/firestoreDocs';

const authstore = authStore()
const {login, user, data} = storeToRefs(authstore)

const connectstore = connectStore()
const {loadingApp} = storeToRefs(connectstore)

onMounted( async () => {   
  loadingApp.value = true

  onAuthStateChanged(auth, async (user_) => {
    user.value = user_

    if (user.value?.emailVerified && navigator.onLine) {
      if (!data.value) {
        data.value = await getSingleDoc(user.value.uid)
      }
      if (!data.value) {
        data.value = await addSingleDoc(user.value.uid)
      }
      if (data.value) {
        login.value = true
      }
    }
    
    else {
      login.value = false
      data.value = null
      generateTest()
    }

    loadingApp.value = false
  })

  watch(login, newVal => {
    if (newVal) {
      if (data.value) {
        fetchData(data.value)
        generateTest()
      } 
    }
  })
});

onUnmounted(() => {
  data.value = null
})
</script>

<style>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none
}

.center-xy {
  @apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
}

.center-xt {
  @apply absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
}

.center-x {
  @apply absolute left-1/2 -translate-x-1/2
}

.center-y {
  @apply absolute top-1/2 -translate-y-1/2
}

.fill-parent {
  @apply absolute top-0 left-0 bottom-0 right-0
}

.center-text-xy {
  @apply flex items-center justify-center
}

.default {
  @apply appearance-none outline-none
}

.bottom-right {
  @apply absolute bottom-0 right-[2px]
}
</style>

