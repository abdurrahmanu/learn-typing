<template>
      <Header />
      <Customize v-if="!resultData.totalTime" />
      <RouterView />
      <Restart />
</template>

<script setup>
import Header from '../components/Header.vue';
import Customize from '../components/Customize.vue'
import Restart from '../components/Restart.vue';
import { watch } from 'vue';
import {useRouter} from 'vue-router'
import { mainStore } from '../store/mainStore';
import { storeToRefs } from 'pinia';

const router = useRouter()
const store = mainStore()
const {switchNext} = store
const {resultData, config} = storeToRefs(store)

watch(resultData, (newVal, oldVal) => {
  if (newVal.totalTime) router.push({path: 'result'})
  else router.push({name: 'typing'})
}, {deep: true})

watch(config, (newVal, oldVal) => {
  switchNext(newVal)
}, {deep: true})
</script>
