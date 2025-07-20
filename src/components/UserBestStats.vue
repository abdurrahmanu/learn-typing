<template>
  <div class="w-[95%] max-w-[1000px] mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8 flex flex-col gap-6">
    <h2 class="text-xl font-semibold text-black tracking-wide">🏁 Best Typing Stats</h2>

    <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
      <div class="bg-neutral-100 p-4 rounded-xl">
        <p class="text-2xl font-bold">{{ stats.bestWPM }}</p>
        <p class="text-sm text-neutral-600">Best WPM</p>
      </div>

      <div class="bg-neutral-100 p-4 rounded-xl">
        <p class="text-2xl font-bold">{{ stats.rawSpeed }}</p>
        <p class="text-sm text-neutral-600">Raw Speed</p>
      </div>

      <div class="bg-neutral-100 p-4 rounded-xl">
        <p class="text-2xl font-bold">{{ stats.highestAccuracy }}%</p>
        <p class="text-sm text-neutral-600">Highest Accuracy</p>
      </div>

      <div class="bg-neutral-100 p-4 rounded-xl">
        <p class="text-2xl font-bold">{{ stats.consistency }}%</p>
        <p class="text-sm text-neutral-600">Consistency</p>
      </div>

      <div class="bg-neutral-100 p-4 rounded-xl">
        <p class="text-2xl font-bold">{{ stats.longestTime }} min</p>
        <p class="text-sm text-neutral-600">Longest Typing</p>
      </div>

      <div class="bg-neutral-100 p-4 rounded-xl">
        <p class="text-2xl font-bold">{{ stats.streakDays }}</p>
        <p class="text-sm text-neutral-600">Streak Days</p>
      </div>

      <div class="bg-neutral-200 p-4 rounded-xl col-span-2 sm:col-span-3">
        <p class="text-xl font-semibold text-black">{{ stats.highestRank }}</p>
        <p class="text-sm text-neutral-600">Highest Rank Ever</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { authStore } from '../store/authStore';
import { storeToRefs } from 'pinia';

const authstore = authStore()
const {userDataAndStats} = storeToRefs(authstore)

const { bestStats: stats } = userDataAndStats.value
</script>
