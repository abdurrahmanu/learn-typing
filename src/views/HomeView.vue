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
import { customizeStore } from '../store/customizeStore';

const router = useRouter()
const store = mainStore()
const {switchNext} = store
const {resultData} = storeToRefs(store)

const customize = customizeStore()
const {config} = storeToRefs(customize)

watch(resultData, (newVal, oldVal) => {
  if (newVal.totalTime) router.push({path: 'result'})
  else router.push({name: 'typing'})
}, {deep: true})

watch(config, (newConfig, oldConfig) => {
  switchNext(newConfig)
}, {deep: true})

</script>
