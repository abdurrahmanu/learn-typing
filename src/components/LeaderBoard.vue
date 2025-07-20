<template>
  <div class="w-[95%] max-w-[1000px] mx-auto relative mt-6 bg-white max-h-screen overflow-y-scroll dark:bg-neutral-900 shadow-lg rounded-2xl overflow-hidden">
    <div class="bg-sky-500 text-white sticky top-0 p-4 text-xl font-bold">🏆 Leaderboard Top KiBoarders</div>

    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left text-neutral-700 dark:text-neutral-300">
        <thead class="text-xs uppercase bg-neutral-100 dark:bg-neutral-800">
          <tr>
            <th class="px-4 py-3">Rank</th>
            <th class="px-4 py-3">User</th>
            <th class="px-4 py-3">WPM</th>
            <th class="px-4 py-3">Joined</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(user, index) in displayedUsers"
            :key="index"
            class="border-b border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition"
          >
            <td class="px-4 py-2 font-semibold">{{ index + 1 }}</td>
            <td class="px-4 py-2 flex items-center gap-3">
              <img
                :src="user.photo"
                alt="profile"
                class="w-8 h-8 hidden md:block rounded-full object-cover border border-neutral-400"
              />
              <span class="font-medium">{{ user.username }}</span>
            </td>
            <td class="px-4 py-2">{{ user.bestWPM }}</td>
            <td class="px-4 py-2">{{ formatDate(user.joinedAt) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-center p-4">
      <button
        v-if="displayedUsers.length < leaderboard.length"
        @click="loadMore"
        class="px-4 py-2 sticky bottom-0 bg-neutral-800 text-white rounded hover:bg-neutral-700 transition"
      >
        Load More
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const leaderboard = ref(
  Array.from({ length: 200 }, (_, i) => ({
    username: `user${i + 1}`,
    photo: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
    bestWPM: Math.floor(50 + Math.random() * 100),
    joinedAt: Date.now() - i * 86400000,
  }))
)

const displayedUsers = ref(leaderboard.value.slice(0, 20))

const loadMore = () => {
  const current = displayedUsers.value.length
  displayedUsers.value.push(...leaderboard.value.slice(current, current + 20))
}

const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString()
}
</script>
