<template>
  <div class="pb-12 py-6 max-h-screen overflow-y-scroll text-sm flex-1">
    <div v-if="login" class="space-y-10">
      <UserCard />
      <UserBestStats />
      <UserStats />
      <LeaderBoard />
      <div class="w-[95%] max-w-[1000px] m-auto bg-white shadow-xl rounded-2xl p-6 ">
        <h2 class="text-xl font-semibold text-black tracking-wide">All Time</h2>
        <!-- <LineChart class="" /> -->
      </div>
    </div>

    <div v-else>
      <div class="gap-10 m-auto space-y-4 font-cursive w-fit rounded-md p-10 text-base">
          <div class="flex justify-center font-bold">
              <p class="px-5 text-center cursor-pointer">SIGN IN</p>
          </div>
          <p @click='loginWithGoogle' class="flex items-center justify-center gap-3 px-10 py-1 font-medium border rounded-md cursor-pointer border-neutral-600 active:border-green-500"><google />GOOGLE</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const authstore = authStore()
const {login} = storeToRefs(authstore)
const {loginWithGoogle} = useAuth()
</script>


