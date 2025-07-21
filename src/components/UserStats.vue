<template>
  <div class="w-[95%] max-w-[1000px] mx-auto mt-10 p-10 bg-white rounded-xl shadow-xl">
      <h2 class="text-xl pb-3 font-semibold text-black tracking-wide">User History</h2>

    <div class="overflow-hidden">
      <table class="w-full text-left text-sm text-neutral-800">
        <thead class="bg-neutral-100 text-neutral-700 text-sm uppercase tracking-wide">
          <tr>
            <th class="px-4 py-3">WPM</th>
            <th class="px-4 py-3">Accuracy</th>
            <th class="px-4 py-3">Mode</th>
            <th class="px-4 py-3">Date</th>
          </tr>
        </thead>
        <tbody v-if="testHistory.length">
          <tr
            v-for="(row, index) in visibleRows"
            :key="index"
            class="hover:bg-neutral-50 transition"
          >
            <td class="px-4 py-3 font-semibold">{{ row.wpm }}</td>
            <td class="px-4 py-3">{{ row.accuracy }}%</td>
            <td class="px-4 py-3 capitalize">{{ row.mode }}</td>
            <td class="px-4 py-3 text-sm text-neutral-500">
              {{ formatDate(row.date) }}
            </td>
          </tr>
        </tbody>
      </table>

      <div class="p-4 text-center">
        <button
          @click="loadMore"
          class="text-sm text-black font-medium bg-neutral-200 hover:bg-neutral-300 px-4 py-2 w-full rounded-lg transition"
          v-if="visibleRows.length < testHistory.length"
        >
          LOAD MORE
        </button>
        <p
          class="text-sm text-neutral-500"
          v-else
        >
        {{ testHistory.length ? 'All results loaded' : '' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import {userDataStore} from '../store/userDataStore'

const userstore = userDataStore()
const {userHistory} = storeToRefs(userstore)

const testHistory = computed(() => {
  return userHistory.value.tests
})

const rowsToShow = ref(5);

const visibleRows = computed(() =>
  testHistory.value.slice(0, rowsToShow.value)
);

const loadMore = () => {
  rowsToShow.value += 3;
};

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};
</script>
