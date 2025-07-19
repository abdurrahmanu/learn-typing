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
import { mainStore } from './store/mainStore';
import { storeToRefs } from 'pinia';
import { useRouter, useRoute } from 'vue-router';
import { authStore } from './store/authStore';
import { updateConfig } from './composables/updateConfig';

const mainstore = mainStore()
const {route} = storeToRefs(mainstore)

const authstore = authStore()
const {login, user} = storeToRefs(authstore)

const connectstore = connectStore()
const {loadingApp} = storeToRefs(connectstore)

onMounted(() => {    
  loadingApp.value = true

  onAuthStateChanged(auth, (user_) => {
    user.value = user_

    if (user.value?.emailVerified) {
      loadingApp.value = false
    } 
  });

  setTimeout(() => {
    loadingApp.value = false
  }, 4000);
});

</script>

