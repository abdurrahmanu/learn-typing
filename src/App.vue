<template>
  <Loader v-if="connectStore().loadingApp" />
  <Main v-else />
</template>

<script setup>
import Main from './components/Main.vue'
import Loader from './components/Loader.vue'
import { onMounted, watch} from 'vue'
import {connectStore} from './store/connectStore'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { storeToRefs } from 'pinia';
import { authStore } from './store/authStore';
import { updateDataFromDB } from './composables/updateDataFromDB';
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

    if (user.value?.emailVerified) {
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
        updateDataFromDB(data.value)
        generateTest()
      } 
    }
  })
});
</script>

<style>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none
}
</style>

